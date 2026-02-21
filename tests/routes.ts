/**
 * Shared route list for all Playwright test suites.
 *
 * Single source of truth for site routes — keeps accessibility,
 * smoke, and any future per-page tests in sync with the sitemap.
 */

export const siteRoutes = [
  { route: '/', name: 'Homepage' },
  { route: '/about-us', name: 'About Us' },
  { route: '/contact-us', name: 'Contact Us' },
  { route: '/donate', name: 'Donate' },
  { route: '/volunteer', name: 'Volunteer' },
  { route: '/domains', name: 'Domains' },
  { route: '/free-charity-web-hosting', name: 'Free Charity Web Hosting' },
  { route: '/help-for-charities', name: 'Help for Charities' },
  { route: '/blog', name: 'Blog' },
  { route: '/consulting', name: 'Consulting' },
  { route: '/free-training-programs', name: 'Free Training Programs' },
  { route: '/workforce-development', name: 'Workforce Development' },
  {
    route: '/charity-and-nonprofit-service-and-consultant-directory',
    name: 'Service & Consultant Directory',
  },
  {
    route: '/charity-and-nonprofit-technology-directory',
    name: 'Technology Directory',
  },
  { route: '/charity-and-nonprofit-case-studies', name: 'Case Studies' },
  { route: '/501c3', name: '501c3' },
  { route: '/pre501c3', name: 'Pre-501c3' },
  { route: '/free-for-charity-endowment-fund', name: 'Endowment Fund' },
  { route: '/guidestar-guide', name: 'GuideStar Guide' },
  { route: '/free-for-charitys-tools-for-success', name: 'Tools for Success' },
  {
    route: '/free-for-charity-ffc-service-delivery-stages',
    name: 'Service Delivery Stages',
  },
  {
    route: '/free-for-charity-ffc-web-developer-training-guide',
    name: 'Web Developer Training Guide',
  },
  {
    route: '/ffc-volunteer-proving-ground-core-competencies',
    name: 'Volunteer Proving Ground',
  },
  {
    route:
      '/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes',
    name: 'Charity Validation Guide',
  },
  { route: '/online-impacts-onboarding-guide', name: 'Online Impacts Onboarding Guide' },
  { route: '/techstack', name: 'Tech Stack' },
  { route: '/donation-policy', name: 'Donation Policy' },
  { route: '/free-for-charity-donation-policy', name: 'FFC Donation Policy' },
  { route: '/privacy-policy', name: 'Privacy Policy' },
  { route: '/terms-of-service', name: 'Terms of Service' },
  { route: '/cookie-policy', name: 'Cookie Policy' },
  { route: '/vulnerability-disclosure-policy', name: 'Vulnerability Disclosure Policy' },
  { route: '/security-acknowledgements', name: 'Security Acknowledgements' },
]
