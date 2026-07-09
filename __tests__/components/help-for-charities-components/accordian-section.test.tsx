/**
 * AccordianSection — the "Our Tech Stack" accordion on Help for Charities.
 *
 * Refs FFC-IN-freeforcharity.org#455: the tech stack now leads with the current
 * FFC delivery model — a GitHub Pages static site (not WordPress/Divi/WPMU DEV)
 * and email via Microsoft 365 or Google Workspace. This guards against the
 * retired stack creeping back into the copy.
 */
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import AccordianSection from '@/components/help-for-charities-components/AccordianSection'

describe('AccordianSection tech stack', () => {
  it('leads with the current GitHub Pages + Google Workspace delivery model', () => {
    const { container } = render(<AccordianSection />)
    expect(container.textContent).toContain('GitHub Pages')
    expect(container.textContent).toContain('Google Workspace')
  })

  it('no longer mentions the retired WordPress/Divi/WPMU DEV stack', () => {
    const { container } = render(<AccordianSection />)
    expect(container.textContent).not.toContain('Divi')
    expect(container.textContent).not.toContain('WPMU')
  })
})
