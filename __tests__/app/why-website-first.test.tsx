import React from 'react'
import { render } from '@testing-library/react'
import { axe } from '../utils/axe'
import WhyWebsiteFirst from '@/app/why-website-first/page'

describe('Why Website First page', () => {
  it('renders without crashing', () => {
    const { container } = render(<WhyWebsiteFirst />)
    expect(container).not.toBeEmptyDOMElement()
  })

  it('tells the website-first story: donor trust, no sunk costs, competence filter', () => {
    const { container } = render(<WhyWebsiteFirst />)
    const text = container.textContent || ''

    expect(text).toMatch(/donor trust/i)
    expect(text).toMatch(/no sunk costs/i)
    expect(text).toMatch(/competence filter/i)
  })

  it('lists all four gates in order: validation, website, funding, email', () => {
    const { container } = render(<WhyWebsiteFirst />)
    const text = container.textContent || ''

    const validation = text.indexOf('Gate 1 — Validation')
    const website = text.indexOf('Gate 2 — Website')
    const funding = text.indexOf('Gate 3 — Funding')
    const email = text.indexOf('Gate 4 — Email')

    expect(validation).toBeGreaterThan(-1)
    expect(website).toBeGreaterThan(validation)
    expect(funding).toBeGreaterThan(website)
    expect(email).toBeGreaterThan(funding)
  })

  it('introduces both templates', () => {
    const { container } = render(<WhyWebsiteFirst />)
    const text = container.textContent || ''

    expect(text).toContain('Single Page Site Template')
    expect(text).toContain('Footer-Only Template')
  })

  it('explains the two-templates-one-standard model converging at Gate 3', () => {
    const { container } = render(<WhyWebsiteFirst />)
    const text = container.textContent || ''

    expect(text).toContain('Two templates, one standard')
    expect(text).toMatch(/converge at Gate 3/i)
  })

  it('links the template chooser and both template repositories', () => {
    const { container } = render(<WhyWebsiteFirst />)
    const hrefs = Array.from(container.querySelectorAll('a')).map(
      (a) => a.getAttribute('href') ?? ''
    )

    // Next.js <Link> normalizes away the pre-hash trailing slash when rendering.
    expect(
      hrefs.some(
        (h) => h.includes('/free-charity-web-hosting') && h.includes('#choose-your-template')
      )
    ).toBe(true)
    expect(hrefs).toContain('https://github.com/FreeForCharity/FFC-IN-FFC_Single_Page_Template')
    // Footer repo name uses underscores — a hyphenated URL would 404.
    expect(hrefs).toContain('https://github.com/FreeForCharity/FFC-IN-Footer_Only_Template')
  })

  it('renders the journey diagram', () => {
    const { getByRole } = render(<WhyWebsiteFirst />)
    const diagram = getByRole('img', {
      name: /five-stage Free For Charity onboarding journey/i,
    })
    expect(diagram).toBeInTheDocument()
  })

  it('links the CTA to /help-for-charities/ and cross-links the journey page', () => {
    const { container } = render(<WhyWebsiteFirst />)
    const hrefs = Array.from(container.querySelectorAll('a')).map(
      (a) => a.getAttribute('href') ?? ''
    )

    expect(hrefs.some((h) => h.includes('/help-for-charities'))).toBe(true)
    expect(hrefs.some((h) => h.includes('/charity-onboarding-journey'))).toBe(true)
    expect(hrefs.some((h) => h.includes('/free-charity-web-hosting'))).toBe(true)
  })

  it('has no axe violations', async () => {
    const { container } = render(<WhyWebsiteFirst />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})
