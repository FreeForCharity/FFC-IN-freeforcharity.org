import React from 'react'
import { render, screen } from '@testing-library/react'
import AboutFFCHosting from '@/components/free-charity-web-hosting/About-FFC-Hosting/index'

// Mock the assetPath helper
jest.mock('@/lib/assetPath', () => ({
  assetPath: (path: string) => path,
}))

describe('AboutFFCHosting Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<AboutFFCHosting />)
    expect(container).toBeInTheDocument()
  })

  it('renders the heading "About FFC Hosting"', () => {
    render(<AboutFFCHosting />)
    const heading = screen.getByRole('heading', { name: /About FFC Hosting/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the image with correct alt text', () => {
    render(<AboutFFCHosting />)
    const image = screen.getByAltText('Free For Charity hosting dashboard')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/Images/About-FFC-Hosting.webp')
  })

  it('renders the specific paragraph text', () => {
    render(<AboutFFCHosting />)
    const paragraph = screen.getByText(/FFCHosting is a project of Free For Charity\./i)
    expect(paragraph).toBeInTheDocument()
  })
})
