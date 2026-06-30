import React from 'react'
import { render, screen } from '@testing-library/react'
import FreeForCharityDonationOptions from '@/components/donate-components/Free-for-Charity-Donation-Options/index'

// Mock the Transparentbtn component
jest.mock('@/components/ui/Transparentbtn', () => {
  return function MockTransparentbtn(props: { href: string; color?: string; text: string }) {
    return (
      <a href={props.href} style={{ color: props.color }}>
        {props.text}
      </a>
    )
  }
})

describe('Free-for-Charity-Donation-Options Component', () => {
  it('renders the header correctly', () => {
    render(<FreeForCharityDonationOptions />)
    const headerElement = screen.getByText('Free For Charity Donation Options')
    expect(headerElement).toBeInTheDocument()
  })

  it('renders the descriptions correctly', () => {
    render(<FreeForCharityDonationOptions />)
    const description1 = screen.getByText(
      'Here at Free For Charity we make it easy to donate and help the cause of great free training programs and free services for charities.'
    )
    const description2 = screen.getByText('We have the following options:')

    expect(description1).toBeInTheDocument()
    expect(description2).toBeInTheDocument()
  })

  it('renders the callout box content correctly', () => {
    render(<FreeForCharityDonationOptions />)

    const calloutHeader = screen.getByText('Free For Charity Domains Endowment Fund')
    const calloutDescription = screen.getByText(
      /Free For Charity is creating an endowment fund to support our program/i
    )
    const button = screen.getByText('Make a Lasting Impact Today!')

    expect(calloutHeader).toBeInTheDocument()
    expect(calloutDescription).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('href', '/free-for-charity-endowment-fund/')
  })
})
