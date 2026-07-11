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

  it('opens the "Help me choose" panel and reveals a recommendation inline', () => {
    render(<ApplyOptions />)
    // Panel is collapsed until requested.
    expect(screen.queryByText(/Which best describes your organization/i)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Help me choose/i }))
    expect(screen.getByText(/Which best describes your organization/i)).toBeInTheDocument()

    // Picking the determination-letter answer recommends the 501(c)(3) path.
    fireEvent.click(screen.getByRole('radio', { name: /determination letter/i }))
    expect(screen.getByText(/use this application/i)).toBeInTheDocument()
  })

  it('has no axe violations, collapsed and expanded', async () => {
    const { container } = render(<ApplyOptions />)
    expect(await axe(container)).toHaveNoViolations()
    fireEvent.click(screen.getByRole('button', { name: /Help me choose/i }))
    fireEvent.click(screen.getByRole('radio', { name: /determination letter/i }))
    expect(await axe(container)).toHaveNoViolations()
  }, 30000)
})
