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

  test('/free-for-charity-endowment-fund mounts the Zeffy donation iframe', async ({ page }) => {
    await page.goto('/free-for-charity-endowment-fund')

    // The Zeffy form is an <iframe src="https://www.zeffy.com/embed/...">.
    // We wait for the element to be attached, then for its src attribute
    // to reference zeffy.com — that catches both the "iframe element
    // never rendered" and "iframe rendered with wrong src" failure modes.
    const zeffyFrame = page.locator('iframe[src*="zeffy.com"]').first()
    await expect(zeffyFrame).toBeAttached({ timeout: 15000 })

    const src = await zeffyFrame.getAttribute('src')
    expect(src).toBeTruthy()
    expect(ZEFFY_EMBED_HOSTS.some((h) => src!.includes(h))).toBe(true)
  })
})
