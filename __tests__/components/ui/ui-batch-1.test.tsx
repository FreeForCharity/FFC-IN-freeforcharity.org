import React from 'react'
import { render } from '@testing-library/react'
import { axe } from '../../utils/axe'

import Accordian from '@/components/ui/Accordian'
import AccordianBold from '@/components/ui/AccordianBold'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import BecomePartOfOurMissionCard from '@/components/ui/BecomePartOfOurMissionCard'
import BlogCard from '@/components/ui/BlogCard'
import Bluebtn from '@/components/ui/Bluebtn'
import CallToActionCard from '@/components/ui/CallToActionCard'
import CharityNonprofitDirectorFaq from '@/components/ui/Charity-Nonprofit-Director-Faq'
import ContactDataCard from '@/components/ui/Contact-data-card'

describe('Accordian', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(
      <Accordian number="1" title="What is Free For Charity?">
        We provide free websites for nonprofits.
      </Accordian>
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('AccordianBold', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(
      <AccordianBold number="1" title="How do we qualify?">
        Your organization must be a registered 501(c)(3).
      </AccordianBold>
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('AnimatedNumber', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(<AnimatedNumber value={1500} />)
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('BecomePartOfOurMissionCard', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(
      <BecomePartOfOurMissionCard
        bgImage="/images/mission-bg.jpg"
        heading="Become Part Of Our Mission"
        description1="Help us provide free websites to nonprofits."
        description2="Join our community of volunteers today."
        buttonText="Get Involved"
        buttonLink="/get-involved"
      />
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('BlogCard', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(
      <BlogCard
        imageUrl="/images/blog-post.jpg"
        heading="How Nonprofits Save Money With FFC"
        date="June 26, 2026"
        description="A look at the services Free For Charity offers to nonprofits."
        href="/blog/save-money"
      />
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('Bluebtn', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(<Bluebtn href="/learn-more">Learn More</Bluebtn>)
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('CallToActionCard', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(
      <CallToActionCard
        icon={<span>icon</span>}
        iconLabel="Free websites"
        text="Free Websites For Nonprofits"
        href="/services"
      />
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('Charity-Nonprofit-Director-Faq', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(<CharityNonprofitDirectorFaq />)
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

describe('Contact-data-card', () => {
  it('renders and has no a11y violations', async () => {
    const { container } = render(
      <ContactDataCard
        imageSrc="/images/location-pin.svg"
        heading="Main Address"
        description={'4030 Wake Forest Road STE 349 Raleigh\nNorth Carolina 27609'}
      />
    )
    expect(container).not.toBeEmptyDOMElement()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})
