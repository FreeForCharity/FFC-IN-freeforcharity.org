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
    // The two application pages are the doors, side by side.
    const labels = await links.allTextContents()
    const i = labels.indexOf('501(c)(3) Application')
    expect(labels.slice(i, i + 2)).toEqual(['501(c)(3) Application', 'Pre-501(c)(3) Application'])
  })

  test('the 501(c)(3) Application item opens the application page', async ({ page }) => {
    const menuItem = page.locator('header nav li').filter({ hasText: 'Help for Charities' })
    await menuItem.hover()
    await menuItem.getByRole('link', { name: '501(c)(3) Application', exact: true }).click()
    await expect(page).toHaveURL(/\/501c3\/?$/)
    await expect(
      page.getByRole('heading', { level: 1, name: '501(c)(3) Application' })
    ).toBeVisible()
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

  test('FFCAdmin is a direct link with no dropdown', async ({ page }) => {
    const menuItem = page.locator('header nav li').filter({ hasText: 'FFCAdmin' })
    await menuItem.hover()

    // The two former sub-pages were consolidated onto ffcadmin.org, so
    // FFCAdmin is now a plain link to /ffcadmin — no dropdown appears.
    // href prefix match tolerates the trailingSlash canonicalization (/ffcadmin/).
    await expect(menuItem.locator('div.absolute')).toHaveCount(0)
    await expect(menuItem.locator('a[href^="/ffcadmin"]')).toBeVisible()
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

test.describe('Desktop Dropdown Menus from the keyboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('the submenu button opens the dropdown, Escape closes it and returns focus', async ({
    page,
  }) => {
    const menuItem = page.locator('header nav li').filter({ hasText: 'Help for Charities' })
    const toggle = page.getByRole('button', { name: 'Help for Charities submenu' })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await toggle.focus()
    await page.keyboard.press('Enter')
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const dropdown = menuItem.locator('div.absolute')
    await expect(dropdown).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-controls', (await dropdown.getAttribute('id'))!)

    // Tab moves into the submenu links.
    await page.keyboard.press('Tab')
    await expect(dropdown.locator('a').first()).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(dropdown).toBeHidden()
    await expect(toggle).toBeFocused()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  test('tabbing past the last submenu link closes the dropdown', async ({ page }) => {
    const menuItem = page.locator('header nav li').filter({ hasText: 'About Us' })
    const toggle = page.getByRole('button', { name: 'About Us submenu' })
    await toggle.focus()
    await page.keyboard.press('Enter')
    const dropdown = menuItem.locator('div.absolute')
    await expect(dropdown).toBeVisible()

    await page.keyboard.press('Tab') // Contact Us, the only item
    await expect(dropdown.getByRole('link', { name: 'Contact Us' })).toBeFocused()
    await page.keyboard.press('Tab') // leaves the About Us item
    await expect(dropdown).toBeHidden()
  })

  test('clicking the submenu button opens the dropdown and keeps it open', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Donate submenu' })
    const menuItem = page
      .locator('header nav li')
      .filter({ hasText: /^Donate/ })
      .first()
    const dropdown = menuItem.locator('div.absolute')

    // The mouse opens it on the way to the button; the click must not hide it.
    await toggle.click()
    await expect(dropdown).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')

    // A second press of the button from the keyboard closes it.
    await toggle.press('Enter')
    await page.locator('header a[href="/"]').first().hover()
    await expect(dropdown).toBeHidden()
  })
})
