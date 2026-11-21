import { charityProfiles, categoryHeadings, PROFILES_LAST_CHECKED } from '@/data/charity-profiles'

describe('charity profiles data', () => {
  it('lists at least one profile', () => {
    expect(charityProfiles.length).toBeGreaterThan(0)
  })

  it('every profile links over https and providers are unique', () => {
    const names = new Set<string>()
    for (const p of charityProfiles) {
      expect(p.url).toMatch(/^https:\/\//)
      expect(p.shows.length).toBeGreaterThan(20)
      expect(categoryHeadings[p.category]).toBeDefined()
      expect(names.has(p.provider)).toBe(false)
      names.add(p.provider)
    }
  })

  it('records the date the links were last checked', () => {
    expect(PROFILES_LAST_CHECKED).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
