import React from 'react'
import { render } from '@testing-library/react'
import { axe } from '../utils/axe'
import WebsiteTemplates from '@/app/website-templates/page'
import { templateOptions } from '@/data/templates'

describe('Website Templates page', () => {
  it('renders without crashing', () => {
    const { container } = render(<WebsiteTemplates />)
    expect(container).not.toBeEmptyDOMElement()
  })

  it('presents both templates from the shared data module', () => {
    const { container } = render(<WebsiteTemplates />)
    const text = container.textContent || ''

    expect(templateOptions).toHaveLength(2)
    for (const template of templateOptions) {
      expect(text).toContain(template.title)
      expect(text).toContain(template.eyebrow)
    }
  })

  it('links both template repositories', () => {
    const { container } = render(<WebsiteTemplates />)
    const hrefs = Array.from(container.querySelectorAll('a')).map(
      (a) => a.getAttribute('href') ?? ''
    )

    for (const template of templateOptions) {
      expect(hrefs).toContain(template.repoUrl)
    }
  })

  it('explains every footer item the standard requires', () => {
    const { container } = render(<WebsiteTemplates />)
    const text = container.textContent || ''

    // The item-by-item rationale is the heart of the page — each of these
    // anchors one footer element and must survive future edits.
    expect(text).toMatch(/Candid \(GuideStar\) seal, profile link, and EIN/i)
    expect(text).toMatch(/donate pathway/i)
    expect(text).toMatch(/Two donation policies/i)
    expect(text).toMatch(/Privacy policy, cookie policy/i)
    expect(text).toMatch(/Terms of service/i)
    expect(text).toMatch(/Vulnerability disclosure policy/i)
    expect(text).toMatch(/Real-world contact details/i)
    expect(text).toMatch(/Supported by Free For Charity/i)
    expect(text).toMatch(/copyright line that only claims what is true/i)
  })

  it('states the Level 1 / Level 2 rule honestly', () => {
    const { container } = render(<WebsiteTemplates />)
    const text = container.textContent || ''

    expect(text).toMatch(/Level 1/)
    expect(text).toMatch(/Level 2/)
    expect(text).toMatch(/false claims/i)
  })

  it('keeps the website-first order: validation on GitHub Pages before domain, then email', () => {
    const { container } = render(<WebsiteTemplates />)
    const text = container.textContent || ''

    const pages = text.indexOf('GitHub Pages address first')
    const domain = text.indexOf('.org domain')
    expect(pages).toBeGreaterThan(-1)
    expect(domain).toBeGreaterThan(pages)
  })

  it('has no basic accessibility violations', async () => {
    const { container } = render(<WebsiteTemplates />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
