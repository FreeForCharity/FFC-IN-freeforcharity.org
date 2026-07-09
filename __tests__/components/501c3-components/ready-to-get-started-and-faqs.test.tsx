import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import ReadyToGetStartedAndFaqs from '@/components/501c3-components/Ready-to-get-started-and-faqs/index'

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
})
