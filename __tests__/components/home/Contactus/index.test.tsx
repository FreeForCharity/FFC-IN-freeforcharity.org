import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ContactUsSection from '@/components/home/Contactus'

// Use the same mock data as the component
const contact = {
  email: 'clarkemoyer@freeforcharity.org',
  phone: '(520) 222-8104',
  mainAddress: '4030 Wake Forest Road STE 349 Raleigh North Carolina 27609',
  paAddress: '301 Science Park Rd Suite 119 State College PA 16803',
}

describe('ContactUsSection', () => {
  it('renders the main Contact Us heading', () => {
    render(<ContactUsSection />)
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument()
  })

  it('renders the Email section with correct link', () => {
    render(<ContactUsSection />)
    expect(screen.getByText('Email')).toBeInTheDocument()

    const emailLink = screen.getByRole('link', { name: contact.email })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', `mailto:${contact.email}`)
  })

  it('renders the Main Address section', () => {
    render(<ContactUsSection />)
    expect(screen.getByText('Main Address')).toBeInTheDocument()
    expect(screen.getByText(contact.mainAddress)).toBeInTheDocument()
  })

  it('renders the Phone section with correct tel link format', () => {
    render(<ContactUsSection />)
    expect(screen.getByText('Call')).toBeInTheDocument()

    const phoneLink = screen.getByRole('link', { name: contact.phone })
    expect(phoneLink).toBeInTheDocument()
    // The component replaces non-numeric characters for the href
    const expectedTelHref = `tel:${contact.phone.replace(/[^0-9]/g, '')}`
    expect(phoneLink).toHaveAttribute('href', expectedTelHref)
  })

  it('renders the PA Office Address section', () => {
    render(<ContactUsSection />)
    expect(screen.getByText('PA Office Address')).toBeInTheDocument()
    expect(screen.getByText(contact.paAddress)).toBeInTheDocument()
  })
})
