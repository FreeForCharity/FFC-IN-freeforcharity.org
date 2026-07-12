import React from 'react'
import { render } from '@testing-library/react'
import CharityOnboardingJourney from '@/app/charity-onboarding-journey/page'
import { journeyStages } from '@/data/journey'

describe('Charity Onboarding Journey page', () => {
  it('renders without crashing', () => {
    const { container } = render(<CharityOnboardingJourney />)
    expect(container).not.toBeEmptyDOMElement()
  })

  it('orders the Website stage before the Domain stage (the funding gate)', () => {
    const { container } = render(<CharityOnboardingJourney />)
    const text = container.textContent || ''
    const websiteIndex = text.indexOf('2. Website')
    const domainIndex = text.indexOf('3. Domain')
    const emailIndex = text.indexOf('4. Email')

    // The gated journey: the site is built and validated on GitHub Pages
    // before FFC spends money on a domain, and email comes after the domain.
    expect(websiteIndex).toBeGreaterThan(-1)
    expect(domainIndex).toBeGreaterThan(-1)
    expect(emailIndex).toBeGreaterThan(-1)
    expect(websiteIndex).toBeLessThan(domainIndex)
    expect(domainIndex).toBeLessThan(emailIndex)
  })

  it('numbers the stages 1 through 5 in the gated order', () => {
    const { container } = render(<CharityOnboardingJourney />)
    const text = container.textContent || ''

    expect(text).toContain('1. Application & validation')
    expect(text).toContain('2. Website — built and proven first')
    expect(text).toContain('3. Domain — only after your site is proven')
    expect(text).toContain('4. Email')
    expect(text).toContain('5. Handoff & ongoing support')
  })

  it('renders every stage gateNote from the shared journey module', () => {
    const { container } = render(<CharityOnboardingJourney />)
    const text = container.textContent || ''

    // The gate relationship of each stage (src/data/journey.ts gateNote) is
    // shown as an emphasized line in the stage cards — it must not be dead data.
    for (const stage of journeyStages) {
      expect(text).toContain(stage.gateNote)
    }
  })

  it('offers both Microsoft 365 and Google Workspace as email options', () => {
    const { container } = render(<CharityOnboardingJourney />)
    const text = container.textContent || ''

    expect(text).toContain('Microsoft 365')
    expect(text).toContain('Google Workspace')
  })

  it('explains that nonprofit email programs require a live website first', () => {
    const { container } = render(<CharityOnboardingJourney />)
    const text = container.textContent || ''

    expect(text).toMatch(/require a live website/i)
  })

  it('links both the Microsoft 365 and Google for Nonprofits guides', () => {
    const { container } = render(<CharityOnboardingJourney />)
    const hrefs = Array.from(container.querySelectorAll('a')).map(
      (a) => a.getAttribute('href') ?? ''
    )

    expect(hrefs.some((h) => h.includes('/m365-email-guide'))).toBe(true)
    expect(hrefs.some((h) => h.includes('/google-for-nonprofits-guide'))).toBe(true)
  })
})
