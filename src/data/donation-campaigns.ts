// Zeffy donation campaigns — the single source of truth for the /donate page.
//
// Free For Charity raises through Zeffy, which charges nonprofits 0% platform
// fees, so 100% of each gift reaches the mission. freeforcharity.org embeds the
// general fund form inline and links out to every other campaign's hosted Zeffy
// page. To add / retire a campaign, edit this file only.
//
// ⚠️ VERIFY URLS BEFORE MERGE. Zeffy embed/hosted URLs return 403 to CI
// crawlers (see `.lycheeignore`), so they cannot be link-checked here. The
// slugs below are derived from each campaign name following the one confirmed
// pattern — the live endowment form, whose campaign "Free For Charity Endowment
// Fund" maps to slug `free-for-charity-endowment-fund`. Confirm each `formUrl`
// and `embedUrl` against the Zeffy dashboard (campaign → Share → Embed / Link)
// and correct any slug marked `VERIFY` before this ships.

export const ZEFFY_BASE = 'https://www.zeffy.com'

export type ZeffyCategory = 'Donation' | 'Membership' | 'Event' | 'Shop' | 'Custom'

export type DonationCampaign = {
  /** Stable key for React keys / tests. */
  key: string
  /** Display title — matches the Zeffy campaign name. */
  title: string
  /** Short description shown on the card. */
  blurb: string
  /** Zeffy campaign type. */
  category: ZeffyCategory
  /** Render as the single inline-embedded form (the general fund). */
  embed?: boolean
  /** Render as a prominent "most popular" card above the directory. */
  featured?: boolean
  /** Hosted Zeffy page the card links to (opens in a new tab). */
  formUrl: string
  /** Embed URL for an inline <iframe>; only the `embed` campaign needs this. */
  embedUrl?: string
}

/** Build an absolute Zeffy URL from a path. */
export function zeffyUrl(path: string): string {
  return `${ZEFFY_BASE}${path.startsWith('/') ? path : `/${path}`}`
}

// Hosted-page path differs by Zeffy campaign type. Donation/Custom campaigns
// expose a donation form; membership/event/shop have their own hosted pages.
// All but the endowment slug are derived — VERIFY.
export const campaigns: DonationCampaign[] = [
  {
    key: 'general',
    title: 'Donate to Make a Difference',
    blurb:
      'Give to the general unrestricted fund — used where the need is greatest to keep free, AI-built websites, domains, and Microsoft 365 flowing to nonprofits.',
    category: 'Donation',
    embed: true,
    formUrl: zeffyUrl('/en-US/donation-form/donate-to-make-a-difference'), // VERIFY
    embedUrl: zeffyUrl('/embed/donation-form/donate-to-make-a-difference'), // VERIFY
  },
  {
    key: 'free-domain',
    title: 'Free Domain Names For Charity',
    blurb:
      'Fund free .org domain names and DNS for nonprofits — one of the most-used Free For Charity programs.',
    category: 'Donation',
    featured: true,
    formUrl: zeffyUrl('/en-US/donation-form/free-domain-names-for-charity'), // VERIFY
  },
  {
    key: 'website-design',
    title: 'Website Design and Development',
    blurb:
      'Support the AI-driven design and development of fast, secure GitHub Pages websites built for charities.',
    category: 'Custom',
    featured: true,
    formUrl: zeffyUrl('/en-US/donation-form/website-design-and-development'), // VERIFY
  },
  {
    key: 'endowment',
    title: 'Free For Charity Endowment Fund',
    blurb:
      'Back the endowment that sustains domains and email for charities — the largest fundraising campaign in Free For Charity history.',
    category: 'Donation',
    formUrl: zeffyUrl('/en-US/donation-form/free-for-charity-endowment-fund'), // confirmed slug
  },
  {
    key: 'website-hosting-maintenance',
    title: 'Free Charity Website Hosting and Maintenance',
    blurb: 'Keep nonprofit websites online and maintained at no cost to the charity.',
    category: 'Custom',
    formUrl: zeffyUrl('/en-US/donation-form/free-charity-website-hosting-and-maintenance'), // VERIFY
  },
  {
    key: 'hosting-support-membership',
    title: 'Website Hosting and Support Membership',
    blurb: 'A recurring membership that funds ongoing hosting and support for charity sites.',
    category: 'Membership',
    formUrl: zeffyUrl('/en-US/membership/website-hosting-and-support-membership'), // VERIFY
  },
  {
    key: 'global-admins-membership',
    title: 'Free For Charity Global Administrators Membership',
    blurb:
      'Membership supporting the volunteer administrators who run the Free For Charity platform.',
    category: 'Membership',
    formUrl: zeffyUrl('/en-US/membership/free-for-charity-global-administrators-membership'), // VERIFY
  },
  {
    key: 'annual-gala',
    title: 'Free For Charity Annual Gala',
    blurb:
      'Reserve tickets to the annual gala celebrating the charities and volunteers we support.',
    category: 'Event',
    formUrl: zeffyUrl('/en-US/ticketing/free-for-charity-annual-gala'), // VERIFY
  },
  {
    key: 'shop',
    title: "Free For Charity's Shop",
    blurb: 'Shop Free For Charity merchandise — proceeds fund free technology for nonprofits.',
    category: 'Shop',
    formUrl: zeffyUrl('/en-US/shop/free-for-charitys-shop'), // VERIFY
  },
]

// The general unrestricted campaign — reused by CTAs that just say "donate".
// Selected explicitly by key and asserted at module load so a misconfigured
// registry fails loudly at build time instead of silently breaking a CTA.
const general = campaigns.find((c) => c.key === 'general')
if (!general) {
  throw new Error(
    'donation-campaigns: a campaign with key "general" is required (used by the donate CTAs).'
  )
}
export const generalCampaign: DonationCampaign = general
