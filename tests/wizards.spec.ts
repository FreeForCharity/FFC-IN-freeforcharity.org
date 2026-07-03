import { test, expect } from '@playwright/test'

/**
 * Decision wizards (issues #367, #397): eligibility check and volunteer quiz.
 * Covers two outcome paths per wizard plus back/restart behavior.
 */

test.describe('Charity eligibility check', () => {
  test('501c3 with no domain reaches the full-onboarding outcome', async ({ page }) => {
    await page.goto('/eligibility-check/')
    await page.getByRole('button', { name: /501\(c\)\(3\) nonprofit in good standing/ }).click()
    await page.getByRole('button', { name: /No — we need one/ }).click()
    await expect(page.getByText('You qualify for the full program')).toBeVisible()
    await expect(page.getByRole('link', { name: /Apply via Help for Charities/ })).toHaveAttribute(
      'href',
      '/help-for-charities/'
    )
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
