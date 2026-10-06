import { ffcAdminUrl, FFC_ADMIN_BASE } from '@/data/admin-links'

describe('ffcAdminUrl', () => {
  it('should construct a valid URL for a path with a leading slash', () => {
    const path = '/tech-stack/'
    const url = ffcAdminUrl(path)
    expect(url).toBe(`${FFC_ADMIN_BASE}/tech-stack/`)
  })

  it('should construct a valid URL for a path without a leading slash', () => {
    const path = 'tech-stack/'
    const url = ffcAdminUrl(path)
    expect(url).toBe(`${FFC_ADMIN_BASE}/tech-stack/`)
  })

  it('should handle an empty string path', () => {
    const path = ''
    const url = ffcAdminUrl(path)
    expect(url).toBe(`${FFC_ADMIN_BASE}/`)
  })

  it('should handle a path that is just a slash', () => {
    const path = '/'
    const url = ffcAdminUrl(path)
    expect(url).toBe(`${FFC_ADMIN_BASE}/`)
  })
})
