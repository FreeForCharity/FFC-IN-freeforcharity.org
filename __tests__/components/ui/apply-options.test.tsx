/**
 * ApplyOptions — the reusable on-page apply block used on the charity funnel
 * pages. Guards the two critical outbound onboarding links (pid 33 / pid 16),
 * the inline "Help me choose" panel behaviour, and component-level a11y.
 */
import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe } from '../../utils/axe'
import ApplyOptions from '@/components/ui/ApplyOptions'
import { hubAddProduct, ONBOARDING_PID } from '@/lib/config'

/** The revealed recommendation panel (aria-live region) — scoping queries here
 *  keeps assertions from being satisfied by the page-level apply buttons. */
function resultPanel(container: HTMLElement): HTMLElement {
  const panel = container.querySelector('[aria-live="polite"]')
  if (!panel) throw new Error('no recommendation panel revealed')
  return panel as HTMLElement
}

describe('ApplyOptions', () => {
  it('renders both apply links to the stable WHMCS onboarding products', () => {
    render(<ApplyOptions />)
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href') ?? '')
    expect(hrefs).toContain(hubAddProduct(ONBOARDING_PID.full501c3))
    expect(hrefs).toContain(hubAddProduct(ONBOARDING_PID.pre501c3))
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
    const { container } = render(<ApplyOptions />)
    fireEvent.click(screen.getByRole('radio', { name: /veterans post or another 501\(c\) type/i }))
    const panel = within(resultPanel(container))
    expect(panel.getByText(/pick the organization type that matches/i)).toBeInTheDocument()
    // The apply CTA inside the revealed panel itself deep-links to pid 33 —
    // scoped to the panel so the page-level card button can't satisfy this.
    expect(panel.getByRole('link', { name: /Apply as a 501\(c\)\(3\) charity/ })).toHaveAttribute(
      'href',
      hubAddProduct(ONBOARDING_PID.full501c3)
    )
  })

  it('tells fiscally sponsored projects their sponsor must apply and approve them', () => {
    const { container } = render(<ApplyOptions />)
    fireEvent.click(screen.getByRole('radio', { name: /under a fiscal sponsor/i }))
    const panel = within(resultPanel(container))
    expect(panel.getByText(/must apply and approve your project/i)).toBeInTheDocument()
    // The email-grant rationale is stated — the reason the sponsor is required.
    expect(panel.getByText(/email grants attach to the sponsor/i)).toBeInTheDocument()
    // Both affordances render: the sponsor's 501(c)(3) application AND the
    // project's own pre-501(c)(3) path the copy recommends.
    expect(panel.getByRole('link', { name: /Apply as a 501\(c\)\(3\) charity/ })).toHaveAttribute(
      'href',
      hubAddProduct(ONBOARDING_PID.full501c3)
    )
    expect(
      panel.getByRole('link', { name: /Apply as a pre-501\(c\)\(3\) organization/ })
    ).toHaveAttribute('href', hubAddProduct(ONBOARDING_PID.pre501c3))
    // Corporate fiscal sponsors are steered to talk with FFC first.
    expect(panel.getByText(/talk with us first/i)).toBeInTheDocument()
    expect(
      panel.getByRole('link', { name: /How we evaluate fiscal sponsorship/i })
    ).toHaveAttribute('href', 'https://ffcadmin.org/intake-help/fiscal-sponsorship/')
  })

  it('gives over-$1M organizations the graceful out-path, not an application', () => {
    const { container } = render(<ApplyOptions />)
    fireEvent.click(screen.getByRole('radio', { name: /annual revenue is \$1 million or more/i }))
    const panel = within(resultPanel(container))
    expect(panel.getByText(/reserved for charities with annual revenue under/i)).toBeInTheDocument()
    expect(panel.getByRole('link', { name: 'TechSoup' })).toHaveAttribute(
      'href',
      'https://www.techsoup.org/'
    )
    // No apply button in this panel — it's a decline, not a routing.
    expect(panel.queryByRole('link', { name: /Apply as a/ })).not.toBeInTheDocument()
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
