import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import DecisionWizard, { type WizardConfig } from '@/components/wizards/DecisionWizard'

export const metadata = pageMetadata({
  title: 'Which Volunteer Role Fits You?',
  description:
    'A one-minute quiz matching your skills and available time to a Free For Charity volunteer role — webmaster, project manager, designer, M365 admin, or coordinator.',
  canonical: '/volunteer-quiz/',
})

const config: WizardConfig = {
  firstQuestion: 'energy',
  questions: [
    {
      id: 'energy',
      prompt: 'What kind of work gives you energy?',
      options: [
        { label: 'Building things with technology', next: 'tech-flavor' },
        { label: 'Organizing people and keeping projects moving', next: 'outcome:pm' },
        { label: 'Visual design and branding', next: 'outcome:designer' },
        { label: 'Talking with people and helping them directly', next: 'people-flavor' },
      ],
    },
    {
      id: 'tech-flavor',
      prompt: 'Which sounds more like you?',
      options: [
        {
          label: 'Websites: HTML/CSS, Git, or eager to learn them',
          next: 'outcome:webmaster',
        },
        {
          label: 'Systems: accounts, email, security settings',
          next: 'outcome:m365',
        },
        {
          label: 'Not sure — I want to try a small task first',
          next: 'outcome:contributor',
        },
      ],
    },
    {
      id: 'people-flavor',
      prompt: 'With a brand-new charity, would you rather…',
      options: [
        {
          label: 'Be their first contact and guide them into the program',
          next: 'outcome:coordinator',
        },
        {
          label: 'Manage their whole journey from application to launched website',
          next: 'outcome:pm',
        },
      ],
    },
  ],
  outcomes: [
    {
      id: 'webmaster',
      title: 'You’re a Webmaster',
      body: 'Build and maintain real charity websites on the FFC template stack (Next.js + GitHub). 2–5 hours a week, training provided, and every site you touch is live for a real organization.',
      links: [
        { label: 'Webmaster role details', href: '/volunteer-roles/' },
        { label: 'Start volunteering', href: '/volunteer/' },
      ],
    },
    {
      id: 'm365',
      title: 'You’re a Microsoft 365 Administrator',
      body: 'Stand up free nonprofit email tenants, configure DNS, and enforce MFA. FFC sponsors the AB-900 certification exam as you learn.',
      links: [
        { label: 'M365 admin role details', href: '/volunteer-roles/' },
        { label: 'Start volunteering', href: '/volunteer/' },
      ],
    },
    {
      id: 'pm',
      title: 'You’re an IT Project Manager',
      body: 'Shepherd a handful of charities from application to launch: chase content, coordinate volunteers, keep timelines honest. No coding required — follow-through is the superpower.',
      links: [
        { label: 'PM role details', href: '/volunteer-roles/' },
        { label: 'Start volunteering', href: '/volunteer/' },
      ],
    },
    {
      id: 'designer',
      title: 'You’re a Graphic Designer',
      body: 'Logos, banners, and site imagery for charities that could never afford design work. Project-based — a few hours per charity, and a public portfolio of shipped nonprofit brands.',
      links: [
        { label: 'Designer role details', href: '/volunteer-roles/' },
        { label: 'Start volunteering', href: '/volunteer/' },
      ],
    },
    {
      id: 'coordinator',
      title: 'You’re a Charity Onboarding Coordinator',
      body: 'Be the human face of FFC: first conversations with applying charities, validation checks, and warm handoffs. 1–3 hours a week of genuinely appreciated work.',
      links: [
        { label: 'Coordinator role details', href: '/volunteer-roles/' },
        { label: 'Start volunteering', href: '/volunteer/' },
      ],
    },
    {
      id: 'contributor',
      title: 'Start with one pull request',
      body: 'No commitment needed: pick a “good first issue” in our open-source repos and ship something small for a real charity today. If it feels good, a role will find you.',
      links: [
        { label: 'Contribute on GitHub', href: '/contribute/' },
        { label: 'Volunteer onboarding guide', href: '/volunteer-onboarding-guide/' },
      ],
    },
  ],
}

export default function VolunteerQuiz() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-4">
          Which Volunteer Role Fits You?
        </h1>
        <p className="font-[var(--font-lato)] text-[18px] leading-[28px] text-[#555] mb-8">
          One minute, no wrong answers. Every role helps real charities — this just finds the one
          you&rsquo;ll enjoy. (Prefer to browse? See all{' '}
          <Link href="/volunteer-roles/" className="text-[#0567B1] underline">
            volunteer roles
          </Link>
          .)
        </p>
        <DecisionWizard config={config} />
      </div>
    </div>
  )
}
