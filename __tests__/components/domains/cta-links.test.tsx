import React from 'react'
import { render } from '@testing-library/react'
import OrderYourDomain from '@/components/domains/Order-Your-Domain/index'
import DearProspective from '@/components/domains/Dear-Prospective/index'
import GetNewWebsite from '@/components/domains/Get-New-Website/index'

// Mock the assetPath helper (matches other component tests)
jest.mock('@/lib/assetPath', () => ({
  assetPath: (path: string) => path,
}))

describe('Domain CTA links point at stable WHMCS product ids (Refs #456)', () => {
  const components: Array<[string, React.ReactElement]> = [
    ['Order-Your-Domain', <OrderYourDomain key="order" />],
    ['Dear-Prospective', <DearProspective key="dear" />],
    ['Get-New-Website', <GetNewWebsite key="website" />],
  ]

  it.each(components)('%s has no archived legacy bundle or confproduct links', (_name, element) => {
    const { container } = render(element)
    const hrefs = Array.from(container.querySelectorAll('a')).map(
      (a) => a.getAttribute('href') ?? ''
    )
    for (const href of hrefs) {
      expect(href).not.toContain('confproduct')
      expect(href).not.toContain(
        'hub/store/ffc-consulting/free-org-domain-name-with-microsoft-email-address-setup'
      )
    }
  })

  it('Order-Your-Domain links to the register-a-new-.org product (pid 39)', () => {
    const { container } = render(<OrderYourDomain />)
    const hrefs = Array.from(container.querySelectorAll('a')).map(
      (a) => a.getAttribute('href') ?? ''
    )
    expect(hrefs.some((href) => href.includes('a=add&pid=39'))).toBe(true)
  })
})
