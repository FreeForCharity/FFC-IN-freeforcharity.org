import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from '@/components/home/HeroSection'

describe('Hero Section', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { name: /welcome to free for charity/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the descriptive paragraph', () => {
    render(<Hero />)
    const paragraph = screen.getByText(
      /connecting students, professionals, & businesses with charities in need/i
    )
    expect(paragraph).toBeInTheDocument()
  })

  it('renders the hero image', () => {
    render(<Hero />)
    const image = screen.getByRole('img', { name: /hero/i })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src')
  })
})
