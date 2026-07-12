import React from 'react'
import { render } from '@testing-library/react'
import { axe } from '../../utils/axe'
import JourneyDiagram from '@/components/journey/JourneyDiagram'

describe('JourneyDiagram', () => {
  it('renders an accessible image with title and description', () => {
    const { getByRole } = render(<JourneyDiagram />)
    const diagram = getByRole('img', {
      name: /five-stage Free For Charity onboarding journey/i,
    })
    expect(diagram).toBeInTheDocument()
    expect(diagram).toHaveAttribute('aria-describedby', 'journey-diagram-desc')
  })

  it('shows all five stages in the gated order', () => {
    const { container } = render(<JourneyDiagram />)
    const text = container.textContent || ''

    const apply = text.indexOf('Apply')
    const website = text.indexOf('Website')
    const domain = text.indexOf('Domain')
    const email = text.indexOf('Email')
    const ongoing = text.indexOf('Ongoing')

    expect(apply).toBeGreaterThan(-1)
    expect(website).toBeGreaterThan(apply)
    expect(domain).toBeGreaterThan(website)
    expect(email).toBeGreaterThan(domain)
    expect(ongoing).toBeGreaterThan(email)
  })

  it('highlights the funding gate between website and domain', () => {
    const { container } = render(<JourneyDiagram />)
    const text = container.textContent || ''

    expect(text).toContain('FUNDING GATE')
    expect(text).toMatch(/money is spent only after your site is proven/i)
    // The website stage sits on GitHub Pages before the gate
    expect(text).toContain('GitHub Pages')
  })

  it('is responsive: scales via viewBox with fluid width', () => {
    const { container } = render(<JourneyDiagram />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox')
    expect(svg?.getAttribute('class')).toContain('w-full')
    expect(svg?.getAttribute('class')).toContain('max-w-full')
  })

  it('uses the FFC brand colors', () => {
    const { container } = render(<JourneyDiagram />)
    const html = container.innerHTML
    expect(html).toContain('#0567B1')
    expect(html).toContain('#F58C23')
  })

  it('has no axe violations', async () => {
    const { container } = render(<JourneyDiagram />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})
