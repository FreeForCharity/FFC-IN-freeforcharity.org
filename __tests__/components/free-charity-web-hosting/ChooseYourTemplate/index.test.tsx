import React from 'react'
import { render, screen } from '@testing-library/react'
import ChooseYourTemplate from '@/components/free-charity-web-hosting/ChooseYourTemplate'
import { axe } from '../../../utils/axe'

describe('ChooseYourTemplate Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<ChooseYourTemplate />)
    expect(container).toBeInTheDocument()
  })

  it('renders the "Choose your starting point" section heading', () => {
    render(<ChooseYourTemplate />)
    const heading = screen.getByRole('heading', { name: /Choose your starting point/i })
    expect(heading).toBeInTheDocument()
  })

  it('has the section id and scroll offset for anchor navigation', () => {
    const { container } = render(<ChooseYourTemplate />)
    const section = container.querySelector('section#choose-your-template')
    expect(section).toBeInTheDocument()
    expect(section?.className).toContain('scroll-mt-')
  })

  it('renders both template cards with their eyebrows', () => {
    render(<ChooseYourTemplate />)
    expect(screen.getByRole('heading', { name: /Single Page Site Template/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Footer-Only Template/i })).toBeInTheDocument()
    expect(screen.getByText(/Starting fresh\?/i)).toBeInTheDocument()
    expect(screen.getByText(/Already love your website\?/i)).toBeInTheDocument()
  })

  it('describes the gated journey outcome on both cards (site validated, then domain)', () => {
    render(<ChooseYourTemplate />)
    const outcome = screen.getAllByText(
      /your site validated live on its free GitHub Pages address, which unlocks your free \.org domain/i
    )
    expect(outcome).toHaveLength(2)
  })

  it('links each card to its GitHub template repository', () => {
    render(<ChooseYourTemplate />)
    const singlePageLink = screen.getByRole('link', {
      name: /View the Single Page template on GitHub/i,
    })
    expect(singlePageLink).toHaveAttribute(
      'href',
      'https://github.com/FreeForCharity/FFC-IN-FFC_Single_Page_Template'
    )
    const footerOnlyLink = screen.getByRole('link', {
      name: /View the Footer-Only template on GitHub/i,
    })
    expect(footerOnlyLink).toHaveAttribute(
      'href',
      'https://github.com/FreeForCharity/FFC-IN-Footer-Only-Template'
    )
    ;[singlePageLink, footerOnlyLink].forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders an apply CTA on each card pointing at the #apply anchor', () => {
    render(<ChooseYourTemplate />)
    const ctas = screen.getAllByRole('link', { name: /Apply to get started/i })
    expect(ctas).toHaveLength(2)
    ctas.forEach((cta) => expect(cta).toHaveAttribute('href', '#apply'))
  })

  it('shows the "not sure" guidance recommending the Single Page template', () => {
    render(<ChooseYourTemplate />)
    expect(screen.getByText(/Not sure which to pick\?/i)).toBeInTheDocument()
    expect(screen.getByText(/fastest path to a validated site/i)).toBeInTheDocument()
  })

  it('has no basic accessibility violations', async () => {
    const { container } = render(<ChooseYourTemplate />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
