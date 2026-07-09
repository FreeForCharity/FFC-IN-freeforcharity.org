import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import FrequentlyAskedQuestions from '@/components/home-page/FrequentlyAskedQuestions/index'

describe('Home-page FAQ onboarding sync (Refs #455 + #458)', () => {
  it('drops the stale eNom / Platinum / WordPress webmaster / ffcdomains copy', () => {
    const { container } = render(<FrequentlyAskedQuestions />)
    const text = container.textContent ?? ''
    expect(text).not.toMatch(/eNom/i)
    expect(text).not.toMatch(/Platinum account/i)
    expect(text).not.toMatch(/WordPress webmaster/i)
    expect(text).not.toMatch(/ffcdomains/i)
  })

  it('reflects the current model (Cloudflare Registrar + GitHub Pages static sites)', () => {
    const { container } = render(<FrequentlyAskedQuestions />)
    const text = container.textContent ?? ''
    expect(text).toContain('Cloudflare')
    expect(text).toContain('GitHub Pages')
  })
})
