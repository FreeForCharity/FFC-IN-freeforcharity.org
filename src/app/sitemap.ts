import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.freeforcharity.org'
  const now = new Date()

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
      path: '/free-for-charity-ffc-service-delivery-stages',
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
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
