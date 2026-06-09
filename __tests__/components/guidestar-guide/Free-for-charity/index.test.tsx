import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import FreeForCharity from '@/components/guidestar-guide/Free-for-charity'

describe('Free-for-charity component', () => {
  it('renders without crashing', () => {
    const { container } = render(<FreeForCharity />)
    expect(container).toBeInTheDocument()
  })

  it('displays the instructional text correctly', () => {
    render(<FreeForCharity />)
    const instructionText = screen.getByText(
      /GuideStar is the main tool for helping you gather the information/i
    )
    expect(instructionText).toBeInTheDocument()

    const boldText = screen.getByText(
      /To be supported by Free For Charity, we require organizations to be at least Gold/i
    )
    expect(boldText).toBeInTheDocument()
    expect(boldText.tagName).toBe('STRONG')
  })

  it('renders the image with the correct alt text', () => {
    render(<FreeForCharity />)
    const image = screen.getByAltText(
      'Free For Charity GuideStar onboarding requirements and highlighted fields'
    )
    expect(image).toBeInTheDocument()
    expect(image.tagName).toBe('IMG')
  })

  it('has no basic accessibility violations', async () => {
    const { container } = render(<FreeForCharity />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
