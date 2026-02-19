/**
 * Data File Tests
 *
 * Verifies that data files (team, FAQs, testimonials) export
 * valid arrays with expected structure.
 */

import { team } from '@/data/team'
import { testimonials } from '@/data/testimonials'
import { faqs } from '@/data/faqs'

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

describe('FAQs Data', () => {
  it('exports an array of FAQs', () => {
    expect(Array.isArray(faqs)).toBe(true)
    expect(faqs.length).toBeGreaterThan(0)
  })

  it('each FAQ has question and answer', () => {
    for (const faq of faqs) {
      expect(faq.question).toBeTruthy()
      expect(faq.answer).toBeTruthy()
    }
  })
})
