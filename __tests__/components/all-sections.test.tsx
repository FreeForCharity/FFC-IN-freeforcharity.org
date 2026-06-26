import React from 'react'
import { render } from '@testing-library/react'
import { axe } from '../utils/axe'

/**
 * Render + accessibility coverage for every non-ui (section) component.
 *
 * Each entry is required lazily and rendered with no props (these are
 * page-section components). The suite asserts the component mounts and
 * produces DOM, then runs the shared fragment-axe config to catch real
 * accessibility regressions. ui/* primitives that require props are
 * covered separately in ui/ui-batch-{1,2,3}.test.tsx.
 *
 * Keep this list in sync with the .tsx files under src/components
 * (excluding src/components/ui) when components are added or removed.
 */
const sectionComponents: [string, string][] = [
  [
    '501c3-components/Help-For-Charities-and-Nonprofit',
    '../../src/components/501c3-components/Help-For-Charities-and-Nonprofit/index',
  ],
  [
    '501c3-components/Ready-to-get-started-and-faqs',
    '../../src/components/501c3-components/Ready-to-get-started-and-faqs/index',
  ],
  [
    'about-us-components/CallToAction',
    '../../src/components/about-us-components/CallToAction/index',
  ],
  [
    'about-us-components/Card-section',
    '../../src/components/about-us-components/Card-section/index',
  ],
  ['about-us-components/ParaText', '../../src/components/about-us-components/ParaText/index'],
  ['about-us-components/content', '../../src/components/about-us-components/content/index'],
  [
    'charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes-components/Hero',
    '../../src/components/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes-components/Hero/index',
  ],
  [
    'contact-us-components/Contact-Us',
    '../../src/components/contact-us-components/Contact-Us/index',
  ],
  ['cookie-consent', '../../src/components/cookie-consent/index'],
  ['domains/Cards-Section', '../../src/components/domains/Cards-Section/index'],
  ['domains/Curved-Black-Section', '../../src/components/domains/Curved-Black-Section/index'],
  ['domains/Curved-Blue-Section', '../../src/components/domains/Curved-Blue-Section/index'],
  ['domains/Dear-Prospective', '../../src/components/domains/Dear-Prospective/index'],
  ['domains/Get-New-Website', '../../src/components/domains/Get-New-Website/index'],
  ['domains/Hero', '../../src/components/domains/Hero/index'],
  ['domains/Order-Your-Domain', '../../src/components/domains/Order-Your-Domain/index'],
  ['domains/Seperater', '../../src/components/domains/Seperater/index'],
  ['domains/Setup-Email-Hosting', '../../src/components/domains/Setup-Email-Hosting/index'],
  ['domains/Verify-Your-Domain', '../../src/components/domains/Verify-Your-Domain/index'],
  [
    'donate-components/Free-for-Charity-Donation-Options',
    '../../src/components/donate-components/Free-for-Charity-Donation-Options/index',
  ],
  [
    'donate-components/General-donation',
    '../../src/components/donate-components/General-donation/index',
  ],
  [
    'donate-components/measurable-impact',
    '../../src/components/donate-components/measurable-impact/index',
  ],
  [
    'ffc-volunteer-proving-ground-core-competencies/ContentSection',
    '../../src/components/ffc-volunteer-proving-ground-core-competencies/ContentSection/index',
  ],
  [
    'ffc-volunteer-proving-ground-core-competencies/Footer',
    '../../src/components/ffc-volunteer-proving-ground-core-competencies/Footer/index',
  ],
  [
    'ffc-volunteer-proving-ground-core-competencies/Header',
    '../../src/components/ffc-volunteer-proving-ground-core-competencies/Header/index',
  ],
  [
    'ffc-volunteer-proving-ground-core-competencies/Modules-section',
    '../../src/components/ffc-volunteer-proving-ground-core-competencies/Modules-section/index',
  ],
  ['footer', '../../src/components/footer/index'],
  [
    'free-charity-web-hosting/About-FFC-Hosting',
    '../../src/components/free-charity-web-hosting/About-FFC-Hosting/index',
  ],
  [
    'free-charity-web-hosting/BecomePartOfOurMission',
    '../../src/components/free-charity-web-hosting/BecomePartOfOurMission/index',
  ],
  [
    'free-charity-web-hosting/ClientTestimonials',
    '../../src/components/free-charity-web-hosting/ClientTestimonials/index',
  ],
  ['free-charity-web-hosting/FAQs', '../../src/components/free-charity-web-hosting/FAQs/index'],
  ['free-charity-web-hosting/Hero', '../../src/components/free-charity-web-hosting/Hero/index'],
  [
    'free-charity-web-hosting/ReadyToGetStarted',
    '../../src/components/free-charity-web-hosting/ReadyToGetStarted/index',
  ],
  [
    'free-charity-web-hosting/ThreeCards',
    '../../src/components/free-charity-web-hosting/ThreeCards/index',
  ],
  [
    'free-charity-web-hosting/hosting',
    '../../src/components/free-charity-web-hosting/hosting/index',
  ],
  [
    'free-for-charity-endowment-fund-components/Empower-Charities',
    '../../src/components/free-for-charity-endowment-fund-components/Empower-Charities/index',
  ],
  [
    'free-for-charity-endowment-fund-components/Empowering-Charities',
    '../../src/components/free-for-charity-endowment-fund-components/Empowering-Charities/index',
  ],
  [
    'free-for-charity-endowment-fund-components/Endowment-Features',
    '../../src/components/free-for-charity-endowment-fund-components/Endowment-Features/index',
  ],
  [
    'free-for-charity-endowment-fund-components/Hero',
    '../../src/components/free-for-charity-endowment-fund-components/Hero/index',
  ],
  [
    'free-for-charity-endowment-fund-components/Our-Mission',
    '../../src/components/free-for-charity-endowment-fund-components/Our-Mission/index',
  ],
  [
    'free-for-charity-endowment-fund-components/Support-Our-Mission',
    '../../src/components/free-for-charity-endowment-fund-components/Support-Our-Mission/index',
  ],
  [
    'free-for-charity-endowment-fund-components/Text-Section',
    '../../src/components/free-for-charity-endowment-fund-components/Text-Section/index',
  ],
  [
    'free-for-charity-endowment-fund-components/Voices-of-Gratitude',
    '../../src/components/free-for-charity-endowment-fund-components/Voices-of-Gratitude/index',
  ],
  [
    'free-for-charity-ffc-service-delivery-stages-components/Hero',
    '../../src/components/free-for-charity-ffc-service-delivery-stages-components/Hero/index',
  ],
  [
    'free-for-charity-ffc-web-developer-training-guide-components/Hero',
    '../../src/components/free-for-charity-ffc-web-developer-training-guide-components/Hero/index',
  ],
  [
    'free-for-charitys-tools-for-success-components/Card-section',
    '../../src/components/free-for-charitys-tools-for-success-components/Card-section/index',
  ],
  [
    'free-for-charitys-tools-for-success-components/Educational-Sites',
    '../../src/components/free-for-charitys-tools-for-success-components/Educational-Sites/index',
  ],
  [
    'free-for-charitys-tools-for-success-components/Five-Cards-Grid-Section',
    '../../src/components/free-for-charitys-tools-for-success-components/Five-Cards-Grid-Section/index',
  ],
  [
    'free-for-charitys-tools-for-success-components/Rescue-Time',
    '../../src/components/free-for-charitys-tools-for-success-components/Rescue-Time/index',
  ],
  [
    'free-for-charitys-tools-for-success-components/Six-Grid-Cards',
    '../../src/components/free-for-charitys-tools-for-success-components/Six-Grid-Cards/index',
  ],
  [
    'free-for-charitys-tools-for-success-components/Tools-For-Businesses',
    '../../src/components/free-for-charitys-tools-for-success-components/Tools-For-Businesses/index',
  ],
  [
    'free-for-charitys-tools-for-success-components/Two-Cards-With-Heading',
    '../../src/components/free-for-charitys-tools-for-success-components/Two-Cards-With-Heading/index',
  ],
  [
    'free-for-charitys-tools-for-success-components/Two-Cards',
    '../../src/components/free-for-charitys-tools-for-success-components/Two-Cards/index',
  ],
  [
    'free-for-charitys-tools-for-success-components/Two-Flex-Cards',
    '../../src/components/free-for-charitys-tools-for-success-components/Two-Flex-Cards/index',
  ],
  [
    'free-training-programs-components/faq-section',
    '../../src/components/free-training-programs-components/faq-section',
  ],
  ['guidestar-guide/Faqs', '../../src/components/guidestar-guide/Faqs/index'],
  [
    'guidestar-guide/Free-for-charity',
    '../../src/components/guidestar-guide/Free-for-charity/index',
  ],
  ['header', '../../src/components/header/index'],
  [
    'help-for-charities-components/AccordianSection',
    '../../src/components/help-for-charities-components/AccordianSection/index',
  ],
  [
    'help-for-charities-components/Charity-Nonprofit-Director-Faq',
    '../../src/components/help-for-charities-components/Charity-Nonprofit-Director-Faq/index',
  ],
  [
    'help-for-charities-components/Ready-to-Get-Started-Now',
    '../../src/components/help-for-charities-components/Ready-to-Get-Started-Now/index',
  ],
  [
    'help-for-charities-components/call-section',
    '../../src/components/help-for-charities-components/call-section/index',
  ],
  ['home-page/Endowment-Features', '../../src/components/home-page/Endowment-Features/index'],
  [
    'home-page/FrequentlyAskedQuestions',
    '../../src/components/home-page/FrequentlyAskedQuestions/index',
  ],
  ['home-page/Hero', '../../src/components/home-page/Hero/index'],
  ['home-page/Mission', '../../src/components/home-page/Mission/index'],
  ['home-page/Our-Programs', '../../src/components/home-page/Our-Programs/index'],
  ['home-page/Results-2023', '../../src/components/home-page/Results-2023/index'],
  ['home-page/SupportFreeForCharity', '../../src/components/home-page/SupportFreeForCharity/index'],
  ['home-page/TheFreeForCharityTeam', '../../src/components/home-page/TheFreeForCharityTeam/index'],
  ['home-page/VoicesofGratitude', '../../src/components/home-page/VoicesofGratitude/index'],
  ['home-page/Volunteer-with-Us', '../../src/components/home-page/Volunteer-with-Us/index'],
  ['home/Contactus', '../../src/components/home/Contactus/index'],
  ['home/HeroSection', '../../src/components/home/HeroSection/index'],
  ['home/MissionSection', '../../src/components/home/MissionSection/index'],
  ['home/Ourblogs', '../../src/components/home/Ourblogs/index'],
  ['home/SupportFreeforCharity', '../../src/components/home/SupportFreeforCharity/index'],
  ['home/Testimonials', '../../src/components/home/Testimonials/index'],
  [
    'online-impacts-onboarding-guide-components/Ready-To-Get-Started-Now',
    '../../src/components/online-impacts-onboarding-guide-components/Ready-To-Get-Started-Now/index',
  ],
  [
    'online-impacts-onboarding-guide-components/charity-text',
    '../../src/components/online-impacts-onboarding-guide-components/charity-text/index',
  ],
  ['pre501c3-components/Faqs', '../../src/components/pre501c3-components/Faqs/index'],
  ['pre501c3-components/charity', '../../src/components/pre501c3-components/charity/index'],
  ['sentry-init', '../../src/components/sentry-init/index'],
  ['techstack-components/Hero', '../../src/components/techstack-components/Hero/index'],
  ['volunteer/Free-For-Charity', '../../src/components/volunteer/Free-For-Charity/index'],
]

// Side-effect-only components that intentionally render no DOM (they exist
// to run an effect, e.g. analytics/error-tracking init). They must still
// mount without throwing, but are exempt from the non-empty-DOM assertion.
const rendersNull = new Set(['sentry-init'])

describe('Section components — render + a11y', () => {
  it.each(sectionComponents)(
    '%s renders and has no axe violations',
    async (name, reqPath) => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require(reqPath)
      const Component = (mod.default ?? mod) as React.ComponentType
      const { container } = render(<Component />)
      if (!rendersNull.has(name)) {
        expect(container).not.toBeEmptyDOMElement()
      }
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    },
    30000
  )
})
