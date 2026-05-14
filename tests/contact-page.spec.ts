import { test, expect } from '@playwright/test'

/**
 * Contact Page E2E Tests
 *
 * Verifies the contact page displays all required information:
 * - Contact Us heading
 * - Email address as mailto link
 * - Phone number as tel link
 * - Main Address (Raleigh NC)
 * - PA Office Address (State College PA)
 *
 * Note: Contact info also appears in the footer, so we scope to page content
 * by excluding the footer element.
 */

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact-us')
  })

  test('should display Contact Us heading', async ({ page }) => {
    // Use h1 specifically since footer has h3 "Contact Us"
    await expect(page.locator('h1').filter({ hasText: 'Contact Us' })).toBeVisible()
  })

  test('should display email address as mailto link', async ({ page }) => {
    // Scope to first match (page content, not footer)
    const emailLink = page.locator('a[href="mailto:clarkemoyer@freeforcharity.org"]').first()
    await expect(emailLink).toBeVisible()
    await expect(emailLink).toContainText('clarkemoyer@freeforcharity.org')
  })

  test('should display phone number as tel link', async ({ page }) => {
    const phoneLink = page.locator('a[href="tel:+15202228104"]').first()
    await expect(phoneLink).toBeVisible()
    await expect(phoneLink).toContainText('(520) 222-8104')
  })

  test('should display Main Address in Raleigh NC', async ({ page }) => {
    // Scope to first match (page content, not footer)
    await expect(page.getByText('Main Address').first()).toBeVisible()
    await expect(page.getByText('4030 Wake Forrest Road').first()).toBeVisible()
  })

  test('should display PA Office Address in State College PA', async ({ page }) => {
    await expect(page.getByText('PA Office Address').first()).toBeVisible()
    await expect(page.getByText('301 Science Park Road').first()).toBeVisible()
  })

  test('should display introductory text', async ({ page }) => {
    await expect(page.getByText('Have questions about consultation or hosting?')).toBeVisible()
  })
})
