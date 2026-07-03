import { execSync } from 'node:child_process'
import { join } from 'node:path'
import searchIndex from '@/data/search-index.json'

const root = join(__dirname, '..', '..')
const { entries } = searchIndex as unknown as {
  entries: { title: string; description: string; href: string; type: string }[]
}

describe('site search index', () => {
  it('committed search-index.json is current (regenerate with node scripts/build-search-index.mjs)', () => {
    execSync('node scripts/build-search-index.mjs --check', { cwd: root, stdio: 'pipe' })
  })

  it('covers the key charity self-service content', () => {
    const hrefs = entries.map((e) => e.href)
    for (const expected of ['/m365-email-guide/', '/guides/', '/impact/', '/charity-faq/']) {
      expect(hrefs).toContain(expected)
    }
    expect(entries.length).toBeGreaterThan(40)
  })

  it('has no duplicate hrefs and every entry is complete', () => {
    const hrefs = entries.map((e) => e.href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
    for (const entry of entries) {
      expect(entry.title.length).toBeGreaterThan(2)
      expect(entry.description.length).toBeGreaterThan(10)
      expect(entry.href).toMatch(/^\/[a-z0-9-]*\/?$/)
      expect(['page', 'guide', 'post']).toContain(entry.type)
    }
  })

  it('excludes noindex admin pages', () => {
    const hrefs = entries.map((e) => e.href)
    expect(hrefs).not.toContain('/ffcadmin/')
  })
})
