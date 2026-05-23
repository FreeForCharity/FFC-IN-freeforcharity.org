import React from 'react'
import { render, screen } from '@testing-library/react'
import GeneralDonation from '@/components/donate-components/General-donation/index'
import GeneralDonationCard from '@/components/ui/General-Donation-Card'

// Mock the GeneralDonationCard component
jest.mock('@/components/ui/General-Donation-Card', () => {
  return jest.fn(({ title, description, img, href }) => (
    <div data-testid="mock-general-donation-card">
      <span data-testid="title">{title}</span>
      <span data-testid="description">{description}</span>
      <span data-testid="img">{img}</span>
      <span data-testid="href">{href}</span>
    </div>
  ))
})

describe('GeneralDonation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the main heading', () => {
    render(<GeneralDonation />)
    const heading = screen.getByRole('heading', { name: /General Donations/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders three GeneralDonationCard components', () => {
    render(<GeneralDonation />)
    const cards = screen.getAllByTestId('mock-general-donation-card')
    expect(cards).toHaveLength(3)
  })

  it('passes correct props to GeneralDonationCard components', () => {
    render(<GeneralDonation />)

    // Verify first card
    expect(GeneralDonationCard).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        title: 'Monthly Donations',
        description: expect.stringContaining(
          'Monthly donations help by providing a predictable cash flow'
        ),
        img: '/Images/payment.gif',
        href: 'https://www.paypal.com/donate/?hosted_button_id=9ZKQ23YC3G2J2',
      }),
      undefined
    )

    // Verify second card
    expect(GeneralDonationCard).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        title: 'One Time Donations',
        description: expect.stringContaining(
          'On time donations of any amount are placed in the general fund'
        ),
        img: '/Images/payment.gif',
        href: 'https://www.paypal.com/donate/?hosted_button_id=9ZKQ23YC3G2J2',
      }),
      undefined
    )

    // Verify third card
    expect(GeneralDonationCard).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        title: 'Large Donations',
        description: expect.stringContaining(
          'For large donations we can work directly with the donor'
        ),
        img: '/Images/payment.gif',
        href: 'https://www.paypal.com/donate/?hosted_button_id=243G37NHXSRY8',
      }),
      undefined
    )
  })
})
