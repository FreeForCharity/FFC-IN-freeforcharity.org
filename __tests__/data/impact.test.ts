import { impact, reportingYear, yearsServing, resultCards, metric } from '../../src/data/impact'

describe('impact data', () => {
  it('exposes a numeric reporting year and IRS designation year', () => {
    expect(typeof reportingYear).toBe('number')
    expect(typeof impact.irsDesignationYear).toBe('number')
    expect(reportingYear).toBeGreaterThanOrEqual(impact.irsDesignationYear)
  })

  it('computes years serving from the IRS designation year', () => {
    expect(yearsServing).toBe(reportingYear - impact.irsDesignationYear)
  })

  it('renders exactly four headline result cards with concrete values', () => {
    expect(resultCards).toHaveLength(4)
    expect(new Set(resultCards.map((c) => c.key)).size).toBe(resultCards.length)
    for (const card of resultCards) {
      expect(card.key).toBeTruthy()
      expect(card.title).toBeTruthy()
      expect(card.title).not.toBe('null')
      expect(card.title).not.toBe('undefined')
      // a missing value must never leak through a formatter as "null+", nor
      // should an already-"+"-suffixed value double up to "++"
      expect(card.title).not.toContain('null')
      expect(card.title).not.toContain('++')
      expect(card.description).toBeTruthy()
    }
  })

  it('gives every metric a provenance and confidence', () => {
    for (const m of Object.values(impact.metrics)) {
      expect(m.source).toBeTruthy()
      expect(['high', 'medium', 'low', 'unknown']).toContain(m.confidence)
    }
  })

  it('throws for an unknown metric key', () => {
    expect(() => metric('does-not-exist')).toThrow()
  })
})
