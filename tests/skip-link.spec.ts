import { test, expect } from '@playwright/test'

/**
 * Skip-to-content link (issue #406): keyboard users must be able to bypass
 * the header navigation from the first Tab press on any page.
 */

test.describe('Skip to main content', () => {
  test('first Tab focuses the skip link and activating it reaches main content', async ({
    page,
  }) => {
    await page.goto('/')

    await page.keyboard.press('Tab')
    const skipLink = page.locator('a[href="#main-content"]')
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toBeVisible()

    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#main-content$/)
    await expect(page.locator('main#main-content')).toBeVisible()
  })

  test('exactly one main landmark exists', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('main')).toHaveCount(1)
  })
})
