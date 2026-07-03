import { test, expect } from '@playwright/test'

/**
 * Client-side site search (issue #408).
 */

test.describe('Site search', () => {
  test('finds the M365 email guide for "email"', async ({ page }) => {
    await page.goto('/search/')
    await page.getByLabel('Search guides, pages, and posts').fill('email')
    await expect(page.getByRole('link', { name: /Free Microsoft 365 Email/i })).toBeVisible()
  })

  test('shows a helpful empty state for nonsense queries', async ({ page }) => {
    await page.goto('/search/')
    await page.getByLabel('Search guides, pages, and posts').fill('zzzznotathing')
    await expect(page.getByText(/Nothing matched/)).toBeVisible()
    await expect(page.getByRole('link', { name: 'guides hub' }).first()).toBeVisible()
  })
})
