import { test, expect } from '@playwright/test'
import { campaigns, zeffyHostedUrl } from '../src/data/donation-campaigns'

/**
 * Live Zeffy link check.
 *
 * Zeffy returns 403 to non-browser crawlers (curl/lychee) and our normal CI /
 * sandbox egress can't reach it, so this only runs when `ZEFFY_LIVE=1` in an
 * environment with real-browser egress to zeffy.com — the dedicated
 * `zeffy-link-check` workflow (GitHub-hosted runner + real Chromium), or a
 * developer's machine: `ZEFFY_LIVE=1 npx playwright test --config playwright.zeffy-links.config.ts`.
 *
 * It verifies that every CONFIRMED campaign's pop-up link (and its no-JS hosted
 * fallback) resolves to a real Zeffy form rather than a 404 from a wrong slug.
 * Unconfirmed placeholders are skipped until their links are added to
 * `src/data/donation-campaigns.ts` (set `confirmed: true`).
 */
const LIVE = process.env.ZEFFY_LIVE === '1'
const t = LIVE ? test : test.skip
const confirmed = campaigns.filter((c) => c.confirmed)

// Markers that a real Zeffy form/landing page contains; a bare 404 page won't.
const ZEFFY_FORM_MARKERS = [
  'zeffy',
  'donation',
  'donate',
  'ticket',
  'membership',
  'amount',
  'checkout',
  'contribution',
]
const NOT_FOUND_MARKERS = ['page not found', "doesn't exist", 'page you are looking for']

test.describe('Zeffy confirmed campaign links (live)', () => {
  // Per-suite timeout only; let the config control retries (CI gets 2, to
  // tolerate transient Zeffy flakiness).
  test.describe.configure({ timeout: 60_000 })

  for (const c of confirmed) {
    t(`${c.key}: pop-up embed link resolves to a Zeffy form`, async ({ page }) => {
      const res = await page.goto(c.zeffyFormLink, { waitUntil: 'domcontentloaded' })
      expect(res, `no response for ${c.zeffyFormLink}`).toBeTruthy()
      expect(res!.status(), `${c.zeffyFormLink} → HTTP ${res!.status()}`).toBeLessThan(400)
      expect(page.url(), 'should stay on zeffy.com').toContain('zeffy.com')

      const body = (await page.content()).toLowerCase()
      expect(
        NOT_FOUND_MARKERS.some((m) => body.includes(m)),
        `${c.zeffyFormLink} renders a Zeffy "not found" page — wrong slug?`
      ).toBeFalsy()
      expect(
        ZEFFY_FORM_MARKERS.some((m) => body.includes(m)),
        `${c.zeffyFormLink} did not render any recognizable Zeffy form content`
      ).toBeTruthy()
    })

    t(`${c.key}: no-JS hosted fallback link resolves`, async ({ page }) => {
      const hosted = zeffyHostedUrl(c.zeffyFormLink)
      const res = await page.goto(hosted, { waitUntil: 'domcontentloaded' })
      expect(res, `no response for ${hosted}`).toBeTruthy()
      expect(res!.status(), `${hosted} → HTTP ${res!.status()}`).toBeLessThan(400)
      const body = (await page.content()).toLowerCase()
      expect(
        NOT_FOUND_MARKERS.some((m) => body.includes(m)),
        `${hosted} renders a "not found" page — wrong hosted URL?`
      ).toBeFalsy()
    })
  }

  // Guard: makes sure the check is actually exercising the known-good set, so a
  // future change that drops the `confirmed` flags doesn't silently no-op.
  t('the known-confirmed campaigns are present', () => {
    expect(confirmed.map((c) => c.key).sort()).toEqual(
      expect.arrayContaining(['endowment', 'free-domain', 'website-design'])
    )
  })
})
