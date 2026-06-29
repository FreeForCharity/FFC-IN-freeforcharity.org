import { test, expect } from '@playwright/test'

/**
 * Donation-flow smoke tests
 *
 * The site has no first-party donation form — every conversion goes
 * through Zeffy (PayPal has been retired):
 *   - Zeffy donation-form iframe + campaign cards on /donate/
 *   - Zeffy iframe on /free-for-charity-endowment-fund/
 *
 * If the embed fails to mount or the campaign links drop, the donation
 * funnel silently dies and revenue stops. These tests are intentionally
 * shallow — they don't drive a payment, just assert the controls
 * render and point at the right endpoints. Third-party widget internal
 * behaviour is out of scope (Zeffy owns that surface).
 */

const ZEFFY_EMBED_HOSTS = ['zeffy.com']

test.describe('Donation flows', () => {
  test('/donate embeds a Zeffy donation form and links to Zeffy campaigns (no PayPal)', async ({
    page,
  }) => {
    await page.goto('/donate')
    await expect(page).toHaveTitle(/donate/i)

    // The general fund is an inline <iframe src="https://www.zeffy.com/embed/donation-form/...">.
    const zeffyFrame = page.locator('iframe[src*="zeffy.com/embed/donation-form"]').first()
    await expect(zeffyFrame).toBeAttached({ timeout: 15000 })

    // The campaign directory cards link out to Zeffy hosted pages.
    const zeffyLinks = page.locator('a[href*="zeffy.com"]')
    await expect(zeffyLinks.first()).toBeVisible()

    // PayPal must be gone everywhere on the page.
    const paypalLinks = page.locator('a[href*="paypal.com"]')
    expect(await paypalLinks.count(), 'PayPal links should be fully removed from /donate').toBe(0)
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
