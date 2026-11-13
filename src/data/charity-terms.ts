/**
 * Plain-language statements of Free For Charity's charity terms, shared by
 * every page that describes them so the wording cannot drift. The Terms of
 * Service (/terms-of-service/) is the binding version.
 */

/** FFC's public phone number for charity questions (text or call). */
export const FFC_TEXT_NUMBER = '520-222-8104'
export const FFC_TEL_HREF = 'tel:+15202228104'

/**
 * How a charity that has already applied gets help. Tickets go through the
 * WHMCS client area; nobody watches them around the clock, so urgent problems
 * go to a text or call. Render with <SupportStatement /> where links fit.
 */
export const SUPPORT_SENTENCE = `Already applied? Open a ticket in your client area at freeforcharity.org/hub. A volunteer replies by email, usually within 2 business days. Tickets are not watched around the clock, so if your site is down or something is urgent, text or call Clarke Moyer at ${FFC_TEXT_NUMBER}.`
/** The short escalation form. */
export const SUPPORT_ESCALATION_SENTENCE = `No reply after 2 business days, or something urgent? Text or call Clarke Moyer at ${FFC_TEXT_NUMBER}.`

/** Say this wherever a page mentions the maintainer's GitHub invitation. */
export const GITHUB_INVITE_SENTENCE =
  'The invitation comes from GitHub, not from us, and expires after 7 days, so accept it promptly.'
/** Step-by-step help for accepting the GitHub invitation. */
export const ACCEPT_INVITATION_URL = 'https://ffcadmin.org/site-owner/accept-invitation/'

/**
 * Who Free For Charity serves first (Clarke-approved wording). Render it with
 * <FocusStatement />, which bolds FOCUS_PRIORITY_PHRASE; never reword it so
 * other kinds of charity read as excluded.
 */
export const FOCUS_PRIORITY_PHRASE = 'food, water or shelter'
export const FOCUS_STATEMENT =
  "Free For Charity welcomes every kind of charity. Our priority is organizations that provide food, water or shelter, such as food pantries, clean water projects and shelters, and we focus our volunteer time on them first. If your charity does other good work, please still apply; we'd love to help."
/** The pre-501(c)(3) form (live on the pid 16 application), for pre-501(c)(3) pages. */
export const FOCUS_STATEMENT_PRE501C3 =
  "Free For Charity welcomes every kind of charity or group working toward 501(c)(3) status. Our priority is organizations that provide food, water or shelter, such as food pantries, clean water projects and shelters, and we focus our volunteer time on them first. If your group does other good work, please still apply; we'd love to help."
/** The one-line form, for places where space is tight. */
export const FOCUS_STATEMENT_SHORT =
  'Every kind of charity is welcome; our priority is organizations that provide food, water or shelter.'

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
  'Six policy pages, prepared for you and branded to your organization, go live with your public contact email, city and state (and street address if you gave one); you accept them with a tickbox on the application.'

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
