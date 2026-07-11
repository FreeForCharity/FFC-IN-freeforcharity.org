/**
 * ApplyOptions — the reusable on-page apply block used on the charity funnel
 * pages. Guards the two critical outbound onboarding links (pid 33 / pid 16),
 * the inline "Help me choose" panel behaviour, and component-level a11y.
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe } from '../../utils/axe'
import ApplyOptions from '@/components/ui/ApplyOptions'

describe('ApplyOptions', () => {
  it('renders both apply links to the stable WHMCS onboarding products', () => {
    render(<ApplyOptions />)
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href') ?? '')
    expect(hrefs.some((h) => h.includes('a=add&pid=33'))).toBe(true) // full 501(c)(3)
    expect(hrefs.some((h) => h.includes('a=add&pid=16'))).toBe(true) // pre-501(c)3
    for (const h of hrefs) expect(h).not.toContain('confproduct')
  })

  it('offers the "Help me choose" guide and reveals a recommendation on choice', () => {
    render(<ApplyOptions />)
    // The native <details> disclosure and its single-choice question exist.
    expect(
      screen.getByRole('group', { name: /Which best describes your organization/i })
    ).toBeInTheDocument()

    // No recommendation until an answer is chosen.
    expect(screen.queryByText(/use this application/i)).not.toBeInTheDocument()

    // Picking the determination-letter answer recommends the 501(c)(3) path.
    fireEvent.click(screen.getByRole('radio', { name: /determination letter/i }))
    expect(screen.getByText(/use this application/i)).toBeInTheDocument()
  })

  it('routes veterans / other 501(c) types to the 501(c)(3) application', () => {
    render(<ApplyOptions />)
    fireEvent.click(screen.getByRole('radio', { name: /veterans post or another 501\(c\) type/i }))
    expect(screen.getByText(/pick the organization type that matches/i)).toBeInTheDocument()
    // The apply CTA in the revealed panel still deep-links to pid 33.
    const links = screen
      .getAllByRole('link', { name: /Apply as a 501\(c\)\(3\) charity/ })
      .map((a) => a.getAttribute('href') ?? '')
    expect(links.every((h) => h.includes('a=add&pid=33'))).toBe(true)
  })

  it('tells fiscally sponsored projects their sponsor must apply and approve them', () => {
    render(<ApplyOptions />)
    fireEvent.click(screen.getByRole('radio', { name: /under a fiscal sponsor/i }))
    expect(screen.getByText(/must apply and approve your project/i)).toBeInTheDocument()
    // The email-grant rationale is stated — the reason the sponsor is required.
    expect(screen.getByText(/email grants attach to the sponsor/i)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /How we evaluate fiscal sponsorship/i })
    ).toHaveAttribute('href', 'https://ffcadmin.org/intake-help/fiscal-sponsorship/')
  })

  it('routes non-US organizations to TechSoup as the graceful out-path', () => {
    render(<ApplyOptions />)
    fireEvent.click(screen.getByRole('radio', { name: /based outside the United States/i }))
    expect(screen.getByRole('link', { name: 'TechSoup' })).toHaveAttribute(
      'href',
      'https://www.techsoup.org/'
    )
    // Territories count as US — the copy must say so to avoid false declines.
    expect(screen.getByText(/Puerto Rico/)).toBeInTheDocument()
  })

  it('has no axe violations before and after choosing', async () => {
    const { container } = render(<ApplyOptions />)
    expect(await axe(container)).toHaveNoViolations()
    fireEvent.click(screen.getByRole('radio', { name: /determination letter/i }))
    expect(await axe(container)).toHaveNoViolations()
  }, 30000)
})
