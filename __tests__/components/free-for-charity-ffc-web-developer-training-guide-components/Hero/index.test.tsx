import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from '@/components/free-for-charity-ffc-web-developer-training-guide-components/Hero'

describe('Hero Component - FFC Web Developer Training Guide', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', {
        name: /Free For Charity \(FFC\) Web Developer Training Guide/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the Table of Contents', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { name: /Table of Contents/i })).toBeInTheDocument()
  })

  it('renders all sections from Table of Contents', () => {
    render(<Hero />)

    expect(screen.getAllByRole('link', { name: /FFC Hub by WHMCS/i })[0]).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Cloudflare/i })[0]).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Microsoft 365/i })[0]).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /InterServer Web Hosting/i })[0]).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: /DIVI \(WordPress Theme\)/i })[0]
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: /WPMUdev \(WordPress Plugins\)/i })[0]
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: /Microsoft Clarity \(Analytics\)/i })[0]
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: /Tawk.to Live Chat \(Support\)/i })[0]
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Azure AI Language/i })[0]).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Final Notes/i })[0]).toBeInTheDocument()
  })

  it('renders the main content sections', () => {
    render(<Hero />)

    expect(
      screen.getByText(/WHMCS powers the FFC Hub, which handles domain name orders/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Cloudflare manages the DNS settings for charity domains/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Microsoft 365 provides the email hosting solution for charity accounts/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/InterServer provides the hosting platform for charity websites/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/DIVI is used to create visually appealing, responsive/i)
    ).toBeInTheDocument()
  })
})
