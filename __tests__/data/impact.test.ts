import {
  impact,
  reportingYear,
  yearsServing,
  resultCards,
  metric,
  volunteerHours,
  volunteerHoursBreakdown,
  volunteerHoursPending,
} from '../../src/data/impact'

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

  describe('modeled volunteer hours', () => {
    it('computes hours = hoursPerUnit x unit count for resolved lines', () => {
      for (const line of volunteerHoursBreakdown) {
        if (line.unitCount === null) {
          expect(line.hours).toBeNull()
        } else {
          expect(line.hours).toBe(line.hoursPerUnit * line.unitCount)
        }
      }
    })

    it('totals only the resolved lines and is a non-negative number', () => {
      const expected = volunteerHoursBreakdown.reduce((s, l) => s + (l.hours ?? 0), 0)
      expect(volunteerHours).toBe(expected)
      expect(volunteerHours).toBeGreaterThanOrEqual(0)
    })

    it('reports pending engagement types (no double counting)', () => {
      const pendingFromBreakdown = volunteerHoursBreakdown
        .filter((l) => l.hours === null)
        .map((l) => l.key)
      expect(volunteerHoursPending).toEqual(pendingFromBreakdown)
    })
  })
})
