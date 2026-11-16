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

  test('a mouse click keeps the dropdown open until a second click or a click elsewhere', async ({
    page,
  }) => {
    const toggle = page.getByRole('button', { name: 'Donate submenu' })
    const menuItem = page
      .locator('header nav li')
      .filter({ hasText: /^Donate/ })
      .first()
    const dropdown = menuItem.locator('div.absolute')

    // The pointer opens it on the way to the button; the click must not hide it.
    await toggle.click()
    await expect(dropdown).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')

    // Once clicked open, moving the mouse away keeps it open...
    await page.locator('header a[href="/"]').first().hover()
    await expect(dropdown).toBeVisible()
    // ...and a second click on the button closes it, with the mouse still over it.
    await toggle.click()
    await expect(dropdown).toBeHidden()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')

    // A click elsewhere on the page also closes it.
    await toggle.click()
    await expect(dropdown).toBeVisible()
    await page.mouse.click(5, 400)
    await expect(dropdown).toBeHidden()
  })

  test('a mouse passing over a keyboard-opened dropdown does not close it', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Donate submenu' })
    await toggle.focus()
    await page.keyboard.press('Enter')
    const menuItem = page
      .locator('header nav li')
      .filter({ hasText: /^Donate/ })
      .first()
    await menuItem.hover()
    await page.mouse.move(5, 400)
    await expect(menuItem.locator('div.absolute')).toBeVisible()
    await expect(toggle).toBeFocused()
  })

  test('only one dropdown is open at a time', async ({ page }) => {
    await page.getByRole('button', { name: 'Help for Charities submenu' }).focus()
    await page.keyboard.press('Enter')
    await page
      .locator('header nav li')
      .filter({ hasText: /^Donate/ })
      .first()
      .hover()
    await expect(page.locator('header nav div.absolute')).toHaveCount(1)
    await expect(page.getByRole('button', { name: 'Help for Charities submenu' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  test('"Other" is a button that opens its links, not a link to "#"', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Primary navigation' })
    await expect(nav.locator('a[href="#"]')).toHaveCount(0)
    const other = nav.getByRole('button', { name: 'Other', exact: true })
    await other.focus()
    await page.keyboard.press('Enter')
    await expect(other).toHaveAttribute('aria-expanded', 'true')
    await expect(nav.getByRole('link', { name: 'Free For Charity Domains' })).toBeVisible()
  })
})

test.describe('Desktop Dropdown Menus on a touch screen', () => {
  test.use({ hasTouch: true, viewport: { width: 1024, height: 768 } })

  test('tapping the submenu button opens and closes the dropdown', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Donate submenu' })
    await toggle.tap()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await toggle.tap()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  test('tapping outside closes a tapped-open dropdown', async ({ page }) => {
    await page.goto('/')
    // Behave like Safari on iPhone and iPad, which does not focus a tapped
    // button: with no focus there is no blur, so the press outside has to
    // close the dropdown on its own.
    await page.evaluate(() =>
      document.addEventListener('mousedown', (event) => event.preventDefault(), true)
    )
    const toggle = page.getByRole('button', { name: 'Donate submenu' })
    await toggle.tap()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(toggle).not.toBeFocused()
    await page.touchscreen.tap(20, 500)
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
