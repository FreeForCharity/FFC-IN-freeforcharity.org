---
name: run-ffc-site
description: Build, run, and drive the Free For Charity site (freeforcharity.org). Use when asked to start, build, preview, screenshot, or interact with the FFC website, or verify a page renders. Static Next.js export driven with headless Chromium via .claude/skills/run-ffc-site/driver.mjs.
---

The Free For Charity site is a Next.js 16 App Router project that ships as a
**static export** (`output: export` → `out/`). "Running it" means building the
export, serving `out/` over HTTP, and driving a headless Chromium against it
with `.claude/skills/run-ffc-site/driver.mjs` — which navigates routes,
screenshots each full page, and fails on real errors (bad HTTP status,
uncaught page errors, or same-origin request failures).

All paths below are relative to the repo root.

## Prerequisites

No `apt-get` needed in the Claude Code web container: Node and a Chromium
build are already present. The driver launches the pre-installed browser at
`/opt/pw-browsers/chromium` (override with `CHROME_PATH=...`). **In that
container** you do **not** run `npx playwright install` — the repo's pinned
Playwright may want a different browser build than the container ships, and
pointing at the existing one avoids the mismatch. On a local machine or CI
without a pre-installed browser, run `npx playwright install chromium` once, or
set `CHROME_PATH` to a system Chrome/Chromium.

Built and verified on Node v22.22.2 (README targets Node 24.x; the static
export builds fine on 22).

## Setup

```bash
npm install        # ~40s; runs husky prepare
```

## Build

```bash
npm run build      # static export → out/ (~35 routes, 60+ html files). Do not cancel.
```

## Run (agent path)

Serve the export in the background, wait for the port, then drive it:

```bash
# 1. Serve out/ on :4173 (this is `npm run preview`)
nohup npx serve out -l 4173 >/tmp/serve.log 2>&1 &
echo $! > /tmp/serve.pid
timeout 30 bash -c 'until curl -sf http://localhost:4173 >/dev/null; do sleep 1; done'

# 2. Drive it — screenshots a representative route set
node .claude/skills/run-ffc-site/driver.mjs

# 3. Stop the server when done
kill $(cat /tmp/serve.pid)
```

Expected output — every route green, third-party embeds noted as blocked:

```
✓ / (2 third-party blocked) -> .claude/skills/run-ffc-site/screenshots/home.png
✓ /about-us/ (2 third-party blocked) -> .claude/skills/run-ffc-site/screenshots/about-us.png
✓ /501c3/ (2 third-party blocked) -> .claude/skills/run-ffc-site/screenshots/501c3.png
✓ /privacy-policy/ (2 third-party blocked) -> .claude/skills/run-ffc-site/screenshots/privacy-policy.png
✓ /search/ (2 third-party blocked) -> .claude/skills/run-ffc-site/screenshots/search.png

✓ 5/5 routes clean
```

Screenshots (full-page) land in
`.claude/skills/run-ffc-site/screenshots/<slug>.png`. **Open them** — a green
run only means nothing threw; look at the image to confirm the page rendered.

### driver.mjs usage

| invocation                                             | what it does                                                      |
| ------------------------------------------------------ | ----------------------------------------------------------------- |
| `node .../driver.mjs`                                  | Smoke the default route set (home, about, 501c3, privacy, search) |
| `node .../driver.mjs / /donate/ /volunteer/`           | Screenshot specific routes                                        |
| `EXPECT="Free For Charity" node .../driver.mjs /`      | Also assert the text is present in the HTML                       |
| `BASE_URL=http://localhost:3000 node .../driver.mjs /` | Drive `npm run dev` instead of the export                         |
| `CHROME_PATH=/path/to/chrome node .../driver.mjs`      | Use a different Chromium binary                                   |

Exit code is 0 only when every route is clean, so it works in a script.

### Driving an interaction

The served export hydrates, so client-side features work. Import Playwright's
Chromium directly for anything beyond a screenshot — e.g. the `/search/` page's
live filter:

```bash
node --input-type=module <<'EOF'
import { chromium } from 'playwright'
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox'] })
const p = await (await b.newContext({ viewport:{width:1280,height:800} })).newPage()
await p.goto('http://localhost:4173/search/', { waitUntil:'networkidle' })
await p.locator('input').first().fill('domain')
await p.waitForTimeout(800)
console.log('matches:', await p.locator('a').filter({ hasText:/domain/i }).count())
await p.screenshot({ path:'.claude/skills/run-ffc-site/screenshots/search-domain.png' })
await b.close()
EOF
```

## Run (human path)

```bash
npm run dev        # → http://localhost:3000 with Turbopack HMR. Ctrl-C to stop.
```

On its own this is useless in a headless container, since there is no window to
view. Point the driver at it with `BASE_URL=http://localhost:3000` when
iterating on a component, because it rebuilds on save.

## Test

```bash
npm run lint       # eslint
npm run build      # verify the static export
npm run test       # jest unit/component/a11y (jsdom) — not the browser
npm run test:e2e   # playwright e2e — needs the pinned browser; see gotcha below
```

## Gotchas

- **Two failed third-party requests per page are not bugs.** The Zeffy donation
  embed (`zeffy-scripts.s3.ca-central-1.amazonaws.com`) and the GuideStar seal
  (`widgets.guidestar.org`) are third-party hosts the sandbox proxy blocks with
  `ERR_CONNECTION_RESET`. The driver counts these (as `requestfailed` events off
  the target's origin) and reports them as "N third-party blocked" — it does
  **not** fail on them; it only fails on same-origin problems. The donation
  iframe and seal render blank in screenshots as a result; that's expected here,
  not a regression.
- **`ERR_ABORTED` request failures are prefetches, not bugs.** Next.js `<Link>`
  prefetches the RSC payload and aborts those requests on navigate. The driver
  drops any `requestfailed` whose error text contains `ERR_ABORTED` (regardless
  of host), so they never count against a route.
- **Trailing slashes matter.** The export writes `out/about-us/index.html`, so
  hit `/about-us/`, not `/about-us`. `serve` will 200 either way, but keep the
  slash to match the deployed cPanel paths.
- **The repo's Playwright browser build ≠ the container's.** `npm run test:e2e`
  and any bare `chromium.launch()` try build 1228 and error with "Executable
  doesn't exist … run npx playwright install". Do not install; pass
  `executablePath: '/opt/pw-browsers/chromium'` (the driver already does).

## Troubleshooting

- **`browserType.launch: Executable doesn't exist at …chrome-headless-shell`**:
  Playwright version/browser mismatch. Use the driver (it sets
  `executablePath`) or export `CHROME_PATH=/opt/pw-browsers/chromium`.
- **`EADDRINUSE` on :4173 or :3000**: a previous server is still up. Stop it by
  pidfile (`kill $(cat /tmp/serve.pid)`) or port (`fuser -k 4173/tcp`). Avoid
  `pkill -f 'serve out'` — that substring also matches the shell running it and
  kills your own command.
- **A route is slow to settle**: navigation (`page.goto`, `waitUntil:'load'`) is
  capped at 30s, and the post-load `networkidle` wait is capped at 5s and
  ignored on timeout — so a blocked third-party request delays a route by at
  most ~5s rather than hanging it. A route that exceeds the 30s nav cap fails
  with a timeout; target `BASE_URL` at the built export (`:4173`), which has no
  live data fetches.
