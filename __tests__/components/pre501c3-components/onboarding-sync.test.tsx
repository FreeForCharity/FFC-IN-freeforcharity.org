import React from 'react'
import { render } from '@testing-library/react'
import Faqs from '@/components/pre501c3-components/Faqs'
import PagePre501c3 from '@/app/pre501c3/page'

jest.mock('@/lib/assetPath', () => ({
  assetPath: (path: string) => path,
}))

describe('pre-501c3 onboarding journey sync', () => {
  it('package list uses GitHub Pages, not WordPress', () => {
    const { container } = render(<Faqs />)
    expect(container.textContent).not.toMatch(/WordPress/i)
    expect(container.textContent).toContain('GitHub Pages')
  })

  it('Technology Package: email only after 501(c)(3) approval, free Gmail/Outlook until then', () => {
    const { container } = render(<Faqs />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/yourcharityname@gmail\.com or\s+yourcharityname@outlook\.com/)
    expect(text).toMatch(/until your 501\(c\)\(3\) is approved/)
    expect(text).toMatch(/Business Basic or Google Workspace\)\s+after the IRS approves/)
    expect(text).not.toMatch(/email routing/i)
    expect(text).not.toMatch(/non 501c3.*Microsoft 365/i)
    expect(text).not.toMatch(/info@yourcharityname\.org/)
  })

  it('/pre501c3/ explains the $1 verification charge the acceptance-email coupon zeroes', () => {
    const { container } = render(<PagePre501c3 />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/coupon from your acceptance email/)
    expect(text).toMatch(/\$1 verification charge, and the coupon brings it to \$0/)
  })

  it('/pre501c3/ hero puts charity email after 501(c)(3) approval', () => {
    const { container } = render(<PagePre501c3 />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/Charity email comes after the IRS approves your 501\(c\)\(3\)/)
    expect(text).toMatch(/yourcharityname@gmail\.com or @outlook\.com/)
  })

  it('never prints a coupon code on the page', () => {
    // Match any freeforcharity<year> coupon pattern so the literal secret
    // is never committed to the repo (epic #446 hard rule).
    const couponPattern = /freeforcharity\d{4}/i
    expect(render(<Faqs />).container.textContent).not.toMatch(couponPattern)
    expect(render(<PagePre501c3 />).container.textContent).not.toMatch(couponPattern)
  })

  it('builds the site right after approval, with nothing else to send', () => {
    const { container } = render(<PagePre501c3 />)
    const text = container.textContent ?? ''
    expect(text).not.toMatch(/order your GitHub Pages website service/i)
    expect(text).toMatch(/There is nothing else to send/)
    expect(text).toMatch(/preview link/i)
  })
})
