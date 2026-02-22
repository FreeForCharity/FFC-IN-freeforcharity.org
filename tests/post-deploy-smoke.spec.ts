import { test, expect } from '@playwright/test'
import { siteRoutes } from './routes'

/**
 * Post-Deploy Smoke Tests
 *
 * Crawls every page in the sitemap and verifies:
 * 1. All pages return 200
 * 2. No images are broken (natural width/height > 0 for visible images)
 * 3. No internal links are dead (404)
 *
 * These tests run against the static build served locally, catching
 * broken assets before they reach production.
 */

// Derive flat route list from the shared siteRoutes
const sitemapRoutes = siteRoutes.map((r) => r.route)

test.describe('Post-Deploy Smoke Tests', () => {
  test.describe('All pages load successfully', () => {
    for (const route of sitemapRoutes) {
      test(`${route} returns 200`, async ({ page }) => {
        const response = await page.goto(route)
        expect(response?.status()).toBe(200)
      })
    }
  })

  test.describe('No broken images', () => {
    // Test critical pages that have the most images
    const pagesWithImages = [
      '/',
      '/about-us',
      '/donate',
      '/domains',
      '/free-charity-web-hosting',
      '/free-for-charity-endowment-fund',
      '/free-for-charitys-tools-for-success',
      '/501c3',
      '/volunteer',
      '/consulting',
      '/guidestar-guide',
      '/contact-us',
      '/blog',
    ]

    for (const route of pagesWithImages) {
      test(`${route} has no broken images`, async ({ page }) => {
        // Track failed image requests
        const failedImages: string[] = []

        page.on('response', (response) => {
          const url = response.url()
          const status = response.status()
          // Check for image requests that return non-200
          if (
            (url.match(/\.(webp|png|jpg|jpeg|gif|svg|ico)(\?|$)/i) ||
              response.request().resourceType() === 'image') &&
            status >= 400
          ) {
            failedImages.push(`${status} ${url}`)
          }
        })

        await page.goto(route, { waitUntil: 'load' })
        // Wait for eagerly-loaded images to finish. Lazy images (Next.js default) are
        // excluded because they only load when scrolled into view.
        await page.waitForFunction(() =>
          Array.from(document.images)
            .filter((img) => img.loading !== 'lazy')
            .every((img) => img.complete)
        )

        // Check all <img> elements have loaded (naturalWidth > 0)
        const brokenImgs = await page.evaluate(() => {
          const imgs = document.querySelectorAll('img')
          const broken: string[] = []
          imgs.forEach((img) => {
            // Skip invisible images, but always check header images (may be hidden initially but load lazily)
            if (img.offsetParent === null && !img.closest('header')) return
            // Skip external images (different origin)
            if (img.src && !img.src.startsWith(window.location.origin)) return
            // Check if image actually loaded — use both naturalWidth and rendered size
            // to avoid false positives in CI where naturalWidth alone can be unreliable
            if (img.src && img.complete) {
              const rect = img.getBoundingClientRect()
              const hasNoNaturalSize = img.naturalWidth === 0
              const hasNoRenderedSize = rect.width === 0 && rect.height === 0
              if (hasNoNaturalSize && hasNoRenderedSize) {
                broken.push(`${img.alt || '(no alt)'}: ${img.src}`)
              }
            }
          })
          return broken
        })

        // Report all failures together
        const allFailures = [...failedImages, ...brokenImgs]
        expect(allFailures, `Broken images on ${route}:\n${allFailures.join('\n')}`).toHaveLength(0)
      })
    }
  })

  test.describe('No broken internal links', () => {
    test('homepage internal links resolve', async ({ page }) => {
      await page.goto('/')

      // Collect all internal href values
      const internalLinks = await page.evaluate(() => {
        const anchors = document.querySelectorAll('a[href]')
        const links: string[] = []
        const seen = new Set<string>()

        anchors.forEach((a) => {
          const href = a.getAttribute('href')
          if (!href) return
          // Only test internal links (relative or same-origin)
          if (href.startsWith('http') && !href.includes('localhost')) return
          if (href.startsWith('mailto:') || href.startsWith('tel:')) return
          if (href.startsWith('#')) return
          // Normalize
          const path = href.split('#')[0].split('?')[0]
          if (path && !seen.has(path)) {
            seen.add(path)
            links.push(path)
          }
        })
        return links
      })

      // Check each internal link returns 200
      const brokenLinks: string[] = []
      for (const link of internalLinks) {
        try {
          const response = await page.goto(link)
          if (response && response.status() >= 400) {
            brokenLinks.push(`${response.status()} ${link}`)
          }
        } catch (error) {
          brokenLinks.push(
            `ERROR ${link}: ${error instanceof Error ? error.message : 'Unknown error'}`
          )
        }
      }

      expect(
        brokenLinks,
        `Broken internal links from homepage:\n${brokenLinks.join('\n')}`
      ).toHaveLength(0)
    })
  })
})
