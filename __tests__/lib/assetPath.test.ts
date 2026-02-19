import { assetPath } from '@/lib/assetPath'

describe('assetPath', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('returns the path unchanged when no basePath is set', () => {
    delete process.env.NEXT_PUBLIC_BASE_PATH
    expect(assetPath('/Images/logo.webp')).toBe('/Images/logo.webp')
  })

  it('prepends basePath when NEXT_PUBLIC_BASE_PATH is set', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/freeforcharity-web'
    expect(assetPath('/Images/logo.webp')).toBe('/freeforcharity-web/Images/logo.webp')
  })

  it('handles empty basePath', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = ''
    expect(assetPath('/Svgs/icon.svg')).toBe('/Svgs/icon.svg')
  })
})
