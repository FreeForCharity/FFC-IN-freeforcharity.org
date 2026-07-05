import type { Metadata } from 'next'
import {
  ABeeZee,
  Cantata_One,
  Cinzel,
  Faustina,
  Fauna_One,
  Lato,
  Montserrat,
  Open_Sans,
  Raleway,
} from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import CookieConsent from '@/components/cookie-consent'
import ZeffyEmbedScript from '@/components/ui/ZeffyEmbedScript'
import { organizationJsonLd, webSiteJsonLd } from '@/lib/structured-data'

/* Fonts are self-hosted via next/font: downloaded at build time and served
   same-origin from /_next/static/media, so the browser never opens the
   fonts.googleapis.com / fonts.gstatic.com connections or fetches their
   render-blocking stylesheet. Static families list only the weights the
   site uses (font-[400..700]); variable families ship one file. Courier
   Prime was dropped (single decorative use — see globals.css).

   Preload policy (measured against the static export): Faustina (body),
   Open Sans (header/footer), and Lato render on all 64 exported pages, so
   their upright faces preload. Raleway renders on 2 pages and the italic
   faces of Faustina/Open Sans/Lato render on a handful, so those are
   separate preload:false registrations — next/font emits @font-face under
   the literal family name either way, so italic text still gets the true
   italic face, downloaded only on pages that render it. */
const faustina = Faustina({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-faustina',
})
const faustinaItalic = Faustina({
  preload: false,
  subsets: ['latin'],
  style: 'italic',
  display: 'swap',
  variable: '--font-faustina-italic',
})
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato',
})
// Italic Lato only ever renders at weight 400/500 (never bold), so a single
// 400-italic face avoids shipping a dead 700-italic file.
const latoItalic = Lato({
  preload: false,
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  display: 'swap',
  variable: '--font-lato-italic',
})
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
})
const openSansItalic = Open_Sans({
  preload: false,
  subsets: ['latin'],
  style: 'italic',
  display: 'swap',
  variable: '--font-open-sans-italic',
})
const raleway = Raleway({
  preload: false,
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-raleway',
})
const montserrat = Montserrat({
  preload: false,
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})
const cinzel = Cinzel({
  preload: false,
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
})
const cantataOne = Cantata_One({
  preload: false,
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-cantata-one',
})
const faunaOne = Fauna_One({
  preload: false,
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-fauna-one',
})
const abeezee = ABeeZee({
  preload: false,
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-abeezee',
})

/* Every font instance must appear here so its @font-face CSS is emitted in
   the build — the italic instances share their family's literal name (e.g.
   'Lato'), which is how italic text resolves to a true italic face. */
const fontVariables = [
  faustina,
  faustinaItalic,
  lato,
  latoItalic,
  openSans,
  openSansItalic,
  raleway,
  montserrat,
  cinzel,
  cantataOne,
  faunaOne,
  abeezee,
]
  .map((f) => f.variable)
  .join(' ')

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
    <html lang="en" className={fontVariables}>
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
