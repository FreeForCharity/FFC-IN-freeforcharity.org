import { test, expect } from '@playwright/test'

/**
 * Decision wizard (issue #397): the volunteer skills quiz.
 *
 * The charity eligibility check is no longer a standalone wizard page — it now
 * happens on-page via the "Help me choose" guide on the funnel pages, covered
 * by the on-page apply test below and the ApplyOptions unit test.
 */

test.describe('On-page "Help me choose" apply guide', () => {
  test('help-for-charities: choosing 501(c)(3) reveals the pid 33 application link', async ({
    page,
  }) => {
    await page.goto('/help-for-charities/')

    const guide = page.locator('details').filter({ hasText: 'Help me choose' }).first()
    await guide.locator('summary').click()
    await guide.getByText('We have our IRS 501(c)(3) determination letter').click()

    // The recommendation appears in place (no navigation) with the 501(c)(3)
    // application link deep-linked to the stable WHMCS product id.
    const result = guide.locator('[aria-live="polite"]')
    await expect(result.getByText(/use this application/i)).toBeVisible()
    await expect(
      result.getByRole('link', { name: /Apply as a 501\(c\)\(3\) charity/ })
    ).toHaveAttribute('href', /cart\.php\?a=add&pid=33/)
  })

  test('non-US organizations get the TechSoup out-path in place', async ({ page }) => {
    await page.goto('/help-for-charities/')

    const guide = page.locator('details').filter({ hasText: 'Help me choose' }).first()
    await guide.locator('summary').click()
    await guide.getByText('We’re based outside the United States').click()

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
    await guide.getByText('We’re a project under a fiscal sponsor').click()

    const result = guide.locator('[aria-live="polite"]')
    await expect(result.getByText(/must apply and approve your project/i)).toBeVisible()
    await expect(
      result.getByRole('link', { name: /Apply as a 501\(c\)\(3\) charity/ })
    ).toHaveAttribute('href', /cart\.php\?a=add&pid=33/)
  })

  test('veterans and other 501(c) types route into the 501(c)(3) application', async ({ page }) => {
    await page.goto('/help-for-charities/')

    const guide = page.locator('details').filter({ hasText: 'Help me choose' }).first()
    await guide.locator('summary').click()
    await guide.getByText(/veterans post or another 501\(c\) type/).click()

    const result = guide.locator('[aria-live="polite"]')
    await expect(result.getByText(/pick the organization type that matches/i)).toBeVisible()
    await expect(
      result.getByRole('link', { name: /Apply as a 501\(c\)\(3\) charity/ })
    ).toHaveAttribute('href', /cart\.php\?a=add&pid=33/)
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
