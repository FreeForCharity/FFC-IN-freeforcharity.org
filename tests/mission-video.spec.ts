import { test, expect } from '@playwright/test'

/**
 * Mission Video Tests
 *
 * These tests verify that the mission video is present and properly configured
 * on the homepage mission section.
 */

test.describe('Mission Video', () => {
  test('should display video in mission section', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Find the video element with the aria-label
    const missionVideo = page.locator('video[aria-label="Free For Charity mission video"]')

    // Verify the video exists and is visible
    await expect(missionVideo).toBeVisible()

    // Verify the video has the correct accessibility attributes
    await expect(missionVideo).toHaveAttribute('aria-label', 'Free For Charity mission video')
    await expect(missionVideo).toHaveAttribute(
      'title',
      "Learn about Free For Charity's mission to help nonprofits reduce costs"
    )

    // Verify the video has controls enabled
    await expect(missionVideo).toHaveAttribute('controls', '')
  })

  test('should have video source configured correctly', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Find the video source element
    const videoSource = page.locator('video[aria-label="Free For Charity mission video"] source')

    // Verify the source exists
    await expect(videoSource).toHaveCount(1)

    // Verify the source has the correct type
    await expect(videoSource).toHaveAttribute('type', 'video/mp4')
  })

  test('video source URL should resolve to a 200 (no dead off-domain redirect)', async ({
    page,
  }) => {
    await page.goto('/')

    const src = await page
      .locator('video[aria-label="Free For Charity mission video"] source')
      .getAttribute('src')

    expect(src, 'video <source> must have a src attribute').toBeTruthy()
    // Same-origin only: no absolute http(s) URL. Catches any future
    // regression to ffcsites.org, ffcadmin.org, a CDN host, etc.
    expect(src, 'video <source> must be served from this origin').not.toMatch(/^https?:\/\//)

    const resolved = new URL(src!, page.url()).toString()
    const response = await page.request.get(resolved, {
      headers: { Range: 'bytes=0-0' },
    })
    expect(
      [200, 206].includes(response.status()),
      `video src ${resolved} returned ${response.status()}`
    ).toBe(true)
  })
})
