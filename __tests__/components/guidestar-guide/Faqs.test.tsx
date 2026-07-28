import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Faqs from '../../../src/components/guidestar-guide/Faqs/index'

describe('guidestar-guide/Faqs', () => {
  it('renders the Candid transparency seal as a real anchor + image (no dangerouslySetInnerHTML)', () => {
    const { container } = render(<Faqs />)

    const sealImg = screen.getByAltText('Candid Seal of Transparency') as HTMLImageElement
    expect(sealImg).toBeInTheDocument()
    expect(sealImg.tagName).toBe('IMG')
    expect(sealImg.getAttribute('src')).toBe(
      'https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/9326392/svg'
    )

    const wrapAnchor = sealImg.closest('a') as HTMLAnchorElement | null
    expect(wrapAnchor).not.toBeNull()
    // Candid retired the guidestar.org/profile/shared/<uuid> format; current links are
    // issued on app.candid.org and the pkId param is what makes them work without a login.
    expect(wrapAnchor!.getAttribute('href')).toBe(
      'https://app.candid.org/profile/9326392/free-for-charity-46-2471893/?pkId=7232730a-03b5-467f-a82c-443dcd2122ed'
    )
    expect(wrapAnchor!.getAttribute('target')).toBe('_blank')
    expect(wrapAnchor!.getAttribute('rel')).toBe('noopener noreferrer')

    // Regression guard: no element should be using dangerouslySetInnerHTML for the seal.
    // React strips the attribute name, but the resulting HTML must contain no script tags
    // and must contain the literal anchor + img we asserted above.
    expect(container.querySelector('script')).toBeNull()
  })
})
