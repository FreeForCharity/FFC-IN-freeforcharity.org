import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import ReadyToGetStartedAndFaqs from '@/components/501c3-components/Ready-to-get-started-and-faqs/index'
import Help from '@/components/501c3-components/Help-For-Charities-and-Nonprofit'

// Mock the assetPath helper (GitHub Pages base-path helper) so asset URLs
// resolve to plain paths in the test environment.
jest.mock('@/lib/assetPath', () => ({
  assetPath: (path: string) => path,
}))

describe('501c3-components/Ready-to-get-started-and-faqs', () => {
  it('renders without crashing', () => {
    const { container } = render(<ReadyToGetStartedAndFaqs />)
    expect(container).toBeInTheDocument()
  })

  it('no longer references the retired InterServer/Softaculous hosting model', () => {
    const { container } = render(<ReadyToGetStartedAndFaqs />)
    expect(container.textContent).not.toMatch(/InterServer/i)
    expect(container.textContent).not.toMatch(/Softaculous/i)
  })

  it('describes the website as a GitHub Pages static site', () => {
    const { container } = render(<ReadyToGetStartedAndFaqs />)
    expect(container.textContent).toContain('GitHub Pages')
  })

  it('offers both Microsoft 365 and Google Workspace for email', () => {
    const { container } = render(<ReadyToGetStartedAndFaqs />)
    expect(container.textContent).toContain('Microsoft 365')
    expect(container.textContent).toContain('Google Workspace')
  })

  it('builds right after approval with no separate website application code step', () => {
    const { container } = render(<ReadyToGetStartedAndFaqs />)
    const text = container.textContent ?? ''
    expect(text).not.toMatch(/code to submit your website application/i)
    expect(text).toMatch(/no\s+separate website application/i)
    expect(text).toMatch(/preview link/i)
  })

  it('orders approve → build → preview → charity approves → domain (coupon) → email', () => {
    const { container } = render(<ReadyToGetStartedAndFaqs />)
    const text = container.textContent ?? ''
    const steps = [
      'We approve your application.',
      'A volunteer builds your site',
      'We email you a preview link',
      'You review the preview and approve it',
      'You order your free .org domain with the coupon in your acceptance email',
      'We set up your charity email.',
    ].map((s) => text.indexOf(s))
    for (const i of steps) expect(i).toBeGreaterThan(-1)
    for (let n = 1; n < steps.length; n++) expect(steps[n]).toBeGreaterThan(steps[n - 1])
  })

  it('never prints a coupon code on the page', () => {
    const { container } = render(<ReadyToGetStartedAndFaqs />)
    expect(container.textContent).not.toMatch(/freeforcharity\d{4}/i)
  })
})

describe('501c3-components/Help-For-Charities-and-Nonprofit checklist', () => {
  it('lists the fields newly required on 2026-10-14', () => {
    const { container } = render(<Help />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/Company Name/)
    expect(text).toMatch(/whether you already own it/i)
    expect(text).toMatch(/GitHub username/)
    expect(text).toMatch(/tagline/i)
    expect(text).toMatch(/short\s+description under 200 characters/i)
    expect(text).toMatch(/year you were founded/i)
    expect(text).toMatch(/consent tickbox/i)
    expect(text).toMatch(/working LinkedIn profile link/i)
    expect(text).toMatch(/Zeffy donation form link/i)
    expect(text).toMatch(/Idealist volunteer page link/i)
  })

  it('links each checklist item to its free setup guide', () => {
    const { container } = render(<Help />)
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
      'https://ffcadmin.org/guides/application-fields/',
    ]) {
      expect(hrefs).toContain(url)
    }
  })
})
