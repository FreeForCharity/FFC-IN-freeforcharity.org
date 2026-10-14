/**
 * Plain-language statements of Free For Charity's charity terms, shared by
 * every page that describes them so the wording cannot drift. The Terms of
 * Service (/terms-of-service/) is the binding version.
 */

/** FFC's public phone number for charity questions (text or call). */
export const FFC_TEXT_NUMBER = '520-222-8104'
export const FFC_TEL_HREF = 'tel:+15202228104'

/**
 * The six policy pages every FFC charity site ships with. They are the
 * charity's own policies (including its donation policy), not FFC's.
 */
export const POLICY_PAGES = [
  'Privacy Policy',
  'Cookie Policy',
  'Terms of Service',
  'Donation Policy',
  'Vulnerability Disclosure Policy',
  'Security Acknowledgements',
] as const

/** Say this, verbatim, wherever a page mentions the policy pages. */
export const POLICY_PAGES_SENTENCE =
  'Six policy pages, prepared for you and branded to your organization, go live with your public contact email and address; you accept them with a tickbox on the application.'

export interface Commitment {
  title: string
  body: string
}

/** "What you're committing to": the six-point summary of the charity terms. */
export const COMMITMENTS: Commitment[] = [
  {
    title: 'The full stack',
    body: 'You adopt the whole Free For Charity stack (website, domain, email and the tools that go with them), not just the pieces you like.',
  },
  {
    title: 'Your own accounts, secured',
    body: 'Everyone uses their own real-name accounts, protected with multi-factor authentication (MFA) and a unique password. No shared logins.',
  },
  {
    title: 'You own it and keep it current',
    body: 'Your organization keeps ownership of its content, accounts and domain, and keeps its information up to date.',
  },
  {
    title: 'The footer credit',
    body: 'Your website carries the standard FFC footer, including the “Free For Charity” credit.',
  },
  {
    title: 'Volunteer, best-effort service',
    body: 'We’re all volunteers. We help as quickly as we can, but there is no guaranteed response time.',
  },
  {
    title: 'A yearly Candid refresh',
    body: 'About 30 minutes once a year keeping your Candid profile current. If it lapses, we may pause service until it’s updated.',
  },
]
