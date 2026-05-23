import React from 'react'
import { render, screen } from '@testing-library/react'
import TestimonialSlider from '@/components/home/Testimonials'

// We need to mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} priority={props.priority ? 'true' : undefined} />
  },
}))

describe('TestimonialSlider', () => {
  it('renders the testimonials heading', () => {
    render(<TestimonialSlider />)
    expect(screen.getByRole('heading', { name: 'Testimonials' })).toBeInTheDocument()
  })

  it('renders the correct number of testimonials', () => {
    render(<TestimonialSlider />)
    const slides = screen.getAllByTestId('swiper-slide')
    expect(slides).toHaveLength(4) // Based on the hardcoded data
  })

  it('renders testimonial content correctly', () => {
    render(<TestimonialSlider />)
    // The exact text needs to match what's rendered, sometimes getByText needs a precise match or a regex
    // "American Legion Ahwatukee Post 64" appears both as a heading and a location
    expect(screen.getAllByText('American Legion Ahwatukee Post 64').length).toBeGreaterThan(0)

    expect(screen.getByText('TaShonda Payne')).toBeInTheDocument()
    expect(screen.getByText('Pardhasaradhi Namburi')).toBeInTheDocument()
    expect(screen.getByText('Keith Ray')).toBeInTheDocument()

    // Check some content to ensure it renders text as well
    expect(
      screen.getByText(/Knowing that I can reach out to the owner of another veteran/i)
    ).toBeInTheDocument()
  })

  it('renders navigation arrows', () => {
    render(<TestimonialSlider />)
    expect(screen.getByLabelText('Previous testimonial')).toBeInTheDocument()
    expect(screen.getByLabelText('Next testimonial')).toBeInTheDocument()
  })

  it('renders navigation dots', () => {
    render(<TestimonialSlider />)
    const dots = screen.getAllByRole('button', { name: /Go to testimonial/i })
    expect(dots).toHaveLength(4)
  })

  it('disables previous button on first slide', () => {
    render(<TestimonialSlider />)
    const prevButton = screen.getByLabelText('Previous testimonial')
    expect(prevButton).toBeDisabled()

    const nextButton = screen.getByLabelText('Next testimonial')
    expect(nextButton).not.toBeDisabled()
  })
})
