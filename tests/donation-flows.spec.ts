import { test, expect } from '@playwright/test'

/**
 * Donation-flow smoke tests
 *
 * The site has no first-party donation form — every conversion goes
 * through a third-party widget:
 *   - PayPal hosted buttons on /donate/
 *   - Zeffy iframe on /free-for-charity-endowment-fund/
 *
 * If a button is broken or an iframe fails to mount, the donation
 * funnel silently dies and revenue stops. These tests are intentionally
 * shallow — they don't drive a payment, just assert the controls
 * render and point at the right endpoints. Third-party widget internal
 * behaviour is out of scope (Zeffy/PayPal own that surface).
 */

const PAYPAL_HOSTED_BUTTON_IDS = ['9ZKQ23YC3G2J2', '243G37NHXSRY8']
const ZEFFY_EMBED_HOSTS = ['zeffy.com']

test.describe('Donation flows', () => {
  test('/donate exposes at least one PayPal donate link with a hosted button ID', async ({
    page,
  }) => {
    await page.goto('/donate')
    await expect(page).toHaveTitle(/donate/i)

    // PayPal links are <a href="https://www.paypal.com/donate/?hosted_button_id=...">
    // — the components ship them as static markup, so they're present
    // immediately without hydration.
    const paypalLinks = page.locator('a[href*="paypal.com/donate"]')
    await expect(paypalLinks.first()).toBeVisible()
    const hrefs = await paypalLinks.evaluateAll((nodes) =>
      nodes.map((n) => (n as HTMLAnchorElement).href)
    )
    const matched = hrefs.find((href) =>
      PAYPAL_HOSTED_BUTTON_IDS.some((id) => href.includes(`hosted_button_id=${id}`))
    )
    expect(
      matched,
      `no PayPal href matches a known hosted_button_id: ${hrefs.join(', ')}`
    ).toBeTruthy()
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
