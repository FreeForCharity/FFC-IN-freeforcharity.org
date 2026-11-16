import { test, expect } from '@playwright/test'

/**
 * The header shrinks once the page scrolls, driven by an IntersectionObserver
 * sentinel instead of a scroll listener.
 */

test.use({ viewport: { width: 1280, height: 800 } })

test('header shrinks after scrolling and grows back at the top', async ({ page }) => {
  await page.goto('/')
  const header = page.locator('header#header')
  await expect(header).toHaveClass(/h-\[80px\]/)

  // Retry the scroll: until the page hydrates, Next.js may reset it to the top.
  await expect(async () => {
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }))
    await expect(header).toHaveClass(/h-\[55px\]/, { timeout: 1000 })
  }).toPass({ timeout: 15_000 })

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await expect(header).toHaveClass(/h-\[80px\]/)
})
