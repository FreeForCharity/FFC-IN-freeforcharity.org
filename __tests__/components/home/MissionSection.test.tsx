import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Mission from '../../../src/components/home/MissionSection/index'

describe('MissionSection', () => {
  it('renders the Mission section heading', () => {
    render(<Mission />)
    const heading = screen.getByRole('heading', {
      name: /Free for Charity has a simple mission with broad implications/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders the mission text paragraphs', () => {
    render(<Mission />)
    expect(
      screen.getByText(/Reduce costs and increase revenues for nonprofits/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/This charity for charities seeks to replace as many functions as possible/i)
    ).toBeInTheDocument()
  })

  it('renders the "Visit Site" button', () => {
    render(<Mission />)
    const button = screen.getByRole('button', { name: /Visit Site/i })
    expect(button).toBeInTheDocument()
  })
})
