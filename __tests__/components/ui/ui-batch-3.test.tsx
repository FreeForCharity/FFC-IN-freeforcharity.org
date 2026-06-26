import React from 'react'
import { render } from '@testing-library/react'
import { axe } from '../../utils/axe'

import SlidingCard from '@/components/ui/SlidingCard'
import StepCard from '@/components/ui/StepCard'
import StepContentCard from '@/components/ui/StepContentCard'
import { SustainableFundingCard } from '@/components/ui/SustainableFundingCard'
import TeamMemberCard from '@/components/ui/TeamMemberCard'
import ToolCard from '@/components/ui/ToolCard'
import Transparentbtn from '@/components/ui/Transparentbtn'
import InfoSection from '@/components/ui/help-for-charity'
import TrainingCard from '@/components/ui/trainingcard'

describe('SlidingCard', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(
      <SlidingCard
        subtitle="Build your nonprofit website"
        description={<p>We provide free websites for 501(c)(3) organizations.</p>}
        buttonText="Learn more"
        buttonLink="https://example.org"
        imageSrc="/Images/example.webp"
      />
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('StepCard', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(
      <StepCard
        step={{
          number: 1,
          title: 'Apply',
          description: 'Submit your application for a free website.',
          linkText: 'Get started',
          innerbg: 'bg-blue-500',
          outerbg: 'bg-white',
          linkUrl: 'https://example.org',
        }}
      />
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('StepContentCard', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(
      <StepContentCard title="How it works" id="how-it-works">
        <p>Follow these steps to get your free website.</p>
      </StepContentCard>
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('SustainableFundingCard', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(
      <SustainableFundingCard
        imageUrl="/Images/funding.webp"
        title="Sustainable funding"
        text="Keep your nonprofit running with sustainable funding strategies."
      />
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('TeamMemberCard', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(
      <TeamMemberCard
        imageUrl="/Images/member.webp"
        name="Jane Doe"
        title="Executive Director"
        linkedinUrl="https://linkedin.com/in/janedoe"
      />
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('ToolCard', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(
      <ToolCard
        logo="/Images/logo.webp"
        title="Google Workspace"
        description="Free productivity tools for your nonprofit."
        link="https://example.org"
      />
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('Transparentbtn', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(<Transparentbtn text="Donate now" href="https://example.org" />)
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('InfoSection (help-for-charity)', () => {
  it('renders with a non-empty title and has no a11y violations', async () => {
    const { container } = render(
      <InfoSection
        title="How we help charities"
        description="Free For Charity provides free websites and domain management."
      />
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)

  it('renders with an empty title without an empty-heading violation', async () => {
    const { container } = render(
      <InfoSection
        title=""
        description="Free For Charity provides free websites and domain management."
      />
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('TrainingCard', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(
      <TrainingCard
        src="/Images/training.webp"
        heading="Onboarding training"
        text="Learn how to manage your nonprofit website."
      />
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})
