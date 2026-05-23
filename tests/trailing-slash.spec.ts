import { test, expect } from '@playwright/test'
import { siteRoutes } from './routes'

/**
 * Trailing-slash canonicalization
 *
 * The Next.js export is built with `trailingSlash: true`, so every
 * route ships as `out/<slug>/index.html` and the canonical URL ends
 * with `/`. This suite asserts every non-root route in the sitemap:
 *
 *   1. Resolves to 200 when requested with the canonical trailing slash.
 *   2. When requested WITHOUT a trailing slash, lands on the trailing-
 *      slash form after following redirects.
 *
 * The local Playwright webServer is `npx serve out`, which mimics a
 * static host closely enough that the canonical URL check exercises
 * the same behavior we expect from Apache in production (DirectorySlash
 * 301s `/about-us` -> `/about-us/`). The 200 assertion is identical
 * to the post-deploy smoke test on the trailing-slash form.
 */
const nonRootRoutes = siteRoutes.map((r) => r.route).filter((r) => r !== '/')

test.describe('Trailing-slash canonicalization', () => {
  for (const route of nonRootRoutes) {
    test(`${route}/ returns 200 (canonical form)`, async ({ page }) => {
      const response = await page.goto(`${route}/`)
      expect(response?.status()).toBe(200)
    })
  }

  for (const route of nonRootRoutes) {
    test(`${route} (no slash) canonicalizes to ${route}/`, async ({ page }) => {
      await page.goto(route)
      // Canonical URL has the trailing slash after the static host resolves it.
      // Anchor with the absolute baseURL so a hypothetical /wrong${route}/
      // can't match an unanchored sub-path.
      const baseURL = test.info().project.use.baseURL ?? 'http://localhost:4173'
      expect(page.url()).toMatch(new RegExp(`^${baseURL}${route}/(\\?.*)?$`))
    })
  }
})
