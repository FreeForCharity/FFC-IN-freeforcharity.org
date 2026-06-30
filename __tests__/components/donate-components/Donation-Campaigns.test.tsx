import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DonationCampaigns from '@/components/donate-components/Donation-Campaigns/index'
import { campaigns, zeffyHostedUrl } from '@/data/donation-campaigns'

describe('DonationCampaigns Component', () => {
  it('renders without crashing', () => {
    render(<DonationCampaigns />)
  })

  it('renders the general fund as a Zeffy pop-up CTA', () => {
    render(<DonationCampaigns />)
    const general = campaigns.find((c) => c.embed)!
    const btn = screen.getByRole('link', { name: /Donate Now/i })
    expect(btn).toHaveAttribute('zeffy-form-link', general.zeffyFormLink)
    // Degrades to the hosted form when JS is unavailable.
    expect(btn).toHaveAttribute('href', zeffyHostedUrl(general.zeffyFormLink))
  })

  it('renders a Zeffy pop-up button for every featured campaign', () => {
    const { container } = render(<DonationCampaigns />)
    const featured = campaigns.filter((c) => c.featured && !c.embed)
    for (const c of featured) {
      const trigger = container.querySelector(`[zeffy-form-link="${c.zeffyFormLink}"]`)
      expect(trigger).toBeTruthy()
    }
  })

  it('lists additional campaigns in the directory', () => {
    const { container } = render(<DonationCampaigns />)
    const gala = campaigns.find((c) => c.key === 'annual-gala')!
    expect(container.querySelector(`[zeffy-form-link="${gala.zeffyFormLink}"]`)).toBeTruthy()
  })

  it('every donate trigger points at zeffy.com and none at PayPal', () => {
    const { container } = render(<DonationCampaigns />)
    const triggers = container.querySelectorAll('[zeffy-form-link]')
    expect(triggers.length).toBeGreaterThan(0)
    triggers.forEach((t) => expect(t.getAttribute('zeffy-form-link')).toContain('zeffy.com'))
    expect(container.querySelectorAll('a[href*="paypal.com"]').length).toBe(0)
  })
})
