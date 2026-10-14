import React from 'react'
import { render } from '@testing-library/react'
import Charity from '@/components/pre501c3-components/charity'
import Faqs from '@/components/pre501c3-components/Faqs'
import ApplicationChecklist from '@/components/pre501c3-components/application-checklist'

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

  it('never prints a coupon code on the page', () => {
    // Match any freeforcharity<year> coupon pattern so the literal secret
    // is never committed to the repo (epic #446 hard rule).
    const couponPattern = /freeforcharity\d{4}/i
    const { container: charityContainer } = render(<Charity />)
    const { container: faqsContainer } = render(<Faqs />)
    const { container: checklistContainer } = render(<ApplicationChecklist />)
    expect(charityContainer.textContent).not.toMatch(couponPattern)
    expect(faqsContainer.textContent).not.toMatch(couponPattern)
    expect(checklistContainer.textContent).not.toMatch(couponPattern)
  })

  it('builds the site right after approval, with no separate website order', () => {
    const { container } = render(<Charity />)
    const text = container.textContent ?? ''
    expect(text).not.toMatch(/order your GitHub Pages website service/i)
    expect(text).toMatch(/no separate website order/i)
    expect(text).toMatch(/preview link/i)
    expect(text).toMatch(/coupon in your onboarding acceptance email/i)
  })
})

describe('pre-501c3 application checklist (pid 16, 2026-10-14)', () => {
  it('lists the fields newly required on the pre-501(c)(3) form', () => {
    const { container } = render(<ApplicationChecklist />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/Company Name/)
    expect(text).toMatch(/GitHub username/)
    expect(text).toMatch(/tagline/i)
    expect(text).toMatch(/first program/i)
    expect(text).toMatch(/year you were founded/i)
    expect(text).toMatch(/consent tickbox/i)
    expect(text).toMatch(/working LinkedIn profile link for your Chair, Secretary and Treasurer/i)
    expect(text).toMatch(/current or desired domain name/i)
  })

  it('marks Zeffy and Idealist optional only for groups that cannot get them yet', () => {
    const { container } = render(<ApplicationChecklist />)
    const optional = container.querySelector('ul')?.textContent ?? ''
    expect(optional).toMatch(/Zeffy donation form link and Idealist volunteer page link/i)
    expect(optional).toMatch(/can.t get them yet/i)
  })

  it('links the setup guides', () => {
    const { container } = render(<ApplicationChecklist />)
    const hrefs = Array.from(container.querySelectorAll('a')).map(
      (a) => a.getAttribute('href') ?? ''
    )
    for (const url of [
      'https://ffcadmin.org/guides/zeffy-organization/',
      'https://ffcadmin.org/guides/idealist-organization/',
      'https://ffcadmin.org/guides/linkedin/',
      'https://ffcadmin.org/guides/github-account/',
      'https://ffcadmin.org/guides/candid/',
      'https://ffcadmin.org/guides/google-voice/',
    ]) {
      expect(hrefs).toContain(url)
    }
  })
})
