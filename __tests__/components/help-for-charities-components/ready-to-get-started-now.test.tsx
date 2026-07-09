/**
 * Ready-to-Get-Started-Now — the shared 501(c)(3)/pre-501(c)(3) onboarding CTA.
 *
 * Refs FFC-IN-freeforcharity.org#452: the CTAs must deep-link to the WHMCS
 * onboarding products by stable id (a=add&pid=) rather than the fragile
 * cart-index (a=confproduct&i=) that shifts when the catalog is reordered.
 * pre-501c3 → pid 16, full 501c3 → pid 33.
 */
import { render, screen } from '@testing-library/react'
import ReadyToGetStarted from '@/components/help-for-charities-components/Ready-to-Get-Started-Now'

describe('Ready-to-Get-Started-Now CTA links', () => {
  beforeEach(() => render(<ReadyToGetStarted />))

  it('links the 501(c)(3) CTA to onboarding product pid 33 via a=add', () => {
    const link = screen.getByRole('link', { name: /^501\(c\)3 Charities Click Here/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('a=add&pid=33'))
  })

  it('links the pre-501(c)(3) CTA to onboarding product pid 16 via a=add', () => {
    const link = screen.getByRole('link', { name: /^Pre-501\(c\)3 Charities Click Here/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('a=add&pid=16'))
  })

  it('no longer uses the fragile confproduct cart-index links', () => {
    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('href') ?? '').not.toContain('confproduct')
    }
  })
})
