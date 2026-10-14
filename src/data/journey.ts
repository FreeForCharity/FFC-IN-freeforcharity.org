/**
 * Single source of truth for the five-stage gated charity onboarding journey.
 *
 * Rendered by src/app/charity-onboarding-journey/page.tsx (the full stage
 * cards), by the shared HowItWorks step list (HOW_IT_WORKS_STEPS, shown on
 * /501c3/, /pre501c3/, /free-charity-web-hosting/ and the journey page) and
 * referenced by src/app/getting-started-checklist/page.tsx (the
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
    duration: 'Typically a few days',
    links: [
      { href: '/help-for-charities/#which-application', label: 'Which application is yours?' },
      { href: '/501c3/#field-guide', label: 'The 501(c)(3) application, field by field' },
      { href: '/pre501c3/#field-guide', label: 'The pre-501(c)(3) application, field by field' },
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
    duration: 'Typically 2–6 weeks, mostly depending on how complete your application is',
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
      'Once you approve your preview, order your free .org domain (the one you named on your application) using the coupon in your onboarding acceptance email — or, if you already own a domain, request a transfer instead. Checkout shows a $1 verification charge, and the coupon brings it to $0. You can check name availability any time; we buy once your site is validated.',
    ffcDoes:
      'Once your website is validated, we spend the funds: we register (and pay for) the best available name, or take over management of your existing domain, set up DNS and security, and point it at your live site. We handle all DNS; you never need to edit it.',
    duration: 'Typically the same week your site is approved',
    links: [{ href: '/domains/#check-your-domain', label: 'Guide: choosing your .org domain' }],
  },
  {
    id: 'email',
    name: '4. Email',
    gateNote:
      'Comes after the domain — the nonprofit email programs require a live website before they approve your 501(c)(3).',
    youDo:
      'Choose Microsoft 365 (Business Basic) or Google Workspace, then register with Microsoft for Nonprofits or Google for Nonprofits and tell us when the DNS verification codes appear. Both nonprofit email programs require a live website before they approve your 501(c)(3) — which is exactly why your website comes first. Pre-501(c)(3) groups get charity email only after their 501(c)(3) is approved; until then, use a free yourcharityname@gmail.com or @outlook.com address.',
    ffcDoes:
      'We add the DNS records so your free Microsoft 365 or Google Workspace mailboxes go live, and confirm MFA is on.',
    duration: 'Typically a few days, depending on Microsoft or Google’s validation',
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
      'We keep the domain renewed, DNS secure, and hosting healthy — and help with changes and fixes as volunteers are available.',
    duration: 'Ongoing',
    links: [{ href: '/guides/', label: 'All guides' }],
  },
]

export interface HowItWorksStep {
  /** Short action, e.g. "You apply". */
  title: string
  /** Who does it. */
  who: 'You' | 'FFC'
  detail: string
  /** Typical time, never a promise: we're all volunteers. */
  time: string
}

/**
 * The ONE canonical "How it works" step list, in order, with typical times.
 * Rendered by the shared HowItWorks component on both application pages, the
 * hosting page and the onboarding-journey page; the stage cards above give
 * the longer story of the same journey.
 */
export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    title: 'You apply',
    who: 'You',
    detail:
      'Complete every required field on your application, copying each answer from the document where you saved it.',
    time: 'About an hour, once your answers are ready',
  },
  {
    title: 'We review and approve',
    who: 'FFC',
    detail:
      'We validate your organization (IRS status or formation documents, Candid profile and officers) and confirm program fit.',
    time: 'Typically a few days',
  },
  {
    title: 'We build your site',
    who: 'FFC',
    detail:
      'A volunteer builds your website from the FFC template using the content on your application. There is nothing else to send.',
    time: 'Typically 2–6 weeks, mostly depending on how complete your application is',
  },
  {
    title: 'You get a preview link',
    who: 'FFC',
    detail: 'We email you a link to your site, live on its free GitHub Pages address.',
    time: 'As soon as the build is ready',
  },
  {
    title: 'You approve your site',
    who: 'You',
    detail: 'Review the preview and approve it, or tell us what to change.',
    time: 'Up to you',
  },
  {
    title: 'You order your domain',
    who: 'You',
    detail:
      'Order your free .org (or a transfer) with the coupon from your acceptance email. Checkout shows a $1 verification charge, and the coupon brings it to $0. We register the domain, handle all DNS and point it at your site.',
    time: 'Typically the same week',
  },
  {
    title: 'Charity email',
    who: 'FFC',
    detail:
      'For 501(c)(3) charities: free Microsoft 365 (Business Basic) or Google Workspace through the nonprofit programs; we add the DNS records. Pre-501(c)(3) groups get charity email only after their 501(c)(3) is approved; until then, use a free yourcharityname@gmail.com or @outlook.com address.',
    time: 'Typically a few days, depending on Microsoft or Google',
  },
]
