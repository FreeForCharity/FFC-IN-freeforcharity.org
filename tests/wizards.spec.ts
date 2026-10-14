import { test, expect } from '@playwright/test'

/**
 * Decision wizard (issue #397): the volunteer skills quiz.
 *
 * The charity eligibility check is no longer a standalone wizard page — it now
 * happens on-page via the "Help me choose" guide: on the funnel pages it routes
 * to the application page for each form (/501c3/, /pre501c3/), and on those
 * pages it sits inside the "Is this the right application?" box. It never
 * renders an Apply button; each application page has exactly one.
 */

test.describe('On-page "Help me choose" apply guide', () => {
  test('help-for-charities: choosing 501(c)(3) routes to the 501(c)(3) application page', async ({
    page,
  }) => {
    await page.goto('/help-for-charities/')

    const guide = page.locator('details').filter({ hasText: 'Help me choose' }).first()
    await guide.locator('summary').click()
    await guide.getByText('We have our IRS 501(c)(3) determination letter').click()

    // The recommendation appears in place and routes to the application page,
    // where the single Apply button sits under the wrong-application warning.
    const result = guide.locator('[aria-live="polite"]')
    await expect(result.getByText(/the 501\(c\)\(3\) application is yours/i)).toBeVisible()
    await expect(
      result.getByRole('link', { name: /Go to the 501\(c\)\(3\) Application page/ })
    ).toHaveAttribute('href', /\/501c3\/?$/)
    await expect(result.locator('a[href*="cart.php"]')).toHaveCount(0)
  })

  test('non-US organizations get the TechSoup out-path in place', async ({ page }) => {
    await page.goto('/help-for-charities/')

    const guide = page.locator('details').filter({ hasText: 'Help me choose' }).first()
    await guide.locator('summary').click()
    await guide.getByText(/based outside the United States/).click()

    const result = guide.locator('[aria-live="polite"]')
    await expect(result.getByRole('link', { name: 'TechSoup' })).toHaveAttribute(
      'href',
      'https://www.techsoup.org/'
    )
  })

  test('fiscally sponsored projects are told the sponsor must apply', async ({ page }) => {
    await page.goto('/help-for-charities/')

    const guide = page.locator('details').filter({ hasText: 'Help me choose' }).first()
    await guide.locator('summary').click()
    await guide.getByText(/a project under a fiscal sponsor/).click()

    const result = guide.locator('[aria-live="polite"]')
    await expect(result.getByText(/must apply and approve your project/i)).toBeVisible()
    await expect(
      result.getByRole('link', { name: '501(c)(3) Application', exact: true })
    ).toHaveAttribute('href', /\/501c3\/?$/)
    await expect(result.locator('a[href*="cart.php"]')).toHaveCount(0)
  })

  test('veterans and other 501(c) types route into the 501(c)(3) application', async ({ page }) => {
    await page.goto('/help-for-charities/')

    const guide = page.locator('details').filter({ hasText: 'Help me choose' }).first()
    await guide.locator('summary').click()
    await guide.getByText(/veterans post or another 501\(c\) type/).click()

    const result = guide.locator('[aria-live="polite"]')
    await expect(result.getByText(/pick the organization type that matches/i)).toBeVisible()
    await expect(
      result.getByRole('link', { name: /Go to the 501\(c\)\(3\) Application page/ })
    ).toHaveAttribute('href', /\/501c3\/?$/)
  })

  test('/pre501c3/: the picker inside the red box says STOP to a 501(c)(3)', async ({ page }) => {
    await page.goto('/pre501c3/')
    const box = page.locator('[data-testid="right-application-box"]')
    await box.getByText('We have our IRS 501(c)(3) determination letter').click()
    const result = box.locator('[aria-live="polite"]')
    await expect(result.getByText(/STOP: do not click Apply on this page/)).toBeVisible()
    await expect(result.getByRole('link', { name: '501(c)(3) Application' })).toHaveAttribute(
      'href',
      /\/501c3\/?$/
    )
  })
})

test.describe('Application pages', () => {
  for (const [route, pid] of [
    ['/501c3/', '33'],
    ['/pre501c3/', '16'],
  ]) {
    test(`${route} has exactly one Apply button, for its own form`, async ({ page }) => {
      await page.goto(route)
      const apply = page.locator('a[href*="hub/cart.php"]')
      await expect(apply).toHaveCount(1)
      await expect(apply).toHaveAttribute('href', new RegExp(`a=add&pid=${pid}$`))
    })
  }

  test('a field-guide hash opens and scrolls to that group', async ({ page }) => {
    await page.goto('/501c3/#officer-linkedin')
    const group = page.locator('details#officer-linkedin')
    await expect(group).toHaveAttribute('open', '')
    await expect(group.getByText('Chair LinkedIn')).toBeInViewport()
    // Other groups stay collapsed.
    await expect(page.locator('details#ein')).not.toHaveAttribute('open', '')
  })
})

test.describe('Volunteer skills quiz', () => {
  test('tech + websites reaches the webmaster outcome', async ({ page }) => {
    await page.goto('/volunteer-quiz/')
    await page.getByRole('button', { name: /Building things with technology/ }).click()
    await page.getByRole('button', { name: /Websites: HTML\/CSS/ }).click()
    await expect(page.getByText('You’re a Webmaster')).toBeVisible()
  })

  test('back button returns to the previous question', async ({ page }) => {
    await page.goto('/volunteer-quiz/')
    await page.getByRole('button', { name: /Building things with technology/ }).click()
    await expect(page.getByText('Which sounds more like you?')).toBeVisible()
    await page.getByRole('button', { name: '← Back' }).click()
    await expect(page.getByText('What kind of work gives you energy?')).toBeVisible()
  })
})
