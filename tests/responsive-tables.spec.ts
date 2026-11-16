import { test, expect } from '@playwright/test'

/**
 * Tables scroll inside their own box on a phone instead of widening the page
 * (Modern Web Guidance: ui-components/responsive-table). A table that is
 * wider than its box can be reached with the keyboard so it can be scrolled.
 */
test.use({ viewport: { width: 320, height: 700 } })

for (const path of ['/cookie-policy/', '/501c3/help/board-requirements/']) {
  test(`tables on ${path} do not widen the page at 320px`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    const regions = page.locator('[role="region"]:has(> table)')
    await expect(regions.first()).toBeAttached()
    const count = await regions.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const region = regions.nth(i)
      await expect(region).toHaveAttribute('aria-label', /\S/)
      // Once hydrated, a region that overflows is in the tab order.
      await expect
        .poll(() =>
          region.evaluate(
            (el) => el.scrollWidth <= el.clientWidth + 1 || el.getAttribute('tabindex') === '0'
          )
        )
        .toBe(true)
    }
    const pageOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    )
    expect(pageOverflow).toBeLessThanOrEqual(0)
  })
}

test('the cookie tables name their columns for screen readers', async ({ page }) => {
  await page.goto('/cookie-policy/', { waitUntil: 'domcontentloaded' })
  const region = page.getByRole('region', { name: 'Google Analytics cookies' })
  await expect(region.getByRole('columnheader', { name: 'Cookie Name' })).toHaveAttribute(
    'scope',
    'col'
  )
})

test('a help-page table too wide for a phone can be reached with Tab', async ({ page }) => {
  await page.goto('/501c3/help/board-requirements/', { waitUntil: 'domcontentloaded' })
  // At 320px these field tables are wider than their box.
  const region = page.getByRole('region', { name: /^Board officers/ })
  await expect(region).toHaveAttribute('tabindex', '0')
  await region.focus()
  await page.keyboard.press('ArrowRight')
  await expect.poll(() => region.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0)
})
