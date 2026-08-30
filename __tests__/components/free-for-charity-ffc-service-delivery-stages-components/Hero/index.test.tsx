import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from '@/components/free-for-charity-ffc-service-delivery-stages-components/Hero'

describe('Free For Charity Service Delivery Stages - Hero Component', () => {
  it('renders without crashing', () => {
    render(<Hero />)
  })

  it('renders key headings', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { name: /Free For Charity \(FFC\)/i, level: 1 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Service Delivery Stages/i, level: 2 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Onboarding Philosophy/i, level: 2 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Supported Organization Establishment: Order of Operations/i,
        level: 2,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Service Expansion/i, level: 2 })
    ).toBeInTheDocument()
  })

  it('renders specific steps', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { name: /Initial Contact & Onboarding/i, level: 3 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /FFC Validation Checks/i, level: 3 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /FFC Offers Services/i, level: 3 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Receiving Basic Services Package/i, level: 3 })
    ).toBeInTheDocument()
  })
})
