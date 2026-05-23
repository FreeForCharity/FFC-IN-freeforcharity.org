import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Mission from '../../../../src/components/home/MissionSection/index'

describe('Mission Component', () => {
  it('renders the Mission section heading', () => {
    render(<Mission />)
    const heading = screen.getByRole('heading', {
      name: /Free for Charity has a simple mission with broad implications./i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders the mission paragraphs', () => {
    render(<Mission />)
    const firstParagraph = screen.getByText(/Reduce costs and increase revenues for nonprofits/i)
    const secondParagraph = screen.getByText(
      /This charity for charities seeks to replace as many functions as possible/i
    )
    expect(firstParagraph).toBeInTheDocument()
    expect(secondParagraph).toBeInTheDocument()
  })

  it('renders the Visit Site button and opens correct link on click', () => {
    const originalOpen = window.open
    window.open = jest.fn()
    render(<Mission />)
    const button = screen.getByRole('button', { name: /Visit Site/i })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(window.open).toHaveBeenCalledWith('/about-us', '_blank')
    window.open = originalOpen
  })
})
