// TEMPORARY probe (removed before the PR is opened): loads each candidate
// FFC charity-profile URL signed out in Chromium and records what it shows.
import { chromium } from '@playwright/test'
import fs from 'node:fs'

const urls = JSON.parse(fs.readFileSync(new URL('./urls.json', import.meta.url), 'utf8'))
fs.mkdirSync('probe-out', { recursive: true })
const browser = await chromium.launch()
const ctx = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  viewport: { width: 1280, height: 1600 },
})
const results = []
for (const [i, { id, url }] of urls.entries()) {
  const page = await ctx.newPage()
  const r = { id, url }
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
    r.status = resp ? resp.status() : null
    r.contentType = resp ? resp.headers()['content-type'] : null
    await page.waitForTimeout(7000)
    r.finalUrl = page.url()
    r.title = await page.title()
    const text = await page.evaluate(() => document.body ? document.body.innerText : '')
    r.text = text.replace(/\s+/g, ' ').slice(0, 2500)
    r.mentionsFFC = /free\s*for\s*charity/i.test(text)
    r.mentionsEIN = /46-?2471893/.test(text)
    if (id.startsWith('search-')) {
      r.links = await page.evaluate(() =>
        [...document.querySelectorAll('a[href]')]
          .map((a) => a.href)
          .filter((h) => !/duckduckgo\.com/.test(h))
          .slice(0, 40),
      )
    }
    await page.screenshot({ path: `probe-out/${String(i).padStart(2, '0')}-${id}.png` })
  } catch (e) {
    r.error = String(e).slice(0, 300)
  }
  await page.close()
  results.push(r)
  console.log(`\n### ${id}\n${JSON.stringify(r, null, 1)}`)
}
fs.writeFileSync('probe-out/results.json', JSON.stringify(results, null, 2))
await browser.close()
