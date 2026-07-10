import { pageMetadata } from '@/lib/page-metadata'
import DecisionWizard, { type WizardConfig } from '@/components/wizards/DecisionWizard'
import { hubAddProduct, ONBOARDING_PID } from '@/lib/config'

export const metadata = pageMetadata({
  title: 'Charity Eligibility Check',
  description:
    'Answer a couple of quick questions to confirm your nonprofit qualifies for the Free For Charity program — one all-in package: a managed .org domain, Microsoft 365 email, and a professionally built website — then apply right here.',
  canonical: '/eligibility-check/',
})

const config: WizardConfig = {
  firstQuestion: 'org-status',
  questions: [
    {
      id: 'org-status',
      prompt: 'What best describes your organization?',
      options: [
        { label: 'A U.S. 501(c)(3) nonprofit in good standing', next: 'outcome:qualified-501c3' },
        {
          label: 'A nonprofit working toward 501(c)(3) determination (pre-501c3)',
          next: 'pre-status',
        },
        { label: 'A for-profit business or individual', next: 'outcome:not-eligible' },
      ],
    },
    {
      id: 'pre-status',
      prompt: 'Where are you in the formation process?',
      options: [
        {
          label: 'We have formation documents (articles of incorporation) and an EIN',
          next: 'outcome:qualified-pre501c3',
        },
        { label: "We're just getting started — no paperwork yet", next: 'outcome:too-early' },
      ],
    },
  ],
  outcomes: [
    {
      id: 'qualified-501c3',
      title: 'You qualify — apply now 🎉',
      body: "Free For Charity is one all-in program, not a menu. When you join, we register and manage your .org domain, set up and run your Microsoft 365 email, and build and host your website — and we keep managing all of it for you. Apply below and we'll take it from there.",
      actions: [
        {
          label: 'Apply as a 501(c)(3) charity',
          href: hubAddProduct(ONBOARDING_PID.full501c3),
          external: true,
        },
      ],
      links: [
        { label: 'See the onboarding journey', href: '/charity-onboarding-journey/' },
        { label: 'Getting-started checklist', href: '/getting-started-checklist/' },
      ],
    },
    {
      id: 'qualified-pre501c3',
      title: 'You qualify for pre-501(c)3 onboarding — apply now 🎉',
      body: "You don't have to wait for IRS determination to look professional. Pre-501c3 onboarding is the same single, all-in program: we register and manage your .org domain, set up your Microsoft 365 email, and build and host your website — all managed by us — and we guide your path to full 501(c)(3) status. Apply below to get started.",
      actions: [
        {
          label: 'Apply as a pre-501(c)3 organization',
          href: hubAddProduct(ONBOARDING_PID.pre501c3),
          external: true,
        },
      ],
      links: [
        { label: 'See the onboarding journey', href: '/charity-onboarding-journey/' },
        { label: 'Choosing your .org domain', href: '/choosing-your-org-domain/' },
      ],
    },
    {
      id: 'too-early',
      title: 'A little early — but here’s your roadmap',
      body: 'Form the organization first (articles of incorporation + EIN). Once you have those, come straight back and apply — pre-501c3 onboarding takes you the rest of the way into the full program.',
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
      body: "FFC's free services are reserved for 501(c)(3) and pre-501c3 organizations. If you're a business or individual who wants to help, volunteers and donors are how this whole thing runs.",
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
        <p className="font-[var(--font-lato)] text-[18px] leading-[28px] text-[#555] mb-4">
          Free For Charity is a single, all-in program. When your charity joins, we register and
          manage your domain, run your Microsoft 365 email, and build and host your website — one
          committed journey we manage end to end, not a set of services to pick from.
        </p>
        <p className="font-[var(--font-lato)] text-[18px] leading-[28px] text-[#555] mb-8">
          Answer a couple of quick questions to confirm you qualify, then apply right here — no
          forms, no email required to check.
        </p>
        <DecisionWizard config={config} />
      </div>
    </div>
  )
}
