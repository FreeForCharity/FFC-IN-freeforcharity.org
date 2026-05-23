import React from 'react'
import { render, screen } from '@testing-library/react'
import Faqs from '../index'

// Mock the dependencies
jest.mock('@/components/ui/AccordianBold', () => {
  return function MockAccordianBold({
    title,
    children,
  }: {
    title: string
    children: React.ReactNode
  }) {
    return (
      <div data-testid="mock-accordian">
        <h3>{title}</h3>
        <div>{children}</div>
      </div>
    )
  }
})

jest.mock('@/components/ui/Transparentbtn', () => {
  return function MockTransparentbtn({ text, href }: { text: string; href: string }) {
    return (
      <a href={href} data-testid="mock-transparent-btn">
        {text}
      </a>
    )
  }
})

describe('Faqs Component', () => {
  it('renders the main headings', () => {
    render(<Faqs />)

    expect(
      screen.getByText('1. Achieving Gold or Platinum Seal of Transparency')
    ).toBeInTheDocument()
    expect(
      screen.getByText('2. Preparing to share your profile with Free For Charity')
    ).toBeInTheDocument()
  })

  it('renders all 5 accordion sections for transparency seals', () => {
    render(<Faqs />)

    const accordions = screen.getAllByTestId('mock-accordian')
    expect(accordions).toHaveLength(5)

    expect(screen.getByText('Claim Your Nonprofit Profile')).toBeInTheDocument()
    expect(screen.getByText('Earn a Bronze Seal of Transparency')).toBeInTheDocument()
    expect(screen.getByText('Earn a Silver Seal of Transparency')).toBeInTheDocument()
    expect(screen.getByText('Earn a Gold Seal of Transparency')).toBeInTheDocument()
    expect(screen.getByText('Earn a Platinum Seal of Transparency')).toBeInTheDocument()
  })

  it('renders the image correctly', () => {
    render(<Faqs />)

    const image = screen.getByAltText(
      'Free For Charity GuideStar onboarding requirements and highlighted fields'
    )
    expect(image).toBeInTheDocument()
    // In next/image, the src attribute might be transformed, so we just check it exists and has the alt text
  })

  it('renders the example links section', () => {
    render(<Faqs />)

    expect(
      screen.getByText(/Here is an example of the links to copy into the FFC onboarding form:/)
    ).toBeInTheDocument()
    expect(screen.getByText(/FFC ‘Full Profile’ GuideStar Link:/)).toBeInTheDocument()
    expect(screen.getByText(/FFC ‘Public Profile’ GuideStar Link:/)).toBeInTheDocument()
  })

  it('renders the continue onboarding button with correct href', () => {
    render(<Faqs />)

    const btn = screen.getByTestId('mock-transparent-btn')
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveTextContent('Continue Onboarding with Free For Charity')
    expect(btn).toHaveAttribute('href', '/501c3')
  })
})
