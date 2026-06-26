import React from 'react'
import { render } from '@testing-library/react'
import { axe } from '../../utils/axe'

import DomainCard from '@/components/ui/Domain-Card'
import EducationalSitesCard from '@/components/ui/EducationalSitesCard'
import FrequentlyAskedQuestions from '@/components/ui/Frequently-Asked-Questions'
import GeneralDonationCard from '@/components/ui/General-Donation-Card'
import HeroSection from '@/components/ui/HeroSection'
import ModuleCard from '@/components/ui/Module-card'
import OrangeFaqItem from '@/components/ui/OrangeFaqItem'
import ProgressBar from '@/components/ui/ProgressBar'
import ProvingGroundSection from '@/components/ui/ProvingGroundSection'
import ResultCard from '@/components/ui/ResultCard'

describe('UI batch 2 components', () => {
  describe('Domain-Card (StepCard)', () => {
    it('renders and has no accessibility violations', async () => {
      const { container } = render(
        <DomainCard
          imageSrc="/Images/step.webp"
          imageAlt="Domain setup step icon"
          text="Register your nonprofit domain for free."
        />
      )
      expect(container).not.toBeEmptyDOMElement()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }, 30000)
  })

  describe('EducationalSitesCard', () => {
    it('renders and has no accessibility violations', async () => {
      const { container } = render(
        <EducationalSitesCard
          imageSrc="/Images/educational-site.webp"
          title="Great resource for small nonprofits"
          link="https://example.org"
        />
      )
      expect(container).not.toBeEmptyDOMElement()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }, 30000)
  })

  describe('Frequently-Asked-Questions', () => {
    it('renders and has no accessibility violations', async () => {
      const { container } = render(
        <FrequentlyAskedQuestions title="How do I qualify for a free website?">
          <p>Your organization must be a registered 501(c)(3) nonprofit.</p>
        </FrequentlyAskedQuestions>
      )
      expect(container).not.toBeEmptyDOMElement()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }, 30000)
  })

  describe('General-Donation-Card', () => {
    it('renders and has no accessibility violations', async () => {
      const { container } = render(
        <GeneralDonationCard
          title="Donate Today"
          description="Support nonprofits with your contribution."
          img="/Images/donate.webp"
          href="https://example.org/donate"
        />
      )
      expect(container).not.toBeEmptyDOMElement()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }, 30000)
  })

  describe('HeroSection', () => {
    it('renders and has no accessibility violations', async () => {
      const { container } = render(
        <HeroSection
          heading="Free For Charity"
          paragraph="Free websites and domain management for nonprofits."
          heroImg="/Images/hero.webp"
        />
      )
      expect(container).not.toBeEmptyDOMElement()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }, 30000)
  })

  describe('Module-card', () => {
    it('renders and has no accessibility violations', async () => {
      const { container } = render(
        <ModuleCard title="Getting Started" id="module-getting-started">
          <p>Learn how to set up your nonprofit website.</p>
        </ModuleCard>
      )
      expect(container).not.toBeEmptyDOMElement()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }, 30000)
  })

  describe('OrangeFaqItem (AccordionItem)', () => {
    it('renders and has no accessibility violations', async () => {
      const { container } = render(
        <OrangeFaqItem title="What does Free For Charity offer?">
          <p>We provide free websites and domain management.</p>
        </OrangeFaqItem>
      )
      expect(container).not.toBeEmptyDOMElement()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }, 30000)
  })

  describe('ProgressBar', () => {
    it('renders and has no accessibility violations', async () => {
      const { container } = render(<ProgressBar title="Fundraising Goal" percentage={75} />)
      expect(container).not.toBeEmptyDOMElement()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }, 30000)
  })

  describe('ProvingGroundSection', () => {
    it('renders and has no accessibility violations', async () => {
      const { container } = render(
        <ProvingGroundSection title="Our Proving Ground">
          <p>See how we have helped nonprofits succeed.</p>
        </ProvingGroundSection>
      )
      expect(container).not.toBeEmptyDOMElement()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }, 30000)
  })

  describe('ResultCard', () => {
    it('renders and has no accessibility violations', async () => {
      const { container } = render(
        <ResultCard title="500" description="Nonprofits served and counting." />
      )
      expect(container).not.toBeEmptyDOMElement()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }, 30000)
  })
})
