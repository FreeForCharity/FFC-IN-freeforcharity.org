import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.freeforcharity.org'
  const now = new Date()

  // The internal admin gateway (/ffcadmin/) is intentionally omitted: it
  // carries robots: { index: false } in its page-level metadata, so listing
  // it here would be incoherent.
  const routes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/about-us', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/contact-us', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/donate', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/volunteer', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/domains', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/free-charity-web-hosting', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/help-for-charities', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/consulting', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/free-training-programs', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/workforce-development', priority: 0.7, changeFrequency: 'monthly' as const },
    {
      path: '/charity-and-nonprofit-service-and-consultant-directory',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/charity-and-nonprofit-technology-directory',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/charity-and-nonprofit-case-studies',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    { path: '/501c3', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/pre501c3', priority: 0.7, changeFrequency: 'monthly' as const },
    {
      path: '/free-for-charity-endowment-fund',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    { path: '/guidestar-guide', priority: 0.6, changeFrequency: 'monthly' as const },
    {
      path: '/free-for-charitys-tools-for-success',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/free-for-charity-ffc-web-developer-training-guide',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/ffc-volunteer-proving-ground-core-competencies',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/online-impacts-onboarding-guide',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    },
    { path: '/techstack', priority: 0.4, changeFrequency: 'monthly' as const },
    { path: '/donation-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    {
      path: '/free-for-charity-donation-policy',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms-of-service', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/vulnerability-disclosure-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/security-acknowledgements', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/accessibility-statement', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/publicity-consent-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/guides', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/charity-onboarding-journey', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/getting-started-checklist', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/m365-email-guide', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/google-for-nonprofits-guide', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/zeffy-donations-guide', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/irs-990n-filing-guide', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/charity-security-guide', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/impact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/how-we-count', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/cost-transparency', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/charity-faq', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/volunteer-roles', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/volunteer-onboarding-guide', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contribute', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/eligibility-check', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/volunteer-quiz', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/matching-gifts', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/badge', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/charities-we-support', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/annual-report-2025', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/status', priority: 0.5, changeFrequency: 'weekly' as const },
    { path: '/search', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/other-ways-to-give', priority: 0.7, changeFrequency: 'monthly' as const },
  ]

  return routes.map((route) => ({
    // next.config.ts sets trailingSlash: true, so canonical URLs end
    // with '/'. The MetadataRoute.Sitemap helper does not auto-apply
    // it — add the slash here so the published sitemap matches what
    // the export serves.
    url: `${baseUrl}${route.path}${route.path.endsWith('/') ? '' : '/'}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
