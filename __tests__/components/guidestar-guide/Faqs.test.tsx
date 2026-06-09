import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Faqs from '../../../src/components/guidestar-guide/Faqs/index'

describe('guidestar-guide/Faqs', () => {
  it('renders the GuideStar transparency seal as a real anchor + image (no dangerouslySetInnerHTML)', () => {
    const { container } = render(<Faqs />)

    const sealImg = screen.getByAltText('GuideStar Transparency Seal') as HTMLImageElement
    expect(sealImg).toBeInTheDocument()
    expect(sealImg.tagName).toBe('IMG')
    expect(sealImg.getAttribute('src')).toBe(
      'https://widgets.guidestar.org/TransparencySeal/9326392'
    )

    const wrapAnchor = sealImg.closest('a') as HTMLAnchorElement | null
    expect(wrapAnchor).not.toBeNull()
    expect(wrapAnchor!.getAttribute('href')).toBe(
      'https://www.guidestar.org/profile/shared/bbbe173a-87b9-4af9-a8a2-cae255a95742'
    )
    expect(wrapAnchor!.getAttribute('target')).toBe('_blank')
    expect(wrapAnchor!.getAttribute('rel')).toBe('noopener noreferrer')

    // Regression guard: no element should be using dangerouslySetInnerHTML for the seal.
    // React strips the attribute name, but the resulting HTML must contain no script tags
    // and must contain the literal anchor + img we asserted above.
    expect(container.querySelector('script')).toBeNull()
  })
})
