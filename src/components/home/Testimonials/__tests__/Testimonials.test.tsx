import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TestimonialSlider from '../index'

// The swiper/react mock is already handled by jest.config.js which points to __mocks__/swiper/react.js
// but we need to mock the next/image to avoid issues during testing.
jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: { src?: string } | string; alt: string }) {
    const srcString = typeof src === 'string' ? src : src?.src
    return <img src={srcString} alt={alt} data-testid="mock-image" />
  }
})

describe('TestimonialSlider Component', () => {
  it('renders the component and its main heading', () => {
    render(<TestimonialSlider />)
    expect(screen.getByText('Testimonials')).toBeInTheDocument()
  })

  it('renders the correct number of testimonial slides', () => {
    render(<TestimonialSlider />)
    const slides = screen.getAllByTestId('swiper-slide')
    expect(slides).toHaveLength(4) // Based on the static data in the component
  })

  it('renders specific testimonial content', () => {
    render(<TestimonialSlider />)

    // Check for a specific heading - use getAllByText since it appears twice (heading and location)
    const ahwatukeeTexts = screen.getAllByText('American Legion Ahwatukee Post 64')
    expect(ahwatukeeTexts.length).toBeGreaterThan(0)

    // Check for specific text content
    expect(
      screen.getByText(/Knowing that I can reach out to the owner of another veteran/)
    ).toBeInTheDocument()

    // Check for author name
    expect(screen.getByText('David Green, Public Affairs Officer')).toBeInTheDocument()

    // Check for location/link
    const link = screen.getByRole('link', { name: /American Legion Ahwatukee Post 64/i })
    expect(link).toHaveAttribute('href', 'https://americanlegionpost64.org/')
  })

  it('renders navigation buttons (prev/next)', () => {
    render(<TestimonialSlider />)
    expect(screen.getByLabelText('Previous testimonial')).toBeInTheDocument()
    expect(screen.getByLabelText('Next testimonial')).toBeInTheDocument()
  })

  it('renders the correct number of pagination dots and handles clicks', () => {
    render(<TestimonialSlider />)

    // There should be 4 dots
    const dots = [
      screen.getByLabelText('Go to testimonial 1'),
      screen.getByLabelText('Go to testimonial 2'),
      screen.getByLabelText('Go to testimonial 3'),
      screen.getByLabelText('Go to testimonial 4'),
    ]
    expect(dots).toHaveLength(4)

    // The first dot should be active by default
    expect(dots[0]).toHaveClass('bg-orange-600')
    expect(dots[1]).toHaveClass('bg-gray-300')

    // The actual swiper slideTo functionality is mocked out so clicking doesn't
    // change active state natively, but we can verify it doesn't crash
    fireEvent.click(dots[1])
  })
})
