import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import CookieConsent from '@/components/cookie-consent'

// Get basePath for GitHub Pages deployment
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Single source of truth for the site description so the meta, OpenGraph, and
// Twitter tags never drift. SITE_DESCRIPTION is the full SEO description;
// SOCIAL_DESCRIPTION is the shorter line used for social previews.
const SITE_DESCRIPTION =
  'Free For Charity builds free websites for nonprofits—fast, secure GitHub Pages static sites built with AI development agents—plus free domains and Microsoft 365, so charities put more resources back into their missions.'
const SOCIAL_DESCRIPTION =
  'Free websites for nonprofits—fast, secure GitHub Pages static sites built with AI—plus free domains and Microsoft 365.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.freeforcharity.org'),
  title: {
    default: 'Free For Charity | Reduce Costs, Increase Impact',
    template: '%s | Free For Charity',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'nonprofit',
    'charity',
    'volunteer',
    'donate',
    'free nonprofit website',
    'GitHub Pages hosting',
    'static site',
    'AI website development',
    'free hosting',
    'domains',
    'Microsoft 365',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.freeforcharity.org/',
    siteName: 'Free For Charity',
    title: 'Free For Charity | Reduce Costs, Increase Impact',
    description: SOCIAL_DESCRIPTION,
    images: [
      {
        url: `${basePath}/web-app-manifest-512x512.png`,
        width: 512,
        height: 512,
        alt: 'Free For Charity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@freeforcharity',
    title: 'Free For Charity | Reduce Costs, Increase Impact',
    description: SOCIAL_DESCRIPTION,
    images: [`${basePath}/web-app-manifest-512x512.png`],
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: 'any' },
      { url: `${basePath}/icon.png`, type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }],
  },
  manifest: `${basePath}/site.webmanifest`,
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`} suppressHydrationWarning={true}>
        {/* <PopupProvider> */}
        <Header />
        {children}
        <Footer />
        <CookieConsent />
        {/* <PopupsRootClient /> */}
        {/* </PopupProvider> */}
      </body>
    </html>
  )
}
