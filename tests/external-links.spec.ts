import { test, expect } from '@playwright/test'

/**
 * External Link Target E2E Tests
 *
 * Verifies that all external links open in new tabs with
 * proper security attributes (target="_blank" and rel="noopener noreferrer").
 */

test.describe('External Link Targets', () => {
  test('footer social links should have target="_blank" and rel="noopener noreferrer"', async ({
    page,
  }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const socialLinks = [
      'a[href*="facebook.com"]',
      'a[href*="x.com"]',
      'a[href*="linkedin.com/company"]',
      'a[href*="github.com"]',
    ]

    for (const selector of socialLinks) {
      const link = footer.locator(selector)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', /noopener/)
      await expect(link).toHaveAttribute('rel', /noreferrer/)
    }
  })

  test('footer Candid profile links should open in a new tab', async ({ page }) => {
    await page.goto('/')

    // Both the seal and the "Direct Candid Profile Link" button point at
    // app.candid.org — guidestar.org now only survives as the widget host on
    // the seal's <img src>, which is not a link.
    const footer = page.locator('footer')
    const candidLinks = footer.locator('a[href*="app.candid.org"]')
    await expect(candidLinks).not.toHaveCount(0)

    for (const link of await candidLinks.all()) {
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', /noopener/)
      await expect(link).toHaveAttribute('rel', /noreferrer/)
    }
  })

  test('footer Supported Charity Login link should have target="_blank"', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const loginLink = footer.locator('a[href*="freeforcharity.org/hub"]')
    await expect(loginLink).toHaveAttribute('target', '_blank')
    await expect(loginLink).toHaveAttribute('rel', /noopener/)
  })

  test('Google Maps address links should have target="_blank"', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const mapLinks = footer.locator('a[href*="google.com/maps"]')
    const count = await mapLinks.count()

    expect(count).toBeGreaterThanOrEqual(1)

    for (let i = 0; i < count; i++) {
      await expect(mapLinks.nth(i)).toHaveAttribute('target', '_blank')
      await expect(mapLinks.nth(i)).toHaveAttribute('rel', /noopener/)
    }
  })

  test('homepage external links should have target="_blank"', async ({ page }) => {
    await page.goto('/')

    // Get all external links on the page (not same-origin)
    const externalLinks = page.locator(
      'a[href^="http"]:not([href*="localhost"]):not([href*="freeforcharity.org/FFC-IN"])'
    )
    const count = await externalLinks.count()

    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const href = await externalLinks.nth(i).getAttribute('href')
      // Skip internal freeforcharity.org links that use absolute URLs
      if (href && !href.includes('freeforcharity.org')) {
        await expect(externalLinks.nth(i)).toHaveAttribute('target', '_blank')
      }
    }
  })
})
