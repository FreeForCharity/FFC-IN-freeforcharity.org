import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DonationCampaigns from '@/components/donate-components/Donation-Campaigns/index'
import { campaigns } from '@/data/donation-campaigns'

// Escape regex metacharacters so titles containing (), +, ?, etc. don't break
// or throw when used as an accessible-name matcher.
const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

describe('DonationCampaigns Component', () => {
  it('renders without crashing', () => {
    render(<DonationCampaigns />)
  })

  it('embeds the general-fund Zeffy donation form', () => {
    const { container } = render(<DonationCampaigns />)
    const general = campaigns.find((c) => c.embed)!
    const iframe = container.querySelector('iframe')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', general.embedUrl)
    expect(iframe!.getAttribute('src')).toContain('zeffy.com/embed/donation-form')
  })

  it('renders the two featured campaigns as Zeffy links', () => {
    render(<DonationCampaigns />)
    const featured = campaigns.filter((c) => c.featured && !c.embed)
    for (const c of featured) {
      const link = screen.getByRole('link', { name: new RegExp(escapeRegExp(c.title), 'i') })
      expect(link).toHaveAttribute('href', c.formUrl)
      expect(link.getAttribute('href')).toContain('zeffy.com')
    }
  })

  it('lists additional campaigns in the directory', () => {
    render(<DonationCampaigns />)
    // The membership/event/shop campaigns appear as directory cards.
    expect(screen.getByRole('link', { name: /Free For Charity Annual Gala/i })).toBeInTheDocument()
  })

  it('contains no PayPal links anywhere', () => {
    const { container } = render(<DonationCampaigns />)
    const paypal = container.querySelectorAll('a[href*="paypal.com"]')
    expect(paypal.length).toBe(0)
  })
})
