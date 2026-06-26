import React from 'react'
import { render } from '@testing-library/react'

/**
 * Page render smoke tests.
 *
 * Every route's page component is a synchronous server component that
 * composes its section components. Rendering each page here asserts that
 * the page and all of its child components mount without throwing —
 * transitively exercising the "major components render correctly"
 * requirement (#19) in a single, maintainable suite.
 *
 * Page-level accessibility (axe) is covered against the built site in
 * tests/accessibility.spec.ts (Playwright, real browser), which is the
 * reliable layer for full-page a11y. These Jest tests focus on render
 * stability and are fast.
 *
 * Keep this list in sync with the page.tsx files under src/app when
 * routes are added.
 */
import Home from '../../src/app/page'
import FiveOhOneCThree from '../../src/app/501c3/page'
import AboutUs from '../../src/app/about-us/page'
import Blog from '../../src/app/blog/page'
import CaseStudies from '../../src/app/charity-and-nonprofit-case-studies/page'
import ServiceDirectory from '../../src/app/charity-and-nonprofit-service-and-consultant-directory/page'
import TechnologyDirectory from '../../src/app/charity-and-nonprofit-technology-directory/page'
import CharityValidationGuide from '../../src/app/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes/page'
import Consulting from '../../src/app/consulting/page'
import ContactUs from '../../src/app/contact-us/page'
import CookiePolicy from '../../src/app/cookie-policy/page'
import Domains from '../../src/app/domains/page'
import Donate from '../../src/app/donate/page'
import DonationPolicy from '../../src/app/donation-policy/page'
import VolunteerProvingGround from '../../src/app/ffc-volunteer-proving-ground-core-competencies/page'
import FfcAdminBackupSop from '../../src/app/ffcadmin-free-for-charity-cpanel-backup-sop/page'
import FfcAdmin from '../../src/app/ffcadmin/page'
import FreeCharityWebHosting from '../../src/app/free-charity-web-hosting/page'
import FfcDonationPolicy from '../../src/app/free-for-charity-donation-policy/page'
import EndowmentFund from '../../src/app/free-for-charity-endowment-fund/page'
import ServiceDeliveryStages from '../../src/app/free-for-charity-ffc-service-delivery-stages/page'
import WebDeveloperTrainingGuide from '../../src/app/free-for-charity-ffc-web-developer-training-guide/page'
import ToolsForSuccess from '../../src/app/free-for-charitys-tools-for-success/page'
import FreeTrainingPrograms from '../../src/app/free-training-programs/page'
import GuidestarGuide from '../../src/app/guidestar-guide/page'
import HelpForCharities from '../../src/app/help-for-charities/page'
import OnlineImpactsOnboarding from '../../src/app/online-impacts-onboarding-guide/page'
import Pre501c3 from '../../src/app/pre501c3/page'
import PrivacyPolicy from '../../src/app/privacy-policy/page'
import SecurityAcknowledgements from '../../src/app/security-acknowledgements/page'
import Techstack from '../../src/app/techstack/page'
import TermsOfService from '../../src/app/terms-of-service/page'
import Volunteer from '../../src/app/volunteer/page'
import VulnerabilityDisclosurePolicy from '../../src/app/vulnerability-disclosure-policy/page'
import WorkforceDevelopment from '../../src/app/workforce-development/page'

const pages: [string, React.ComponentType][] = [
  ['Homepage (/)', Home],
  ['501c3', FiveOhOneCThree],
  ['About Us', AboutUs],
  ['Blog', Blog],
  ['Case Studies', CaseStudies],
  ['Service & Consultant Directory', ServiceDirectory],
  ['Technology Directory', TechnologyDirectory],
  ['Charity Validation Guide', CharityValidationGuide],
  ['Consulting', Consulting],
  ['Contact Us', ContactUs],
  ['Cookie Policy', CookiePolicy],
  ['Domains', Domains],
  ['Donate', Donate],
  ['Donation Policy', DonationPolicy],
  ['Volunteer Proving Ground', VolunteerProvingGround],
  ['FFC Admin Backup SOP', FfcAdminBackupSop],
  ['FFC Admin', FfcAdmin],
  ['Free Charity Web Hosting', FreeCharityWebHosting],
  ['FFC Donation Policy', FfcDonationPolicy],
  ['Endowment Fund', EndowmentFund],
  ['Service Delivery Stages', ServiceDeliveryStages],
  ['Web Developer Training Guide', WebDeveloperTrainingGuide],
  ['Tools for Success', ToolsForSuccess],
  ['Free Training Programs', FreeTrainingPrograms],
  ['GuideStar Guide', GuidestarGuide],
  ['Help for Charities', HelpForCharities],
  ['Online Impacts Onboarding Guide', OnlineImpactsOnboarding],
  ['Pre-501c3', Pre501c3],
  ['Privacy Policy', PrivacyPolicy],
  ['Security Acknowledgements', SecurityAcknowledgements],
  ['Tech Stack', Techstack],
  ['Terms of Service', TermsOfService],
  ['Volunteer', Volunteer],
  ['Vulnerability Disclosure Policy', VulnerabilityDisclosurePolicy],
  ['Workforce Development', WorkforceDevelopment],
]

describe('Page render smoke tests', () => {
  it.each(pages)('%s renders without crashing', (_name, Page) => {
    const { container } = render(<Page />)
    expect(container).not.toBeEmptyDOMElement()
  })
})
