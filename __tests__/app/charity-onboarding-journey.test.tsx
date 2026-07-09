import React from 'react'
import { render } from '@testing-library/react'
import CharityOnboardingJourney from '@/app/charity-onboarding-journey/page'

describe('Charity Onboarding Journey page', () => {
  it('renders without crashing', () => {
    const { container } = render(<CharityOnboardingJourney />)
    expect(container).not.toBeEmptyDOMElement()
  })

  it('orders the Website stage before the Email stage', () => {
    const { container } = render(<CharityOnboardingJourney />)
    const text = container.textContent || ''
    const websiteIndex = text.indexOf('3. Website')
    const emailIndex = text.indexOf('4. Email')

    expect(websiteIndex).toBeGreaterThan(-1)
    expect(emailIndex).toBeGreaterThan(-1)
    expect(websiteIndex).toBeLessThan(emailIndex)
  })

  it('numbers the stages 1 through 5 in the corrected order', () => {
    const { container } = render(<CharityOnboardingJourney />)
    const text = container.textContent || ''

    expect(text).toContain('1. Application & validation')
    expect(text).toContain('2. Domain')
    expect(text).toContain('3. Website')
    expect(text).toContain('4. Email')
    expect(text).toContain('5. Handoff & ongoing support')
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
