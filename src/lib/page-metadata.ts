import type { Metadata } from 'next'

// Page-level metadata builder (issue #383). Next.js merges metadata shallowly
// per top-level key, so a page that sets only `title`/`description` inherits
// the ROOT openGraph/twitter objects — link previews then show the homepage
// title on every page. This helper emits matching og/twitter fields per page
// so shared links preview correctly. Root layout keeps the site-wide defaults.

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const OG_IMAGE = {
  url: `${basePath}/web-app-manifest-512x512.png`,
  width: 512,
  height: 512,
  alt: 'Free For Charity',
}

/** Per-page social-card override; `path` is the asset path under public/. */
export interface PageOgImage {
  path: string
  width: number
  height: number
  alt: string
}

export function pageMetadata(input: {
  title: string
  description: string
  canonical: string
  noindex?: boolean
  image?: PageOgImage
}): Metadata {
  const { title, description, canonical, noindex, image } = input
  const ogImage = image
    ? { url: `${basePath}${image.path}`, width: image.width, height: image.height, alt: image.alt }
    : OG_IMAGE
  return {
    title,
    description,
    alternates: { canonical },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: 'website',
      siteName: 'Free For Charity',
      url: canonical,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@freeforcharity',
      title,
      description,
      images: [ogImage.url],
    },
  }
}
