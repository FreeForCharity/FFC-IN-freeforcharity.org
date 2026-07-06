import { test, expect } from '@playwright/test'

/**
 * Donation-flow smoke tests
 *
 * The site has no first-party donation form — every conversion goes
 * through Zeffy (PayPal has been retired):
 *   - Zeffy pop-up buttons (zeffy-form-link) + the embed script on /donate/
 *   - Zeffy iframe on /free-for-charity-endowment-fund/
 *
 * If the buttons or embed script drop, the donation funnel silently dies
 * and revenue stops. These tests are intentionally shallow — they don't
 * drive a payment, just assert the controls render and point at the right
 * endpoints. Third-party widget internal behaviour is out of scope
 * (Zeffy owns that surface).
 */

const ZEFFY_EMBED_HOSTS = ['zeffy.com']

test.describe('Donation flows', () => {
  test('/donate exposes Zeffy pop-up buttons + the embed script (no PayPal)', async ({ page }) => {
    await page.goto('/donate')
    await expect(page).toHaveTitle(/donate/i)

    // Each campaign CTA is an element carrying a `zeffy-form-link` pop-up trigger.
    const triggers = page.locator('[zeffy-form-link]')
    await expect(triggers.first()).toBeVisible()
    expect(await triggers.count()).toBeGreaterThan(1)

    // Every trigger's pop-up link AND its no-JS fallback href point at Zeffy.
    const links = await triggers.evaluateAll((nodes) =>
      nodes.map((n) => ({
        formLink: n.getAttribute('zeffy-form-link') || '',
        href: n.getAttribute('href') || '',
      }))
    )
    expect(links.every((l) => l.formLink.includes('zeffy.com'))).toBe(true)
    expect(links.every((l) => l.href.includes('zeffy.com'))).toBe(true)

    // The Zeffy embed script that powers the pop-ups must be present.
    await expect(page.locator('script[src*="zeffy-scripts"]').first()).toBeAttached({
      timeout: 15000,
    })

    // PayPal must be gone everywhere on the page.
    const paypalLinks = page.locator('a[href*="paypal.com"]')
    expect(await paypalLinks.count(), 'PayPal links should be fully removed from /donate').toBe(0)
  })

  test('the footer donate button + Zeffy engine work on a non-/donate page', async ({ page }) => {
    // The footer is global, so its donate button must work everywhere — which
    // requires the embed script to be loaded globally (layout.tsx), not only on
    // /donate. Verify both on the homepage.
    await page.goto('/')

    const footerTrigger = page.locator('footer [zeffy-form-link]').first()
    await expect(footerTrigger).toBeAttached()
    const formLink = await footerTrigger.getAttribute('zeffy-form-link')
    const href = await footerTrigger.getAttribute('href')
    expect(formLink).toContain('zeffy.com')
    expect(href).toContain('zeffy.com')

    // The global embed script powers the footer pop-up site-wide.
    await expect(page.locator('script[src*="zeffy-scripts"]').first()).toBeAttached({
      timeout: 15000,
    })
  })

  test('/free-for-charity-endowment-fund mounts the Zeffy donation iframe on scroll', async ({
    page,
  }) => {
    await page.goto('/free-for-charity-endowment-fund')

    // Zeffy iframes are scroll-primed (LazyZeffyIframe): they mount once
    // the visitor scrolls within ~800px of the section, so Zeffy's ~8MB
    // embed never loads for visitors who don't reach it. Scroll to the
    // section, then assert the iframe mounts with the right src — that
    // catches "never mounts on scroll" and "mounted with wrong src".
    await page
      .getByRole('heading', { name: /Empower Charities with Your Generosity/i })
      .scrollIntoViewIfNeeded()

    // The thermometer sits just below the heading, so it mounts first.
    const thermometer = page.locator('iframe[src*="zeffy.com/embed/thermometer"]')
    await expect(thermometer).toBeAttached({ timeout: 15000 })

    // The donation form is a further ~1500px down — scroll to the bottom
    // and assert it specifically (a passing thermometer must not mask a
    // broken donation form).
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    const donationForm = page.locator('iframe[src*="zeffy.com/embed/donation-form"]')
    await expect(donationForm).toBeAttached({ timeout: 15000 })

    const src = await donationForm.getAttribute('src')
    expect(src).toBeTruthy()
    expect(ZEFFY_EMBED_HOSTS.some((h) => src!.includes(h))).toBe(true)
  })

  test('homepage Zeffy iframe is scroll-primed: absent initially, mounts near #donate', async ({
    page,
  }) => {
    await page.goto('/')

    // Before any scrolling, the ~8MB Zeffy embed must NOT be in the page —
    // that is the entire point of the lazy mount. (The viewport-height
    // window plus the 800px preload margin must not reach the #donate
    // section from the top of the page; if a layout change moves #donate
    // that high, eager loading is effectively back and this fails.)
    // Wait past hydration + the observer's initial callback so a mount
    // that happens shortly after load is actually caught.
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)
    expect(await page.locator('iframe[src*="zeffy.com"]').count()).toBe(0)

    // Scrolling to the donate section mounts the real iframe.
    await page.locator('#donate').scrollIntoViewIfNeeded()
    const zeffyFrame = page.locator('iframe[src*="zeffy.com"]').first()
    await expect(zeffyFrame).toBeAttached({ timeout: 15000 })
  })
})
