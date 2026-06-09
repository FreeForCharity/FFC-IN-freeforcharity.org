import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '@/components/header'

// Mock usePathname from next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

describe('Header Component', () => {
  beforeEach(() => {
    // Reset window.scrollY before each test
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      configurable: true,
    })
  })

  it('renders the header with the logo', () => {
    render(<Header />)
    const logoImg = screen.getByAltText('Free For Charity')
    expect(logoImg).toBeInTheDocument()

    // Desktop navigation links are present
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Help for Charities')).toBeInTheDocument()
    expect(screen.getByText('About Us')).toBeInTheDocument()
  })

  it('toggles mobile menu on button click', () => {
    render(<Header />)

    // Initially, mobile menu should not be visible (only hamburger menu is present)
    const openMenuButton = screen.getByLabelText('Open menu')
    expect(openMenuButton).toBeInTheDocument()

    // Click the open menu button
    fireEvent.click(openMenuButton)

    // The close menu button should now be present
    const closeMenuButton = screen.getByLabelText('Close menu')
    expect(closeMenuButton).toBeInTheDocument()

    // Click close menu button
    fireEvent.click(closeMenuButton)

    // The open menu button should be present again
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
  })

  it('toggles search input on search icon click', () => {
    render(<Header />)

    // Search input should not be in the document initially
    expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument()

    // Find search toggle button
    const searchButton = screen.getByLabelText('Search')
    expect(searchButton).toBeInTheDocument()

    // Click search button
    fireEvent.click(searchButton)

    // Search input should now be visible
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()

    // Close search button
    const closeSearchButton = screen.getByLabelText('Close search')
    fireEvent.click(closeSearchButton)

    // Search input should disappear
    expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument()
  })

  it('adds scrolled class when window is scrolled past 50px', () => {
    render(<Header />)

    const headerElement = screen.getByRole('banner')
    // Initially height is 80px (h-[80px])
    expect(headerElement).toHaveClass('h-[80px]')

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true })
    fireEvent.scroll(window)

    // After scroll, height should be 55px (h-[55px])
    expect(headerElement).toHaveClass('h-[55px]')
    expect(headerElement).not.toHaveClass('h-[80px]')
  })
})
