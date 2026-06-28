import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from '../../utils/axe'

import AdminGuideLink from '@/components/ui/AdminGuideLink'
import { adminLinks, ffcAdminUrl, FFC_ADMIN_BASE } from '@/data/admin-links'

describe('AdminGuideLink', () => {
  it('renders the primary variant with no a11y violations', async () => {
    const { container } = render(
      <AdminGuideLink
        href={ffcAdminUrl(adminLinks.techstack.newModel)}
        description="See how we build and host your site."
      />
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://ffcadmin.org/tech-stack/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)

  it('renders the legacy variant with default label', async () => {
    render(<AdminGuideLink href={ffcAdminUrl(adminLinks.techstack.legacy!)} variant="legacy" />)
    expect(screen.getByRole('link')).toHaveTextContent(/legacy wordpress/i)
  }, 30000)
})

describe('admin-links data', () => {
  it('ffcAdminUrl builds absolute ffcadmin.org URLs', () => {
    expect(ffcAdminUrl('/tech-stack/')).toBe(`${FFC_ADMIN_BASE}/tech-stack/`)
    expect(ffcAdminUrl('tech-stack/')).toBe(`${FFC_ADMIN_BASE}/tech-stack/`)
  })

  it('every link path is root-relative so ffcAdminUrl composes cleanly', () => {
    for (const entry of Object.values(adminLinks)) {
      expect(entry.newModel.startsWith('/')).toBe(true)
      if (entry.legacy) expect(entry.legacy.startsWith('/')).toBe(true)
    }
  })
})
