#!/usr/bin/env node
/**
 * Live visual check — drives a real Chromium browser against the LIVE site and
 * the WHMCS /hub, captures full-page screenshots, asserts real content, and
 * QUANTIFIES flakiness (how many attempts each page needed to return 200).
 *
 * This exists because curl/HEAD probes from CI/datacenter IPs can be
 * intermittently rejected (e.g. 415) and don't prove what a browser actually
 * renders. Screenshots + DOM assertions are the real evidence.
 *
 *   BASE_URL   default https://freeforcharity.org
 *   ATTEMPTS   max navigations per page before failing (default 6)
 *   OUTDIR     screenshot dir (default ./artifacts)
 *
 * Exit non-zero if any target never reached 200, or a content assertion failed.
 */
import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const BASE = (process.env.BASE_URL || 'https://freeforcharity.org').replace(/\/$/, '')
const ATTEMPTS = parseInt(process.env.ATTEMPTS || '6', 10)
const OUTDIR = process.env.OUTDIR || 'artifacts'

// target path, screenshot name, and substrings that must appear in the DOM
const TARGETS = [
  { path: '/', name: 'home', mustInclude: ['Free For Charity'], kind: 'static' },
  { path: '/about-us/', name: 'about-us', mustInclude: ['About'], kind: 'static' },
  { path: '/donate/', name: 'donate', mustInclude: ['Donate', 'Donation'], kind: 'static' },
  { path: '/501c3/', name: '501c3', mustInclude: ['501'], kind: 'static' },
  // WHMCS must keep working after the cutover — look for client-portal markers.
  {
    path: '/hub/',
    name: 'hub-whmcs',
    mustInclude: ['WHMCS', 'Client', 'Portal', 'Login', 'Register'],
    kind: 'whmcs',
  },
]

async function gotoWithRetry(page, url) {
  let last = null
  const statuses = []
  for (let i = 1; i <= ATTEMPTS; i++) {
    try {
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
      const status = resp ? resp.status() : 0
      statuses.push(status)
      last = status
      if (status === 200) return { status, attempts: i, statuses }
    } catch (e) {
      statuses.push('ERR')
      last = 'ERR'
    }
    await page.waitForTimeout(1500)
  }
  return { status: last, attempts: ATTEMPTS, statuses }
}

async function main() {
  await mkdir(OUTDIR, { recursive: true })
  const browser = await chromium.launch()
  const ctx = await browser.newContext({
    viewport: { width: 1366, height: 900 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  })
  const page = await ctx.newPage()

  const rows = []
  let failures = 0

  for (const t of TARGETS) {
    const url = BASE + t.path
    const { status, attempts, statuses } = await gotoWithRetry(page, url)
    let bodyText = ''
    try {
      bodyText = (await page.locator('body').innerText({ timeout: 5000 })) || ''
    } catch {
      /* page may not have rendered */
    }
    const html = (await page.content().catch(() => '')) || ''
    const hay = (bodyText + ' ' + html).toLowerCase()
    const matched = t.mustInclude.find((m) => hay.includes(m.toLowerCase()))
    const shot = `${OUTDIR}/live-${t.name}.png`
    await page.screenshot({ path: shot, fullPage: true }).catch(() => {})

    const ok = status === 200 && !!matched
    if (!ok) failures++
    rows.push({
      route: t.path,
      kind: t.kind,
      final: status,
      attempts,
      seen: statuses.join(','),
      contentOk: matched ? `yes ("${matched}")` : 'NO',
      shot,
      ok,
    })
  }

  await browser.close()

  // Report
  console.log(`\n== Live visual check: ${BASE} ==`)
  for (const r of rows) {
    console.log(
      `${r.ok ? '✅' : '⛔'} ${r.route}  -> ${r.final} (in ${r.attempts} try; saw [${r.seen}])  content:${r.contentOk}  ${r.shot}`
    )
  }
  // Flakiness signal: total non-200 observations across all attempts.
  const allSeen = rows.flatMap((r) => r.seen.split(','))
  const non200 = allSeen.filter((s) => s !== '200').length
  console.log(
    `\nObservations: ${allSeen.length} navigations, ${non200} non-200 (${Math.round((100 * non200) / allSeen.length)}% retried).`
  )
  console.log(
    non200 > 0
      ? 'NOTE: non-200s seen — flakiness is REAL, not assumed. Inspect server logs to attribute.'
      : 'All navigations were clean 200s.'
  )

  if (failures > 0) {
    console.error(`\n${failures} target(s) failed (never reached 200 or content missing).`)
    process.exit(1)
  }
  console.log('\nAll targets rendered with expected content. Screenshots in', OUTDIR)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
