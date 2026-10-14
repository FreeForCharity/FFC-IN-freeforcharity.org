import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe } from '../../utils/axe'
import RequiredFieldsNotice from '@/components/ui/RequiredFieldsNotice'
import SaveAnswersFirst from '@/components/ui/SaveAnswersFirst'
import Page501c3 from '@/app/501c3/page'
import PagePre501c3 from '@/app/pre501c3/page'

jest.mock('@/lib/assetPath', () => ({
  assetPath: (path: string) => path,
}))

// next/link drops the trailing slash under Jest (the static export adds it
// back via trailingSlash: true).
const GUIDE = {
  '501c3': '/501c3/application-guide',
  pre501c3: '/pre501c3/application-guide',
} as const

describe('RequiredFieldsNotice', () => {
  it.each(['501c3', 'pre501c3'] as const)(
    'explains the high-demand reason and links the %s application guide',
    async (track) => {
      const { container } = render(<RequiredFieldsNotice track={track} />)
      expect(
        screen.getByRole('heading', { name: 'Why every required field is required' })
      ).toBeInTheDocument()
      expect(container.textContent).toMatch(/demand for them is very high/i)
      expect(container.textContent).toMatch(/not able to make exceptions/i)
      expect(container.textContent).toMatch(/free to set up/i)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', GUIDE[track])
      // Same site now, so it no longer opens a new tab.
      expect(link).not.toHaveAttribute('target')
      expect(await axe(container)).toHaveNoViolations()
    },
    30000
  )

  it('avoids blunt "no waivers" phrasing', () => {
    const { container } = render(<RequiredFieldsNotice track="501c3" />)
    expect(container.textContent).not.toMatch(/waiver/i)
    expect(container.textContent).not.toMatch(/required means required/i)
  })

  it.each([
    ['501c3', Page501c3],
    ['pre501c3', PagePre501c3],
  ] as const)('is shown on /%s/ and links that form’s guide', (track, Page) => {
    const { container } = render(<Page />)
    expect(container.querySelector('#required-fields')).not.toBeNull()
    const hrefs = Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href'))
    expect(hrefs).toContain(GUIDE[track])
  })
})

describe('SaveAnswersFirst', () => {
  it.each(['501c3', 'pre501c3'] as const)(
    'tells applicants to save answers in a document and links the %s worksheet',
    async (track) => {
      const { container } = render(<SaveAnswersFirst track={track} />)
      expect(
        screen.getByRole('heading', {
          name: /save every answer in a Word document or Google Doc first/i,
        })
      ).toBeInTheDocument()
      expect(container.textContent).toMatch(/copy each one into the application form/i)
      expect(container.textContent).toMatch(/nothing is lost/i)
      expect(screen.getByRole('link')).toHaveAttribute('href', `${GUIDE[track]}#worksheet`)
      expect(await axe(container)).toHaveNoViolations()
    },
    30000
  )

  it.each([
    ['/501c3/', Page501c3],
    ['/pre501c3/', PagePre501c3],
  ])('appears on %s before the first apply button', (_route, Page) => {
    const { container } = render(<Page />)
    const step = container.querySelector('#save-your-answers')
    expect(step).not.toBeNull()
    const firstApply = container.querySelector('a[href*="a=add&pid="]')
    expect(firstApply).not.toBeNull()
    // DOCUMENT_POSITION_FOLLOWING: the apply link comes after the step.
    expect(step!.compareDocumentPosition(firstApply!) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    )
  })
})
