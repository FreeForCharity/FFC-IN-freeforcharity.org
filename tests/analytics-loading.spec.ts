import { test, expect, type Page } from '@playwright/test'
import {
  GA_MEASUREMENT_ID,
  GTM_CONTAINER_ID,
  CLARITY_PROJECT_ID,
  TAWK_TO_PROPERTY,
} from '../src/lib/analytics-config'

/**
 * Analytics + widget loading tests.
 *
 * Drives real consent "traffic" through the cookie banner and asserts
 * the right third-party scripts get injected with the right public IDs.
 * These are committed defaults (see src/lib/analytics-config.ts), so the
 * build under test — local, CI, or production — always has them, which
 * is exactly why this is testable in CI at all.
 *
 * IDs are imported from the same config module the app uses, so a
 * future ID change (or a staging build that overrides them) keeps the
 * test aligned with the build under test rather than asserting a
 * hard-coded value the app no longer uses.
 *
 * Consent model (Consent Mode v2 — see docs/CONVERSION-TRACKING.md):
 * consent gates STORAGE, not script loading. GA4, GTM, and Clarity load
 * on every pageview; the consent state decides whether they may use
 * cookies. Storage defaults to granted worldwide and denied only in the
 * EEA/UK/CH, where Google's EU User Consent Policy requires opt-in — so
 * a visitor who ignores or declines the banner is still measured, via
 * cookieless pings, instead of disappearing entirely.
 *
 * The Meta Pixel is the exception: no Consent Mode equivalent is wired
 * up for it, so it stays fully gated on marketing consent.
 */

// Count <script> elements whose src OR inline text references a marker.
async function scriptCount(page: Page, marker: string): Promise<number> {
  return page.evaluate((m) => {
    const scripts = Array.from(document.querySelectorAll('script'))
    return scripts.filter((s) => (s.src && s.src.includes(m)) || s.textContent?.includes(m)).length
  }, marker)
}

/**
 * Read the Consent Mode calls out of the dataLayer.
 *
 * gtag pushes an `arguments` object, so entries look like
 * `{0:'consent', 1:'default'|'update', 2:{…state}}` — this pulls out the
 * state objects for the requested kind.
 */
async function consentCalls(
  page: Page,
  kind: 'default' | 'update'
): Promise<Record<string, unknown>[]> {
  return page.evaluate((k) => {
    const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? []
    return dl
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((args) => args[0] === 'consent' && args[1] === k)
      .map((args) => args[2] as Record<string, unknown>)
  }, kind)
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

  test('consent defaults are set before any Google tag loads', async ({ page }) => {
    await clearConsent(page)

    const defaults = await consentCalls(page, 'default')
    expect(defaults.length).toBe(2)

    // Region-scoped denial for the EEA/UK/CH, per Google's EU User
    // Consent Policy — the only place opt-in is actually required.
    const regional = defaults.find((c) => Array.isArray(c.region))
    expect(regional).toBeDefined()
    expect(regional!.region).toContain('DE')
    expect(regional!.region).toContain('GB')
    expect(regional!.region).toContain('CH')
    expect(regional!.analytics_storage).toBe('denied')
    expect(regional!.ad_user_data).toBe('denied')
    expect(regional!.wait_for_update).toBe(500)

    // Granted everywhere else — the permissive default.
    const global = defaults.find((c) => !Array.isArray(c.region))
    expect(global).toBeDefined()
    expect(global!.analytics_storage).toBe('granted')
    expect(global!.ad_storage).toBe('granted')
    expect(global!.ad_personalization).toBe('granted')

    // The bootstrap must run before the tag, or the first hit goes out
    // with no consent state at all.
    const bootstrapRanFirst = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'))
      const bootstrap = scripts.findIndex((s) =>
        s.textContent?.includes("gtag('consent', 'default'")
      )
      return bootstrap !== -1
    })
    expect(bootstrapRanFirst).toBe(true)
  })

  test('analytics tags load for a visitor who never touches the banner', async ({ page }) => {
    await clearConsent(page)
    // Banner is showing and no choice has been made. Under Consent Mode
    // the tags still load — consent gates STORAGE, not loading — so an
    // ignored banner produces measurement instead of silence.
    await expect
      .poll(() => scriptCount(page, `gtag/js?id=${GA_MEASUREMENT_ID}`), { timeout: 8000 })
      .toBeGreaterThan(0)
    await expect
      .poll(() => scriptCount(page, GTM_CONTAINER_ID), { timeout: 8000 })
      .toBeGreaterThan(0)
    await expect
      .poll(() => scriptCount(page, CLARITY_PROJECT_ID), { timeout: 8000 })
      .toBeGreaterThan(0)
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

  test('Decline All flips storage to denied rather than removing measurement', async ({ page }) => {
    await clearConsent(page)
    await page.getByRole('button', { name: 'Decline All' }).click()

    // A consent update must be pushed, denying every optional category.
    await expect.poll(() => consentCalls(page, 'update'), { timeout: 8000 }).not.toHaveLength(0)
    const updates = await consentCalls(page, 'update')
    const last = updates[updates.length - 1]
    expect(last.analytics_storage).toBe('denied')
    expect(last.ad_storage).toBe('denied')
    expect(last.ad_user_data).toBe('denied')
    expect(last.ad_personalization).toBe('denied')

    // The Meta Pixel is the one tag with no cookieless fallback, so it
    // must stay off entirely without marketing consent.
    expect(await scriptCount(page, 'fbevents.js')).toBe(0)
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
