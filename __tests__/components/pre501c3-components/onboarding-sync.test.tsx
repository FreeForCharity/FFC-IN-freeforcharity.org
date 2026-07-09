import React from 'react'
import { render } from '@testing-library/react'
import Charity from '@/components/pre501c3-components/charity'
import Faqs from '@/components/pre501c3-components/Faqs'

describe('pre-501c3 onboarding journey sync', () => {
  it('package list uses GitHub Pages, not WordPress', () => {
    const { container } = render(<Faqs />)
    expect(container.textContent).not.toMatch(/WordPress/i)
    expect(container.textContent).toContain('GitHub Pages')
  })

  it('explains the $1 verification charge waived by an emailed discount code', () => {
    const { container } = render(<Charity />)
    expect(container.textContent).toContain('$1')
    expect(container.textContent).toMatch(/email/i)
  })

  it('notes charity email via Microsoft 365 or Google Workspace after 501(c)(3) approval', () => {
    const { container } = render(<Charity />)
    expect(container.textContent).toContain('Microsoft 365')
    expect(container.textContent).toContain('Google Workspace')
  })

  it('never prints a literal coupon code on the page', () => {
    const { container: charityContainer } = render(<Charity />)
    const { container: faqsContainer } = render(<Faqs />)
    expect(charityContainer.textContent).not.toContain('freeforcharity2026')
    expect(faqsContainer.textContent).not.toContain('freeforcharity2026')
  })
})
