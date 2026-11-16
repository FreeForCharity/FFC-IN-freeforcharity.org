import { test, expect, type Page } from '@playwright/test'

/**
 * Scroll reveal on the Tools for Success page (src/components/ui/Reveal.tsx,
 * which replaced framer-motion's whileInView). Content below the fold is
 * hidden once the page has loaded and fades in as it scrolls into view;
 * without JavaScript or with reduced motion it is simply visible.
 */
const PATH = '/free-for-charitys-tools-for-success/'

function lastCard(page: Page) {
  return page.getByText(/theleanstartup\.com The next step/).first()
}

test('a card below the fold is hidden, then revealed when scrolled to', async ({ page }) => {
  await page.goto(PATH)
  const card = lastCard(page)
  const wrapper = page.locator('[data-reveal]').filter({ has: card })
  await expect(wrapper).toHaveAttribute('data-reveal', 'hidden')
  await expect(wrapper).toHaveCSS('opacity', '0')

  await card.evaluate((el) => el.scrollIntoView({ block: 'center' }))
  await expect(wrapper).toHaveAttribute('data-reveal', 'shown')
  await expect(wrapper).toHaveCSS('opacity', '1')
})

test('with reduced motion nothing is hidden', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(PATH)
  // The cookie banner only appears once the page has hydrated, in the same
  // commit as Reveal's effect, so by then any marking would have happened.
  await expect(page.getByRole('region', { name: 'Cookie consent notice' })).toBeVisible()
  await expect(page.locator('[data-reveal]')).toHaveCount(0)
})

test('without JavaScript every card is visible', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(PATH)
  await lastCard(page).scrollIntoViewIfNeeded()
  await expect(lastCard(page)).toBeVisible()
  await expect(page.locator('[data-reveal]')).toHaveCount(0)
  await context.close()
})
