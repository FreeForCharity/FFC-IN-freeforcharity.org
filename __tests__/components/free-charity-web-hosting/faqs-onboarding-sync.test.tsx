import React from 'react'
import { render } from '@testing-library/react'
import FAQs from '@/components/free-charity-web-hosting/FAQs/index'

describe('Free Charity Web Hosting FAQs — onboarding model sync', () => {
  it('renders without crashing', () => {
    const { container } = render(<FAQs />)
    expect(container).not.toBeEmptyDOMElement()
  })

  it('no longer references the legacy eNom reseller model', () => {
    const { container } = render(<FAQs />)
    expect(container.textContent || '').not.toMatch(/eNom/i)
  })

  it('describes domains as managed at Cloudflare', () => {
    const { container } = render(<FAQs />)
    expect(container.textContent || '').toContain('Cloudflare')
  })
})
