import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'

export const metadata = pageMetadata({
  title: 'Volunteer Roles',
  description:
    'The five Free For Charity volunteer roles — webmaster, IT project manager, graphic designer, Microsoft 365 admin, onboarding coordinator — with skills, hours, and growth paths.',
  canonical: '/volunteer-roles/',
})

interface Role {
  title: string
  mission: string
  responsibilities: string[]
  skills: string
  hours: string
  growth: string
}

const roles: Role[] = [
  {
    title: 'Webmaster (charity websites)',
    mission: 'Build and maintain charity websites on the FFC template stack.',
    responsibilities: [
      'Build new charity sites from the FFC template (Next.js/GitHub)',
      'Ship content changes charities request',
      'Keep sites healthy: broken links, images, accessibility basics',
    ],
    skills:
      'Comfortable with HTML/CSS and Git, or willing to learn — the template and PR workflow do the heavy lifting.',
    hours: '2–5 hrs/week',
    growth:
      'Grow into the web-developer training track and real production experience across dozens of live sites.',
  },
  {
    title: 'IT Project Manager',
    mission: 'Shepherd charities from application to launch.',
    responsibilities: [
      'Run onboarding for a handful of charities at a time',
      'Chase content, coordinate volunteers, keep timelines honest',
      'Own the charity relationship through launch',
    ],
    skills: 'Organization and follow-through; no coding required.',
    hours: '2–4 hrs/week',
    growth: 'Portfolio-ready delivery experience across real organizations.',
  },
  {
    title: 'Graphic Designer',
    mission: 'Give small charities a visual identity they could never afford.',
    responsibilities: [
      'Logos, social banners, and site imagery for supported charities',
      'Template visual QA (spacing, imagery, brand consistency)',
    ],
    skills: 'Any modern design tool; a small portfolio (school projects count).',
    hours: 'Project-based, 2–6 hrs per charity',
    growth: 'A public portfolio of shipped nonprofit brands.',
  },
  {
    title: 'Microsoft 365 Administrator',
    mission: "Stand up each charity's free email and keep tenants secure.",
    responsibilities: [
      'Guide charities through the Microsoft nonprofit grant',
      'Create mailboxes, configure DNS, enforce MFA',
      'Troubleshoot mail flow issues',
    ],
    skills:
      'Basic IT literacy; FFC sponsors the AB-900 (Microsoft 365 Copilot and Agent Administration Fundamentals) certification exam.',
    hours: '2–4 hrs/week',
    growth: 'A sponsored Microsoft certification and real multi-tenant admin experience.',
  },
  {
    title: 'Charity Onboarding Coordinator',
    mission: 'Be the human face of FFC to brand-new charities.',
    responsibilities: [
      'First-contact conversations with applying organizations',
      'Validation checks (IRS status, Candid profile) and expectation-setting',
      'Hand off cleanly to the PM and technical volunteers',
    ],
    skills: 'Warmth, clear writing, and reliability.',
    hours: '1–3 hrs/week',
    growth: 'Nonprofit operations experience and the widest view of the whole program.',
  },
]

export default function VolunteerRoles() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-4">
          Volunteer Roles
        </h1>
        <p className="font-[var(--font-lato)] text-[18px] leading-[28px] text-[#555] mb-8">
          In 2025, a few dozen active volunteers supported roughly 250 nonprofits — every role below
          multiplies directly into charities served. Pick the one that fits, then start at the{' '}
          <Link href="/volunteer/" className="text-[#0567B1] underline">
            volunteer page
          </Link>
          .
        </p>

        <div className="space-y-6">
          {roles.map((role) => (
            <section key={role.title} className="border border-gray-200 rounded-lg p-6">
              <h2 className="font-[var(--font-faustina)] text-[26px] leading-[34px] mb-1">
                {role.title}
              </h2>
              <p className="font-[var(--font-lato)] text-[16px] italic text-[#555] mb-3">
                {role.mission}
              </p>
              <ul className="list-disc list-inside font-[var(--font-lato)] text-[16px] leading-[26px] text-[#555] mb-3">
                {role.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <dl className="font-[var(--font-lato)] text-[15px] leading-[24px] text-[#555]">
                <div>
                  <dt className="font-[700] inline">Skills: </dt>
                  <dd className="inline">{role.skills}</dd>
                </div>
                <div>
                  <dt className="font-[700] inline">Time: </dt>
                  <dd className="inline">{role.hours}</dd>
                </div>
                <div>
                  <dt className="font-[700] inline">What you gain: </dt>
                  <dd className="inline">{role.growth}</dd>
                </div>
              </dl>
            </section>
          ))}
        </div>

        <p className="font-[var(--font-lato)] text-[16px] leading-[26px] text-[#555] mt-8">
          Technical volunteer? Read the{' '}
          <Link href="/volunteer-onboarding-guide/" className="text-[#0567B1] underline">
            first-two-weeks onboarding guide
          </Link>{' '}
          — or skip the paperwork entirely and{' '}
          <Link href="/contribute/" className="text-[#0567B1] underline">
            contribute on GitHub today
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
