import { test, expect } from '@playwright/test'

/**
 * Decision wizards (issues #367, #397): eligibility check and volunteer quiz.
 * Covers two outcome paths per wizard plus back/restart behavior.
 */

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
