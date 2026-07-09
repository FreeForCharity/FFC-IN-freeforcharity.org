import React from 'react'
import { render } from '@testing-library/react'
import Hero from '@/components/free-for-charity-ffc-web-developer-training-guide-components/Hero'

// Mock the assetPath helper (matches other component tests)
jest.mock('@/lib/assetPath', () => ({
  assetPath: (path: string) => path,
}))

describe('Web Developer Training Guide Hero (GitHub Pages current model + legacy WordPress)', () => {
  it('describes the current GitHub Pages static-site model', () => {
    const { container } = render(<Hero />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/GitHub Pages/)
  })

  it('clearly marks the retired WordPress workflow as legacy', () => {
    const { container } = render(<Hero />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/legacy/i)
  })
})
