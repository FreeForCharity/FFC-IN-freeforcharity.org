import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import CookieConsent from '@/components/cookie-consent'
import ZeffyEmbedScript from '@/components/ui/ZeffyEmbedScript'
import { organizationJsonLd, webSiteJsonLd } from '@/lib/structured-data'

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
    types: { 'application/rss+xml': `${basePath}/rss.xml` },
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
      <head>
        {/* Array/String/TypedArray .at() polyfill for pre-ES2022 browsers
            (Chrome <92, Safari <15.4). Both the Next.js runtime and
            third-party monitoring scripts call .at() and throw a TypeError
            in those engines; this must run before any other script. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){function at(n){n=Math.trunc(n)||0;if(n<0)n+=this.length;return n<0||n>=this.length?undefined:this[n]}var protos=[Array.prototype,String.prototype];if(typeof Int8Array==="function"){var t=Object.getPrototypeOf(Int8Array.prototype);if(t)protos.push(t)}protos.forEach(function(p){if(!p.at)Object.defineProperty(p,"at",{writable:true,configurable:true,value:at})})})()',
          }}
        />
        {/* One consolidated Google Fonts request instead of eleven serial CSS
            @imports: preconnect + a single parallel-discovered stylesheet cuts
            the render-blocking font chain to one early request. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Cantata+One&family=Cinzel:wght@400..900&family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Faustina:ital,wght@0,300..800;1,300..800&family=Fauna+One&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        />
      </head>
      <body className={`antialiased`} suppressHydrationWarning={true}>
        {/* Schema.org identity for search engines (NonprofitOrganization + WebSite). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        {/* Keyboard users can jump past the header; visible only while focused. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        {/* <PopupProvider> */}
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieConsent />
        {/* Global Zeffy pop-up engine: wires every `zeffy-form-link` element
            (incl. the footer donate button) to open its campaign in a modal,
            site-wide. Next.js dedupes the <Script>, so pages that also use
            Zeffy buttons don't double-load it. */}
        <ZeffyEmbedScript />
        {/* <PopupsRootClient /> */}
        {/* </PopupProvider> */}
      </body>
    </html>
  )
}
