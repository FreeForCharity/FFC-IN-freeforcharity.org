// Zeffy donation campaigns — the single source of truth for the /donate page.
//
// Free For Charity raises through Zeffy, which charges nonprofits 0% platform
// fees, so 100% of each gift reaches the mission. Each campaign is surfaced on
// /donate as a Zeffy "pop-up" button: the embed script (ZEFFY_EMBED_SCRIPT)
// turns any element carrying a `zeffy-form-link` attribute into a trigger that
// opens that campaign's form in a modal.
//
// ⚠️ VERIFY URLS BEFORE MERGE. The pop-up link comes from the Zeffy dashboard
// (campaign → Share → Pop-up) and looks like:
//   https://www.zeffy.com/embed/<type>/<slug>?modal=true
// The <type> segment (donation-form | ticketing | membership | shop) is NOT
// derivable from the campaign name — e.g. "Website Design and Development" is
// `ticketing`, not `donation-form`. Copy each link from the dashboard. Zeffy
// 403s CI crawlers (see `.lycheeignore`), so these can't be link-checked here.
// CONFIRMED so far: website-design (ticketing) and endowment (donation-form,
// from the live endowment-page iframe). All others are derived guesses — VERIFY.

export const ZEFFY_BASE = 'https://www.zeffy.com'

// Loaded once on /donate; powers every `zeffy-form-link` pop-up trigger.
export const ZEFFY_EMBED_SCRIPT =
  'https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js'

export type ZeffyCategory = 'Donation' | 'Membership' | 'Event' | 'Shop' | 'Custom'

export type DonationCampaign = {
  /** Stable key for React keys / tests. */
  key: string
  /** Display title — matches the Zeffy campaign name. */
  title: string
  /** Short description shown on the card. */
  blurb: string
  /** Zeffy campaign type (informational; does not always match the URL type). */
  category: ZeffyCategory
  /** The prominent general-fund CTA (rendered first, larger). */
  embed?: boolean
  /** Render as a prominent "most popular" card above the directory. */
  featured?: boolean
  /**
   * Zeffy pop-up embed link (Share → Pop-up), e.g.
   * `https://www.zeffy.com/embed/<type>/<slug>?modal=true`. Used as the
   * `zeffy-form-link` trigger; a hosted-form fallback href is derived from it.
   */
  zeffyFormLink: string
}

/** Build a Zeffy pop-up embed link from a `<type>/<slug>` path. */
export function zeffyPopupLink(typeAndSlug: string): string {
  const p = typeAndSlug.replace(/^\//, '')
  return `${ZEFFY_BASE}/embed/${p}?modal=true`
}

/**
 * Hosted-form URL derived from a pop-up embed link, used as the no-JS / new-tab
 * fallback href (the embed script intercepts the click for the modal when JS is
 * available). Strips the `/embed/` segment and the `?modal=true` query.
 */
export function zeffyHostedUrl(formLink: string): string {
  return formLink.replace('/embed/', '/').replace(/\?.*$/, '')
}

export const campaigns: DonationCampaign[] = [
  {
    key: 'general',
    title: 'Donate to Make a Difference',
    blurb:
      'Give to the general unrestricted fund — used where the need is greatest to keep free, AI-built websites, domains, and Microsoft 365 flowing to nonprofits.',
    category: 'Donation',
    embed: true,
    zeffyFormLink: zeffyPopupLink('donation-form/donate-to-make-a-difference'), // VERIFY (type + slug)
  },
  {
    key: 'free-domain',
    title: 'Free Domain Names For Charity',
    blurb:
      'Fund free .org domain names and DNS for nonprofits — one of the most-used Free For Charity programs.',
    category: 'Donation',
    featured: true,
    zeffyFormLink: zeffyPopupLink('donation-form/free-domain-names-for-charity'), // VERIFY (type + slug)
  },
  {
    key: 'website-design',
    title: 'Website Design and Development',
    blurb:
      'Support the AI-driven design and development of fast, secure GitHub Pages websites built for charities.',
    category: 'Custom',
    featured: true,
    // CONFIRMED from the Zeffy Share → Pop-up snippet.
    zeffyFormLink: zeffyPopupLink('ticketing/website-design-and-development'),
  },
  {
    key: 'endowment',
    title: 'Free For Charity Endowment Fund',
    blurb:
      'Back the endowment that sustains domains and email for charities — the largest fundraising campaign in Free For Charity history.',
    category: 'Donation',
    // Type confirmed (donation-form) from the live endowment-page iframe.
    zeffyFormLink: zeffyPopupLink('donation-form/free-for-charity-endowment-fund'),
  },
  {
    key: 'website-hosting-maintenance',
    title: 'Free Charity Website Hosting and Maintenance',
    blurb: 'Keep nonprofit websites online and maintained at no cost to the charity.',
    category: 'Custom',
    zeffyFormLink: zeffyPopupLink('ticketing/free-charity-website-hosting-and-maintenance'), // VERIFY (type + slug)
  },
  {
    key: 'hosting-support-membership',
    title: 'Website Hosting and Support Membership',
    blurb: 'A recurring membership that funds ongoing hosting and support for charity sites.',
    category: 'Membership',
    zeffyFormLink: zeffyPopupLink('membership/website-hosting-and-support-membership'), // VERIFY (type + slug)
  },
  {
    key: 'global-admins-membership',
    title: 'Free For Charity Global Administrators Membership',
    blurb:
      'Membership supporting the volunteer administrators who run the Free For Charity platform.',
    category: 'Membership',
    zeffyFormLink: zeffyPopupLink('membership/free-for-charity-global-administrators-membership'), // VERIFY (type + slug)
  },
  {
    key: 'annual-gala',
    title: 'Free For Charity Annual Gala',
    blurb:
      'Reserve tickets to the annual gala celebrating the charities and volunteers we support.',
    category: 'Event',
    zeffyFormLink: zeffyPopupLink('ticketing/free-for-charity-annual-gala'), // VERIFY (type + slug)
  },
  {
    key: 'shop',
    title: "Free For Charity's Shop",
    blurb: 'Shop Free For Charity merchandise — proceeds fund free technology for nonprofits.',
    category: 'Shop',
    zeffyFormLink: zeffyPopupLink('shop/free-for-charitys-shop'), // VERIFY (type + slug)
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
