import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe } from '../../utils/axe'
import RequiredFieldsNotice from '@/components/ui/RequiredFieldsNotice'
import Page501c3 from '@/app/501c3/page'
import PagePre501c3 from '@/app/pre501c3/page'

jest.mock('@/lib/assetPath', () => ({
  assetPath: (path: string) => path,
}))

const GUIDE_URL = 'https://ffcadmin.org/guides/application-fields/'

describe('RequiredFieldsNotice', () => {
  it('explains the high-demand reason and links the application field guide', async () => {
    const { container } = render(<RequiredFieldsNotice />)
    expect(
      screen.getByRole('heading', { name: 'Why every required field is required' })
    ).toBeInTheDocument()
    expect(container.textContent).toMatch(/demand for them is very high/i)
    expect(container.textContent).toMatch(/not able to make exceptions/i)
    expect(container.textContent).toMatch(/free to set up/i)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', GUIDE_URL)
    expect(link).toHaveAttribute('target', '_blank')
    expect(await axe(container)).toHaveNoViolations()
  }, 30000)

  it('avoids blunt "no waivers" phrasing', () => {
    const { container } = render(<RequiredFieldsNotice />)
    expect(container.textContent).not.toMatch(/waiver/i)
    expect(container.textContent).not.toMatch(/required means required/i)
  })

  it.each([
    ['/501c3/', Page501c3],
    ['/pre501c3/', PagePre501c3],
  ])('is shown on %s', (_route, Page) => {
    const { container } = render(<Page />)
    expect(container.querySelector('#required-fields')).not.toBeNull()
    const hrefs = Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href'))
    expect(hrefs).toContain(GUIDE_URL)
  })
})
