// Schema.org JSON-LD for the whole site (issue #382). Rendered once in the
// root layout; kept here as plain data so unit tests can validate the shape
// without rendering the layout.

const SITE_URL = 'https://www.freeforcharity.org'

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NonprofitOrganization',
  name: 'Free For Charity',
  alternateName: ['FFCHosting', 'FFCdomains', 'FFCadmin'],
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/web-app-manifest-512x512.png`,
  taxID: '46-2471893',
  nonprofitStatus: 'https://schema.org/Nonprofit501c3',
  description:
    'Free For Charity provides free websites, domains, and Microsoft 365 email for 501(c)(3) nonprofit organizations, so charities put more resources back into their missions.',
  email: 'contact@freeforcharity.org',
  foundingDate: '2014',
  sameAs: [
    'https://app.candid.org/profile/9326392/free-for-charity-46-2471893/',
    'https://www.guidestar.org/profile/46-2471893',
    'https://www.facebook.com/freeforcharity',
    'https://x.com/freeforcharity1',
    'https://www.linkedin.com/company/freeforcharity/',
    'https://github.com/FreeForCharity',
  ],
} as const

export const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Free For Charity',
  url: `${SITE_URL}/`,
  publisher: { '@type': 'NonprofitOrganization', name: 'Free For Charity', taxID: '46-2471893' },
} as const
