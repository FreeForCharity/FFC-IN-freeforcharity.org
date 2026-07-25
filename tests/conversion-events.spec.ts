import { test, expect, type Page } from '@playwright/test'

/**
 * Conversion event tests.
 *
 * The three primary conversions (donate, volunteer, apply) are what the
 * site exists to produce, and all three were silently untracked until
 * #505 — GA4 reported keyEvents: 0 against 3,507 events. These tests
 * exist so that cannot regress unnoticed.
 *
 * Clicks are neutralised with a preventDefault listener registered AFTER
 * the app's own capture listener, so the conversion is still recorded but
 * the browser never navigates or opens a tab. Capture listeners on the
 * same node fire in registration order, and the app's is attached on
 * mount, so ordering is deterministic rather than a race.
 */

interface DataLayerRecord {
  event?: string
  conversion_label?: string
  conversion_id?: string
  conversion_source?: string
  conversion_destination?: string
}

/** Plain (non-gtag) dataLayer pushes, i.e. the ones carrying `event`. */
async function conversionEvents(page: Page): Promise<DataLayerRecord[]> {
  return page.evaluate(() => {
    const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? []
    return dl.filter(
      (entry): entry is DataLayerRecord =>
        typeof entry === 'object' &&
        entry !== null &&
        !('callee' in entry) &&
        typeof (entry as { event?: unknown }).event === 'string'
    )
  })
}

/**
 * Swallow navigation so a CTA click can be asserted on. Registered after
 * the app's listener, so the conversion is recorded first.
 */
async function suppressNavigation(page: Page) {
  await page.evaluate(() => {
    document.addEventListener(
      'click',
      (e) => {
        const anchor = (e.target as Element | null)?.closest('a')
        if (anchor) e.preventDefault()
      },
      true
    )
  })
}

async function ready(page: Page, path: string) {
  await page.goto(path)
  // The delegated listener attaches on mount; wait for hydration to have
  // produced a dataLayer before interacting.
  await page.waitForFunction(() => Array.isArray((window as { dataLayer?: unknown[] }).dataLayer))
  await suppressNavigation(page)
}

test.describe('Primary conversion events', () => {
  test('opening a Zeffy campaign fires donate_open', async ({ page }) => {
    await ready(page, '/donate/')

    const zeffyLink = page.locator('a[href*="zeffy.com"]').first()
    await expect(zeffyLink).toBeAttached()
    await zeffyLink.click({ force: true })

    await expect
      .poll(async () => (await conversionEvents(page)).map((e) => e.event), { timeout: 8000 })
      .toContain('donate_open')

    const donate = (await conversionEvents(page)).find((e) => e.event === 'donate_open')
    expect(donate?.conversion_destination).toContain('zeffy.com')
    expect(donate?.conversion_source).toBe('/donate/')

    // The campaign identifier must survive. ZeffyPopupButton tags every
    // donate CTA explicitly but call sites rarely pass a campaignKey, so
    // an explicit tag that replaced the classifier wholesale would leave
    // conversion_id empty on nearly every donation — making the GA4
    // dimension useless for telling campaigns apart.
    expect(donate?.conversion_id).toBeTruthy()
  })

  test('an apply button fires service_application_start with the WHMCS product id', async ({
    page,
  }) => {
    await ready(page, '/help-for-charities/')

    const applyLink = page.locator('a[href*="/hub/cart.php"]').first()
    await expect(applyLink).toBeAttached()
    await applyLink.click({ force: true })

    await expect
      .poll(async () => (await conversionEvents(page)).map((e) => e.event), { timeout: 8000 })
      .toContain('service_application_start')

    const apply = (await conversionEvents(page)).find(
      (e) => e.event === 'service_application_start'
    )
    // 16 = pre-501(c)(3), 33 = full 501(c)(3) — the two onboarding forms.
    expect(['16', '33']).toContain(apply?.conversion_id)
  })

  test('a volunteer role link fires volunteer_apply', async ({ page }) => {
    await ready(page, '/volunteer-roles/')

    const roleLink = page.locator('a[href*="ffcadmin.org/volunteer/"]').first()
    await expect(roleLink).toBeAttached()
    await roleLink.click({ force: true })

    await expect
      .poll(async () => (await conversionEvents(page)).map((e) => e.event), { timeout: 8000 })
      .toContain('volunteer_apply')
  })

  test('ordinary links do not fire conversions', async ({ page }) => {
    await ready(page, '/about-us/')

    const internal = page.locator('a[href^="/"]').first()
    await expect(internal).toBeAttached()
    await internal.click({ force: true })

    const events = (await conversionEvents(page)).map((e) => e.event)
    expect(events).not.toContain('donate_open')
    expect(events).not.toContain('volunteer_apply')
    expect(events).not.toContain('service_application_start')
  })
})
