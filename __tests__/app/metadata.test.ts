/**
 * Metadata Export Tests
 *
 * Verifies that all page components export proper Next.js metadata
 * with title and description for SEO compliance.
 */

const pages = [
  { path: 'page', name: 'Home' },
  { path: 'about-us/page', name: 'About Us' },
  { path: 'contact-us/page', name: 'Contact Us' },
  { path: 'donate/page', name: 'Donate' },
  { path: 'volunteer/page', name: 'Volunteer' },
  { path: 'domains/page', name: 'Domains' },
  { path: 'privacy-policy/page', name: 'Privacy Policy' },
  { path: 'terms-of-service/page', name: 'Terms of Service' },
  { path: 'cookie-policy/page', name: 'Cookie Policy' },
  { path: '501c3/page', name: '501c3' },
  { path: 'pre501c3/page', name: 'Pre-501c3' },
  { path: 'blog/page', name: 'Blog' },
  { path: 'consulting/page', name: 'Consulting' },
  { path: 'free-charity-web-hosting/page', name: 'Free Charity Web Hosting' },
  { path: 'free-training-programs/page', name: 'Free Training Programs' },
  { path: 'workforce-development/page', name: 'Workforce Development' },
  { path: 'free-for-charity-endowment-fund/page', name: 'Endowment Fund' },
  { path: 'guidestar-guide/page', name: 'GuideStar Guide' },
  { path: 'techstack/page', name: 'Tech Stack' },
  { path: 'donation-policy/page', name: 'Donation Policy' },
  { path: 'vulnerability-disclosure-policy/page', name: 'Vulnerability Disclosure Policy' },
  { path: 'security-acknowledgements/page', name: 'Security Acknowledgements' },
  {
    path: 'charity-and-nonprofit-case-studies/page',
    name: 'Charity & Nonprofit Case Studies',
  },
  {
    path: 'charity-and-nonprofit-service-and-consultant-directory/page',
    name: 'Service & Consultant Directory',
  },
  {
    path: 'charity-and-nonprofit-technology-directory/page',
    name: 'Technology Directory',
  },
  {
    path: 'charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes/page',
    name: 'Charity Validation Guide',
  },
  { path: 'ffcadmin/page', name: 'FFC Admin' },
  {
    path: 'ffc-volunteer-proving-ground-core-competencies/page',
    name: 'Volunteer Proving Ground',
  },
  { path: 'free-for-charity-donation-policy/page', name: 'FFC Donation Policy' },
  {
    path: 'free-for-charity-ffc-service-delivery-stages/page',
    name: 'Service Delivery Stages',
  },
  {
    path: 'free-for-charity-ffc-web-developer-training-guide/page',
    name: 'Web Developer Training Guide',
  },
  { path: 'free-for-charitys-tools-for-success/page', name: 'Tools for Success' },
  { path: 'online-impacts-onboarding-guide/page', name: 'Online Impacts Onboarding' },
]

describe('Page Metadata Exports', () => {
  for (const { path, name } of pages) {
    describe(name, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let pageModule: any

      beforeAll(async () => {
        pageModule = await import(`@/app/${path}`)
      })

      it('exports metadata with a title', () => {
        expect(pageModule.metadata).toBeDefined()
        expect(pageModule.metadata.title).toBeTruthy()
      })

      it('exports metadata with a description', () => {
        expect(pageModule.metadata).toBeDefined()
        expect(pageModule.metadata.description).toBeTruthy()
        expect(pageModule.metadata.description.length).toBeGreaterThan(20)
      })

      it('exports a default component', () => {
        expect(pageModule.default).toBeDefined()
        expect(typeof pageModule.default).toBe('function')
      })
    })
  }
})
