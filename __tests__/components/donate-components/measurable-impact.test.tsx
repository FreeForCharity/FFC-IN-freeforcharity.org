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
    expect(volunteerLink).toHaveAttribute('href', '/volunteer')
  })

  it('renders the PayPal donation button', () => {
    render(<MeasurableImpact />)
    const donateButton = screen.getByRole('link', { name: /Donate Today/i })
    expect(donateButton).toBeInTheDocument()
    expect(donateButton).toHaveAttribute(
      'href',
      'https://www.paypal.com/donate/?hosted_button_id=9ZKQ23YC3G2J2'
    )
  })

  it('renders the thank you heading', () => {
    render(<MeasurableImpact />)
    const thankYouHeading = screen.getByText(
      /Thank you for supporting our mission to help charities in need!/i
    )
    expect(thankYouHeading).toBeInTheDocument()
  })
})
