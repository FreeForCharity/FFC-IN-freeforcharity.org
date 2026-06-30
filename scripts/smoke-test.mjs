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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function request(
  path,
  { followRedirects = true, readBody = false, retries = 2, cookie } = {}
) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`
  // Retry transient failures — a network blip (DNS/TLS/timeout) or an
  // upstream 5xx (Cloudflare/origin) on any one of ~90 checks would otherwise
  // red the whole run. Real regressions (4xx, wrong redirect, missing marker)
  // are NOT retried, so this only suppresses flakes, never masks a failure.
  for (let attempt = 0; ; attempt++) {
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
          // Thread a session cookie when the caller maintains one (the WHMCS
          // /hub order funnel needs the cart session to persist across hops).
          ...(cookie ? { Cookie: cookie } : {}),
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
      clearTimeout(timer)
      if (res.status >= 500 && attempt < retries) {
        await sleep(500 * (attempt + 1))
        continue
      }
      return {
        status: res.status,
        location: res.headers.get('location'),
        headers: res.headers,
        url: res.url,
        body,
      }
    } catch (err) {
      clearTimeout(timer)
      if (attempt < retries) {
        await sleep(500 * (attempt + 1))
        continue
      }
      return { status: 0, error: err.message }
    }
  }
}

async function checkStatus(name, path, expected) {
  const r = await request(path)
  const ok = r.status === expected
  record(name, ok, `${path} → ${r.status}${r.error ? ` (${r.error})` : ''}`)
}

async function checkRedirect(name, path, expectedStatus, expectedLocationSuffix) {
  const r = await request(path, { followRedirects: false })
  // Surface the underlying fetch failure (timeout / DNS / TLS) so a flaky
  // network blip is distinguishable from a real redirect regression —
  // critical now that revenue flows (donation-confirmation) assert redirects.
  if (r.error) {
    record(name, false, `${path} → ${r.status} (${r.error})`)
    return
  }
  const locOk = r.location && r.location.endsWith(expectedLocationSuffix)
  const ok = r.status === expectedStatus && locOk
  record(name, ok, `${path} → ${r.status} ${r.location || '(no Location)'}`)
}

async function checkBodyContains(name, path, expectedSubstrings) {
  const r = await request(path, { readBody: true })
  const subs = Array.isArray(expectedSubstrings) ? expectedSubstrings : [expectedSubstrings]
  const matched = r.body ? subs.find((s) => r.body.toLowerCase().includes(s.toLowerCase())) : null
  const ok = r.status >= 200 && r.status < 300 && Boolean(matched)
  // Surface the underlying fetch failure (timeout / DNS / TLS) when the
  // request didn't reach a response, instead of the misleading
  // "no marker found" message.
  const detail = r.error
    ? `${path} → ${r.status} (${r.error})`
    : `${path} → ${r.status}${matched ? ` (body matches "${matched}")` : ' (no marker found)'}`
  record(name, ok, detail)
}

// ---------------------------------------------------------------------------
// WHMCS /hub helpers (read-only billing-funnel verification)
//
// /hub sits behind Cloudflare bot-protection that intermittently challenges CI
// runner IPs (the cause of the 06:05 deploy 415). A challenge must NOT red the
// run — it's an infra artifact of the runner, not a broken site — so the hub
// checks below treat a bot-challenge as a non-failing skip (the deploy guard
// uses the same asymmetric logic). A real 2xx-but-broken response still fails.
// Nothing here POSTs: the funnel stops at the rendered checkout/login form, and
// cart.php?a=add via GET only creates an ephemeral anonymous session cart (no
// order, no account, no payment).
const CF_CHALLENGE_MARKERS = [
  'just a moment',
  'attention required',
  'checking your browser',
  'cf-chl',
  'cdn-cgi/challenge',
  'challenge-platform',
  'enable javascript and cookies',
]

// True only with POSITIVE evidence of a Cloudflare interstitial — a challenge
// body marker or a `cf-mitigated: challenge` header. We deliberately do NOT
// treat a bare 403/415/429/503 as a challenge: a real origin 503 or a
// misconfigured 403 on /hub must FAIL, not be masked as a skippable challenge.
// A genuine Cloudflare challenge always ships the interstitial body (or header),
// so this still catches the runner-IP challenges it's meant to tolerate.
function isBotChallenge(res) {
  if (!res) return false
  const cfMitigated = (res.headers && res.headers.get && res.headers.get('cf-mitigated')) || ''
  if (/challenge/i.test(cfMitigated)) return true
  const b = (res.body || '').toLowerCase()
  return CF_CHALLENGE_MARKERS.some((m) => b.includes(m))
}

// Accumulate Set-Cookie name=value pairs into a jar (fetch has no cookie store).
function mergeSetCookie(jar, res) {
  const raw =
    res.headers && typeof res.headers.getSetCookie === 'function' ? res.headers.getSetCookie() : []
  for (const line of raw) {
    const first = line.split(';')[0]
    const eq = first.indexOf('=')
    if (eq > 0) jar[first.slice(0, eq).trim()] = first.slice(eq + 1).trim()
  }
  return jar
}

function jarToHeader(jar) {
  return Object.entries(jar)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ')
}

// Bot-tolerant body-marker check for /hub endpoints. PASS on 2xx + a marker;
// SKIP (non-failing) on a Cloudflare challenge; FAIL on a real broken response.
async function checkHubBody(name, path, markers) {
  const r = await request(path, { readBody: true })
  if (r.error) {
    record(name, false, `${path} → ${r.status} (${r.error})`)
    return
  }
  if (isBotChallenge(r)) {
    record(name, true, `${path} → skipped (Cloudflare challenge of CI runner, HTTP ${r.status})`)
    return
  }
  const matched = r.body
    ? markers.find((s) => r.body.toLowerCase().includes(s.toLowerCase()))
    : null
  const ok = r.status >= 200 && r.status < 300 && Boolean(matched)
  record(
    name,
    ok,
    `${path} → ${r.status}${matched ? ` (matches "${matched}")` : ' (no marker found)'}`
  )
}

// Read-only walk of the charity-onboarding order funnel: product → add-to-cart
// → checkout/account form. Proves the *processing* side of the primary Apply
// CTA renders, not just that the pages 200. Never submits.
async function checkHubOrderFunnel() {
  const label = (s) => `/hub order funnel — ${s}`
  const jar = {}

  // 1) Product page: establish the session and find the add-to-cart link.
  const prod = await request('/hub/store/ffc-consulting/nonprofit-charity-onboarding', {
    readBody: true,
  })
  if (isBotChallenge(prod)) {
    record(label('product page'), true, `skipped (Cloudflare challenge, HTTP ${prod.status})`)
    return
  }
  mergeSetCookie(jar, prod)
  // Prefer the product's own "Order Now" link (cart.php?a=add&pid=N) over any
  // generic add link on the page (e.g. the storefront's domain-search box,
  // cart.php?a=add&domain=register), so the funnel exercises the onboarding
  // product. The `&` is usually HTML-escaped to `&amp;` in markup, so accept
  // both. Fall back to any add link if the product uses a non-pid format.
  const addMatch =
    (prod.body && prod.body.match(/cart\.php\?a=add(?:&|&amp;)pid=\d+[^"'\s)]*/i)) ||
    (prod.body && prod.body.match(/cart\.php\?a=add[^"'\s)]*/i))
  const prodOk =
    prod.status >= 200 &&
    prod.status < 300 &&
    Boolean(prod.body && /whmcs|cart\.php|order|onboarding/i.test(prod.body))
  record(
    label('onboarding product renders + order CTA'),
    Boolean(prodOk && addMatch),
    `→ ${prod.status}${addMatch ? ` (add: ${addMatch[0].slice(0, 60)})` : ' (no add-to-cart link found)'}`
  )
  if (!addMatch) return

  // 2) Add to cart (GET only → ephemeral anonymous session cart, no order).
  //    Follow the redirect manually so the session cookie carries (fetch's
  //    redirect:'follow' has no cookie jar).
  let addPath = addMatch[0].replace(/&amp;/g, '&')
  if (!addPath.startsWith('/')) addPath = `/hub/${addPath}`
  const add = await request(addPath, {
    readBody: true,
    followRedirects: false,
    cookie: jarToHeader(jar),
  })
  if (isBotChallenge(add)) {
    record(label('add to cart'), true, `skipped (Cloudflare challenge, HTTP ${add.status})`)
    return
  }
  mergeSetCookie(jar, add)
  let cart = add
  if (add.status >= 300 && add.status < 400 && add.location) {
    let loc = add.location
    try {
      const u = new URL(loc, `${BASE_URL}/hub/`)
      loc = u.pathname + (u.search || '')
    } catch {
      /* use Location as-is */
    }
    cart = await request(loc, { readBody: true, cookie: jarToHeader(jar) })
    if (isBotChallenge(cart)) {
      record(label('cart'), true, `skipped (Cloudflare challenge, HTTP ${cart.status})`)
      return
    }
    mergeSetCookie(jar, cart)
  }
  const cartOk =
    cart.status >= 200 &&
    cart.status < 300 &&
    Boolean(
      cart.body && /checkout|order summary|view cart|shopping cart|cart\.php/i.test(cart.body)
    )
  record(label('add-to-cart reaches the cart'), cartOk, `→ ${cart.status}`)

  // 3) Checkout page: the account / login form must render. GET only — we never
  //    submit, so no order or account is created.
  const checkout = await request('/hub/cart.php?a=checkout', {
    readBody: true,
    cookie: jarToHeader(jar),
  })
  if (isBotChallenge(checkout)) {
    record(label('checkout'), true, `skipped (Cloudflare challenge, HTTP ${checkout.status})`)
    return
  }
  const coOk =
    checkout.status >= 200 &&
    checkout.status < 300 &&
    Boolean(
      checkout.body &&
      /type="password"|already registered|checkout|clientarea|account|order summary/i.test(
        checkout.body
      )
    )
  record(label('checkout/account form renders'), coOk, `→ ${checkout.status}`)
}

// Verify the hashed Next.js JS bundle is actually on the server. A partial
// or interrupted upload can leave the HTML at 200 while the /_next/static
// chunks 404 — a status-only homepage check would miss that (the page would
// be blank/non-interactive for real users).
async function checkNextAssetLoads() {
  const home = await request('/', { readBody: true })
  if (home.error) {
    record(`Next.js JS bundle loads`, false, `/ → ${home.status} (${home.error})`)
    return
  }
  const match = home.body && home.body.match(/\/_next\/static\/[^"')\s]+\.js/)
  if (!match) {
    record(`Next.js JS bundle loads`, false, '/ → no /_next/static/*.js reference found')
    return
  }
  const r = await request(match[0])
  const detail = r.error ? `${match[0]} → ${r.status} (${r.error})` : `${match[0]} → ${r.status}`
  record(`Next.js JS bundle loads`, r.status === 200, detail)
  // Content-hashed chunks must be cached long and immutable, or every visit
  // re-downloads the bundle (perf regression / wrong cache config).
  if (r.status === 200) {
    const cc = r.headers && r.headers.get('cache-control')
    record(
      `static assets immutably cached`,
      Boolean(cc && /immutable/i.test(cc)),
      `${match[0]} cache-control: ${cc || '(absent)'}`
    )
  }
}

// Assert a single response header matches (substring or RegExp). Catches
// .htaccess / Cloudflare drift that a status-code check can't see.
async function checkHeader(name, path, header, matcher) {
  const r = await request(path)
  if (r.error) {
    record(name, false, `${path} → ${r.status} (${r.error})`)
    return
  }
  const val = r.headers && r.headers.get(header)
  const ok = val
    ? matcher instanceof RegExp
      ? matcher.test(val)
      : val.toLowerCase().includes(String(matcher).toLowerCase())
    : false
  record(name, Boolean(ok), `${path} ${header}: ${val || '(absent)'}`)
}

// The security headers the .htaccess is expected to set. A missing/weakened
// header is a real security regression even though the page still 200s.
async function checkSecurityHeaders(name, path) {
  const required = {
    'x-content-type-options': /nosniff/i,
    'x-frame-options': /sameorigin|deny/i,
    'referrer-policy': /.+/,
    'strict-transport-security': /max-age=\d+/i,
  }
  const r = await request(path)
  if (r.error) {
    record(name, false, `${path} → ${r.status} (${r.error})`)
    return
  }
  const missing = []
  for (const [h, re] of Object.entries(required)) {
    const val = r.headers && r.headers.get(h)
    if (!val || !re.test(val)) missing.push(val ? `${h}=${val}` : `${h} (absent)`)
  }
  record(
    name,
    missing.length === 0,
    missing.length ? `${path} → ${missing.join('; ')}` : `${path} → all present`
  )
}

// http:// must 301/308 to https:// — never serve the site in the clear.
async function checkHttpsRedirect(name) {
  const httpUrl = `${BASE_URL.replace(/^https:/, 'http:')}/`
  const r = await request(httpUrl, { followRedirects: false })
  const ok = [301, 302, 307, 308].includes(r.status) && /^https:\/\//.test(r.location || '')
  record(name, ok, `${httpUrl} → ${r.status} ${r.location || '(no Location)'}`)
}

// A 404 must render the custom Next.js not-found page, not just return the
// status — a server/host default 404 (or a blank body) would still be 404.
async function check404Renders(name) {
  const r = await request('/this-page-does-not-exist-xyz/', { readBody: true })
  if (r.error) {
    record(name, false, `/…nonexistent → ${r.status} (${r.error})`)
    return
  }
  // Marker is the unique <h1> from src/app/not-found.tsx ("We couldn't find
  // that page"). The served apostrophe is U+2019 (&rsquo;), so `.` spans it.
  // A generic host/CDN 404 (just "404" / "page not found") won't match this,
  // avoiding the false positives the broad old marker produced.
  const hasMarker = r.body ? /we couldn.t find that page/i.test(r.body) : false
  record(
    name,
    r.status === 404 && hasMarker,
    `/…nonexistent → ${r.status}${hasMarker ? ' (custom 404 body)' : ' (no custom-404 marker)'}`
  )
}

function parseSitemap(xml) {
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  return locs.map((u) => new URL(u).pathname)
}

async function loadSitemapPaths() {
  // Prefer the freshly-built local sitemap when present (deploy workflow
  // builds before running the smoke check, so this is the post-deploy path).
  const localSitemap = resolve(repoRoot, 'out/sitemap.xml')
  try {
    return parseSitemap(readFileSync(localSitemap, 'utf8'))
  } catch {
    /* fall through to fetch from origin */
  }
  // Scheduled / standalone runs without a local build: fetch the sitemap
  // from the target origin instead. Lets daily monitoring jobs run without
  // `npm ci && npm run build` in front of every invocation.
  try {
    const r = await request('/sitemap.xml', { readBody: true })
    if (r.status === 200 && r.body) return parseSitemap(r.body)
  } catch {
    /* swallow; null tells main() to bail */
  }
  return null
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

  const sitemapPaths = await loadSitemapPaths()
  if (!sitemapPaths) {
    console.error(
      'No sitemap available — neither out/sitemap.xml (build) nor /sitemap.xml on the target origin worked.'
    )
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
    // Match the full target including any #fragment. Apache emits the
    // fragment in the Location header (e.g. /testimonial/* → /#testimonials),
    // so stripping it here would falsely reject correct redirects.
    await checkRedirect(`${r.code} ${r.sourcePath}`, r.sourcePath, r.code, r.targetPath)
  }

  console.log(`\n-- defense-in-depth`)
  // Homepage must render real content, not a blank or stale shell. A bare
  // 200 can mask an empty/partial index.html (e.g. a truncated upload), so
  // assert a known marker from the rendered page.
  await checkBodyContains(`/ renders homepage content`, '/', ['free for charity'])
  await check404Renders(`custom 404 page renders`)
  await checkStatus(`favicon`, '/favicon.ico', 200)
  await checkStatus(`sitemap.xml`, '/sitemap.xml', 200)
  await checkStatus(`robots.txt`, '/robots.txt', 200)

  console.log(`\n-- security, headers & transport`)
  // Security headers the .htaccess sets — a missing one is a real regression.
  await checkSecurityHeaders(`homepage sets security headers`, '/')
  // The site must never be served over plaintext HTTP.
  await checkHttpsRedirect(`http:// redirects to https://`)
  // Content types: a wrong type (e.g. the 415 class of bug) breaks consumers.
  await checkHeader(`sitemap.xml served as XML`, '/sitemap.xml', 'content-type', /xml/i)
  await checkHeader(`robots.txt served as text`, '/robots.txt', 'content-type', /text\/plain/i)

  console.log(`\n-- special components`)
  // The two donation/revenue surfaces — a 200 isn't enough; assert the
  // actual payment integrations are present in the rendered HTML so a
  // dropped Zeffy embed is caught. /donate uses Zeffy pop-up triggers
  // (zeffy-form-link → .../embed/<type>/...), not an inline iframe.
  await checkBodyContains(`/donate exposes Zeffy pop-up triggers`, '/donate/', [
    'zeffy-form-link',
    'zeffy.com/embed/',
  ])
  await checkBodyContains(
    `/free-for-charity-endowment-fund mounts the Zeffy form`,
    '/free-for-charity-endowment-fund/',
    ['zeffy']
  )
  // PayPal return flow: the donation-confirmation callback must 302 to
  // /donate AND preserve the transaction query (tx=...), or the post-donation
  // confirmation params are lost. (The CSV loop above only covers the
  // no-query case; this asserts the param actually survives.)
  await checkRedirect(
    `/donation-confirmation preserves the PayPal tx param`,
    '/donation-confirmation/?tx=SMOKE123',
    302,
    '/donate/?tx=SMOKE123'
  )
  // Mandatory FFC-wide homepage sections (Team + testimonials) — their
  // absence means a broken/partial render, not just a styling diff.
  await checkBodyContains(`homepage renders the Team section`, '/', ['the free for charity team'])
  await checkBodyContains(`homepage renders testimonials`, '/', ['testimonial'])
  // Contact page (no form, by policy) must still expose the contact methods.
  await checkBodyContains(`/contact-us exposes a mailto link`, '/contact-us/', ['mailto:'])
  // robots.txt must advertise the sitemap (proves it's the FFC robots.txt,
  // not a host default, and keeps SEO crawling intact).
  await checkBodyContains(`robots.txt references the sitemap`, '/robots.txt', ['sitemap:'])
  // Header/footer logo asset must be on the server.
  await checkStatus(`logo asset loads`, '/Images/ffc-logo-banner.webp', 200)
  // The built JS bundle must actually have uploaded (catches partial deploys).
  await checkNextAssetLoads()

  console.log(`\n-- WHMCS billing portal (/hub — third-party PHP app via symlink)`)
  // Every /hub endpoint must serve real WHMCS, not a Next.js 404 or a
  // placeholder — proves the public_html/hub symlink and the WHMCS app survived
  // the deploy. These are live customer flows: store, cart, login, ticket,
  // announcements, and the admin console. All bot-challenge-tolerant (see
  // checkHubBody) so a Cloudflare challenge of the runner skips rather than reds.
  const WHMCS_MARKERS = ['whmcs', 'WHMCompleteSolution', 'cart.php', 'clientarea']
  await checkHubBody(`/hub/ storefront`, '/hub/', WHMCS_MARKERS)
  await checkHubBody(`/hub/cart.php (order/cart)`, '/hub/cart.php', WHMCS_MARKERS)
  await checkHubBody(`/hub/announcements.php`, '/hub/announcements.php', WHMCS_MARKERS)
  await checkHubBody(
    `/hub/store product page`,
    '/hub/store/ffc-consulting/nonprofit-charity-onboarding',
    WHMCS_MARKERS
  )
  await checkHubBody(`/hub/globaladmin (admin login)`, '/hub/globaladmin', WHMCS_MARKERS)
  // Form-level checks: the client login and ticket forms must actually render
  // their inputs, not just be a WHMCS-branded page.
  await checkHubBody(`/hub/clientarea.php renders the login form`, '/hub/clientarea.php', [
    'type="password"',
    'name="username"',
    'name="password"',
  ])
  await checkHubBody(`/hub/submitticket.php renders the ticket form`, '/hub/submitticket.php', [
    'name="subject"',
    'department',
    'open ticket',
    'submitticket',
  ])
  // Read-only walk of the charity-onboarding order → checkout funnel (no POST).
  await checkHubOrderFunnel()

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
