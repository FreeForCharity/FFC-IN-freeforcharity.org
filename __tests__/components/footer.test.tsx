import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '@/components/footer/index'
import { campaigns, zeffyHostedUrl } from '@/data/donation-campaigns'

describe('Footer', () => {
  it('renders the Free Domains Zeffy donate button', () => {
    render(<Footer />)
    const freeDomain = campaigns.find((c) => c.key === 'free-domain')!
    const btn = screen.getByRole('link', { name: /Donate Free Domains/i })
    // Opens the free-domain campaign as a Zeffy pop-up; degrades to the hosted form.
    expect(btn).toHaveAttribute('zeffy-form-link', freeDomain.zeffyFormLink)
    expect(btn).toHaveAttribute('href', zeffyHostedUrl(freeDomain.zeffyFormLink))
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
