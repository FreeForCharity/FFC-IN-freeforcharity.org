import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MeasurableImpact from '@/components/donate-components/measurable-impact/index'

describe('MeasurableImpact Component', () => {
  it('renders without crashing', () => {
    render(<MeasurableImpact />)
  })

  it('renders the main heading', () => {
    render(<MeasurableImpact />)
    const mainHeading = screen.getByText(
      /You can create a measurable impact to the success of charities nation wide/i
    )
    expect(mainHeading).toBeInTheDocument()
  })

  it('renders the skilled volunteers link', () => {
    render(<MeasurableImpact />)
    const volunteerLink = screen.getByRole('link', { name: /skilled volunteers/i })
    expect(volunteerLink).toBeInTheDocument()
    expect(volunteerLink).toHaveAttribute('href', '/volunteer/')
  })

  it('renders a Zeffy CTA (no PayPal), gated on the general fund being confirmed', () => {
    const { generalCampaign } = jest.requireActual('@/data/donation-campaigns')
    render(<MeasurableImpact />)
    if (generalCampaign.confirmed) {
      // Confirmed: the "Donate Today" pop-up trigger points at Zeffy.
      const donateButton = screen.getByRole('link', { name: /Donate Today/i })
      expect(donateButton.getAttribute('zeffy-form-link') || '').toContain('zeffy.com')
      const href = donateButton.getAttribute('href') || ''
      expect(href).toContain('zeffy.com')
      expect(href).not.toContain('paypal.com')
    } else {
      // Fail-safe: no broken general link — a "See donation campaigns" link instead.
      expect(screen.getByRole('link', { name: /See donation campaigns/i })).toBeInTheDocument()
      expect(screen.queryByRole('link', { name: /Donate Today/i })).toBeNull()
    }
    // Never a PayPal link, in either state.
    expect(document.querySelector('a[href*="paypal.com"]')).toBeNull()
  })

  it('renders the thank you heading', () => {
    render(<MeasurableImpact />)
    const thankYouHeading = screen.getByText(
      /Thank you for supporting our mission to help charities in need!/i
    )
    expect(thankYouHeading).toBeInTheDocument()
  })
})
