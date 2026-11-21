// Free For Charity's own profile pages at charity-profile and giving platforms,
// rendered on /charity-profiles/.
//
// Rule for adding an entry: the URL must have been loaded SIGNED OUT in a real
// browser and shown FFC's own details (name, EIN, mission). Do not add a
// provider by construction (an EIN-shaped URL that "should" work), and do not
// add one whose FFC page is a bare, unclaimed shell — those are a decision to
// claim the profile first, not a link to publish.
//
// Kept as data (not JSX) so the same shape can be reused by the charity site
// templates, where each charity lists its own profiles.

export type ProfileCategory = 'status' | 'giving' | 'volunteer'

export interface CharityProfile {
  /** Provider name as shown on the page. */
  provider: string
  category: ProfileCategory
  /** FFC's page at the provider. */
  url: string
  /** One sentence on what a visitor finds on FFC's page there. */
  shows: string
  /** Optional badge image served by the provider (shown only if it was verified to load). */
  badge?: { src: string; alt: string; width: number; height: number }
}

/**
 * Date every URL below was last loaded signed out and checked. On 2026-11-21 the
 * specific claims in each `shows` line were read off the live pages: ProPublica
 * ("Tax exemption issued: June 2014", 990-N filings to fiscal year ending Dec. 2025),
 * Endaoment ("Give cash, stock, crypto, or DAF assets"), GreatNonprofits (5 reviews and
 * a Donate Now form). Re-check them when this date changes.
 */
export const PROFILES_LAST_CHECKED = '2026-11-21'

export const FFC_EIN = '46-2471893'

export const charityProfiles: CharityProfile[] = [
  {
    provider: 'ProPublica Nonprofit Explorer',
    category: 'status',
    url: 'https://projects.propublica.org/nonprofits/organizations/462471893',
    shows:
      'Our IRS record: designated a 501(c)(3), tax exemption issued June 2014, donations tax deductible, and our 990-N postcard filings through fiscal year 2025.',
  },
  {
    provider: 'Candid (formerly GuideStar)',
    category: 'status',
    url: 'https://app.candid.org/profile/9326392/free-for-charity/?pkId=7232730a-03b5-467f-a82c-443dcd2122ed&isActive=true',
    shows:
      'Our full Candid profile and our Seal of Transparency. The seal shown here is served by Candid and updates automatically when our profile does.',
    badge: {
      src: 'https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/9326392/svg',
      alt: 'Candid Seal of Transparency',
      width: 108,
      height: 108,
    },
  },
  {
    provider: 'Benevity',
    category: 'giving',
    url: 'https://causes.benevity.org/causes/840-462471893',
    shows:
      'Our registered cause page. If your employer runs its giving or matching program on Benevity, search for Free For Charity there to give or have your gift matched.',
  },
  {
    provider: 'Endaoment',
    category: 'giving',
    url: 'https://app.endaoment.org/orgs/46-2471893',
    shows:
      'Our mission and EIN, with a page that accepts cash, stock, crypto and donor-advised fund grants.',
  },
  {
    provider: 'GreatNonprofits',
    category: 'giving',
    url: 'https://greatnonprofits.org/org/free-for-charity',
    shows:
      'Our mission, programs and reviews from volunteers and supporters, with a donate option.',
  },
  {
    provider: 'Idealist',
    category: 'volunteer',
    url: 'https://www.idealist.org/en/nonprofit/356bfc8e2ae64f83beea4a4e677e99d7-free-for-charity-state-college',
    shows: 'Our organization page and our open volunteer opportunities.',
  },
]

export const categoryHeadings: Record<ProfileCategory, { heading: string; intro: string }> = {
  status: {
    heading: 'Check our nonprofit status',
    intro:
      'Independent records of our 501(c)(3) status and transparency. The IRS Tax Exempt Organization Search is the authoritative source; these pages draw on it.',
  },
  giving: {
    heading: 'Give through a platform you already use',
    intro:
      'Workplace giving, donor-advised funds and giving sites where Free For Charity is listed. Giving directly on our donate page remains the simplest way.',
  },
  volunteer: {
    heading: 'Volunteer with us',
    intro: 'Where we post volunteer roles outside this site.',
  },
}
