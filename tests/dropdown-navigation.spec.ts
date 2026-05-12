import { test, expect } from '@playwright/test'

/**
 * Desktop Dropdown Navigation E2E Tests
 *
 * Verifies that desktop dropdown menus work correctly:
 * - Hovering a menu item reveals its dropdown
 * - Correct number of sub-items in each dropdown
 * - Clicking a dropdown item navigates to the correct page
 * - Dropdown hides when mouse leaves
 */

test.describe('Desktop Dropdown Menus', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should show Help for Charities dropdown on hover with 7 sub-items', async ({ page }) => {
    const menuItem = page.locator('header nav li').filter({ hasText: 'Help for Charities' })
    await menuItem.hover()

    const dropdown = menuItem.locator('div.absolute')
    await expect(dropdown).toBeVisible()

    const links = dropdown.locator('a')
    await expect(links).toHaveCount(7)
  })

  test('should show Volunteer dropdown on hover with 3 sub-items', async ({ page }) => {
    const menuItem = page
      .locator('header nav li')
      .filter({ hasText: /^Volunteer/ })
      .first()
    await menuItem.hover()

    const dropdown = menuItem.locator('div.absolute')
    await expect(dropdown).toBeVisible()

    const links = dropdown.locator('a')
    await expect(links).toHaveCount(3)
  })

  test('should show Donate dropdown on hover with 2 sub-items', async ({ page }) => {
    const menuItem = page
      .locator('header nav li')
      .filter({ hasText: /^Donate/ })
      .first()
    await menuItem.hover()

    const dropdown = menuItem.locator('div.absolute')
    await expect(dropdown).toBeVisible()

    const links = dropdown.locator('a')
    await expect(links).toHaveCount(2)
  })

  test('should show About Us dropdown on hover with 1 sub-item', async ({ page }) => {
    const menuItem = page.locator('header nav li').filter({ hasText: 'About Us' })
    await menuItem.hover()

    const dropdown = menuItem.locator('div.absolute')
    await expect(dropdown).toBeVisible()

    const links = dropdown.locator('a')
    await expect(links).toHaveCount(1)
    await expect(links.first()).toContainText('Contact Us')
  })

  test('should show Other dropdown on hover with 3 sub-items', async ({ page }) => {
    const menuItem = page.locator('header nav li').filter({ hasText: 'Other' })
    await menuItem.hover()

    const dropdown = menuItem.locator('div.absolute')
    await expect(dropdown).toBeVisible()

    const links = dropdown.locator('a')
    await expect(links).toHaveCount(3)
  })

  test('should show FFCAdmin dropdown on hover with 2 sub-items', async ({ page }) => {
    const menuItem = page.locator('header nav li').filter({ hasText: 'FFCAdmin' })
    await menuItem.hover()

    const dropdown = menuItem.locator('div.absolute')
    await expect(dropdown).toBeVisible()

    const links = dropdown.locator('a')
    await expect(links).toHaveCount(2)
  })

  test('should navigate to sub-page when clicking dropdown item', async ({ page }) => {
    const menuItem = page.locator('header nav li').filter({ hasText: 'About Us' })
    await menuItem.hover()

    const dropdown = menuItem.locator('div.absolute')
    await dropdown.getByText('Contact Us').click()

    await expect(page).toHaveURL(/contact-us/)
  })

  test('should hide dropdown when mouse leaves', async ({ page }) => {
    const menuItem = page.locator('header nav li').filter({ hasText: 'Help for Charities' })
    await menuItem.hover()

    const dropdown = menuItem.locator('div.absolute')
    await expect(dropdown).toBeVisible()

    // Move mouse away to the logo
    await page.locator('header a[href="/"]').first().hover()

    await expect(dropdown).toBeHidden()
  })
})
