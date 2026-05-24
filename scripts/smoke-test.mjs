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

async function request(path, { followRedirects = true, readBody = false } = {}) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: followRedirects ? 'follow' : 'manual',
      signal: controller.signal,
      headers: {
        'User-Agent': 'ffc-smoke-test/1.0',
        // Bust the Cloudflare edge cache so a freshly-deployed origin
        // is observed instead of a stale cached version. Without this,
        // a smoke run immediately after deploy can pass against the
        // pre-deploy HTML and report green on a regression.
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    })
    let body
    if (readBody) {
      body = await res.text()
    } else {
      // Eagerly discard the response stream — without this Node's fetch
      // keeps the body buffer around until GC, which adds up across
      // ~50 sitemap+redirect checks per run.
      await res.body?.cancel?.()
    }
    return { status: res.status, location: res.headers.get('location'), url: res.url, body }
  } catch (err) {
    return { status: 0, error: err.message }
  } finally {
    clearTimeout(timer)
  }
}

async function checkStatus(name, path, expected) {
  const r = await request(path)
  const ok = r.status === expected
  record(name, ok, `${path} → ${r.status}${r.error ? ` (${r.error})` : ''}`)
}

async function checkRedirect(name, path, expectedStatus, expectedLocationSuffix) {
  const r = await request(path, { followRedirects: false })
  const locOk = r.location && r.location.endsWith(expectedLocationSuffix)
  const ok = r.status === expectedStatus && locOk
  record(name, ok, `${path} → ${r.status} ${r.location || '(no Location)'}`)
}

async function checkBodyContains(name, path, expectedSubstrings) {
  const r = await request(path, { readBody: true })
  const subs = Array.isArray(expectedSubstrings) ? expectedSubstrings : [expectedSubstrings]
  const matched = r.body ? subs.find((s) => r.body.toLowerCase().includes(s.toLowerCase())) : null
  const ok = r.status >= 200 && r.status < 300 && Boolean(matched)
  record(
    name,
    ok,
    `${path} → ${r.status}${matched ? ` (body matches "${matched}")` : ' (no marker found)'}`
  )
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

  // Canonical-form 301s only make sense in the trailingSlash: true
  // world (PR #186): bare /foo → /foo/, /foo.html → /foo/. Detect by
  // looking at the sitemap form — if it ships trailing slashes, the
  // Apache config is the post-#186 variant and these assertions apply.
  // Skip on a pre-#186 deploy where the export emits /foo.html and the
  // .htaccess strips trailing slashes (the opposite invariant).
  const sitemapHasTrailingSlash = sitemapPaths.some((p) => p !== '/' && p.endsWith('/'))
  if (sitemapHasTrailingSlash) {
    console.log(`\n-- canonical-form 301s (Apache-only; will fail on \`serve\`)`)
    const slugSamples = sitemapPaths.filter((p) => p !== '/').slice(0, 5)
    for (const path of slugSamples) {
      const noSlash = path.replace(/\/$/, '')
      await checkRedirect(`canonical /slug → /slug/`, noSlash, 301, path)
      await checkRedirect(`legacy *.html → /slug/`, `${noSlash}.html`, 301, path)
    }
  } else {
    console.log(`\n-- canonical-form 301s skipped (sitemap is no-slash → pre-trailingSlash export)`)
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
  // WHMCS at /hub/ — assert response includes a WHMCS-specific marker so
  // a stale index.html or directory listing doesn't pass as a healthy hub.
  await checkBodyContains(`/hub/ serves WHMCS (not a placeholder)`, '/hub/', [
    'whmcs',
    'WHMCompleteSolution',
    'cart.php',
    'clientarea',
  ])
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
