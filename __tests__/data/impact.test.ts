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
    for (const card of resultCards) {
      expect(card.title).toBeTruthy()
      expect(card.title).not.toBe('null')
      expect(card.title).not.toBe('undefined')
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
