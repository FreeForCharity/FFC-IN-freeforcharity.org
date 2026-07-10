/**
 * Supported-charities directory tests (issue #444)
 *
 * The /charities-we-support/ page renders each entry as an outbound link
 * (`https://<domain>/`). The file's own inclusion criterion is "domains with a
 * working site", so these tests guard the structural invariants that keep the
 * rendered links valid and lock in the 2026-07-09 link-rot prune so the dead
 * destinations can't silently return.
 */

import directory from '@/data/supported-charities.json'

const charities = directory.charities

describe('Supported-charities directory', () => {
  it('exports a non-empty charities array', () => {
    expect(Array.isArray(charities)).toBe(true)
    expect(charities.length).toBeGreaterThan(0)
  })

  it('every entry has a truthy domain string', () => {
    for (const c of charities) {
      expect(typeof c.domain).toBe('string')
      expect(c.domain.trim()).toBe(c.domain)
      expect(c.domain.length).toBeGreaterThan(0)
    }
  })

  it('domains are bare hosts — no scheme, trailing slash, or whitespace', () => {
    for (const c of charities) {
      // The page prepends `https://` and appends `/`, so a scheme or trailing
      // slash here would produce a malformed link.
      expect(c.domain).not.toMatch(/^https?:\/\//i)
      expect(c.domain).not.toMatch(/\/$/)
      expect(c.domain).not.toMatch(/\s/)
      expect(c.domain).toMatch(/^[a-z0-9.-]+(\/[a-z0-9._~%/-]*)?$/i)
    }
  })

  it('contains no duplicate domains', () => {
    const seen = new Set<string>()
    for (const c of charities) {
      expect(seen.has(c.domain)).toBe(false)
      seen.add(c.domain)
    }
  })

  it('does not relist the domains pruned for link rot (issue #444)', () => {
    const pruned = [
      'foxtrotenterprises.com', // 522 origin offline, no working sibling
      'ghcd.onlineimpacts.org', // 403 — real per-page restriction (siblings 200)
      'kieranrunnelsdev.org', // 522 origin offline (a *dev domain)
      'techforsecurity.com', // dead (000); org still listed as tech4security.com
      'wonderseed.org', // dead (000); org still listed as wonderseedstudio(s)
      'bhakthinivedana.com/sandbox', // stale path — replaced by the root host
    ]
    const domains = new Set(charities.map((c) => c.domain))
    for (const p of pruned) {
      expect(domains.has(p)).toBe(false)
    }
  })

  it('keeps each pruned org that still has a working destination', () => {
    const domains = new Set(charities.map((c) => c.domain))
    // bhakthinivedana kept at its working root; the two dead duplicates kept
    // via their live sibling domains.
    expect(domains.has('bhakthinivedana.com')).toBe(true)
    expect(domains.has('tech4security.com')).toBe(true)
    expect(domains.has('wonderseedstudio.com')).toBe(true)
    expect(domains.has('wonderseedstudios.org')).toBe(true)
  })
})
