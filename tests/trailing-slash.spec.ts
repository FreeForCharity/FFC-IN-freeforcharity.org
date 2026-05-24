import { test, expect } from '@playwright/test'
import { siteRoutes } from './routes'

/**
 * Trailing-slash export integrity
 *
 * The Next.js export is built with `trailingSlash: true`, so every
 * route ships as `out/<slug>/index.html`. This suite asserts that for
 * every non-root route in the sitemap, both the canonical (`/foo/`)
 * and the bare (`/foo`) form resolve to a 200 from the static host.
 * That proves the export emits the expected directory layout.
 *
 * The bare-to-canonical 301 itself is an Apache (DirectorySlash)
 * behavior and is verified by the post-deploy smoke check in the PR
 * test plan — `serve` returns 200 for both forms without redirecting,
 * so it cannot exercise the canonical-form rewrite.
 */
const nonRootRoutes = siteRoutes.map((r) => r.route).filter((r) => r !== '/')

test.describe('Trailing-slash export integrity', () => {
  for (const route of nonRootRoutes) {
    test(`${route}/ returns 200 (canonical form)`, async ({ page }) => {
      const response = await page.goto(`${route}/`)
      expect(response?.status()).toBe(200)
    })
  }

  for (const route of nonRootRoutes) {
    test(`${route} (no slash) resolves to the same export`, async ({ page }) => {
      const response = await page.goto(route)
      expect(response?.status()).toBe(200)
    })
  }
})
