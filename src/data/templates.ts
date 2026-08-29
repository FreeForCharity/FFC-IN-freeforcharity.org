/**
 * The two open-source FFC website templates as pure data, shared between the
 * template chooser on /free-charity-web-hosting/ and the explainer on
 * /website-templates/ so the facts — names, descriptions, feature lists, and
 * repository links — cannot drift between pages. Icons are presentation and
 * stay in the components that render them.
 */

export interface TemplateOption {
  id: 'single-page' | 'footer-only'
  eyebrow: string
  title: string
  description: string
  features: string[]
  repoUrl: string
  repoLabel: string
}

export const templateOptions: TemplateOption[] = [
  {
    id: 'single-page',
    eyebrow: 'Starting fresh?',
    title: 'Single Page Site Template',
    description:
      'For charities without a website — most pre-501(c)(3)s start here. A complete, professionally structured single-page site built from our tested template. We design and build it from your content.',
    features: [
      'Every section a charity needs: mission, programs, team, donate, contact',
      'Fast static hosting on GitHub Pages',
      'Full FFC footer with legal pages, cookie consent, and analytics built in',
    ],
    repoUrl: 'https://github.com/FreeForCharity/FFC-IN-FFC_Single_Page_Template',
    repoLabel: 'View the Single Page template on GitHub',
  },
  {
    id: 'footer-only',
    eyebrow: 'Already love your website?',
    title: 'Footer-Only Template',
    description:
      'For charities that already have a designed site and need the validation and formality of the FFC standard — added to your existing design instead of replacing it.',
    features: [
      'The FFC footer and seven legal/policy pages',
      'GDPR cookie consent and analytics',
      'Team section and SEO infrastructure',
    ],
    repoUrl: 'https://github.com/FreeForCharity/FFC-IN-Footer_Only_Template',
    repoLabel: 'View the Footer-Only template on GitHub',
  },
]
