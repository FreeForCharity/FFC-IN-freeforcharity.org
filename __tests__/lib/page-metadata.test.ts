import { Metadata } from 'next'

describe('pageMetadata', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('generates basic metadata correctly', async () => {
    const { pageMetadata } = await import('@/lib/page-metadata')

    const result: Metadata = pageMetadata({
      title: 'Test Title',
      description: 'Test Description',
      canonical: 'https://example.com/test',
    })

    expect(result.title).toBe('Test Title')
    expect(result.description).toBe('Test Description')
    expect(result.alternates?.canonical).toBe('https://example.com/test')

    // Check OpenGraph
    expect(result.openGraph?.title).toBe('Test Title')
    expect(result.openGraph?.description).toBe('Test Description')
    expect(result.openGraph?.url).toBe('https://example.com/test')
    // @ts-expect-error type assertion
    expect(result.openGraph?.type).toBe('website')
    expect(result.openGraph?.images).toEqual([
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Free For Charity',
      },
    ])

    // Check Twitter
    expect(result.twitter?.title).toBe('Test Title')
    expect(result.twitter?.description).toBe('Test Description')
    expect(result.twitter?.images).toEqual(['/web-app-manifest-512x512.png'])
    // @ts-expect-error type assertion
    expect(result.twitter?.card).toBe('summary_large_image')
  })

  it('adds noindex when specified', async () => {
    const { pageMetadata } = await import('@/lib/page-metadata')

    const result: Metadata = pageMetadata({
      title: 'Hidden Page',
      description: 'Hidden Description',
      canonical: 'https://example.com/hidden',
      noindex: true,
    })

    expect(result.robots).toEqual({ index: false, follow: false })
  })

  it('uses custom image when provided', async () => {
    const { pageMetadata } = await import('@/lib/page-metadata')

    const result: Metadata = pageMetadata({
      title: 'Image Page',
      description: 'Image Description',
      canonical: 'https://example.com/image',
      image: {
        path: '/custom-image.png',
        width: 800,
        height: 600,
        alt: 'Custom Alt',
      },
    })

    expect(result.openGraph?.images).toEqual([
      {
        url: '/custom-image.png',
        width: 800,
        height: 600,
        alt: 'Custom Alt',
      },
    ])

    expect(result.twitter?.images).toEqual(['/custom-image.png'])
  })

  it('prepends NEXT_PUBLIC_BASE_PATH to default and custom images', async () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/base'
    const { pageMetadata } = await import('@/lib/page-metadata')

    const defaultResult: Metadata = pageMetadata({
      title: 'Title',
      description: 'Desc',
      canonical: 'https://example.com/test',
    })

    // @ts-expect-error type assertion
    expect(defaultResult.openGraph?.images?.[0]?.url).toBe('/base/web-app-manifest-512x512.png')
    // @ts-expect-error type assertion
    expect(defaultResult.twitter?.images?.[0]).toBe('/base/web-app-manifest-512x512.png')

    const customResult: Metadata = pageMetadata({
      title: 'Title',
      description: 'Desc',
      canonical: 'https://example.com/test',
      image: {
        path: '/custom.png',
        width: 100,
        height: 100,
        alt: 'Alt',
      },
    })

    // @ts-expect-error type assertion
    expect(customResult.openGraph?.images?.[0]?.url).toBe('/base/custom.png')
    // @ts-expect-error type assertion
    expect(customResult.twitter?.images?.[0]).toBe('/base/custom.png')
  })
})
