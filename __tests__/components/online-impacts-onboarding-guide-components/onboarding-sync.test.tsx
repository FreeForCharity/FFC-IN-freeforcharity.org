import React from 'react'
import { render } from '@testing-library/react'
import ReadyToGetStartedNow from '@/components/online-impacts-onboarding-guide-components/Ready-To-Get-Started-Now/index'

describe('Online Impacts onboarding guide sync (Cloudflare / GitHub Pages / M365 + Google)', () => {
  it('no longer references InterServer or Softaculous', () => {
    const { container } = render(<ReadyToGetStartedNow />)
    const text = container.textContent ?? ''
    expect(text).not.toMatch(/InterServer/i)
    expect(text).not.toMatch(/Softaculous/i)
  })

  it('describes the GitHub Pages website model', () => {
    const { container } = render(<ReadyToGetStartedNow />)
    expect(container.textContent).toContain('GitHub Pages')
  })

  it('uses stable add-to-cart CTA links, not deprecated confproduct index links', () => {
    const { container } = render(<ReadyToGetStartedNow />)
    const links = Array.from(container.querySelectorAll('a'))
    for (const link of links) {
      expect(link.getAttribute('href') ?? '').not.toContain('confproduct')
    }
  })
})
