/**
 * Data File Tests
 *
 * Verifies that data files (team, FAQs, testimonials) export
 * valid arrays with expected structure.
 */

import { team } from '@/data/team'
import { testimonials } from '@/data/testimonials'
import { domainDonationTaxFaq, hostingBacklogFaq } from '@/data/faqs'

describe('Team Data', () => {
  it('exports an array of team members', () => {
    expect(Array.isArray(team)).toBe(true)
    expect(team.length).toBeGreaterThan(0)
  })

  it('each member has name and title', () => {
    for (const member of team) {
      expect(member.name).toBeTruthy()
      expect(member.title).toBeTruthy()
    }
  })

  it('each member has an imageUrl', () => {
    for (const member of team) {
      expect(member.imageUrl).toBeTruthy()
    }
  })

  it('each member has a linkedinUrl', () => {
    for (const member of team) {
      expect(member.linkedinUrl).toBeTruthy()
      expect(member.linkedinUrl).toMatch(/linkedin\.com/)
    }
  })
})

describe('Testimonials Data', () => {
  it('exports an array of testimonials', () => {
    expect(Array.isArray(testimonials)).toBe(true)
    expect(testimonials.length).toBeGreaterThan(0)
  })

  it('each testimonial has required fields', () => {
    for (const t of testimonials) {
      expect(t.author).toBeTruthy()
      expect(t.role).toBeTruthy()
      expect(t.quote).toBeTruthy()
    }
  })
})

describe('Shared FAQ Data (single-sourced copy)', () => {
  it('hosting backlog FAQ has question, backlog answer, and ways to get in faster', () => {
    expect(hostingBacklogFaq.question).toBeTruthy()
    expect(hostingBacklogFaq.backlog).toBeTruthy()
    expect(hostingBacklogFaq.waysHeading).toBeTruthy()
    expect(hostingBacklogFaq.ways.length).toBeGreaterThan(0)
    for (const way of hostingBacklogFaq.ways) {
      expect(way.before).toBeTruthy()
      if (way.link) {
        expect(way.link.href).toBeTruthy()
        expect(way.link.label).toBeTruthy()
      }
    }
  })

  it('reflects the gated journey (domain purchased after site validation)', () => {
    const allText = [
      hostingBacklogFaq.backlog,
      ...hostingBacklogFaq.ways.flatMap((w) => [w.before, w.after ?? '']),
    ].join(' ')
    expect(allText).toMatch(/once your site is validated/i)
    expect(allText).not.toMatch(/eNom/i)
  })

  it('tax-deduction FAQ has question and answer with the EIN', () => {
    expect(domainDonationTaxFaq.question).toBeTruthy()
    expect(domainDonationTaxFaq.answer).toContain('46-2471893')
  })
})
