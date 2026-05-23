import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Hero from '@/components/free-charity-web-hosting/Hero'

// Mock the next/image component since it's not supported in JSDOM out of the box
jest.mock('next/image', () => {
  return function MockImage({ src, alt, fill, className, priority }: any) {
    return (
      <img src={src} alt={alt} className={className} data-fill={fill} data-priority={priority} />
    )
  }
})

describe('Free Charity Web Hosting Hero Component', () => {
  it('renders the Hero component successfully', () => {
    const { container } = render(<Hero />)
    expect(container).toBeInTheDocument()
  })

  it('renders the main heading correctly', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/Free For Charity Hosting/i)
  })

  it('renders the description paragraph correctly', () => {
    render(<Hero />)
    const description = screen.getByText(/Welcome to Free For Charity Hosting/i)
    expect(description).toBeInTheDocument()
  })

  it('renders the hero image with the correct alt text', () => {
    render(<Hero />)
    const image = screen.getByAltText('hero image')
    expect(image).toBeInTheDocument()
    // Test that the mock image received the expected props or attributes
    expect(image).toHaveAttribute('src')
    expect(image.getAttribute('src')).toContain('hero-charity.webp')
  })
})
