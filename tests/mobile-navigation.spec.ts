import { test, expect } from '@playwright/test'

/**
 * Mobile Navigation E2E Tests
 *
 * Verifies that the mobile hamburger menu works correctly:
 * - Hamburger button visible on mobile, hidden on desktop
 * - Menu opens and closes properly
 * - All menu items and dropdown sub-items are accessible
 * - Navigation works from mobile menu
 */

test.use({ viewport: { width: 375, height: 667 } })

test.describe('Mobile Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should hide desktop nav links on mobile viewport', async ({ page }) => {
    const desktopNav = page.locator('nav.hidden.lg\\:block')
    await expect(desktopNav).toBeHidden()
  })

  test('should show hamburger menu button on mobile', async ({ page }) => {
    const hamburger = page.locator('button[aria-label="Open menu"]')
    await expect(hamburger).toBeVisible()
  })

  test('hamburger button should have correct aria attributes', async ({ page }) => {
    const hamburger = page.locator('header button[aria-expanded]')
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    await expect(hamburger).toHaveAttribute('aria-label', 'Open menu')
  })

  test('should open mobile menu when clicking hamburger', async ({ page }) => {
    const hamburger = page.locator('button[aria-label="Open menu"]')
    await hamburger.click()

    // Menu should be visible
    const mobileMenu = page.locator('header .lg\\:hidden.absolute')
    await expect(mobileMenu).toBeVisible()

    // Hamburger should now show close label
    const closeButton = page.locator('button[aria-label="Close menu"]')
    await expect(closeButton).toBeVisible()
    await expect(closeButton).toHaveAttribute('aria-expanded', 'true')
  })

  test('should close mobile menu when clicking X button', async ({ page }) => {
    // Open menu
    await page.locator('button[aria-label="Open menu"]').click()
    const mobileMenu = page.locator('header .lg\\:hidden.absolute')
    await expect(mobileMenu).toBeVisible()

    // Close menu
    await page.locator('button[aria-label="Close menu"]').click()
    await expect(mobileMenu).toBeHidden()
  })

  test('should display all 7 main menu items in mobile menu', async ({ page }) => {
    await page.locator('button[aria-label="Open menu"]').click()

    const mobileMenu = page.locator('header .lg\\:hidden.absolute')
    await expect(mobileMenu).toBeVisible()

    const expectedItems = [
      'Home',
      'Help for Charities',
      'Volunteer',
      'Donate',
      'About Us',
      'Other',
      'FFCAdmin',
    ]

    for (const item of expectedItems) {
      await expect(mobileMenu.getByText(item, { exact: true }).first()).toBeVisible()
    }
  })

  test('should display Help for Charities dropdown sub-items', async ({ page }) => {
    await page.locator('button[aria-label="Open menu"]').click()

    const mobileMenu = page.locator('header .lg\\:hidden.absolute')
    const subItems = [
      '501c3 Onboarding Guide',
      'Pre501c3 Onboarding Guide',
      'Online Impacts Onboarding Guide',
      'GuideStar Profile Setup Guide',
    ]

    for (const item of subItems) {
      await expect(mobileMenu.getByText(item, { exact: true })).toBeVisible()
    }
  })

  test('should display Volunteer dropdown sub-items', async ({ page }) => {
    await page.locator('button[aria-label="Open menu"]').click()

    const mobileMenu = page.locator('header .lg\\:hidden.absolute')
    await expect(mobileMenu.getByText('FFC Volunteer Proving Ground')).toBeVisible()
    await expect(mobileMenu.getByText('Web Developer Training Guide')).toBeVisible()
  })

  test('should display Donate dropdown sub-items', async ({ page }) => {
    await page.locator('button[aria-label="Open menu"]').click()

    const mobileMenu = page.locator('header .lg\\:hidden.absolute')
    await expect(mobileMenu.getByText('Free For Charity Endowment Fund')).toBeVisible()
  })

  test('should display About Us dropdown sub-items', async ({ page }) => {
    await page.locator('button[aria-label="Open menu"]').click()

    const mobileMenu = page.locator('header .lg\\:hidden.absolute')
    // About Us dropdown has Contact Us as sub-item
    const contactLinks = mobileMenu.locator('a[href="/contact-us"]')
    await expect(contactLinks.first()).toBeVisible()
  })

  test('should display Other dropdown sub-items', async ({ page }) => {
    await page.locator('button[aria-label="Open menu"]').click()

    const mobileMenu = page.locator('header .lg\\:hidden.absolute')
    await expect(mobileMenu.getByText('Free For Charity Domains')).toBeVisible()
    await expect(mobileMenu.getByText('Free Charity Web Hosting')).toBeVisible()
  })

  test('should display FFCAdmin dropdown sub-items', async ({ page }) => {
    await page.locator('button[aria-label="Open menu"]').click()

    const mobileMenu = page.locator('header .lg\\:hidden.absolute')
    await expect(mobileMenu.getByText('FFC Admin cPanel Backup')).toBeVisible()
  })

  test('should navigate to a sub-page from mobile menu', async ({ page }) => {
    await page.locator('button[aria-label="Open menu"]').click()

    const mobileMenu = page.locator('header .lg\\:hidden.absolute')
    await mobileMenu.getByText('501c3 Onboarding Guide', { exact: true }).click()

    await expect(page).toHaveURL(/501c3/)
  })

  test('should navigate to home when clicking Home link', async ({ page }) => {
    await page.goto('/about-us')
    await page.locator('button[aria-label="Open menu"]').click()

    const mobileMenu = page.locator('header .lg\\:hidden.absolute')
    await mobileMenu.getByText('Home', { exact: true }).click()

    await expect(page).toHaveURL(/\/$/)
  })
})
