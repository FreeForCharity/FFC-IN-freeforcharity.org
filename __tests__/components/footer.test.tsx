import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '@/components/footer/index'
import { freeDomainCampaign, zeffyHostedUrl } from '@/data/donation-campaigns'

describe('Footer', () => {
  it('renders the Free Domains Zeffy donate button', () => {
    // Explicit check (no `!`): fail with a clear message and narrow the type.
    if (!freeDomainCampaign) throw new Error('free-domain campaign missing from the registry')
    render(<Footer />)
    const btn = screen.getByRole('link', { name: /Donate Free Domains/i })
    // Opens the free-domain campaign as a Zeffy pop-up; degrades to the hosted form.
    expect(btn).toHaveAttribute('zeffy-form-link', freeDomainCampaign.zeffyFormLink)
    expect(btn).toHaveAttribute('href', zeffyHostedUrl(freeDomainCampaign.zeffyFormLink))
    expect(btn.getAttribute('zeffy-form-link')).toContain('zeffy.com')
  })

  it('keeps the Donate quick link to /donate', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /^Donate$/i })).toHaveAttribute('href', '/donate')
  })

  it('contains no PayPal links', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('a[href*="paypal.com"]')).toBeNull()
  })
})
