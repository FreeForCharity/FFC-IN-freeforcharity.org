import { existsSync } from 'node:fs'
import { join } from 'node:path'
import guidesData from '@/data/guides.json'

interface Guide {
  href: string
  title: string
  promise: string
  group: string
  minutes?: number
}

const { groups, guides } = guidesData as unknown as { groups: string[]; guides: Guide[] }
const appDir = join(__dirname, '..', '..', 'src', 'app')

describe('guides registry (src/data/guides.json)', () => {
  it('every guide href points at an existing app route', () => {
    for (const guide of guides) {
      const slug = guide.href.replace(/^\/|\/$/g, '')
      const pagePath = join(appDir, slug, 'page.tsx')
      expect({ href: guide.href, exists: existsSync(pagePath) }).toEqual({
        href: guide.href,
        exists: true,
      })
    }
  })

  it('every href is kebab-case with a trailing slash', () => {
    for (const guide of guides) {
      expect(guide.href).toMatch(/^\/[a-z0-9-]+\/$/)
    }
  })

  it('every guide belongs to a declared group', () => {
    for (const guide of guides) {
      expect(groups).toContain(guide.group)
    }
  })

  it('every guide has a title and promise', () => {
    for (const guide of guides) {
      expect(guide.title.length).toBeGreaterThan(5)
      expect(guide.promise.length).toBeGreaterThan(10)
    }
  })

  it('has no duplicate hrefs', () => {
    const hrefs = guides.map((g) => g.href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })
})
