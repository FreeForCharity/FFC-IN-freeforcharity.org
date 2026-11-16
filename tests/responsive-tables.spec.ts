import { test, expect } from '@playwright/test'

/**
 * Tables scroll inside their own box on a phone instead of widening the page
 * (Modern Web Guidance: ui-components/responsive-table). A table that is
 * wider than its box becomes a labelled region that the keyboard can reach.
 */
test.use({ viewport: { width: 320, height: 700 } })

for (const path of ['/cookie-policy/', '/501c3/help/board-requirements/']) {
  test(`tables on ${path} do not widen the page at 320px`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    await expect(page.locator('table').first()).toBeAttached()
    const pageOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    )
    expect(pageOverflow).toBeLessThanOrEqual(0)
  })
}

test('the cookie tables name their columns for screen readers', async ({ page }) => {
  await page.goto('/cookie-policy/', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('columnheader', { name: 'Cookie Name' }).first()).toHaveAttribute(
    'scope',
    'col'
  )
})

test('a help-page table too wide for a phone can be reached with Tab', async ({ page }) => {
  await page.goto('/501c3/help/board-requirements/', { waitUntil: 'domcontentloaded' })
  // At 320px these field tables are wider than their box (measured: 288px of
  // table in a 246px box).
  const region = page.getByRole('region', { name: /^Board officers/ })
  await expect(region).toHaveAttribute('tabindex', '0')
  await region.focus()
  await page.keyboard.press('ArrowRight')
  await expect.poll(() => region.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0)
})

test('a table that fits on a wide screen adds no landmark or tab stop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/501c3/help/board-requirements/', { waitUntil: 'domcontentloaded' })
  const wrapper = page.locator('table').first().locator('..')
  // Give hydration time to measure, then check it stayed plain.
  await expect(page.getByRole('region', { name: /^Board officers/ })).toHaveCount(0)
  await expect(wrapper).not.toHaveAttribute('tabindex')
})
