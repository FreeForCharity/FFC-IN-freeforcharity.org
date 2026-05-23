import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import GeneralDonation from '@/components/donate-components/General-donation/index'

describe('GeneralDonation Component', () => {
  it('renders the main heading', () => {
    render(<GeneralDonation />)
    expect(
      screen.getByRole('heading', { name: /General Donations/i, level: 1 })
    ).toBeInTheDocument()
  })

  it('renders the three donation cards with correct titles and descriptions', () => {
    render(<GeneralDonation />)

    // Monthly Donations
    expect(screen.getByRole('heading', { name: 'Monthly Donations', level: 1 })).toBeInTheDocument()
    expect(
      screen.getByText(/Monthly donations help by providing a predictable cash flow/)
    ).toBeInTheDocument()

    // One Time Donations
    expect(
      screen.getByRole('heading', { name: 'One Time Donations', level: 1 })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/On time donations of any amount are placed in the general fund/)
    ).toBeInTheDocument()

    // Large Donations
    expect(screen.getByRole('heading', { name: 'Large Donations', level: 1 })).toBeInTheDocument()
    expect(
      screen.getByText(/For large donations we can work directly with the donor/)
    ).toBeInTheDocument()
  })

  it('provides correct links with external target attributes', () => {
    render(<GeneralDonation />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)

    // Monthly Donations link
    expect(links[0]).toHaveAttribute(
      'href',
      'https://www.paypal.com/donate/?hosted_button_id=9ZKQ23YC3G2J2'
    )
    expect(links[0]).toHaveAttribute('target', '_blank')
    expect(links[0]).toHaveAttribute('rel', 'noopener noreferrer')

    // One Time Donations link
    expect(links[1]).toHaveAttribute(
      'href',
      'https://www.paypal.com/donate/?hosted_button_id=9ZKQ23YC3G2J2'
    )
    expect(links[1]).toHaveAttribute('target', '_blank')
    expect(links[1]).toHaveAttribute('rel', 'noopener noreferrer')

    // Large Donations link
    expect(links[2]).toHaveAttribute(
      'href',
      'https://www.paypal.com/donate/?hosted_button_id=243G37NHXSRY8'
    )
    expect(links[2]).toHaveAttribute('target', '_blank')
    expect(links[2]).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders images for each donation card', () => {
    render(<GeneralDonation />)
    const images = screen.getAllByAltText('Donation image')
    expect(images).toHaveLength(3)
  })
})
