/**
 * Single source of truth for FAQ copy that is rendered in more than one
 * place, so the answers cannot drift apart.
 *
 * Renderers:
 *  - src/components/home-page/FrequentlyAskedQuestions/index.tsx
 *  - src/components/free-charity-web-hosting/FAQs/index.tsx
 *
 * Both components keep their own markup (accordion styles differ) but pull
 * the question and answer strings for the overlapping entries from here.
 *
 * History: this module previously exported a large `faqs` array that no
 * component imported (dead data that had already drifted from the rendered
 * copy). Those unused entries were removed; see git history if you need the
 * old text. The CMS-managed JSON files in src/data/faqs/ hold the two
 * long-form program FAQs still referenced by docs/METRICS-PLAYBOOK.md.
 */

export interface FaqLink {
  href: string
  label: string
}

/** A bullet in the "ways to get in faster" list: before + optional link + after. */
export interface FaqWay {
  before: string
  link?: FaqLink
  after?: string
}

/**
 * The no-timeline statement: replaces every capacity number ("1 new charity
 * per week", "100 charities a year"). We're all volunteers, so we never
 * promise a timeline.
 */
export const NO_TIMELINE_STATEMENT =
  "Our mission is to reduce costs and increase revenues for nonprofits, putting that money back into their charitable mission where it belongs. We're all volunteers and demand for this free service is very high, so we can't promise a timeline. Complete applications move through fastest."

/** 'Why do I not see hosting as an option?' — the hosting backlog answer. */
export const hostingBacklogFaq = {
  question: 'Why do I not see hosting as an option?',
  backlog: NO_TIMELINE_STATEMENT,
  waysHeading: 'Ways to get in faster:',
  ways: [
    {
      before: 'Complete onboarding and pick your .org name early — check availability at ',
      link: { href: '/domains/', label: 'freeforcharity.org/domains' },
      after: ' — we purchase it once your site is validated.',
    },
    {
      before:
        'Complete every required field on your application. It carries your website content, so a complete application means your GitHub Pages site is built and validated sooner, which unlocks your domain and email sooner.',
    },
  ] as FaqWay[],
}

/** The domain-package donation tax-deduction answer. */
export const domainDonationTaxFaq = {
  question:
    'If I am an individual or business and donate money for a domain package to Free For Charity, is this tax-deductible?',
  answer:
    'While any official tax guidance should come from your accountant or other tax advisor Free For Charity is a registered 501(c)(3) organization and donations are tax-deductible. Our IRS designation number (EIN) is 46-2471893. Upon checkout you will receive a receipt to provide to your accountant. Specifically, if you represent a business you can elect to deduct this as an expense versus as a donation depending on the guidance of your tax advisor.',
}
