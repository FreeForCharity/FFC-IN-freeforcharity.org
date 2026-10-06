import React from 'react'
import { render, screen } from '@testing-library/react'
import BecomePartOfOurMission from '@/components/free-charity-web-hosting/BecomePartOfOurMission'

// Mock the BecomePartOfOurMissionCard component to make testing simpler
// and isolate the test to just the BecomePartOfOurMission component's rendering
jest.mock('@/components/ui/BecomePartOfOurMissionCard', () => {
  return function DummyBecomePartOfOurMissionCard(props: {
    heading: string
    description1: string
    description2: string
    buttonLink: string
    buttonText: string
  }) {
    return (
      <div data-testid="mission-card">
        <span data-testid="card-heading">{props.heading}</span>
        <span data-testid="card-desc1">{props.description1}</span>
        <span data-testid="card-desc2">{props.description2}</span>
        <a href={props.buttonLink} data-testid="card-link">
          {props.buttonText}
        </a>
      </div>
    )
  }
})

describe('BecomePartOfOurMission', () => {
  it('renders the main heading', () => {
    render(<BecomePartOfOurMission />)
    expect(screen.getByText('Become a part of our Mission')).toBeInTheDocument()
  })

  it('renders the HELP US card with correct props', () => {
    render(<BecomePartOfOurMission />)

    const cards = screen.getAllByTestId('mission-card')
    expect(cards).toHaveLength(2)

    expect(screen.getByText('HELP US')).toBeInTheDocument()
    expect(screen.getByText('INDIVIDUALS OR BUSINESSES LOOKING')).toBeInTheDocument()
    expect(screen.getByText('FOR A DOMAIN NAME PACKAGE')).toBeInTheDocument()

    const getStartedLinks = screen.getAllByText('Get Started')
    expect(getStartedLinks[0]).toHaveAttribute(
      'href',
      'https://freeforcharity.org/hub/store/free-for-charity-individual-supporter-package'
    )
  })

  it('renders the HELP THEM card with correct props', () => {
    render(<BecomePartOfOurMission />)

    expect(screen.getByText('HELP THEM')).toBeInTheDocument()
    expect(screen.getByText('FREE FOR CHARITY DOMAIN PACKAGE')).toBeInTheDocument()
    expect(screen.getByText('(NOT-FOR-PROFIT, PRE-501(C)3, FULL 501(C)3)')).toBeInTheDocument()

    const getStartedLinks = screen.getAllByText('Get Started')
    expect(getStartedLinks[1]).toHaveAttribute('href', '/help-for-charities')
  })
})
