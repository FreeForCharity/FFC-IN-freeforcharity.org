import { test, expect } from '@playwright/test'

/**
 * Mission Video Tests
 *
 * The mission section uses a click-to-play facade: the page ships only the
 * poster image and a play button, and the real <video> (with its
 * multi-megabyte mp4 source) is mounted on first click. These tests verify
 * the facade, the mounted video's configuration, and that the mp4 stays
 * same-origin and reachable.
 */

const PLAY_BUTTON = 'button[aria-label="Play the Free For Charity mission video"]'
const VIDEO = 'video[aria-label="Free For Charity mission video"]'

test.describe('Mission Video', () => {
  test('homepage ships a play facade, not the video element', async ({ page }) => {
    await page.goto('/')

    // The facade button is visible with the correct accessible name/title.
    const playButton = page.locator(PLAY_BUTTON)
    await expect(playButton).toBeVisible()
    await expect(playButton).toHaveAttribute(
      'title',
      "Learn about Free For Charity's mission to help nonprofits reduce costs"
    )

    // The heavy <video> (and its mp4 reference) must NOT be in the initial
    // page — that is the entire point of the facade.
    await expect(page.locator(VIDEO)).toHaveCount(0)
  })

  test('clicking the facade mounts a configured video element', async ({ page }) => {
    await page.goto('/')
    await page.locator(PLAY_BUTTON).click()

    const missionVideo = page.locator(VIDEO)
    await expect(missionVideo).toBeVisible()

    // Verify the video has the correct accessibility attributes
    await expect(missionVideo).toHaveAttribute('aria-label', 'Free For Charity mission video')
    await expect(missionVideo).toHaveAttribute(
      'title',
      "Learn about Free For Charity's mission to help nonprofits reduce costs"
    )

    // Verify the video has controls enabled
    await expect(missionVideo).toHaveAttribute('controls', '')

    // Verify the source exists with the correct type
    const videoSource = missionVideo.locator('source')
    await expect(videoSource).toHaveCount(1)
    await expect(videoSource).toHaveAttribute('type', 'video/mp4')
  })

  test('video source URL should resolve to a 200 (no dead off-domain redirect)', async ({
    page,
  }) => {
    await page.goto('/')
    await page.locator(PLAY_BUTTON).click()

    const src = await page.locator(`${VIDEO} source`).getAttribute('src')

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
