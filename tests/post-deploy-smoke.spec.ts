import { test, expect } from '@playwright/test'

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

// All routes from sitemap.ts — the single source of truth for the site
const sitemapRoutes = [
  '/',
  '/about-us',
  '/contact-us',
  '/donate',
  '/volunteer',
  '/domains',
  '/free-charity-web-hosting',
  '/help-for-charities',
  '/blog',
  '/consulting',
  '/free-training-programs',
  '/workforce-development',
  '/charity-and-nonprofit-service-and-consultant-directory',
  '/charity-and-nonprofit-technology-directory',
  '/charity-and-nonprofit-case-studies',
  '/501c3',
  '/pre501c3',
  '/free-for-charity-endowment-fund',
  '/guidestar-guide',
  '/free-for-charitys-tools-for-success',
  '/free-for-charity-ffc-service-delivery-stages',
  '/free-for-charity-ffc-web-developer-training-guide',
  '/ffc-volunteer-proving-ground-core-competencies',
  '/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes',
  '/online-impacts-onboarding-guide',
  '/techstack',
  '/donation-policy',
  '/free-for-charity-donation-policy',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
  '/vulnerability-disclosure-policy',
  '/security-acknowledgements',
]

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

        await page.goto(route, { waitUntil: 'networkidle' })

        // Check all <img> elements have loaded (naturalWidth > 0)
        const brokenImgs = await page.evaluate(() => {
          const imgs = document.querySelectorAll('img')
          const broken: string[] = []
          imgs.forEach((img) => {
            // Skip invisible images (display:none, etc.)
            if (img.offsetParent === null && !img.closest('header')) return
            // Skip external images (different origin)
            if (img.src && !img.src.startsWith(window.location.origin)) return
            // Check if image actually loaded
            if (img.src && img.naturalWidth === 0 && img.complete) {
              broken.push(`${img.alt || '(no alt)'}: ${img.src}`)
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
        } catch {
          brokenLinks.push(`ERROR ${link}`)
        }
      }

      expect(
        brokenLinks,
        `Broken internal links from homepage:\n${brokenLinks.join('\n')}`
      ).toHaveLength(0)
    })
  })
})
