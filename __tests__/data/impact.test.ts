import {
  impact,
  reportingYear,
  yearsServing,
  resultCards,
  metric,
  volunteerHours,
  volunteerHoursBreakdown,
  volunteerHoursPending,
  textMetrics,
  textSupportHoursByYear,
  textSupportHours,
  reachoutVelocityByYear,
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

  describe('text-derived metrics (2025 template)', () => {
    const y2025 = textMetrics.years['2025']

    it('2025 byParty sums to the total thread count', () => {
      expect(y2025.byParty).not.toBeNull()
      const p = y2025.byParty!
      expect(p.volunteer + p.newCharity + p.existingCharity + p.noise).toBe(y2025.totalThreads)
    })

    it('2025 category split sums to charityThreads', () => {
      expect(y2025.charityThreadsByCategory).not.toBeNull()
      const sum = Object.values(y2025.charityThreadsByCategory!).reduce((s, n) => s + n, 0)
      expect(sum).toBe(y2025.charityThreads)
    })

    it('derives a positive 2025 text-support hour figure and surfaces velocity', () => {
      expect(textSupportHoursByYear['2025']).toBeGreaterThan(0)
      expect(textSupportHours).toBeGreaterThanOrEqual(textSupportHoursByYear['2025'])
      expect(reachoutVelocityByYear['2025']).toEqual({ volunteer: 34, newCharity: 42 })
    })

    it('leaves pending years null (no fabricated splits)', () => {
      for (const yr of ['2026']) {
        expect(textMetrics.years[yr].byParty).toBeNull()
        expect(textMetrics.years[yr].charityThreadsByCategory).toBeNull()
        expect(textSupportHoursByYear[yr]).toBeUndefined()
      }
    })

    describe.each(['2023', '2024'])('classified back-year %s', (yr) => {
      const y = textMetrics.years[yr]

      it('byParty sums to the total thread count', () => {
        expect(y.byParty).not.toBeNull()
        const p = y.byParty!
        expect(p.volunteer + p.newCharity + p.existingCharity + p.noise).toBe(y.totalThreads)
      })

      it('category split sums to charityThreads (= newCharity + existingCharity)', () => {
        expect(y.charityThreadsByCategory).not.toBeNull()
        expect(y.byParty).not.toBeNull()
        const p = y.byParty!
        expect(y.charityThreads).toBe(p.newCharity + p.existingCharity)
        const sum = Object.values(y.charityThreadsByCategory!).reduce((s, n) => s + n, 0)
        expect(sum).toBe(y.charityThreads)
      })

      it('derives a positive text-support hour figure and an independent velocity', () => {
        expect(textSupportHoursByYear[yr]).toBeGreaterThan(0)
        expect(y.netNewReachouts).not.toBeNull()
        expect(y.byParty).not.toBeNull()
        expect(reachoutVelocityByYear[yr]).toBeDefined()
        const v = reachoutVelocityByYear[yr]
        const p = y.byParty!
        // distinct first-contact senders must not exceed the thread-level party totals
        expect(v.volunteer).toBeGreaterThan(0)
        expect(v.volunteer).toBeLessThanOrEqual(p.volunteer)
        expect(v.newCharity).toBeLessThanOrEqual(p.newCharity)
      })
    })
  })
})
