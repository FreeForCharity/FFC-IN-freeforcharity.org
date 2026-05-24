import { test, expect, type Page } from '@playwright/test'

/**
 * Analytics + widget loading tests.
 *
 * Drives real consent "traffic" through the cookie banner and asserts
 * the right third-party scripts get injected with the right public IDs.
 * These are committed defaults (see src/lib/analytics-config.ts), so the
 * build under test — local, CI, or production — always has them, which
 * is exactly why this is testable in CI at all.
 *
 * Consent model (from cookie-consent/index.tsx):
 *   - necessary + functional: always on  → Tawk.to (functional) loads
 *     once the banner is dismissed by any choice
 *   - analytics (opt-in)                 → GA4 + GTM + Clarity
 *   - marketing (opt-in)                 → Meta Pixel (no ID yet, no-op)
 */

const GA_MEASUREMENT_ID = 'G-541Y8JRDLX'
const GTM_CONTAINER_ID = 'GTM-NJ4DXH9'
const CLARITY_PROJECT_ID = 'nzldyj4h3k'
const TAWK_TO_PROPERTY = '65bf15eb0ff6374032c915d9'

// Count <script> elements whose src OR inline text references a marker.
async function scriptCount(page: Page, marker: string): Promise<number> {
  return page.evaluate((m) => {
    const scripts = Array.from(document.querySelectorAll('script'))
    return scripts.filter((s) => (s.src && s.src.includes(m)) || s.textContent?.includes(m)).length
  }, marker)
}

async function clearConsent(page: Page) {
  await page.goto('/')
  await page.evaluate(() => {
    localStorage.clear()
    document.cookie = 'cookie-consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  })
  await page.reload()
}

test.describe('Analytics + widget loading', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies()
  })

  test('no analytics scripts load before the visitor consents', async ({ page }) => {
    await clearConsent(page)
    // Banner is showing; no choice made yet. Analytics must NOT be present.
    expect(await scriptCount(page, 'googletagmanager.com/gtag')).toBe(0)
    expect(await scriptCount(page, 'googletagmanager.com/gtm.js')).toBe(0)
    expect(await scriptCount(page, 'clarity.ms')).toBe(0)
  })

  test('Accept All injects GA4, GTM, and Clarity with the right IDs', async ({ page }) => {
    await clearConsent(page)
    await page.getByRole('button', { name: 'Accept All' }).click()

    // GA4 direct gtag loader
    await expect
      .poll(() => scriptCount(page, `gtag/js?id=${GA_MEASUREMENT_ID}`), { timeout: 8000 })
      .toBeGreaterThan(0)

    // GTM container loader (inline snippet references the container ID)
    await expect
      .poll(() => scriptCount(page, GTM_CONTAINER_ID), { timeout: 8000 })
      .toBeGreaterThan(0)

    // Microsoft Clarity (inline snippet references the project ID)
    await expect
      .poll(() => scriptCount(page, CLARITY_PROJECT_ID), { timeout: 8000 })
      .toBeGreaterThan(0)
  })

  test('Decline All keeps analytics scripts out', async ({ page }) => {
    await clearConsent(page)
    await page.getByRole('button', { name: 'Decline All' }).click()
    // Give the page a moment; nothing analytics should appear.
    await page.waitForTimeout(1500)
    expect(await scriptCount(page, `gtag/js?id=${GA_MEASUREMENT_ID}`)).toBe(0)
    expect(await scriptCount(page, 'googletagmanager.com/gtm.js')).toBe(0)
    expect(await scriptCount(page, 'clarity.ms')).toBe(0)
  })

  test('Tawk.to live chat loads on functional consent (any dismissal)', async ({ page }) => {
    await clearConsent(page)
    // Decline All still grants necessary + functional — Tawk is functional.
    await page.getByRole('button', { name: 'Decline All' }).click()
    await expect
      .poll(() => scriptCount(page, `embed.tawk.to/${TAWK_TO_PROPERTY}`), { timeout: 8000 })
      .toBeGreaterThan(0)
  })
})
