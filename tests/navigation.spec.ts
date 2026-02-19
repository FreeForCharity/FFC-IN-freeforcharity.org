import { test, expect } from '@playwright/test'

/**
 * Navigation E2E Tests
 *
 * Verifies that header navigation works correctly:
 * - Main nav links are visible
 * - Clicking nav links navigates to correct pages
 * - Pages load with expected content
 */

test.describe('Header Navigation', () => {
  test('should display main navigation links', async ({ page }) => {
    await page.goto('/')

    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Check main nav items are present (desktop view)
    await expect(header.getByText('Home', { exact: true })).toBeVisible()
    await expect(header.getByText('Help for Charities')).toBeVisible()
    await expect(header.getByText('Volunteer', { exact: true })).toBeVisible()
    await expect(header.getByText('Donate', { exact: true })).toBeVisible()
    await expect(header.getByText('About Us', { exact: true })).toBeVisible()
  })

  test('should navigate to About Us page', async ({ page }) => {
    await page.goto('/about-us')

    await expect(page).toHaveURL(/about-us/)
    await expect(page.locator('body')).toContainText('About Free For Charity')
  })

  test('should navigate to Contact Us page', async ({ page }) => {
    await page.goto('/contact-us')

    await expect(page).toHaveURL(/contact-us/)
    await expect(page.locator('text=Get In Touch')).toBeVisible()
  })

  test('should navigate to Donate page', async ({ page }) => {
    await page.goto('/donate')

    await expect(page).toHaveURL(/donate/)
    await expect(page.locator('body')).toContainText('Be a Part in Donations')
  })

  test('should navigate to Volunteer page', async ({ page }) => {
    await page.goto('/volunteer')

    await expect(page).toHaveURL(/volunteer/)
    await expect(page.locator('body')).toContainText('Volunteer')
  })
})

test.describe('Page Loading', () => {
  const criticalPages = [
    { path: '/', name: 'Home', expectedText: 'Free For Charity' },
    { path: '/about-us', name: 'About Us', expectedText: 'About' },
    { path: '/contact-us', name: 'Contact Us', expectedText: 'Get In Touch' },
    { path: '/donate', name: 'Donate', expectedText: 'Be a Part in Donations' },
    { path: '/volunteer', name: 'Volunteer', expectedText: 'Volunteer' },
    { path: '/domains', name: 'Domains', expectedText: 'Domain' },
    { path: '/privacy-policy', name: 'Privacy Policy', expectedText: 'Privacy Policy' },
    { path: '/terms-of-service', name: 'Terms of Service', expectedText: 'Terms' },
  ]

  for (const { path, name, expectedText } of criticalPages) {
    test(`${name} page should load with expected content`, async ({ page }) => {
      const response = await page.goto(path)

      // Page should return 200
      expect(response?.status()).toBe(200)

      // Page should contain expected text
      await expect(page.locator('body')).toContainText(expectedText)

      // Header and footer should be present
      await expect(page.locator('header')).toBeVisible()
      await expect(page.locator('footer')).toBeVisible()
    })
  }
})

test.describe('Footer', () => {
  test('should contain social media links', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Check social links exist
    await expect(footer.locator('a[href*="facebook.com"]')).toBeVisible()
    await expect(footer.locator('a[href*="linkedin.com"]')).toBeVisible()
    await expect(footer.locator('a[href*="github.com"]')).toBeVisible()
  })

  test('should contain contact information', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')

    // Check for contact phone link
    await expect(footer.locator('a[href="tel:+15202228104"]')).toBeVisible()
  })

  test('should contain policy links', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')

    // Check for policy links in footer
    await expect(footer.locator('a[href*="privacy-policy"]')).toBeVisible()
    await expect(footer.locator('a[href*="terms-of-service"]')).toBeVisible()
  })
})
