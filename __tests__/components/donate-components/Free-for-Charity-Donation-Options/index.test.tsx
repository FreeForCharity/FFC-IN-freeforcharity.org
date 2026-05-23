import React from 'react'
import { render, screen } from '@testing-library/react'
import FreeForCharityDonationOptions from '@/components/donate-components/Free-for-Charity-Donation-Options/index'

// Mock the Transparentbtn component
jest.mock('@/components/ui/Transparentbtn', () => {
  return function MockTransparentbtn(props: { text: string; href: string; color: string }) {
    return (
      <a href={props.href} data-testid="transparent-btn" style={{ color: props.color }}>
        {props.text}
      </a>
    )
  }
})

describe('Free-for-Charity-Donation-Options Component', () => {
  it('renders the main heading', () => {
    render(<FreeForCharityDonationOptions />)
    expect(screen.getByRole('heading', { name: /Free for Charity Donation Options/i })).toBeInTheDocument()
  })

  it('renders the introductory text paragraphs', () => {
    render(<FreeForCharityDonationOptions />)
    expect(
      screen.getByText(/Here at free for charity we make it easy to donate and help the cause/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/We have the following options:/i)).toBeInTheDocument()
  })

  it('renders the endowment fund section', () => {
    render(<FreeForCharityDonationOptions />)
    expect(
      screen.getByRole('heading', { name: /Free For Charity Domains Endowment Fund/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Free For Charity is creating an endowment fund to support our program/i)
    ).toBeInTheDocument()
  })

  it('renders the Transparentbtn with correct props', () => {
    render(<FreeForCharityDonationOptions />)
    const btn = screen.getByTestId('transparent-btn')
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveTextContent('Make a Lasting Impact Today!')
    expect(btn).toHaveAttribute('href', '/free-for-charity-endowment-fund')
    // We check the style mock to ensure the color prop was passed correctly
    expect(btn).toHaveStyle({ color: '#fff' })
  })
})
