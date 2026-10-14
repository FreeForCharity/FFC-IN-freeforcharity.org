/**
 * Single source of truth for the five-stage gated charity onboarding journey.
 *
 * Rendered by src/app/charity-onboarding-journey/page.tsx (the full stage
 * cards) and referenced by src/app/getting-started-checklist/page.tsx (the
 * "During onboarding" order statement via GATE_SENTENCE), so the journey
 * order and copy cannot drift between pages.
 *
 * The order is load-bearing: the website is built and validated FIRST on its
 * free GitHub Pages address, and money is only spent on the domain once the
 * site is proven (the funding gate), with email after that. See also
 * src/components/journey/JourneyDiagram.tsx and /why-website-first/.
 */

export interface JourneyStageLink {
  href: string
  label: string
}

export interface JourneyStage {
  id: string
  name: string
  /** How this stage relates to the journey's gates (approval / funding). */
  gateNote: string
  youDo: string
  ffcDoes: string
  duration: string
  links?: JourneyStageLink[]
}

/**
 * The one-sentence order statement shared verbatim by the journey page and
 * the getting-started checklist so the gated order is stated identically
 * everywhere.
 */
export const GATE_SENTENCE =
  'Your website is built and validated first, live on its free GitHub Pages address — your domain is purchased only after your site is proven, and charity email comes after that.'

export const journeyStages: JourneyStage[] = [
  {
    id: 'application',
    name: '1. Application & validation',
    gateNote: 'Approval here is the gate for every later stage.',
    youDo:
      'Complete every required field on the onboarding application: your legal name, EIN, Candid profile, charity Facebook and LinkedIn Pages, your Chair, Secretary and Treasurer (each with a working LinkedIn profile, and all three agreeing to appear on your website), your website maintainer’s GitHub username, your domain, and your website content (template, tagline, descriptions and first program). Demand for this free service is high, so we need every required field completed to review applications fairly. Have your IRS determination letter handy (pre-501c3 orgs: your formation documents).',
    ffcDoes:
      'We validate your organization (IRS status, Candid profile) and confirm program fit. Every later stage requires this approval first.',
    duration: 'A few days',
    links: [
      { href: '/help-for-charities/', label: 'Start here: Help for Charities' },
      {
        href: 'https://ffcadmin.org/guides/application-fields/',
        label: 'Guide: every application field, step by step',
      },
    ],
  },
  {
    id: 'website',
    name: '2. Website — built and proven first',
    gateNote:
      'Your validated live site is the funding gate: it unlocks the domain purchase in stage 3.',
    youDo:
      'Nothing extra to submit: your application already included your website content. Review the preview link we email you and approve it (or tell us what to change). Your maintainer accepts the GitHub invitation and, if you didn’t include a logo link, uploads your logo through the first “Add your logo” issue.',
    ffcDoes:
      'Right after approval, a volunteer builds your site from the FFC template (fast, secure static hosting) using the content in your application, with the full FFC footer generated from your validated application data. Your site goes live on its free GitHub Pages address — no custom domain yet — and we email you a preview link.',
    duration: '2–6 weeks, mostly depending on content readiness',
    links: [
      {
        href: 'https://ffcadmin.org/sites-list/',
        label: 'How FFC delivers services',
      },
    ],
  },
  {
    id: 'domain',
    name: '3. Domain — only after your site is proven',
    gateNote: 'Unlocked only after your website is validated live on GitHub Pages.',
    youDo:
      'Once you approve your preview, order your free .org domain (the one you named on your application) using the coupon in your onboarding acceptance email — or, if you already own a domain, request a transfer instead. You can check name availability any time; we buy once your site is validated.',
    ffcDoes:
      'Once your website is validated, we spend the funds: we register (and pay for) the best available name, or take over management of your existing domain, set up DNS and security, and point it at your live site.',
    duration: 'Same week (after website validation)',
    links: [{ href: '/domains/#check-your-domain', label: 'Guide: choosing your .org domain' }],
  },
  {
    id: 'email',
    name: '4. Email',
    gateNote:
      'Comes after the domain — the nonprofit email programs require a live website before they approve your 501(c)(3).',
    youDo:
      'Choose Microsoft 365 or Google Workspace, then register with Microsoft for Nonprofits or Google for Nonprofits and tell us when the DNS verification codes appear. Both nonprofit email programs require a live website before they approve your 501(c)(3) — which is exactly why your website comes first.',
    ffcDoes:
      'We add the DNS records so your free Microsoft 365 or Google Workspace mailboxes go live, and confirm MFA is on.',
    duration: '2–5 business days (Microsoft or Google validation)',
    links: [
      { href: '/m365-email-guide/', label: 'Guide: free Microsoft 365 email' },
      { href: '/google-for-nonprofits-guide/', label: 'Guide: free Google Workspace email' },
    ],
  },
  {
    id: 'handoff',
    name: '5. Handoff & ongoing support',
    gateNote: 'No gate — ongoing once you are live.',
    youDo:
      'Learn where to send changes and questions; add the trust-builders (Candid seal, donation form) when ready.',
    ffcDoes:
      'We keep the domain renewed, DNS secure, and hosting healthy — and stay reachable for changes and fixes.',
    duration: 'Ongoing',
    links: [{ href: '/guides/', label: 'All guides' }],
  },
]
