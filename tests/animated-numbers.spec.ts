import { test, expect } from '@playwright/test'

/**
 * Animated Numbers Tests
 *
 * These tests verify that the homepage "Results" section numbers animate
 * correctly when scrolled into view. The section is data-driven from
 * src/data/impact.json (see docs/METRICS-PLAYBOOK.md); the values asserted
 * here mirror the high/medium-confidence metrics surfaced as result cards.
 */

test.describe('Results Animated Numbers', () => {
  // Helper selector for ResultCard components - uses the distinctive border class
  // to identify the card containing a specific description
  const getResultCard = (page: import('@playwright/test').Page, description: string) =>
    page.locator(`div.border-\\[\\#F58629\\]:has(p:text-is("${description}"))`)

  test('should display the Results section with all four statistics', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Find the Results section heading (year is data-driven)
    const resultsHeading = page.locator('h2:has-text("Results - ")')
    await expect(resultsHeading).toBeVisible()

    // Scroll to the Results section to trigger animations
    await resultsHeading.scrollIntoViewIfNeeded()

    // Numeric cards animate up to their final values
    await expect(
      getResultCard(page, 'Charity domains under management').locator('h1')
    ).toContainText('376', { timeout: 5000 })
    await expect(getResultCard(page, 'Charity websites built').locator('h1')).toContainText('41')
    await expect(getResultCard(page, 'Years serving nonprofits').locator('h1')).toContainText('12')

    // Non-numeric card renders its value verbatim (no count-up animation)
    await expect(
      getResultCard(page, 'Charitable organizations supported').locator('h1')
    ).toContainText('200+')
  })

  test('should start with numbers at 0 before scrolling into view', async ({ page }) => {
    // Navigate to the homepage without scrolling
    await page.goto('/')

    // Verify the numbers start at 0 before scrolling into view
    const firstCardNumber = getResultCard(page, 'Charity domains under management').locator('h1')
    await expect(firstCardNumber).toContainText('0')

    const resultsSection = page.locator('h2:has-text("Results - ")')
    await expect(resultsSection).toBeAttached()
  })

  test('should animate numbers only once when scrolled into view', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Find and scroll to the Results section
    const resultsHeading = page.locator('h2:has-text("Results - ")')
    await resultsHeading.scrollIntoViewIfNeeded()

    // Wait for animation to complete by checking the final value
    const firstCardNumber = getResultCard(page, 'Charity domains under management').locator('h1')
    await expect(firstCardNumber).toContainText('376', { timeout: 5000 })

    // Scroll away and back
    await page.locator('h1:has-text("Welcome to")').scrollIntoViewIfNeeded()
    await resultsHeading.scrollIntoViewIfNeeded()

    // Value should still be the final animated value (not reset to 0)
    await expect(firstCardNumber).toContainText('376')
  })

  test('should display correct descriptions for each statistic', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Verify all descriptions are present
    await expect(page.locator('text=Charity domains under management')).toBeVisible()
    await expect(page.locator('text=Charity websites built')).toBeVisible()
    await expect(page.locator('text=Charitable organizations supported')).toBeVisible()
    await expect(page.locator('text=Years serving nonprofits')).toBeVisible()
  })

  test('should respect prefers-reduced-motion preference', async ({ browser }) => {
    // Create a context with reduced motion preference
    const context = await browser.newContext({
      reducedMotion: 'reduce',
    })
    const page = await context.newPage()

    // The homepage embeds a Zeffy donation iframe whose network never
    // quiets, so `waitForLoadState('networkidle')` times out in CI. Use
    // `domcontentloaded` and rely on Playwright's auto-retrying
    // `toBeVisible` to absorb hydration timing instead.
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const resultsHeading = page.locator('h2:has-text("Results - ")')
    await expect(resultsHeading).toBeVisible({ timeout: 10000 })
    // Scroll via the DOM API rather than `scrollIntoViewIfNeeded`. The
    // React tree on this page re-renders during hydration, so Playwright's
    // stability check can fail with "Element is not attached to the DOM"
    // even after `toBeVisible` succeeds. `evaluate` only needs the node
    // to exist at the moment of execution.
    await resultsHeading.evaluate((el) => el.scrollIntoView({ block: 'center' }))

    // With reduced motion, numbers should appear at final value once the
    // section is hydrated and the scroll observer fires. Allow a 5s window
    // for the React effect + CountUp to settle on slower CI runners (the
    // motion-reduced branch is still synchronous, but hydration timing
    // varies enough to flake under a 1s budget).
    const firstCardNumber = getResultCard(page, 'Charity domains under management').locator('h1')
    await expect(firstCardNumber).toContainText('376', { timeout: 5000 })

    await context.close()
  })
})
