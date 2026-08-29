#!/usr/bin/env node
/**
 * Render a social card SVG to PNG.
 *
 * Social platforms (Open Graph / Twitter cards) do not accept SVG images, so
 * each 1200x630 card SVG under public/Images/ is committed alongside a PNG
 * render. This script produces that PNG deterministically with the repo's
 * existing Playwright Chromium (same dependency the e2e suite uses):
 *
 *   node scripts/render-og-image.mjs [name]   # default: journey-og
 *   node scripts/render-og-image.mjs website-templates-og
 *
 * Re-run it whenever the SVG changes, and commit both files. Keep cards to
 * solid colors (no gradients) so they stay far under the 400KB budget
 * enforced by __tests__/assets/image-weight.test.ts.
 */

import { chromium } from '@playwright/test'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const WIDTH = 1200
const HEIGHT = 630

const name = process.argv[2] || 'journey-og'
const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const svgPath = path.join(repoRoot, 'public', 'Images', `${name}.svg`)
const pngPath = path.join(repoRoot, 'public', 'Images', `${name}.png`)

// Inline the SVG in a zero-margin HTML shell: Chromium's standalone SVG
// viewer letterboxes the document (dark strip at the top edge), while an
// inline <svg> in an HTML page renders flush at its intrinsic 1200x630.
const svg = readFileSync(svgPath, 'utf8')
const html = `<!doctype html><style>html,body{margin:0;padding:0}svg{display:block}</style>${svg}`

// CHROME_PATH lets environments with a system Chromium (e.g. the Claude Code
// web container at /opt/pw-browsers/chromium) render without downloading the
// pinned Playwright browser build.
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}
)
try {
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  })
  await page.setContent(html)
  await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } })
} finally {
  await browser.close()
}

console.log(`Rendered ${path.relative(repoRoot, pngPath)} (${WIDTH}x${HEIGHT})`)
