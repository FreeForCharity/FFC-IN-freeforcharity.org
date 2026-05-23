import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CharityValidationGuide from '@/components/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes-components/Hero'

describe('CharityValidationGuide Hero Component', () => {
  it('renders without crashing', () => {
    render(<CharityValidationGuide />)
    expect(
      screen.getByRole('heading', {
        name: /Charity Validation Guide: Ensuring Mutual Benefit Through Comprehensive Validation Processes/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the Introduction section', () => {
    render(<CharityValidationGuide />)
    expect(screen.getByRole('heading', { name: /Introduction/i })).toBeInTheDocument()
    expect(
      screen.getByText(
        /Effective validation of charitable entities is not only pivotal for the credibility/i
      )
    ).toBeInTheDocument()
  })

  it('renders external and internal validation subheadings', () => {
    render(<CharityValidationGuide />)
    expect(
      screen.getByRole('heading', { name: /External Trusted Validation Sources/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Internal Validation Steps/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Conclusion/i })).toBeInTheDocument()
  })
})
