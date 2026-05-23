import React from 'react'
import { render, screen } from '@testing-library/react'
import FreeForCharityDonationOptions from '@/components/donate-components/Free-for-Charity-Donation-Options/index'

describe('FreeForCharityDonationOptions Component', () => {
  it('renders the main heading correctly', () => {
    render(<FreeForCharityDonationOptions />)
    const heading = screen.getByRole('heading', { name: /Free for Charity Donation Options/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the introductory text correctly', () => {
    render(<FreeForCharityDonationOptions />)
    const introText1 = screen.getByText(/Here at free for charity we make it easy to donate and help the cause/i)
    const introText2 = screen.getByText(/We have the following options:/i)

    expect(introText1).toBeInTheDocument()
    expect(introText2).toBeInTheDocument()
  })

  it('renders the callout box heading correctly', () => {
    render(<FreeForCharityDonationOptions />)
    const calloutHeading = screen.getByRole('heading', { name: /Free For Charity Domains Endowment Fund/i })
    expect(calloutHeading).toBeInTheDocument()
  })

  it('renders the callout box description correctly', () => {
    render(<FreeForCharityDonationOptions />)
    const descriptionText = screen.getByText(/Free For Charity is creating an endowment fund to support our program/i)
    expect(descriptionText).toBeInTheDocument()
  })

  it('renders the Transparentbtn component with correct text and href', () => {
    render(<FreeForCharityDonationOptions />)
    // The text inside the Transparentbtn component is rendered in a <span> tag
    const btnText = screen.getByText('Make a Lasting Impact Today!')
    expect(btnText).toBeInTheDocument()

    // Find the link wrapping the text
    const link = btnText.closest('a')
    expect(link).toHaveAttribute('href', '/free-for-charity-endowment-fund')
  })
})
