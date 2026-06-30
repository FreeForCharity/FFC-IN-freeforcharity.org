import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DonationCampaigns from '@/components/donate-components/Donation-Campaigns/index'
import { campaigns, zeffyHostedUrl } from '@/data/donation-campaigns'

describe('DonationCampaigns Component', () => {
  it('renders without crashing', () => {
    render(<DonationCampaigns />)
  })

  it('renders the general fund as a Zeffy pop-up CTA when confirmed', () => {
    const general = campaigns.find((c) => c.primary)!
    if (!general.confirmed) return // gated out until its link is verified
    render(<DonationCampaigns />)
    const btn = screen.getByRole('link', { name: /Donate Now/i })
    expect(btn).toHaveAttribute('zeffy-form-link', general.zeffyFormLink)
    // Degrades to the hosted form when JS is unavailable.
    expect(btn).toHaveAttribute('href', zeffyHostedUrl(general.zeffyFormLink))
  })

  it('renders a Zeffy pop-up button for every confirmed featured campaign', () => {
    const { container } = render(<DonationCampaigns />)
    const featured = campaigns.filter((c) => c.featured && !c.primary && c.confirmed)
    expect(featured.length).toBeGreaterThan(0)
    for (const c of featured) {
      const trigger = container.querySelector(`[zeffy-form-link="${c.zeffyFormLink}"]`)
      expect(trigger).toBeTruthy()
    }
  })

  it('lists confirmed directory campaigns (e.g. hosting-support-membership)', () => {
    const { container } = render(<DonationCampaigns />)
    const dir = campaigns.find((c) => c.key === 'hosting-support-membership')!
    // This campaign is confirmed, so it must appear in the directory.
    expect(dir.confirmed).toBe(true)
    expect(container.querySelector(`[zeffy-form-link="${dir.zeffyFormLink}"]`)).toBeTruthy()
  })

  it('fail-safe: does NOT render unconfirmed campaigns', () => {
    const { container } = render(<DonationCampaigns />)
    const unconfirmed = campaigns.filter((c) => !c.confirmed)
    expect(unconfirmed.length).toBeGreaterThan(0) // there are still placeholders
    for (const c of unconfirmed) {
      expect(container.querySelector(`[zeffy-form-link="${c.zeffyFormLink}"]`)).toBeNull()
    }
  })

  it('every donate trigger points at zeffy.com and none at PayPal', () => {
    const { container } = render(<DonationCampaigns />)
    const triggers = container.querySelectorAll('[zeffy-form-link]')
    expect(triggers.length).toBeGreaterThan(0)
    triggers.forEach((t) => expect(t.getAttribute('zeffy-form-link')).toContain('zeffy.com'))
    expect(container.querySelectorAll('a[href*="paypal.com"]').length).toBe(0)
  })
})
