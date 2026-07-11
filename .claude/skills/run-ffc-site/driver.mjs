#!/usr/bin/env node
/*
 * driver.mjs — headless-Chromium harness for the FFC static site.
 *
 * `chromium-cli` isn't available in this container, so this drives
 * Playwright's bundled Chromium directly (the same `playwright` import
 * the repo's visual-regression script uses). It navigates one or more
 * routes against a running server, screenshots each, and reports any
 * console errors / failed requests / uncaught page errors. A page that
 * throws or 404s makes the run exit non-zero.
 *
 * Prereqs: `npm run build` then a server on BASE_URL (see SKILL.md).
 *
 * Usage:
 *   node .claude/skills/run-ffc-site/driver.mjs                 # smoke a default route set
 *   node .claude/skills/run-ffc-site/driver.mjs / /about-us/    # specific routes
 *   BASE_URL=http://localhost:3000 node .../driver.mjs /        # against `npm run dev`
 *   EXPECT="Free For Charity" node .../driver.mjs /             # assert text is present
 *
 * Screenshots land in .claude/skills/run-ffc-site/screenshots/<slug>.png
 * Exit code: 0 = every route clean, 1 = any route failed.
 */

import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// The repo's Playwright pins a browser build that may not match the one
// pre-installed in the container. Prefer the container's stable chromium
// symlink so we never need `npx playwright install`. Override with
// CHROME_PATH if needed.
const CHROME =
  process.env.CHROME_PATH || ['/opt/pw-browsers/chromium'].find((p) => existsSync(p)) || undefined

const here = dirname(fileURLToPath(import.meta.url))
const shotDir = resolve(here, 'screenshots')

const BASE_URL = (process.env.BASE_URL || 'http://localhost:4173').replace(/\/$/, '')
const EXPECT = process.env.EXPECT || ''
const VIEWPORT = { width: 1280, height: 800 }

// A representative slice of the ~35 routes: home (Figma redesign),
// a program page, a policy page, and a client-interactive page.
const DEFAULT_ROUTES = ['/', '/about-us/', '/501c3/', '/privacy-policy/', '/search/']

const routes = process.argv.slice(2)
const targets = routes.length ? routes : DEFAULT_ROUTES

const slug = (p) => (p.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '-')

const PASS = '\x1b[32m✓\x1b[0m'
const FAIL = '\x1b[31m✗\x1b[0m'

async function main() {
  await mkdir(shotDir, { recursive: true })
  const browser = await chromium.launch({
    args: ['--no-sandbox'],
    ...(CHROME ? { executablePath: CHROME } : {}),
  })
  const context = await browser.newContext({ viewport: VIEWPORT })
  let failures = 0

  for (const path of targets) {
    const url = path.startsWith('http') ? path : `${BASE_URL}${path}`
    const page = await context.newPage()
    const pageErrors = []
    const localFails = [] // same-origin resource failures — real bugs
    const extBlocks = [] // third-party hosts blocked by the sandbox — informational
    page.on('pageerror', (e) => pageErrors.push(String(e)))
    page.on('requestfailed', (r) => {
      const err = r.failure()?.errorText || ''
      if (err.includes('ERR_ABORTED')) return // aborted <Link> prefetches are normal
      if (r.url().startsWith(BASE_URL)) localFails.push(`${r.url()} (${err})`)
      else extBlocks.push(r.url())
    })
    page.on('response', (r) => {
      if (r.url().startsWith(BASE_URL) && r.status() >= 400)
        localFails.push(`${r.url()} (HTTP ${r.status()})`)
    })

    let ok = true
    let detail = ''
    try {
      const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      const status = res?.status() ?? 0
      if (status >= 400) {
        ok = false
        detail = `HTTP ${status}`
      }
      if (EXPECT && !(await page.content()).includes(EXPECT)) {
        ok = false
        detail = `${detail} missing text "${EXPECT}"`.trim()
      }
      const shot = resolve(shotDir, `${slug(path)}.png`)
      await page.screenshot({ path: shot, fullPage: true })
      if (pageErrors.length) {
        ok = false
        detail = `${detail} pageerror: ${pageErrors[0]}`.trim()
      }
      if (localFails.length) {
        ok = false
        detail = `${detail} same-origin fail: ${localFails[0]}`.trim()
      }
    } catch (e) {
      ok = false
      detail = String(e).split('\n')[0]
    }

    if (!ok) failures++
    const note = extBlocks.length ? ` (${extBlocks.length} third-party blocked)` : ''
    process.stdout.write(
      `${ok ? PASS : FAIL} ${path}${detail ? ` — ${detail}` : ''}${note} -> screenshots/${slug(path)}.png\n`
    )
    await page.close()
  }

  await browser.close()
  process.stdout.write(
    `\n${failures ? FAIL : PASS} ${targets.length - failures}/${targets.length} routes clean\n`
  )
  process.exit(failures ? 1 : 0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
