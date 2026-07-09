import React from 'react'
import { render, screen } from '@testing-library/react'
import VerifyYourDomain from '@/components/domains/Verify-Your-Domain/index'
import SetupEmailHosting from '@/components/domains/Setup-Email-Hosting/index'
import GetNewWebsite from '@/components/domains/Get-New-Website/index'
import OrderYourDomain from '@/components/domains/Order-Your-Domain/index'

// Mock the assetPath helper (matches other component tests)
jest.mock('@/lib/assetPath', () => ({
  assetPath: (path: string) => path,
}))

describe('Onboarding journey sync (Cloudflare / GitHub Pages / M365 + Google)', () => {
  describe('Verify-Your-Domain', () => {
    it('no longer references ICANN or SUSPENSION and now points to Cloudflare', () => {
      const { container } = render(<VerifyYourDomain />)
      const text = container.textContent ?? ''
      expect(text).not.toMatch(/ICANN/i)
      expect(text).not.toMatch(/SUSPENSION/i)
      expect(text).toMatch(/Cloudflare/i)
    })
  })

  describe('Setup-Email-Hosting', () => {
    it('offers both Microsoft 365 and Google Workspace', () => {
      const { container } = render(<SetupEmailHosting />)
      const text = container.textContent ?? ''
      expect(text).toMatch(/Microsoft 365/i)
      expect(text).toMatch(/Google Workspace/i)
    })
  })

  describe('Get-New-Website', () => {
    it('describes the GitHub Pages model, not the WordPress plugins/themes model', () => {
      const { container } = render(<GetNewWebsite />)
      const text = container.textContent ?? ''
      expect(text).toMatch(/GitHub Pages/i)
      expect(text).not.toMatch(/plugins, and themes/i)
    })
  })

  describe('Order-Your-Domain', () => {
    it('presents transfer as a supported option', () => {
      render(<OrderYourDomain />)
      const matches = screen.getAllByText(/transfer/i)
      expect(matches.length).toBeGreaterThan(0)
    })
  })
})
