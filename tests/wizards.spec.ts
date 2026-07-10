import { test, expect } from '@playwright/test'

/**
 * Decision wizards (issues #367, #397): eligibility check and volunteer quiz.
 * Covers two outcome paths per wizard plus back/restart behavior.
 */

test.describe('Charity eligibility check', () => {
  test('a 501c3 qualifies and lands directly on the application button', async ({ page }) => {
    await page.goto('/eligibility-check/')
    await page.getByRole('button', { name: /501\(c\)\(3\) nonprofit in good standing/ }).click()
    // Single committed journey: no à la carte domain/website/email branches —
    // an eligible org goes straight to the on-page apply button.
    await expect(page.getByText(/You qualify — apply now/)).toBeVisible()
    await expect(
      page.getByRole('link', { name: /Apply as a 501\(c\)\(3\) charity/ })
    ).toHaveAttribute('href', /cart\.php\?a=add&pid=33/)
  })

  test('a pre-501c3 with paperwork reaches the pre-501c3 application button', async ({ page }) => {
    await page.goto('/eligibility-check/')
    await page.getByRole('button', { name: /working toward 501\(c\)\(3\) determination/ }).click()
    await page.getByRole('button', { name: /formation documents/ }).click()
    await expect(page.getByText(/pre-501\(c\)3 onboarding — apply now/)).toBeVisible()
    await expect(
      page.getByRole('link', { name: /Apply as a pre-501\(c\)3 organization/ })
    ).toHaveAttribute('href', /cart\.php\?a=add&pid=16/)
  })

  test('for-profit reaches the not-eligible outcome and can start over', async ({ page }) => {
    await page.goto('/eligibility-check/')
    await page.getByRole('button', { name: /for-profit business or individual/ }).click()
    await expect(page.getByText(/free programs are for nonprofits/)).toBeVisible()
    await page.getByRole('button', { name: 'Start over' }).click()
    await expect(page.getByText('What best describes your organization?')).toBeVisible()
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
