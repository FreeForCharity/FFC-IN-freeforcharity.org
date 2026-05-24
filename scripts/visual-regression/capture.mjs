#!/usr/bin/env node
/**
 * Visual regression — WordPress origin vs Next.js staging.
 *
 * Captures full-page screenshots of each non-homepage page on both sides
 * and writes a markdown report with side-by-side image links.
 *
 * The homepage is intentionally excluded — it is a Figma redesign and
 * diffs there are expected, not regressions.
 *
 * Usage:
 *   npm run visual-regression           # uses defaults below
 *   WP_BASE_URL=... STAGING_BASE_URL=... node scripts/visual-regression/capture.mjs
 *
 * Output:
 *   docs/visual-regression/screenshots/{wp,staging}/<slug>.png
 *   docs/visual-regression/REPORT.md
 */

import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..', '..')

const WP_BASE = process.env.WP_BASE_URL || 'https://freeforcharity.org'
const STAGING_BASE =
  process.env.STAGING_BASE_URL || 'https://freeforcharity.github.io/FFC-IN-freeforcharity.org'
const VIEWPORT = { width: 1280, height: 800 }

// (WP slug, Next.js slug). Identical strings mean a verbatim match.
// Homepage is intentionally excluded — see docs/visual-regression/README.md.
const ROUTE_PAIRS = [
  ['/about-us/', '/about-us/'],
  ['/501c3/', '/501c3/'],
  ['/blog/', '/blog/'],
  [
    '/charity-and-nonprofit-service-and-consultant-directory/',
    '/charity-and-nonprofit-service-and-consultant-directory/',
  ],
  ['/charity-and-nonprofit-technology-directory/', '/charity-and-nonprofit-technology-directory/'],
  [
    '/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes/',
    '/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes/',
  ],
  [
    '/charity-and-nonprofit-case-studies-to-help-your-organization-succeed/',
    '/charity-and-nonprofit-case-studies/',
  ],
  ['/consulting/', '/consulting/'],
  ['/contact-us/', '/contact-us/'],
  ['/domains/', '/domains/'],
  ['/donate/', '/donate/'],
  [
    '/ffc-volunteer-proving-ground-core-competencies/',
    '/ffc-volunteer-proving-ground-core-competencies/',
  ],
  ['/ffcadmin/', '/ffcadmin/'],
  ['/free-charity-web-hosting/', '/free-charity-web-hosting/'],
  ['/free-for-charity-donation-policy/', '/free-for-charity-donation-policy/'],
  ['/free-for-charity-endowment-fund/', '/free-for-charity-endowment-fund/'],
  [
    '/free-for-charity-ffc-service-delivery-stages/',
    '/free-for-charity-ffc-service-delivery-stages/',
  ],
  [
    '/free-for-charity-ffc-web-developer-training-guide/',
    '/free-for-charity-ffc-web-developer-training-guide/',
  ],
  ['/free-for-charitys-tools-for-success/', '/free-for-charitys-tools-for-success/'],
  ['/free-training-programs/', '/free-training-programs/'],
  ['/guidestar-guide/', '/guidestar-guide/'],
  ['/help-for-charities/', '/help-for-charities/'],
  ['/online-impacts-onboarding-guide/', '/online-impacts-onboarding-guide/'],
  ['/pre501c3/', '/pre501c3/'],
  ['/privacy-policy/', '/privacy-policy/'],
  ['/security-acknowledgements/', '/security-acknowledgements/'],
  ['/techstack/', '/techstack/'],
  ['/free-for-charity-terms-of-service/', '/terms-of-service/'],
  ['/volunteer/', '/volunteer/'],
  ['/vulnerability-disclosure-policy/', '/vulnerability-disclosure-policy/'],
  ['/workforce-development/', '/workforce-development/'],
]

const slugFor = (wp) => {
  const base = wp.replace(/^\/+|\/+$/g, '').replaceAll('/', '__')
  return base || 'root'
}

async function capturePage(page, url, outPath) {
  try {
    // Use 'load' (not 'networkidle') because pages with live third-party
    // iframes (Zeffy donation forms) keep polling and never reach
    // networkidle within a reasonable timeout.
    const response = await page.goto(url, { waitUntil: 'load', timeout: 45_000 })
    const status = response?.status() ?? 0
    // Let lazy assets and animations settle. Longer than strictly
    // necessary for static pages but safe across the board.
    await page.waitForTimeout(3000)
    await page.screenshot({ path: outPath, fullPage: true })
    return { ok: status >= 200 && status < 400, status }
  } catch (err) {
    return { ok: false, status: 0, error: err.message }
  }
}

async function main() {
  const outDir = resolve(repoRoot, 'docs', 'visual-regression', 'screenshots')
  const wpDir = resolve(outDir, 'wp')
  const stagingDir = resolve(outDir, 'staging')
  await mkdir(wpDir, { recursive: true })
  await mkdir(stagingDir, { recursive: true })

  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport: VIEWPORT })
  const page = await context.newPage()

  const rows = []
  for (const [wpPath, nextPath] of ROUTE_PAIRS) {
    const slug = slugFor(wpPath)
    const wpFile = resolve(wpDir, `${slug}.png`)
    const stagingFile = resolve(stagingDir, `${slug}.png`)

    // WordPress serves with trailing slash; the Next.js static export does
    // not — strip the trailing slash from the staging path (except for `/`).
    const stagingPath = nextPath.length > 1 ? nextPath.replace(/\/$/, '') : nextPath

    console.log(`Capturing ${wpPath}  vs  ${stagingPath}`)
    const wpResult = await capturePage(page, `${WP_BASE}${wpPath}`, wpFile)
    const stagingResult = await capturePage(page, `${STAGING_BASE}${stagingPath}`, stagingFile)

    rows.push({ wpPath, nextPath, slug, wpResult, stagingResult })
  }

  await browser.close()

  // Build markdown report
  const lines = []
  lines.push('# WordPress ↔ Next.js Visual Regression Report')
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('')
  lines.push(`WordPress origin: \`${WP_BASE}\``)
  lines.push(`Staging: \`${STAGING_BASE}\``)
  lines.push('')
  lines.push(
    '> Homepage is intentionally excluded. The new homepage is a Figma redesign and is not expected to match WordPress.'
  )
  lines.push('')
  lines.push('## Captures')
  lines.push('')
  lines.push('| Page | WordPress | Next.js staging | WP status | Staging status |')
  lines.push('|------|-----------|-----------------|-----------|----------------|')
  for (const r of rows) {
    const wpRel = `screenshots/wp/${r.slug}.png`
    const stagingRel = `screenshots/staging/${r.slug}.png`
    const label =
      r.wpPath === r.nextPath ? `\`${r.wpPath}\`` : `\`${r.wpPath}\` → \`${r.nextPath}\``
    lines.push(
      `| ${label} | [WP](${wpRel}) | [Next](${stagingRel}) | ${r.wpResult.status || 'ERR'} | ${r.stagingResult.status || 'ERR'} |`
    )
  }
  lines.push('')
  lines.push('## How to review')
  lines.push('')
  lines.push(
    '1. Open `docs/visual-regression/screenshots/wp/<slug>.png` and `docs/visual-regression/screenshots/staging/<slug>.png` side by side in your image viewer.'
  )
  lines.push(
    '2. Focus on **content parity**: headings, paragraphs, key images, call-to-action buttons. Styling differences are expected (Tailwind v4 vs Divi); content gaps are not.'
  )
  lines.push(
    '3. Flag any page where the Next.js staging is missing content that exists in WordPress.'
  )
  lines.push('')
  lines.push('## Re-running')
  lines.push('')
  lines.push('```sh')
  lines.push('npm run visual-regression')
  lines.push('# or with overrides:')
  lines.push(
    'WP_BASE_URL=https://freeforcharity.org STAGING_BASE_URL=https://freeforcharity.github.io/FFC-IN-freeforcharity.org node scripts/visual-regression/capture.mjs'
  )
  lines.push('```')

  const reportPath = resolve(repoRoot, 'docs', 'visual-regression', 'REPORT.md')
  await writeFile(reportPath, lines.join('\n'))
  console.log(`\nReport written to ${reportPath}`)

  const failures = rows.filter((r) => !r.wpResult.ok || !r.stagingResult.ok)
  if (failures.length > 0) {
    console.log(`\n⚠ ${failures.length} page(s) failed to capture cleanly:`)
    for (const f of failures) {
      console.log(
        `  - ${f.wpPath} (wp:${f.wpResult.status || 'ERR'}, staging:${f.stagingResult.status || 'ERR'})`
      )
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
