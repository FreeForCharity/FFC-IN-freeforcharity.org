import { pageMetadata } from '@/lib/page-metadata'
import DecisionWizard, { type WizardConfig } from '@/components/wizards/DecisionWizard'

export const metadata = pageMetadata({
  title: 'Charity Eligibility Check',
  description:
    'Answer five quick questions and find out which free Free For Charity programs your nonprofit qualifies for — domain, email, website, or migration.',
  canonical: '/eligibility-check/',
})

const config: WizardConfig = {
  firstQuestion: 'org-status',
  questions: [
    {
      id: 'org-status',
      prompt: 'What best describes your organization?',
      options: [
        { label: 'A U.S. 501(c)(3) nonprofit in good standing', next: 'has-domain' },
        {
          label: 'A nonprofit working toward 501(c)(3) determination (pre-501c3)',
          next: 'pre-domain',
        },
        { label: 'A for-profit business or individual', next: 'outcome:not-eligible' },
      ],
    },
    {
      id: 'has-domain',
      prompt: 'Does your organization have its own domain name (like yourcharity.org)?',
      options: [
        { label: 'No — we need one', next: 'outcome:full-onboarding' },
        { label: 'Yes, and we manage it ourselves', next: 'has-site' },
        { label: "Yes, but we're not sure who controls it", next: 'outcome:domain-rescue' },
      ],
    },
    {
      id: 'has-site',
      prompt: 'What does your website situation look like?',
      options: [
        { label: "We don't have a website yet", next: 'outcome:site-build' },
        {
          label: 'We have an old site (WordPress or similar) that costs money or is fragile',
          next: 'outcome:migration',
        },
        { label: 'Our site is fine — we need email or other help', next: 'outcome:email-tools' },
      ],
    },
    {
      id: 'pre-domain',
      prompt: 'Where are you in the formation process?',
      options: [
        {
          label: 'We have formation documents (articles of incorporation) and an EIN',
          next: 'outcome:pre501c3',
        },
        { label: "We're just getting started — no paperwork yet", next: 'outcome:too-early' },
      ],
    },
  ],
  outcomes: [
    {
      id: 'full-onboarding',
      title: 'You qualify for the full program 🎉',
      body: 'Free .org domain (we pay for it), free Microsoft 365 email at that domain, and a free website built by our volunteers. Start with the application, and gather the items on the checklist while you wait.',
      links: [
        { label: 'Apply via Help for Charities', href: '/help-for-charities/' },
        { label: 'See the onboarding journey', href: '/charity-onboarding-journey/' },
        { label: 'Getting-started checklist', href: '/getting-started-checklist/' },
      ],
    },
    {
      id: 'domain-rescue',
      title: 'Let’s secure that domain first',
      body: "A domain nobody clearly controls is a ticking risk — if it lapses, your email and website go with it. We'll help you locate the registration, take over renewals (at our cost), and lock down DNS. Then everything else follows.",
      links: [
        { label: 'Who controls the domain? (domain guide)', href: '/choosing-your-org-domain/' },
        { label: 'Security basics for charities', href: '/charity-security-guide/' },
        { label: 'Contact us to start', href: '/contact-us/' },
      ],
    },
    {
      id: 'site-build',
      title: 'You qualify for a free website build',
      body: 'Our volunteers build charity sites on fast, secure static hosting — free, including ongoing maintenance. Since you already manage a domain, we can point it at the new site (or take over the domain costs too).',
      links: [
        { label: 'Apply via Help for Charities', href: '/help-for-charities/' },
        {
          label: 'How FFC delivers services',
          href: '/free-for-charity-ffc-service-delivery-stages/',
        },
      ],
    },
    {
      id: 'migration',
      title: 'You qualify for a free migration',
      body: 'We rebuild legacy WordPress (and similar) sites on modern static hosting — no hosting bill, no plugin updates, no hacks. Your content moves; your address stays.',
      links: [
        { label: 'Start via Help for Charities', href: '/help-for-charities/' },
        { label: 'Common questions (charity FAQ)', href: '/charity-faq/' },
      ],
    },
    {
      id: 'email-tools',
      title: 'Free email and the tool stack',
      body: "Microsoft grants qualified nonprofits free Microsoft 365 email — we handle the technical setup. While you're at it, claim Google Ad Grants and fee-free donations.",
      links: [
        { label: 'Free Microsoft 365 email guide', href: '/m365-email-guide/' },
        { label: 'Google for Nonprofits & Ad Grants', href: '/google-for-nonprofits-guide/' },
        { label: 'Fee-free donations with Zeffy', href: '/zeffy-donations-guide/' },
      ],
    },
    {
      id: 'pre501c3',
      title: 'Pre-501c3 onboarding is made for you',
      body: "You don't need to wait for IRS determination to look professional. We help pre-501c3 organizations get a domain and email now, and guide the path to full status.",
      links: [
        { label: 'Pre-501c3 onboarding', href: '/pre501c3/' },
        { label: 'Choosing your .org domain', href: '/choosing-your-org-domain/' },
      ],
    },
    {
      id: 'too-early',
      title: 'A little early — but here’s your roadmap',
      body: 'Form the organization first (articles of incorporation + EIN). Once you have those, come straight back — pre-501c3 onboarding takes you from there.',
      links: [
        {
          label: 'What validation requires',
          href: '/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes/',
        },
        { label: 'Pre-501c3 onboarding (for when you’re ready)', href: '/pre501c3/' },
      ],
    },
    {
      id: 'not-eligible',
      title: 'Our free programs are for nonprofits — but stay!',
      body: "FFC's free services are reserved for 501(c)(3) and pre-501c3 organizations. If you're a business that wants to help, volunteers and donors are how this whole thing runs.",
      links: [
        { label: 'Volunteer your skills', href: '/volunteer/' },
        { label: 'Support the mission', href: '/donate/' },
      ],
    },
  ],
}

export default function EligibilityCheck() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-4">
          Does Your Charity Qualify?
        </h1>
        <p className="font-[var(--font-lato)] text-[18px] leading-[28px] text-[#555] mb-8">
          Five quick questions, no forms, no email required — just an honest answer about which free
          programs fit your organization and what to do next.
        </p>
        <DecisionWizard config={config} />
      </div>
    </div>
  )
}
