import React from 'react'
import { render, screen } from '@testing-library/react'
import ContactSection from '@/components/contact-us-components/Contact-Us'

describe('ContactSection', () => {
  it('renders without crashing', () => {
    render(<ContactSection />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('renders the intro text', () => {
    render(<ContactSection />)
    expect(
      screen.getByText(
        /Have questions about consultation or hosting\? Want to know more about nonprofits\? Looking to chat\? Give a real person a call:/i
      )
    ).toBeInTheDocument()
  })

  it('renders the Email section with correct link', () => {
    render(<ContactSection />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    const emailLink = screen.getByRole('link', { name: 'clarkemoyer@freeforcharity.org' })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:clarkemoyer@freeforcharity.org')
  })

  it('renders the main address', () => {
    render(<ContactSection />)
    expect(screen.getByText('Main Address')).toBeInTheDocument()
    expect(
      screen.getByText('4030 Wake Forrest Road STE 349 Raleigh North Carolina 27609')
    ).toBeInTheDocument()
  })

  it('renders the PA office address', () => {
    render(<ContactSection />)
    expect(screen.getByText('PA Office Address')).toBeInTheDocument()
    expect(
      screen.getByText('301 Science Park Road Suite 119 State College PA 16803')
    ).toBeInTheDocument()
  })

  it('renders the Phone section with correct link', () => {
    render(<ContactSection />)
    expect(screen.getByText('Call')).toBeInTheDocument()
    const phoneLink = screen.getByRole('link', { name: '(520) 222-8104' })
    expect(phoneLink).toBeInTheDocument()
    expect(phoneLink).toHaveAttribute('href', 'tel:+15202228104')
  })
})
