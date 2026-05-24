#!/usr/bin/env node
/*
 * scripts/smoke-test.mjs — post-deploy URL smoke test.
 *
 * Hits every URL in sitemap.xml on a target origin, plus the WP→Next
 * legacy redirects from docs/cutover-redirects.csv, plus a few sanity
 * checks (canonical-form 301s, /hub/ reachability, 404 page).
 *
 * Use this before flipping DNS to production, and again immediately
 * after the document-root swap to catch regressions.
 *
 * Usage:
 *   node scripts/smoke-test.mjs                                   # default: production origin
 *   BASE_URL=https://staging.freeforcharity.org node scripts/smoke-test.mjs
 *
 * Exit code: 0 = all green, 1 = any failure.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')

const BASE_URL = (process.env.BASE_URL || 'https://www.freeforcharity.org').replace(/\/$/, '')
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS || 15000)

const PASS = '\x1b[32m✓\x1b[0m'
const FAIL = '\x1b[31m✗\x1b[0m'

const results = []

function record(name, ok, detail) {
  results.push({ name, ok, detail })
  process.stdout.write(`${ok ? PASS : FAIL} ${name}${detail ? ` — ${detail}` : ''}\n`)
}

async function head(path, { followRedirects = true } = {}) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: followRedirects ? 'follow' : 'manual',
      signal: controller.signal,
      headers: { 'User-Agent': 'ffc-smoke-test/1.0' },
    })
    return { status: res.status, location: res.headers.get('location'), url: res.url }
  } catch (err) {
    return { status: 0, error: err.message }
  } finally {
    clearTimeout(timer)
  }
}

async function checkStatus(name, path, expected) {
  const r = await head(path)
  const ok = r.status === expected
  record(name, ok, `${path} → ${r.status}${r.error ? ` (${r.error})` : ''}`)
}

async function checkRedirect(name, path, expectedStatus, expectedLocationSuffix) {
  const r = await head(path, { followRedirects: false })
  const locOk = r.location && r.location.endsWith(expectedLocationSuffix)
  const ok = r.status === expectedStatus && locOk
  record(name, ok, `${path} → ${r.status} ${r.location || '(no Location)'}`)
}

function loadSitemapPaths() {
  const localSitemap = resolve(repoRoot, 'out/sitemap.xml')
  try {
    const xml = readFileSync(localSitemap, 'utf8')
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    return locs.map((u) => new URL(u).pathname)
  } catch {
    return null
  }
}

function loadCsvRedirects() {
  const csvPath = resolve(repoRoot, 'docs/cutover-redirects.csv')
  const text = readFileSync(csvPath, 'utf8')
  const lines = text.split('\n').slice(1).filter(Boolean)
  return lines.map((line) => {
    const [source, target, code] = line.split(',')
    return {
      sourcePath: new URL(source).pathname + (new URL(source).hash || ''),
      targetPath: new URL(target).pathname + (new URL(target).hash || ''),
      code: Number(code),
    }
  })
}

async function main() {
  console.log(`\nSmoke-testing ${BASE_URL}\n`)

  const sitemapPaths = loadSitemapPaths()
  if (!sitemapPaths) {
    console.error('No out/sitemap.xml found — run `npm run build` first.')
    process.exit(1)
  }

  console.log(`-- ${sitemapPaths.length} sitemap routes (expect 200 after redirect)`)
  for (const path of sitemapPaths) {
    await checkStatus(`sitemap ${path}`, path, 200)
  }

  console.log(`\n-- canonical-form 301s (Apache-only; will fail on \`serve\`)`)
  const slugSamples = sitemapPaths.filter((p) => p !== '/').slice(0, 5)
  for (const path of slugSamples) {
    const noSlash = path.replace(/\/$/, '')
    await checkRedirect(`canonical /slug → /slug/`, noSlash, 301, path)
    await checkRedirect(`legacy *.html → /slug/`, `${noSlash}.html`, 301, path)
  }

  console.log(`\n-- WP→Next legacy redirects from docs/cutover-redirects.csv`)
  const redirects = loadCsvRedirects()
  for (const r of redirects) {
    await checkRedirect(
      `${r.code} ${r.sourcePath}`,
      r.sourcePath,
      r.code,
      r.targetPath.split('#')[0]
    )
  }

  console.log(`\n-- defense-in-depth`)
  await checkStatus(`/hub/ reachable (WHMCS hand-off)`, '/hub/', 200)
  await checkStatus(`unknown URL returns 404`, '/this-page-does-not-exist-xyz/', 404)
  await checkStatus(`favicon`, '/favicon.ico', 200)
  await checkStatus(`sitemap.xml`, '/sitemap.xml', 200)
  await checkStatus(`robots.txt`, '/robots.txt', 200)

  const failed = results.filter((r) => !r.ok)
  console.log(`\n${results.length - failed.length}/${results.length} passed`)
  if (failed.length) {
    console.log(`\nFailures:`)
    for (const f of failed) console.log(`  ${FAIL} ${f.name} — ${f.detail}`)
    process.exit(1)
  }
  process.exit(0)
}

main()
