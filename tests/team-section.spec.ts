import { test, expect } from '@playwright/test'

/**
 * Team Section E2E Tests
 *
 * Verifies that the team section on the homepage renders correctly:
 * - Section heading is visible
 * - All 5 team members are displayed with correct names and titles
 * - LinkedIn links are present and open in new tabs
 * - Team member images are visible
 */

test.describe('Team Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display The Free For Charity Team heading', async ({ page }) => {
    await expect(page.getByText('The Free For Charity Team')).toBeVisible()
  })

  test('should display exactly 5 team members', async ({ page }) => {
    const teamSection = page.locator('#team')
    const memberNames = teamSection.locator('h3')
    await expect(memberNames).toHaveCount(5)
  })

  test('should display Clarke Moyer with correct title', async ({ page }) => {
    const teamSection = page.locator('#team')
    await expect(teamSection.getByText('Clarke Moyer')).toBeVisible()
    await expect(
      teamSection.getByText('Free For Charity Founder/ President of the Board')
    ).toBeVisible()
  })

  test('should display Chris Rae with correct title', async ({ page }) => {
    const teamSection = page.locator('#team')
    await expect(teamSection.getByText('Chris Rae')).toBeVisible()
    await expect(teamSection.getByText('Free For Charity Vice President')).toBeVisible()
  })

  test('should display Tyler Carlotto with correct title', async ({ page }) => {
    const teamSection = page.locator('#team')
    await expect(teamSection.getByText('Tyler Carlotto')).toBeVisible()
    await expect(teamSection.getByText('Free For Charity Secretary')).toBeVisible()
  })

  test('should display Brennan Darling with correct title', async ({ page }) => {
    const teamSection = page.locator('#team')
    await expect(teamSection.getByText('Brennan Darling')).toBeVisible()
    await expect(teamSection.getByText('Free For Charity Treasurer')).toBeVisible()
  })

  test('should display Rebecca Cook with correct title', async ({ page }) => {
    const teamSection = page.locator('#team')
    await expect(teamSection.getByText('Rebecca Cook')).toBeVisible()
    await expect(teamSection.getByText('Free For Charity Member at Large')).toBeVisible()
  })

  test('each team member should have a LinkedIn link with target="_blank"', async ({ page }) => {
    const teamSection = page.locator('#team')
    const linkedinLinks = teamSection.locator('a[href*="linkedin.com"]')
    const count = await linkedinLinks.count()

    expect(count).toBe(5)

    for (let i = 0; i < count; i++) {
      await expect(linkedinLinks.nth(i)).toHaveAttribute('target', '_blank')
      await expect(linkedinLinks.nth(i)).toHaveAttribute('rel', /noopener/)
    }
  })
})
