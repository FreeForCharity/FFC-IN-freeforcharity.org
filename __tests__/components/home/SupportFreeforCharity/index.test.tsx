import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SupportFreeForCharity from '@/components/home/SupportFreeforCharity'

// Mock the child components to simplify testing
jest.mock('@/components/ui/trainingcard', () => {
  return function MockTrainingCard({ heading, text }: { heading: string, text: string }) {
    return (
      <div data-testid="mock-training-card">
        <h2>{heading}</h2>
        <p>{text}</p>
      </div>
    )
  }
})

jest.mock('@/components/ui/Bluebtn', () => {
  return function MockBlueBtn({ href }: { href: string }) {
    return <a data-testid="mock-blue-btn" href={href}>Blue Button</a>
  }
})

jest.mock('@/components/ui/Transparentbtn', () => {
  return function MockTransparentbtn({ text, href }: { text: string, href: string }) {
    return <a data-testid="mock-transparent-btn" href={href}>{text}</a>
  }
})

describe('SupportFreeForCharity', () => {
  it('renders the top banner section', () => {
    render(<SupportFreeForCharity />)

    // Check heading
    expect(screen.getByText('SUPPORT FREE FOR CHARITY!')).toBeInTheDocument()

    // Check description text
    expect(screen.getByText(/By donating you help drive our mission/i)).toBeInTheDocument()

    // Check donate button
    const donateBtn = screen.getByTestId('mock-transparent-btn')
    expect(donateBtn).toBeInTheDocument()
    expect(donateBtn).toHaveTextContent('Donate With Paypal')
    expect(donateBtn).toHaveAttribute('href', '/donate')
  })

  it('renders the three cards section', () => {
    render(<SupportFreeForCharity />)

    // Check if three training cards are rendered
    const trainingCards = screen.getAllByTestId('mock-training-card')
    expect(trainingCards).toHaveLength(3)

    // Check card 1 content
    expect(screen.getByText('FREE TRAINING PROGRAMS')).toBeInTheDocument()
    expect(screen.getByText(/Are you looking to gain marketable skills/i)).toBeInTheDocument()

    // Check card 2 content
    expect(screen.getByText('HELP FOR CHARITIES')).toBeInTheDocument()
    expect(screen.getByText(/If you are representing a charity/i)).toBeInTheDocument()

    // Check card 3 content
    expect(screen.getByText('VOLUNTEER AND/OR DONATE')).toBeInTheDocument()
    expect(screen.getByText(/We are always looking for individuals and business/i)).toBeInTheDocument()

    // Check buttons
    const blueBtns = screen.getAllByTestId('mock-blue-btn')
    expect(blueBtns).toHaveLength(3)
    expect(blueBtns[0]).toHaveAttribute('href', '/free-training-programs')
    expect(blueBtns[1]).toHaveAttribute('href', '/help-for-charities')
    expect(blueBtns[2]).toHaveAttribute('href', '/volunteer')
  })
})
