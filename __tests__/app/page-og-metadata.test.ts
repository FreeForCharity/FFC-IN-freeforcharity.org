import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

/**
 * OG metadata audit (issue #383): Next.js merges metadata shallowly, so a
 * page that omits `openGraph` inherits the ROOT og:title/og:description —
 * link previews would show the homepage text on every page. This suite
 * requires every route's metadata to carry page-specific og/twitter fields
 * (via the pageMetadata helper) so a new route can't regress link previews.
 */

const appDir = join(__dirname, '..', '..', 'src', 'app')

// Pages intentionally relying on the root layout's own OG block:
// - '' (homepage): the root layout defines its canonical OG metadata
// - free-for-charity-donation-policy: uses a `title: { absolute }` override
// - sentry-example-page: internal noindex tooling page (Sentry verification),
//   deliberately without social cards
const EXEMPT = new Set(['', 'free-for-charity-donation-policy', 'sentry-example-page'])

const routeDirs = [
  '',
  ...readdirSync(appDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name),
].filter((dir) => existsSync(join(appDir, dir, 'page.tsx')))

describe.each(routeDirs)('route /%s', (dir) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require(join(appDir, dir, 'page.tsx'))
  const metadata = mod.metadata

  it('exports metadata with title and description', () => {
    expect(metadata).toBeDefined()
    expect(metadata.title ?? metadata.openGraph?.title).toBeTruthy()
    expect(metadata.description).toBeTruthy()
  })

  if (!EXEMPT.has(dir)) {
    it('has page-specific openGraph and twitter fields matching the page', () => {
      expect(metadata.openGraph?.title).toBe(metadata.title)
      expect(metadata.openGraph?.description).toBe(metadata.description)
      expect(metadata.openGraph?.images?.length).toBeGreaterThan(0)
      expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical)
      expect(metadata.twitter?.title).toBe(metadata.title)
    })
  }
})
