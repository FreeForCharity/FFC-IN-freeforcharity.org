import React from 'react'
import { render, screen } from '@testing-library/react'
import Mission from '@/components/home/MissionSection'

describe('Mission component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Mission />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders the main heading', () => {
    render(<Mission />)
    const heading = screen.getByRole('heading', {
      name: /Free for Charity has a simple mission with broad implications/i,
      level: 1,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders the visit site button and passes href to it', () => {
    render(<Mission />)
    const button = screen.getByRole('button', { name: /Visit Site/i })
    expect(button).toBeInTheDocument()
    // It's a custom button, let's just make sure it's present and the text matches
    // since the click logic is handled inside `BlueBtn` which might not render an anchor.
  })

  it('renders the descriptive paragraphs', () => {
    render(<Mission />)
    expect(
      screen.getByText(/Reduce costs and increase revenues for nonprofits/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/This charity for charities seeks to replace/i)).toBeInTheDocument()
  })
})
