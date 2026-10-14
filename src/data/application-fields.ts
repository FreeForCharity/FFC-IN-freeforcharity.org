/**
 * Application field guides: one per WHMCS onboarding application.
 *
 *   /501c3/application-guide/     the 501(c)(3) application (WHMCS pid 33)
 *   /pre501c3/application-guide/  the pre-501(c)(3) application (WHMCS pid 16)
 *
 * Both guides render from this one file, filtered by form. Every WHMCS
 * application field maps to exactly one section, and the section ids are the
 * anchors WHMCS deep-links to (`/501c3/application-guide/#ein`), so keep them
 * stable. Sections and the worksheet follow the form's display order.
 *
 * r33 / r16: 'R' = required, 'O' = optional, '-' = not on that form.
 * Written 2026-10-14 from the live WHMCS configuration (including the
 * `read-help-page` tickbox that opens both forms). Keep it in step with the
 * WHMCS custom fields.
 *
 * Links: a root-relative path is a page on this site (it must exist under
 * src/app/); anything else is an absolute URL. Step-by-step setup guides that
 * live on FFC Admin are linked absolutely (https://ffcadmin.org/...).
 */
import { ONBOARDING_PID } from '@/lib/config'
import type { HelpTopicSlug } from './application-help'

export type FieldRequirement = 'R' | 'O' | '-'

/** The two application tracks; the keys double as the route folder names. */
export type Track = '501c3' | 'pre501c3'

export const TRACK_KEYS: Track[] = ['501c3', 'pre501c3']

/** Copy that is the same on both forms, or differs per form. */
export type TrackText = string | Record<Track, string>

export interface ApplicationField {
  /** WHMCS custom-field slug. */
  slug: string
  /** Readable label (the pre-501(c)(3) form's question wording where it has one). */
  label: string
  /** Requirement on the 501(c)(3) application (pid 33). */
  r33: FieldRequirement
  /** Requirement on the pre-501(c)(3) application (pid 16). */
  r16: FieldRequirement
}

/** A step-by-step link, optionally shown on one form's guide only. */
export type SectionLink = string | { href: string; only: Track }

export interface ApplicationFieldSection {
  /** Anchor id on the guide: the form links to #<id>. */
  id: string
  title: string
  fields: ApplicationField[]
  why: TrackText
  how: TrackText
  /** Shown only on a form where at least one of the section's fields is optional. */
  optionalWhy?: TrackText
  links: SectionLink[]
  /** In-depth help pages (/<track>/help/<slug>/), shown where the topic applies to the form. */
  help?: HelpTopicSlug[]
}

export interface TrackInfo {
  track: Track
  /** Which requirement column applies. */
  key: 'r33' | 'r16'
  /** WHMCS product id of the application form. */
  pid: number
  /** Short name, e.g. "501(c)(3)". */
  name: string
  /** Guide title, e.g. "501(c)(3) Application Guide". */
  guideTitle: string
  guidePath: string
  onboardingPath: string
  other: Track
}

export const TRACKS: Record<Track, TrackInfo> = {
  '501c3': {
    track: '501c3',
    key: 'r33',
    pid: ONBOARDING_PID.full501c3,
    name: '501(c)(3)',
    guideTitle: '501(c)(3) Application Guide',
    guidePath: '/501c3/application-guide/',
    onboardingPath: '/501c3/',
    other: 'pre501c3',
  },
  pre501c3: {
    track: 'pre501c3',
    key: 'r16',
    pid: ONBOARDING_PID.pre501c3,
    name: 'Pre-501(c)(3)',
    guideTitle: 'Pre-501(c)(3) Application Guide',
    guidePath: '/pre501c3/application-guide/',
    onboardingPath: '/pre501c3/',
    other: '501c3',
  },
}

export function textFor(value: TrackText, track: Track): string {
  return typeof value === 'string' ? value : value[track]
}

export const APPLICATION_FIELDS_POLICY = {
  title: 'Why every required field is required',
  body: [
    "Free For Charity's services are free, and demand for them is very high. To review every application fairly and quickly, we need each required field completed, so we're not able to make exceptions or waivers.",
    'Everything we ask for is free to set up. Each section below links to a step-by-step guide.',
  ],
}

const EIN_URL =
  'https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online'

export const APPLICATION_FIELD_SECTIONS: ApplicationFieldSection[] = [
  {
    id: 'before-you-start',
    title: 'Before you start',
    fields: [
      {
        slug: 'read-help-page',
        label: 'I have read the full application help page',
        r33: 'R',
        r16: 'R',
      },
    ],
    why: "The application's first question asks you to confirm you've read this page, so you know what every field needs before you begin.",
    how: 'Read this whole page first, then tick the box at the start of the application.',
    links: [],
  },
  {
    id: 'org-name',
    title: "Organization's legal name",
    fields: [{ slug: 'org-name', label: 'Organization name', r33: 'R', r16: 'R' }],
    why: 'We use it to find your application, match it to IRS and Candid records, and name your website. Also enter it in the Company Name box of your account (that box is now required).',
    how: {
      '501c3': 'Use the exact name on your IRS determination letter.',
      pre501c3: 'Use the exact name on your state filing (your articles of incorporation).',
    },
    links: [],
  },
  {
    id: 'legal-status',
    title: 'Legal status',
    fields: [
      {
        slug: 'legal-status',
        label: 'What is the legal status of your organization?',
        r33: 'R',
        r16: 'R',
      },
    ],
    why: 'It puts you on the right track (501(c)(3) or pre-501(c)(3)) and decides which services you qualify for.',
    how: {
      '501c3':
        'Pick the option that matches your IRS determination letter. Not approved yet? Apply on the Pre-501(c)(3) form instead.',
      pre501c3:
        'Pick the option that describes your organization today. Already have your IRS determination letter? Apply on the 501(c)(3) form instead.',
    },
    links: [{ href: '/irs-990n-filing-guide/', only: '501c3' }],
    help: ['getting-501c3'],
  },
  {
    id: 'ein',
    title: 'EIN (Employer Identification Number)',
    fields: [{ slug: 'ein', label: "What is your organization's EIN number?", r33: 'R', r16: 'R' }],
    why: 'It verifies your organization with the IRS and appears in your website footer (it is public for registered charities).',
    how: {
      '501c3':
        'Format NN-NNNNNNN, exactly as it appears on your IRS determination letter. Every 501(c)(3) charity has an EIN, and you must enter yours.',
      pre501c3:
        'Format NN-NNNNNNN. An EIN is free from the IRS online in minutes; never pay for one. Pre-501(c)(3) groups that do not have an EIN yet may enter NONE (we can help you get one).',
    },
    links: [{ href: EIN_URL, only: 'pre501c3' }],
    help: ['getting-501c3'],
  },
  {
    id: 'mission',
    title: 'Mission',
    fields: [
      { slug: 'mission', label: "What is your organization's mission?", r33: 'R', r16: 'R' },
    ],
    why: "It confirms your mission focus and is the starting point for your website's wording.",
    how: 'One or two plain sentences: who you help and the change you create.',
    links: [],
    help: ['mission-statement'],
  },
  {
    id: 'founding-year',
    title: 'Year founded',
    fields: [{ slug: 'founding-year', label: 'Founding year', r33: 'R', r16: 'R' }],
    why: 'Shown on your website so donors see how long you have served.',
    how: 'A four-digit year. Use your founding documents, or the year your group began operating.',
    links: [],
  },
  {
    id: 'alternate-names',
    title: 'Also known as / abbreviations',
    fields: [{ slug: 'alternate-names', label: 'Alternate names', r33: 'O', r16: 'O' }],
    why: 'Helps people find you by the name they actually use.',
    how: 'Comma-separated, e.g. an acronym.',
    optionalWhy: 'Not every organization has another name.',
    links: [],
  },
  {
    id: 'candid',
    title: 'Candid (GuideStar) profile',
    fields: [
      {
        slug: 'guidestar-public',
        label: 'Candid (GuideStar) public profile link',
        r33: 'R',
        r16: '-',
      },
      { slug: 'guidestar-full', label: 'Candid (GuideStar) full profile link', r33: 'R', r16: 'O' },
      { slug: 'guidestar', label: 'What is your GuideStar.org URL?', r33: '-', r16: 'O' },
    ],
    why: 'Candid is how we verify a charity is real and well run, and your profile links from your website footer.',
    how: {
      '501c3':
        'Claim your free Candid profile and reach at least the Gold Seal of Transparency. Then give us both links: the public profile link and the full-profile (sharable) link.',
      pre501c3:
        'If your group already has a Candid profile, paste its links. Most pre-501(c)(3) groups do not have one yet; you can add it after the IRS recognizes you.',
    },
    optionalWhy:
      'Pre-501(c)(3) groups usually cannot have a Candid profile yet (Candid builds them from IRS 501(c)(3) records), so it is optional on the pre-501(c)(3) form only.',
    links: ['/guidestar-guide/', 'https://ffcadmin.org/guides/candid-organization/'],
    help: ['guidestar-candid'],
  },
  {
    id: 'charity-social',
    title: 'Charity Facebook and LinkedIn Pages',
    fields: [
      { slug: 'facebook-page', label: 'Facebook page', r33: 'R', r16: 'R' },
      { slug: 'linkedin-page', label: 'LinkedIn page', r33: 'R', r16: 'R' },
    ],
    why: 'Organization Pages show the charity is active and public, and they link from your website.',
    how: 'These are organization Pages, not personal profiles. Both are free.',
    links: [
      'https://ffcadmin.org/guides/facebook-organization/',
      'https://ffcadmin.org/guides/linkedin-organization/',
    ],
    help: ['social-media'],
  },
  {
    id: 'other-social',
    title: 'Instagram, X and YouTube',
    fields: [
      { slug: 'social-instagram', label: 'Instagram', r33: 'O', r16: 'O' },
      { slug: 'social-x', label: 'X (Twitter)', r33: 'O', r16: 'O' },
      { slug: 'social-youtube', label: 'YouTube', r33: 'O', r16: 'O' },
    ],
    why: 'Linked from your website if you have them.',
    how: 'Paste the full profile link.',
    optionalWhy: 'Many charities do not use these channels.',
    links: ['https://ffcadmin.org/guides/instagram-organization/'],
    help: ['social-media'],
  },
  {
    id: 'officers',
    title: 'Board officers: Chair, Secretary and Treasurer',
    fields: [
      { slug: 'chair-phone', label: 'Chair phone', r33: 'R', r16: '-' },
      { slug: 'chair-email', label: 'Chair email', r33: 'R', r16: '-' },
      { slug: 'secretary-phone', label: 'Secretary phone', r33: 'R', r16: '-' },
      { slug: 'secretary-email', label: 'Secretary email', r33: 'R', r16: '-' },
      { slug: 'treasurer-phone', label: 'Treasurer phone', r33: 'R', r16: '-' },
      { slug: 'treasurer-email', label: 'Treasurer email', r33: 'R', r16: '-' },
    ],
    why: 'Three accountable officers are the minimum governance we accept; we contact them to verify the application. Their phone and email stay private.',
    how: "Each officer's own phone and individual email (not a shared inbox).",
    links: [],
    help: ['board-requirements'],
  },
  {
    id: 'officer-linkedin',
    title: 'Officer LinkedIn profiles',
    fields: [
      { slug: 'chair-linkedin', label: 'Chair LinkedIn', r33: 'R', r16: 'R' },
      { slug: 'secretary-linkedin', label: 'Secretary LinkedIn', r33: 'R', r16: 'R' },
      { slug: 'treasurer-linkedin', label: 'Treasurer LinkedIn', r33: 'R', r16: 'R' },
    ],
    why: 'A real, working profile for each of the three officers is how we confirm they are real people.',
    how: 'The profile does not need much public information, but it must exist and the link must open. Creating one is free.',
    links: ['https://ffcadmin.org/guides/linkedin/'],
    help: ['board-requirements'],
  },
  {
    id: 'other-board',
    title: 'Vice Chair and Member-at-Large',
    fields: [
      { slug: 'vicechair-linkedin', label: 'Vice Chair LinkedIn', r33: 'O', r16: '-' },
      { slug: 'vicechair-phone', label: 'Vice Chair phone', r33: 'O', r16: '-' },
      { slug: 'vicechair-email', label: 'Vice Chair email', r33: 'O', r16: '-' },
      { slug: 'member-linkedin', label: 'Member-at-Large LinkedIn', r33: 'O', r16: '-' },
      { slug: 'member-phone', label: 'Member-at-Large phone', r33: 'O', r16: '-' },
      { slug: 'member-email', label: 'Member-at-Large email', r33: 'O', r16: '-' },
    ],
    why: 'Extra board contacts strengthen the application.',
    how: 'Same as the officers.',
    optionalWhy: 'Not every board has these seats.',
    links: [],
    help: ['board-requirements'],
  },
  {
    id: 'team-members',
    title: 'Team members (pre-501(c)(3))',
    fields: [
      { slug: 'team-member-1-name', label: 'Team member 1 name', r33: '-', r16: 'R' },
      { slug: 'team-member-1-role', label: 'Team member 1 role', r33: '-', r16: 'R' },
      { slug: 'team-member-2-name', label: 'Team member 2 name', r33: '-', r16: 'R' },
      { slug: 'team-member-2-role', label: 'Team member 2 role', r33: '-', r16: 'R' },
      { slug: 'team-member-3-name', label: 'Team member 3 name', r33: '-', r16: 'R' },
      { slug: 'team-member-3-role', label: 'Team member 3 role', r33: '-', r16: 'R' },
      { slug: 'team-member-1-linkedin', label: 'Team member 1 LinkedIn', r33: '-', r16: 'O' },
      { slug: 'team-member-2-linkedin', label: 'Team member 2 LinkedIn', r33: '-', r16: 'O' },
      { slug: 'team-member-3-linkedin', label: 'Team member 3 LinkedIn', r33: '-', r16: 'O' },
      { slug: 'team-member-4-name', label: 'Team member 4 name', r33: '-', r16: 'O' },
      { slug: 'team-member-4-role', label: 'Team member 4 role', r33: '-', r16: 'O' },
      { slug: 'team-member-4-linkedin', label: 'Team member 4 LinkedIn', r33: '-', r16: 'O' },
      { slug: 'team-member-5-name', label: 'Team member 5 name', r33: '-', r16: 'O' },
      { slug: 'team-member-5-role', label: 'Team member 5 role', r33: '-', r16: 'O' },
      { slug: 'team-member-5-linkedin', label: 'Team member 5 LinkedIn', r33: '-', r16: 'O' },
    ],
    why: 'Shows who is building the organization before it has a formal board.',
    how: 'Names and roles of at least three people.',
    optionalWhy:
      "Small or new groups often have fewer people; the officers' LinkedIn profiles are asked separately and are required.",
    links: [],
    help: ['board-requirements'],
  },
  {
    id: 'contacts',
    title: 'Primary and technical contacts',
    fields: [
      { slug: 'primary-linkedin', label: 'Primary contact LinkedIn', r33: 'R', r16: '-' },
      { slug: 'primary-phone', label: 'Primary contact phone', r33: 'R', r16: '-' },
      { slug: 'primary-email', label: 'Primary contact email', r33: 'R', r16: '-' },
      { slug: 'technical-linkedin', label: 'Technical contact LinkedIn', r33: 'R', r16: '-' },
      { slug: 'technical-phone', label: 'Technical contact phone', r33: 'R', r16: '-' },
      { slug: 'technical-email', label: 'Technical contact email', r33: 'R', r16: '-' },
      { slug: 'timezone', label: 'Time zone', r33: 'R', r16: '-' },
      { slug: 'contact-times', label: 'Best contact times', r33: 'R', r16: '-' },
      {
        slug: 'reach-phone',
        label: 'What phone number do you want us to reach you at?',
        r33: '-',
        r16: 'R',
      },
      { slug: 'best-time', label: 'What is the best time to call you?', r33: '-', r16: 'R' },
    ],
    why: 'Who we work with during onboarding, and when to reach them. Kept private.',
    how: {
      '501c3':
        'Individual email and phone for each contact; your US time zone and the hours you are available.',
      pre501c3: 'The phone number we should call you on, and the best time to reach you.',
    },
    links: [],
    help: ['public-contact-info'],
  },
  {
    id: 'maintainer',
    title: 'Website maintainer: GitHub username and role',
    fields: [
      { slug: 'technical-github', label: 'Maintainer GitHub username', r33: 'R', r16: 'R' },
      { slug: 'technical-role', label: 'Maintainer role', r33: 'O', r16: 'O' },
    ],
    why: "Your site lives on GitHub. We invite this account to your site's repository so your maintainer can edit it, and send them their first task.",
    how: 'Create a free GitHub account and enter just the username.',
    optionalWhy: 'The role only helps us tailor training; the username is what we need.',
    links: [
      'https://ffcadmin.org/guides/github-account/',
      'https://ffcadmin.org/site-owner/',
      'https://ffcadmin.org/site-owner/accept-invitation/',
      'https://ffcadmin.org/site-owner/training/',
    ],
  },
  {
    id: 'public-contact',
    title: 'Public phone, email and location for your website footer',
    fields: [
      { slug: 'public-phone', label: 'Public phone (website footer)', r33: 'R', r16: 'R' },
      { slug: 'public-email', label: 'Public email (website footer)', r33: 'R', r16: 'R' },
      { slug: 'footer-location', label: 'Footer location (city and state)', r33: 'R', r16: 'R' },
    ],
    why: 'Every FFC site shows how to reach the charity; donors expect it.',
    how: 'Use a public line (a free Google Voice number works) and a charity email (a free outlook.com address works). City and state only, never a home address.',
    links: ['https://ffcadmin.org/guides/google-voice/'],
    help: ['public-contact-info', 'mailing-address'],
  },
  {
    id: 'domain',
    title: 'Website domain',
    fields: [
      { slug: 'desired-domain', label: 'Desired domain', r33: 'R', r16: '-' },
      {
        slug: 'current-desired-domain',
        label: 'What is your current/desired domain name?',
        r33: '-',
        r16: 'R',
      },
      { slug: 'domain-owned', label: 'Do you already own the domain?', r33: 'R', r16: '-' },
      { slug: 'has-domain', label: 'Do you have a domain name?', r33: '-', r16: 'R' },
      { slug: 'domain-registrar', label: 'Domain registrar', r33: 'O', r16: 'O' },
    ],
    why: "The domain names your website's repository and is what we register for you (free .org) or connect if you already own it.",
    how: 'Just the domain, e.g. yourcharity.org. Tell us if you already own it and where.',
    optionalWhy: 'The registrar only applies if you already own a domain.',
    links: ['/website-templates/'],
  },
  {
    id: 'current-site',
    title: 'Current website or page',
    fields: [
      { slug: 'current-site-url', label: 'Current website or page link', r33: 'O', r16: 'O' },
      { slug: 'has-hosting', label: 'Do you have Web Hosting?', r33: '-', r16: 'R' },
      {
        slug: 'hosting-provider',
        label: 'Who is your current hosting provider?',
        r33: '-',
        r16: 'O',
      },
    ],
    why: 'We reuse your existing content and make sure nothing breaks, including free sites without their own domain (Canva, brand.page, Wix or Google Sites subdomains, Linktree, Carrd).',
    how: 'Paste the full link.',
    optionalWhy: {
      '501c3': 'Only applies if you already have a website or page.',
      pre501c3:
        'Only applies if you have a site or hosting; the hosting company is asked only if you answered Yes to having web hosting.',
    },
    links: [
      'https://ffcadmin.org/guides/adopt-ffc-footer-on-existing-site/',
      'https://ffcadmin.org/guides/wordpress-to-nextjs-guide/',
    ],
  },
  {
    id: 'template',
    title: 'Website starting point',
    fields: [{ slug: 'template-choice', label: 'Template choice', r33: 'R', r16: 'R' }],
    why: 'Single Page builds your full site from our template; Footer-Only adds the FFC footer to a site you keep.',
    how: "Pick one, or 'Not sure' and we recommend. Either way, your site gets the six policy pages the FFC footer links to (donation, privacy, cookie, terms of service, vulnerability disclosure and security acknowledgements), so you don't have to write them.",
    links: ['/website-templates/', 'https://ffcadmin.org/guides/build-charity-site-from-template/'],
  },
  {
    id: 'site-content',
    title: 'Tagline and descriptions',
    fields: [
      { slug: 'tagline', label: 'Tagline', r33: 'R', r16: 'R' },
      { slug: 'site-description', label: 'Site description', r33: 'R', r16: 'R' },
      { slug: 'site-short-description', label: 'Site short description', r33: 'R', r16: 'R' },
    ],
    why: 'They are the words at the top of your site and in search results and share cards. We build your site from them right after approval.',
    how: 'Tagline: a short slogan. Description: one or two sentences. Short description: under 200 characters.',
    links: [],
    help: ['mission-statement'],
  },
  {
    id: 'programs',
    title: 'Programs',
    fields: [
      { slug: 'program-1-title', label: 'Program 1 title', r33: 'R', r16: 'R' },
      { slug: 'program-1-desc', label: 'Program 1 description', r33: 'R', r16: 'R' },
      { slug: 'program-2-title', label: 'Program 2 title', r33: 'O', r16: 'O' },
      { slug: 'program-2-desc', label: 'Program 2 description', r33: 'O', r16: 'O' },
      { slug: 'program-3-title', label: 'Program 3 title', r33: 'O', r16: 'O' },
      { slug: 'program-3-desc', label: 'Program 3 description', r33: 'O', r16: 'O' },
    ],
    why: 'Your programs section shows donors what you actually do. At least one is required.',
    how: 'A short title and one or two sentences each.',
    optionalWhy: 'Programs 2 and 3 are optional; many charities start with one.',
    links: [],
    help: ['mission-statement'],
  },
  {
    id: 'branding',
    title: 'SEO keywords, brand color and logo',
    fields: [
      { slug: 'seo-keywords', label: 'SEO keywords', r33: 'O', r16: 'O' },
      { slug: 'brand-color', label: 'Brand color', r33: 'O', r16: 'O' },
      { slug: 'logo-url', label: 'Logo link', r33: 'O', r16: 'O' },
    ],
    why: 'They polish your site.',
    how: "Keywords comma-separated; one hex color like #0567B1. No logo link? Your maintainer gets a first GitHub issue, 'Add your logo', after the site is created.",
    optionalWhy:
      "We draft keywords from your mission and use the template's palette; the logo is uploaded on GitHub later.",
    links: [
      'https://ffcadmin.org/guides/canva-organization/',
      'https://ffcadmin.org/site-owner/common-edits/',
    ],
  },
  {
    id: 'donations-volunteers',
    title: 'Zeffy donations and Idealist volunteers',
    fields: [
      { slug: 'zeffy-donation-url', label: 'Zeffy donation form link', r33: 'R', r16: 'O' },
      { slug: 'idealist-url', label: 'Idealist page link', r33: 'R', r16: 'O' },
    ],
    why: 'Every 501(c)(3) site takes donations (Zeffy keeps 100% for the charity) and lists volunteer opportunities. Both are free.',
    how: 'Create the Zeffy donation form and the Idealist page, then paste their links.',
    optionalWhy:
      'Optional only for pre-501(c)(3) groups that cannot get them yet; required for 501(c)(3) charities.',
    links: [
      '/zeffy-donations-guide/',
      'https://ffcadmin.org/guides/zeffy-organization/',
      'https://ffcadmin.org/guides/idealist-organization/',
      'https://ffcadmin.org/guides/idealist/',
    ],
  },
  {
    id: 'site-leaders',
    title: 'Leaders shown on your website (and consent)',
    fields: [
      { slug: 'site-leader-1', label: 'Site leader 1', r33: 'R', r16: 'R' },
      { slug: 'site-leader-2', label: 'Site leader 2', r33: 'R', r16: 'R' },
      { slug: 'site-leader-3', label: 'Site leader 3', r33: 'R', r16: 'R' },
      { slug: 'site-leaders-consent', label: 'Site leaders consent', r33: 'R', r16: 'R' },
      { slug: 'leadership-public', label: 'Other leaders shown publicly', r33: 'O', r16: 'O' },
    ],
    why: "FFC sites show the charity's Chair, Secretary and Treasurer by name and role so donors can see who leads it. We cannot accept an application unless all three agree to appear.",
    how: 'Full names as they should appear; tick the consent box once all three agree.',
    optionalWhy: 'Other leaders are optional and listed only with their agreement.',
    links: [],
    help: ['board-requirements'],
  },
  {
    id: 'techsoup-email',
    title: 'TechSoup and email provider (pre-501(c)(3))',
    fields: [
      { slug: 'techsoup', label: 'Have you been approved by TechSoup.org?', r33: '-', r16: 'R' },
      {
        slug: 'has-email-provider',
        label: 'Do you have a business email provider?',
        r33: '-',
        r16: 'R',
      },
      { slug: 'email-provider', label: 'If yes, who is your email provider?', r33: '-', r16: 'R' },
    ],
    why: 'Tells us which discounted tools you can use now and what email setup to plan.',
    how: 'Answer as things stand today.',
    links: [
      'https://ffcadmin.org/guides/techsoup/',
      '/m365-email-guide/',
      '/google-for-nonprofits-guide/',
    ],
  },
  {
    id: 'certifications',
    title: 'Terms of Service, US attestation and AI questions',
    fields: [
      { slug: 'tos-certification', label: 'Terms of Service certification', r33: 'R', r16: 'R' },
      { slug: 'us-attestation', label: 'US attestation', r33: 'R', r16: 'R' },
      { slug: 'ai-tools', label: 'AI tools you use', r33: 'R', r16: 'R' },
      { slug: 'ai-plan', label: 'How you plan to use AI', r33: 'R', r16: 'R' },
    ],
    why: 'We serve US organizations that agree to our terms; the AI questions help us tailor training.',
    how: "Read the Terms of Service; answer the AI questions honestly. If you don't use AI tools yet, just say so.",
    links: ['/terms-of-service/', 'https://ffcadmin.org/guides/ai-assistant-organization/'],
  },
]

export interface WorksheetItem {
  /** The question as it should appear in the applicant's own document. */
  label: TrackText
  /** The WHMCS field slugs this question covers (form-specific variants included). */
  fields: string[]
}

export interface WorksheetGroup {
  title: string
  items: WorksheetItem[]
}

/**
 * Copy-ready worksheet: every application question in the form's display
 * order. Each field slug appears exactly once (guarded by the unit test), and
 * each guide shows only the questions its form asks, with that form's
 * Required / Optional computed from the section data above.
 */
export const APPLICATION_WORKSHEET: WorksheetGroup[] = [
  {
    title: 'Before you start',
    items: [{ label: 'I have read the full application help page', fields: ['read-help-page'] }],
  },
  {
    title: 'Your organization',
    items: [
      { label: "Organization's legal name", fields: ['org-name'] },
      { label: 'Legal status', fields: ['legal-status'] },
      {
        label: {
          '501c3': 'EIN (NN-NNNNNNN)',
          pre501c3: 'EIN (NN-NNNNNNN; a group without one yet may enter NONE)',
        },
        fields: ['ein'],
      },
      { label: 'Mission', fields: ['mission'] },
      { label: 'Year founded', fields: ['founding-year'] },
      { label: 'Also known as / abbreviations', fields: ['alternate-names'] },
    ],
  },
  {
    title: 'Public verification',
    items: [
      { label: 'Candid (GuideStar) public profile link', fields: ['guidestar-public'] },
      { label: 'Candid (GuideStar) full profile link', fields: ['guidestar-full'] },
      { label: 'GuideStar.org URL', fields: ['guidestar'] },
      { label: 'Charity Facebook Page link', fields: ['facebook-page'] },
      { label: 'Charity LinkedIn Page link', fields: ['linkedin-page'] },
      {
        label: 'Instagram, X and YouTube links',
        fields: ['social-instagram', 'social-x', 'social-youtube'],
      },
    ],
  },
  {
    title: 'Board officers',
    items: [
      { label: 'Chair: LinkedIn profile link', fields: ['chair-linkedin'] },
      { label: 'Chair: phone and email', fields: ['chair-phone', 'chair-email'] },
      { label: 'Secretary: LinkedIn profile link', fields: ['secretary-linkedin'] },
      { label: 'Secretary: phone and email', fields: ['secretary-phone', 'secretary-email'] },
      { label: 'Treasurer: LinkedIn profile link', fields: ['treasurer-linkedin'] },
      { label: 'Treasurer: phone and email', fields: ['treasurer-phone', 'treasurer-email'] },
      {
        label: 'Vice Chair: LinkedIn, phone and email',
        fields: ['vicechair-linkedin', 'vicechair-phone', 'vicechair-email'],
      },
      {
        label: 'Member-at-Large: LinkedIn, phone and email',
        fields: ['member-linkedin', 'member-phone', 'member-email'],
      },
      {
        label: 'Team members 1 to 3: name and role',
        fields: [
          'team-member-1-name',
          'team-member-1-role',
          'team-member-2-name',
          'team-member-2-role',
          'team-member-3-name',
          'team-member-3-role',
        ],
      },
      {
        label: 'Team members 1 to 3: LinkedIn profile links',
        fields: ['team-member-1-linkedin', 'team-member-2-linkedin', 'team-member-3-linkedin'],
      },
      {
        label: 'Team members 4 and 5: name, role and LinkedIn',
        fields: [
          'team-member-4-name',
          'team-member-4-role',
          'team-member-4-linkedin',
          'team-member-5-name',
          'team-member-5-role',
          'team-member-5-linkedin',
        ],
      },
    ],
  },
  {
    title: 'Who we work with',
    items: [
      {
        label: 'Primary contact: LinkedIn, phone and email',
        fields: ['primary-linkedin', 'primary-phone', 'primary-email'],
      },
      {
        label: 'Technical contact: LinkedIn, phone and email',
        fields: ['technical-linkedin', 'technical-phone', 'technical-email'],
      },
      { label: 'Phone number we can reach you at', fields: ['reach-phone'] },
      { label: 'Website maintainer: GitHub username', fields: ['technical-github'] },
      { label: 'Website maintainer: role', fields: ['technical-role'] },
      { label: 'Time zone', fields: ['timezone'] },
      { label: 'Hours you are available', fields: ['contact-times'] },
      { label: 'Best time to call you', fields: ['best-time'] },
    ],
  },
  {
    title: 'Website footer contact',
    items: [
      { label: 'Public phone', fields: ['public-phone'] },
      { label: 'Public email', fields: ['public-email'] },
      { label: 'City and state', fields: ['footer-location'] },
    ],
  },
  {
    title: 'Domain and current site',
    items: [
      {
        label: 'Domain (e.g. yourcharity.org)',
        fields: ['desired-domain', 'current-desired-domain'],
      },
      { label: 'Do you already own the domain?', fields: ['domain-owned', 'has-domain'] },
      { label: 'Domain registrar', fields: ['domain-registrar'] },
      { label: 'Current website or page link', fields: ['current-site-url'] },
      { label: 'Do you have web hosting?', fields: ['has-hosting'] },
      { label: 'Current hosting provider', fields: ['hosting-provider'] },
    ],
  },
  {
    title: 'Website content',
    items: [
      { label: 'Website starting point (template)', fields: ['template-choice'] },
      { label: 'Tagline', fields: ['tagline'] },
      { label: 'Description (one or two sentences)', fields: ['site-description'] },
      { label: 'Short description (under 200 characters)', fields: ['site-short-description'] },
      { label: 'Program 1: title and description', fields: ['program-1-title', 'program-1-desc'] },
      {
        label: 'Programs 2 and 3: title and description',
        fields: ['program-2-title', 'program-2-desc', 'program-3-title', 'program-3-desc'],
      },
      { label: 'SEO keywords', fields: ['seo-keywords'] },
      { label: 'Brand color (hex, e.g. #0567B1)', fields: ['brand-color'] },
      { label: 'Logo link', fields: ['logo-url'] },
    ],
  },
  {
    title: 'Donations and volunteers',
    items: [
      { label: 'Zeffy donation form link', fields: ['zeffy-donation-url'] },
      { label: 'Idealist page link', fields: ['idealist-url'] },
    ],
  },
  {
    title: 'Leaders on your website',
    items: [
      {
        label: 'Chair, Secretary and Treasurer names, as they should appear',
        fields: ['site-leader-1', 'site-leader-2', 'site-leader-3'],
      },
      { label: 'Other leaders to show', fields: ['leadership-public'] },
      { label: 'Consent: all three agree to appear', fields: ['site-leaders-consent'] },
    ],
  },
  {
    title: 'Tools',
    items: [
      { label: 'Have you been approved by TechSoup?', fields: ['techsoup'] },
      { label: 'Do you have a business email provider?', fields: ['has-email-provider'] },
      { label: 'If yes, who is your email provider?', fields: ['email-provider'] },
    ],
  },
  {
    title: 'Final certifications',
    items: [
      { label: 'AI tools you use', fields: ['ai-tools'] },
      { label: 'How you plan to use AI', fields: ['ai-plan'] },
      { label: 'US attestation', fields: ['us-attestation'] },
      { label: 'Terms of Service certification', fields: ['tos-certification'] },
    ],
  },
]

export const REQUIREMENT_LABELS: Record<FieldRequirement, string> = {
  R: 'Required',
  O: 'Optional',
  '-': 'Not asked',
}

const REQUIREMENT_RANK: Record<FieldRequirement, number> = { '-': 0, O: 1, R: 2 }

function strongest(values: FieldRequirement[]): FieldRequirement {
  return values.reduce<FieldRequirement>(
    (best, v) => (REQUIREMENT_RANK[v] > REQUIREMENT_RANK[best] ? v : best),
    '-'
  )
}

const ALL_FIELDS = APPLICATION_FIELD_SECTIONS.flatMap((s) => s.fields)

/** A field's requirement on one form. */
export function fieldRequirement(field: ApplicationField, track: Track): FieldRequirement {
  return field[TRACKS[track].key]
}

/**
 * Requirement for a question that may span several fields: the strongest
 * requirement among them on that form ('-' when the form does not ask it).
 */
export function questionRequirement(fieldSlugs: string[], track: Track): FieldRequirement {
  return strongest(
    ALL_FIELDS.filter((f) => fieldSlugs.includes(f.slug)).map((f) => fieldRequirement(f, track))
  )
}

/** A section as one form shows it: only the fields that form asks. */
export interface TrackSection extends Omit<ApplicationFieldSection, 'why' | 'how' | 'optionalWhy'> {
  why: string
  how: string
  /** Present only when the form has an optional field in this section. */
  optionalWhy?: string
  /** Links resolved for this form (per-form links filtered). */
  hrefs: string[]
}

/** The sections one form shows, in display order, with that form's copy. */
export function sectionsForTrack(track: Track): TrackSection[] {
  return APPLICATION_FIELD_SECTIONS.map((s) => {
    const fields = s.fields.filter((f) => fieldRequirement(f, track) !== '-')
    const hasOptional = fields.some((f) => fieldRequirement(f, track) === 'O')
    return {
      ...s,
      fields,
      why: textFor(s.why, track),
      how: textFor(s.how, track),
      optionalWhy: hasOptional && s.optionalWhy ? textFor(s.optionalWhy, track) : undefined,
      hrefs: s.links
        .filter((l) => typeof l === 'string' || l.only === track)
        .map((l) => (typeof l === 'string' ? l : l.href)),
    }
  }).filter((s) => s.fields.length > 0)
}

export interface TrackWorksheetGroup {
  title: string
  items: { label: string; requirement: FieldRequirement }[]
}

/** The worksheet for one form: only the questions it asks, with its requirement. */
export function worksheetForTrack(track: Track): TrackWorksheetGroup[] {
  return APPLICATION_WORKSHEET.map((group) => ({
    title: group.title,
    items: group.items
      .map((item) => ({
        label: textFor(item.label, track),
        requirement: questionRequirement(item.fields, track),
      }))
      .filter((item) => item.requirement !== '-'),
  })).filter((group) => group.items.length > 0)
}

/**
 * Link text for every step-by-step link above. A fixed map (rather than a
 * lookup into another site's registries) so the guide never depends on
 * ffcadmin.org's source; the unit test fails if a link has no label.
 */
export const LINK_LABELS: Record<string, string> = {
  // Pages on freeforcharity.org
  '/guidestar-guide/': 'GuideStar (Candid) profile guide',
  '/zeffy-donations-guide/': 'Fee-free donations with Zeffy',
  '/m365-email-guide/': 'Free Microsoft 365 email for your charity',
  '/google-for-nonprofits-guide/': 'Google for Nonprofits and Google Workspace',
  '/irs-990n-filing-guide/': 'Keep your 501(c)(3) active: the IRS 990-N filing guide',
  '/website-templates/': 'Website templates and the FFC footer, explained',
  '/terms-of-service/': 'Free For Charity Terms of Service',
  // Elsewhere
  [EIN_URL]: 'Apply for an EIN online (IRS)',
  'https://ffcadmin.org/guides/candid-organization/': 'Claim your charity’s Candid profile & seal',
  'https://ffcadmin.org/guides/facebook-organization/': 'Run your charity’s Facebook Page',
  'https://ffcadmin.org/guides/linkedin-organization/': 'Run your charity’s LinkedIn Page',
  'https://ffcadmin.org/guides/instagram-organization/': 'Run your charity’s Instagram',
  'https://ffcadmin.org/guides/linkedin/': 'Set up LinkedIn (you + your charity Page)',
  'https://ffcadmin.org/guides/github-account/': 'Create your GitHub account',
  'https://ffcadmin.org/site-owner/': 'Edit your charity website (site owner hub)',
  'https://ffcadmin.org/site-owner/accept-invitation/': 'Accept your GitHub repository invitation',
  'https://ffcadmin.org/site-owner/training/': 'Site owner training',
  'https://ffcadmin.org/site-owner/common-edits/': 'Common edits cookbook',
  'https://ffcadmin.org/guides/google-voice/': 'Set up a public phone number (Google Voice)',
  'https://ffcadmin.org/guides/adopt-ffc-footer-on-existing-site/':
    'Adopting the FFC footer on an existing website',
  'https://ffcadmin.org/guides/wordpress-to-nextjs-guide/': 'Moving a WordPress site to FFC',
  'https://ffcadmin.org/guides/build-charity-site-from-template/':
    'Build a charity site from the template',
  'https://ffcadmin.org/guides/canva-organization/': 'Set up your charity’s Canva team & brand kit',
  'https://ffcadmin.org/guides/zeffy-organization/': 'Set up Zeffy for your charity',
  'https://ffcadmin.org/guides/idealist-organization/':
    'Post your charity’s opportunities on Idealist',
  'https://ffcadmin.org/guides/idealist/': 'Set up Idealist (volunteers & nonprofit jobs)',
  'https://ffcadmin.org/guides/techsoup/': 'Get validated on TechSoup',
  'https://ffcadmin.org/guides/ai-assistant-organization/': 'Set up organizational AI assistants',
}

export interface ResolvedLink {
  href: string
  label: string
  external: boolean
}

/** Resolve a step-by-step link to readable text, or undefined if it has no label. */
export function resolveApplicationFieldLink(href: string): ResolvedLink | undefined {
  const label = LINK_LABELS[href]
  return label ? { href, label, external: /^https?:\/\//.test(href) } : undefined
}
