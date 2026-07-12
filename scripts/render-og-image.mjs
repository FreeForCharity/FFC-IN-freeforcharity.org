#!/usr/bin/env node
/**
 * Render the journey social card SVG to PNG.
 *
 * Social platforms (Open Graph / Twitter cards) do not accept SVG images, so
 * public/Images/journey-og.svg is committed alongside a 1200x630 PNG render.
 * This script produces that PNG deterministically with the repo's existing
 * Playwright Chromium (same dependency the e2e suite uses):
 *
 *   node scripts/render-og-image.mjs
 *
 * Re-run it whenever journey-og.svg changes, and commit both files. The PNG
 * is all solid colors (no gradients), so it stays far under the 400KB budget
 * enforced by __tests__/assets/image-weight.test.ts.
 */

import { chromium } from '@playwright/test'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const WIDTH = 1200
const HEIGHT = 630

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const svgPath = path.join(repoRoot, 'public', 'Images', 'journey-og.svg')
const pngPath = path.join(repoRoot, 'public', 'Images', 'journey-og.png')

// Inline the SVG in a zero-margin HTML shell: Chromium's standalone SVG
// viewer letterboxes the document (dark strip at the top edge), while an
// inline <svg> in an HTML page renders flush at its intrinsic 1200x630.
const svg = readFileSync(svgPath, 'utf8')
const html = `<!doctype html><style>html,body{margin:0;padding:0}svg{display:block}</style>${svg}`

const browser = await chromium.launch()
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
