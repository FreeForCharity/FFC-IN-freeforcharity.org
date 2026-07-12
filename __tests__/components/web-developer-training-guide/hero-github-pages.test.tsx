import React from 'react'
import { render } from '@testing-library/react'
import Hero from '@/components/free-for-charity-ffc-web-developer-training-guide-components/Hero'

// Mock the assetPath helper (matches other component tests)
jest.mock('@/lib/assetPath', () => ({
  assetPath: (path: string) => path,
}))

describe('Web Developer Training Guide Hero (GitHub Pages current model + legacy WordPress)', () => {
  it('describes the current GitHub Pages static-site model', () => {
    const { container } = render(<Hero />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/GitHub Pages/)
  })

  it('clearly marks the retired WordPress workflow as legacy', () => {
    const { container } = render(<Hero />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/legacy/i)
  })

  it('teaches the gated journey in order: approve → application → build → validate → domain → email', () => {
    const { container } = render(<Hero />)
    const text = container.textContent ?? ''

    const approved = text.indexOf('Charity approved')
    const application = text.indexOf('Website application')
    const build = text.indexOf('Build from one of two templates')
    const validate = text.indexOf('Validate on GitHub Pages')
    const domain = text.indexOf('Domain via WHMCS')
    const email = text.indexOf('Email last')

    expect(approved).toBeGreaterThan(-1)
    expect(application).toBeGreaterThan(approved)
    expect(build).toBeGreaterThan(application)
    expect(validate).toBeGreaterThan(build)
    expect(domain).toBeGreaterThan(validate)
    expect(email).toBeGreaterThan(domain)
  })

  it('links both template repositories (footer repo uses underscores)', () => {
    const { container } = render(<Hero />)
    const hrefs = Array.from(container.querySelectorAll('a')).map(
      (a) => a.getAttribute('href') ?? ''
    )
    expect(hrefs).toContain('https://github.com/FreeForCharity/FFC-IN-FFC_Single_Page_Template')
    expect(hrefs).toContain('https://github.com/FreeForCharity/FFC-IN-Footer_Only_Template')
  })

  it('cites the validation standard: FFC footer + Lighthouse accessibility + adoption checklist', () => {
    const { container } = render(<Hero />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/FFC footer standard/i)
    expect(text).toMatch(/Lighthouse accessibility/i)

    const hrefs = Array.from(container.querySelectorAll('a')).map(
      (a) => a.getAttribute('href') ?? ''
    )
    expect(hrefs).toContain('https://ffcadmin.org/guides/adopt-ffc-footer-on-existing-site/')
  })

  it('teaches the live-URL funding gate for the WHMCS domain order', () => {
    const { container } = render(<Hero />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/order form requires the live GitHub Pages URL/i)
  })
})
