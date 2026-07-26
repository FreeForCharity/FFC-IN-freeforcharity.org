import { test, expect, type Page } from '@playwright/test'
import {
  GTM_CONTAINER_ID,
  CLARITY_PROJECT_ID,
  TAWK_TO_PROPERTY,
  GA_DELIVERY,
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
 * for the GOOGLE tags, consent gates STORAGE rather than script loading.
 * GA4 and GTM load on every pageview; the consent state decides whether
 * they may use cookies. Storage defaults to granted worldwide and denied
 * only in the EEA/UK/CH, where Google's EU User Consent Policy requires
 * opt-in — so a visitor who ignores or declines the banner is still
 * measured, via cookieless pings, instead of disappearing entirely.
 *
 * Two tags are NOT loaded on that basis, because Consent Mode is a
 * Google protocol and neither speaks it:
 *   - Microsoft Clarity (session recording) needs EXPLICIT analytics
 *     consent — there is no cookieless mode to degrade to.
 *   - The Meta Pixel stays fully gated on marketing consent.
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

/**
 * GA4 must be delivered by EXACTLY ONE path.
 *
 * Under GA_DELIVERY='gtm' the site must not inject gtag.js itself — GTM's
 * Google tag does it — and under 'direct' it must. Both at once configures
 * the same measurement ID twice and doubles every pageview, which produces
 * no error and looks entirely plausible in GA4, so it needs asserting
 * rather than eyeballing.
 */
async function assertGaDeliveryIsExclusive(page: Page) {
  // Detect the site's OWN inline gtag config, not the presence of
  // gtag.js.
  //
  // Under 'gtm', GTM's Google tag injects gtag.js itself once the
  // container is published — so counting that script would flip this
  // assertion from passing to failing the moment the container went
  // live, while the site was behaving exactly as designed. The failure
  // would look like a regression in the site and would in fact be a
  // regression in the test.
  //
  // `anonymize_ip` appears only in the config snippet this component
  // builds, so it is present in 'direct' and absent in 'gtm' regardless
  // of what GTM does.
  const selfConfigured = await scriptCount(page, 'anonymize_ip')
  if (GA_DELIVERY === 'direct') {
    expect(selfConfigured).toBeGreaterThan(0)
  } else {
    expect(selfConfigured).toBe(0)
  }
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
    // At least the regional denial and the global grant. Not an exact
    // count: adding a further region-scoped override (a jurisdiction
    // beyond the EEA/UK/CH adopting the same rule) would be correct and
    // should not fail this test. What matters is asserted below — that
    // both the regional and global defaults exist and say the right
    // things, and that they precede the first tag command.
    expect(defaults.length).toBeGreaterThanOrEqual(2)

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

    // Ordering is the whole point: a consent default that lands AFTER
    // gtag('js')/gtag('config') is too late — the first hit has already
    // gone out with no consent state. Assert the actual queue order
    // rather than mere presence, so moving the bootstrap below the tag
    // injection fails this test.
    const order = await page.evaluate(() => {
      const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? []
      const commands = dl.map((entry) => {
        const args = Array.from(entry as ArrayLike<unknown>)
        return `${args[0]}:${args[1]}`
      })
      return {
        firstDefault: commands.findIndex((c) => c === 'consent:default'),
        firstTagCommand: commands.findIndex((c) => c.startsWith('js:') || c.startsWith('config:')),
      }
    })

    expect(order.firstDefault).toBeGreaterThanOrEqual(0)
    if (order.firstTagCommand !== -1) {
      expect(order.firstDefault).toBeLessThan(order.firstTagCommand)
    }
  })

  test('analytics tags load for a visitor who never touches the banner', async ({ page }) => {
    await clearConsent(page)
    // Banner is showing and no choice has been made. Under Consent Mode
    // the tags still load — consent gates STORAGE, not loading — so an
    // ignored banner produces measurement instead of silence.
    await expect
      .poll(() => scriptCount(page, GTM_CONTAINER_ID), { timeout: 8000 })
      .toBeGreaterThan(0)
    await assertGaDeliveryIsExclusive(page)

    // Clarity is NOT part of the permissive default. It is a session
    // recorder with no Consent Mode fallback, so it waits for explicit
    // analytics consent — otherwise an undecided EEA visitor would be
    // fully recorded, and the preferences dialog (which shows analytics
    // unchecked) would be lying about it.
    expect(await scriptCount(page, 'clarity.ms')).toBe(0)
    expect(await scriptCount(page, CLARITY_PROJECT_ID)).toBe(0)
  })

  test('Accept All injects the analytics tags with the right IDs', async ({ page }) => {
    await clearConsent(page)
    await page.getByRole('button', { name: 'Accept All' }).click()

    // GTM container loader (inline snippet references the container ID)
    await expect
      .poll(() => scriptCount(page, GTM_CONTAINER_ID), { timeout: 8000 })
      .toBeGreaterThan(0)

    await assertGaDeliveryIsExclusive(page)

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

  test('a stored analytics decline keeps Clarity off on subsequent loads', async ({ page }) => {
    await clearConsent(page)
    await page.getByRole('button', { name: 'Decline All' }).click()

    // Clarity requires explicit analytics consent, so it was never
    // injected on this load either. Reloading proves the stored decline
    // keeps it off on every subsequent visit — not just that it happened
    // to be absent before any choice was made.
    // domcontentloaded, not the default 'load': tags now load on every
    // pageview, so waiting on third-party subresources hangs the reload.
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.waitForFunction(() => Array.isArray((window as { dataLayer?: unknown[] }).dataLayer))
    await expect
      .poll(() => scriptCount(page, GTM_CONTAINER_ID), { timeout: 8000 })
      .toBeGreaterThan(0)

    // GA4 still measures (cookieless, via whichever delivery path is
    // configured); Clarity must not run at all.
    await assertGaDeliveryIsExclusive(page)
    expect(await scriptCount(page, 'clarity.ms')).toBe(0)
    expect(await scriptCount(page, CLARITY_PROJECT_ID)).toBe(0)
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
