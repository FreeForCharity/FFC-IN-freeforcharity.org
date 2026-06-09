import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import OutBlogs from '@/components/home/Ourblogs'

// Mock the child component to isolate the test for OutBlogs
jest.mock('@/components/ui/BlogCard', () => {
  return function MockInfoCard({
    heading,
    date,
    description,
    href,
  }: {
    heading: string
    date: string
    description: string
    href?: string
  }) {
    return (
      <div data-testid="mock-info-card">
        <h3>{heading}</h3>
        <span>{date}</span>
        <p>{description}</p>
        {href && <a href={href}>Link</a>}
      </div>
    )
  }
})

describe('OutBlogs Component', () => {
  it('renders without crashing', () => {
    render(<OutBlogs />)
    expect(screen.getByText('Our Blogs')).toBeInTheDocument()
  })

  it('renders the correct number of InfoCard components', () => {
    render(<OutBlogs />)
    const cards = screen.getAllByTestId('mock-info-card')
    expect(cards).toHaveLength(3)
  })

  it('passes the correct props to the InfoCard components', () => {
    render(<OutBlogs />)

    // Check first blog
    expect(
      screen.getByText('We just updated for the 2022 GuideStar Platinum Seal')
    ).toBeInTheDocument()
    expect(screen.getByText('Jan 9, 2023')).toBeInTheDocument()
    expect(
      screen.getByText(/We're excited to share that our organization has earned/)
    ).toBeInTheDocument()

    // Check second blog
    expect(
      screen.getByText('Our organization earned a 2021 Platinum Seal of Transparency!')
    ).toBeInTheDocument()
    expect(screen.getByText('Jun 1, 2021')).toBeInTheDocument()

    // Check third blog
    expect(screen.getByText('What is the cost?')).toBeInTheDocument()
    expect(screen.getByText('Aug 24, 2017')).toBeInTheDocument()
  })

  it('passes the href correctly', () => {
    render(<OutBlogs />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
    expect(links[0]).toHaveAttribute(
      'href',
      '/we-just-updated-for-the-2022-guidestar-platinum-seal/'
    )
    expect(links[1]).toHaveAttribute(
      'href',
      '/our-organization-earned-a-2021-platinum-seal-of-transparency/'
    )
    expect(links[2]).toHaveAttribute('href', '/what-is-the-cost/')
  })
})
