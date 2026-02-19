/**
 * Sitemap Tests
 *
 * Verifies that the sitemap function generates valid entries
 * for all expected routes with proper structure.
 */

import sitemap from '@/app/sitemap'

describe('sitemap', () => {
  const entries = sitemap()

  it('generates entries for all public routes', () => {
    expect(entries.length).toBeGreaterThanOrEqual(30)
  })

  it('includes the homepage with highest priority', () => {
    const home = entries.find((e) => e.url === 'https://www.freeforcharity.org/')
    expect(home).toBeDefined()
    expect(home!.priority).toBe(1)
  })

  it('includes key pages', () => {
    const urls = entries.map((e) => e.url)
    expect(urls).toContain('https://www.freeforcharity.org/about-us')
    expect(urls).toContain('https://www.freeforcharity.org/contact-us')
    expect(urls).toContain('https://www.freeforcharity.org/donate')
    expect(urls).toContain('https://www.freeforcharity.org/privacy-policy')
  })

  it('all entries have required fields', () => {
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/www\.freeforcharity\.org/)
      expect(entry.lastModified).toBeInstanceOf(Date)
      expect(entry.changeFrequency).toBeTruthy()
      expect(entry.priority).toBeGreaterThanOrEqual(0)
      expect(entry.priority).toBeLessThanOrEqual(1)
    }
  })

  it('policy pages have low priority', () => {
    const policyPages = entries.filter(
      (e) =>
        e.url.includes('privacy-policy') ||
        e.url.includes('terms-of-service') ||
        e.url.includes('cookie-policy')
    )
    for (const page of policyPages) {
      expect(page.priority).toBeLessThanOrEqual(0.3)
    }
  })
})
