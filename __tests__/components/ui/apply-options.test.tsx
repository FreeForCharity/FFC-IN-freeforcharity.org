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

  it('has no axe violations before and after choosing', async () => {
    const { container } = render(<ApplyOptions />)
    expect(await axe(container)).toHaveNoViolations()
    fireEvent.click(screen.getByRole('radio', { name: /determination letter/i }))
    expect(await axe(container)).toHaveNoViolations()
  }, 30000)
})
