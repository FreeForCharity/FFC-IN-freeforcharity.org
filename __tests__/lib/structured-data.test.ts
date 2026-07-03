import { organizationJsonLd, webSiteJsonLd } from '@/lib/structured-data'

describe('structured data (JSON-LD)', () => {
  it('organization schema has the required identity fields', () => {
    expect(organizationJsonLd['@context']).toBe('https://schema.org')
    expect(organizationJsonLd['@type']).toBe('NonprofitOrganization')
    expect(organizationJsonLd.name).toBe('Free For Charity')
    expect(organizationJsonLd.taxID).toBe('46-2471893')
    expect(organizationJsonLd.nonprofitStatus).toBe('https://schema.org/Nonprofit501c3')
    expect(organizationJsonLd.url).toBe('https://www.freeforcharity.org/')
  })

  it('sameAs includes the Candid profile and GitHub org', () => {
    const sameAs = organizationJsonLd.sameAs.join(' ')
    expect(sameAs).toContain('app.candid.org/profile/9326392')
    expect(sameAs).toContain('github.com/FreeForCharity')
  })

  it('serializes to valid JSON without undefined values', () => {
    for (const schema of [organizationJsonLd, webSiteJsonLd]) {
      const roundTripped = JSON.parse(JSON.stringify(schema))
      expect(roundTripped).toEqual(schema)
      expect(JSON.stringify(schema)).not.toContain('undefined')
    }
  })

  it('website schema is well-formed', () => {
    expect(webSiteJsonLd['@type']).toBe('WebSite')
    expect(webSiteJsonLd.url).toBe('https://www.freeforcharity.org/')
  })
})
