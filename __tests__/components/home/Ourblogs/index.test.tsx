import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import OutBlogs from '@/components/home/Ourblogs'
import blogData from '@/data/blog-posts.json'

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

  it('renders the three newest posts from the blog registry', () => {
    render(<OutBlogs />)

    const headings = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(headings).toEqual(blogData.posts.slice(0, 3).map((p) => p.heading))
    for (const post of blogData.posts.slice(0, 3)) {
      expect(screen.getByText(post.date)).toBeInTheDocument()
    }
  })

  it('passes each post href through to the card', () => {
    render(<OutBlogs />)
    const links = screen.getAllByRole('link')
    const expected = blogData.posts
      .slice(0, 3)
      .map((p) => ('href' in p ? p.href : undefined))
      .filter(Boolean)
    expect(links.map((l) => l.getAttribute('href'))).toEqual(expected)
  })
})
