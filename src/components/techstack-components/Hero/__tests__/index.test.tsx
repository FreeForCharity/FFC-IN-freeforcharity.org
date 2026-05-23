import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import UnderstandingHosting from '../index'

describe('UnderstandingHosting Component', () => {
  it('renders without crashing', () => {
    render(<UnderstandingHosting />)
    expect(
      screen.getByText(
        'Understanding Your Free For Charity WordPress Website Hosting: A Layered Approach'
      )
    ).toBeInTheDocument()
  })

  it('renders all the layered sections', () => {
    render(<UnderstandingHosting />)

    // Check for the Foundation layer
    expect(screen.getByText('Foundation: Interserver.net (DirectAdmin)')).toBeInTheDocument()

    // Check for the WordPress Installation layer
    expect(screen.getByText('WordPress Installation: Softaculous')).toBeInTheDocument()

    // Check for the Plugins layer
    expect(screen.getByText('Plugins: WPMUDEV')).toBeInTheDocument()

    // Check for the Theme layer
    expect(screen.getByText('Theme: Divi')).toBeInTheDocument()

    // Check for the DNS and SSL layer
    expect(screen.getByText('DNS and SSL: Cloudflare')).toBeInTheDocument()

    // Check for the Email layer
    expect(screen.getByText('Email: Microsoft 365')).toBeInTheDocument()
  })

  it('renders the "Need Help?" section', () => {
    render(<UnderstandingHosting />)
    expect(screen.getByText('Need Help?')).toBeInTheDocument()
    expect(
      screen.getByText(
        /NOTE: If your support ticket with Free For Charity has not been answered in 48 hours/i
      )
    ).toBeInTheDocument()
  })

  it('has no basic accessibility violations', async () => {
    const { container } = render(<UnderstandingHosting />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
