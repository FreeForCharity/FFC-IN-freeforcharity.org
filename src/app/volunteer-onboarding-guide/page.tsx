import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Volunteer Onboarding: Your First Two Weeks',
  description:
    'The technical volunteer ramp-up at Free For Charity: accounts, the repo landscape, how a charity site goes live, communication norms, and your guaranteed first task.',
  alternates: { canonical: '/volunteer-onboarding-guide/' },
}

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

export default function VolunteerOnboardingGuide() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Your First Two Weeks as an FFC Technical Volunteer
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Welcome! Your most motivated weeks are your first ones, so this guide gets you from
            &ldquo;accepted&rdquo; to &ldquo;shipped something for a real charity&rdquo; fast. It
            complements the{' '}
            <Link href="/ffc-volunteer-proving-ground-core-competencies/">
              proving-ground competency modules
            </Link>{' '}
            (the what-to-learn); this is the how-things-work.
          </p>

          <h2 className={h2}>Week 1 — accounts and the lay of the land</h2>
          <ul>
            <li>
              <strong>GitHub:</strong> you&rsquo;ll be added to the FreeForCharity organization.
              Everything ships through pull requests — nothing lands on <code>main</code> directly.
            </li>
            <li>
              <strong>The repo landscape:</strong> the main site (freeforcharity.org), the charity{' '}
              <em>site templates</em> (single-page and footer-only — the starting point for every
              new charity site), and the automation repo (infrastructure workflows). Each
              repo&rsquo;s README and CONTRIBUTING tell you its rules.
            </li>
            <li>
              <strong>Conventions that reviewers will hold you to:</strong> Conventional Commit
              messages (<code>feat:</code>, <code>fix:</code>, <code>docs:</code>…), kebab-case
              folder names, accessibility checks passing, and CI green before merge.
            </li>
          </ul>

          <h2 className={h2}>How a charity site actually goes live</h2>
          <ol>
            <li>A charity finishes validation and onboarding (a PM owns this).</li>
            <li>The template repo is instantiated for the charity.</li>
            <li>You customize content, imagery, and branding via PRs.</li>
            <li>
              The site deploys automatically to static hosting; DNS points the charity&rsquo;s
              domain at it.
            </li>
            <li>Handoff: the charity learns how to request changes; you may stay its webmaster.</li>
          </ol>

          <h2 className={h2}>Communication norms</h2>
          <ul>
            <li>
              Work coordination happens in GitHub issues — decisions belong in writing, on the
              issue.
            </li>
            <li>
              Say what you&rsquo;re picking up before you start (comment on the issue), and un-claim
              loudly if life happens. Silence is the only real failure mode.
            </li>
            <li>
              Charity contact goes through the PM/coordinator unless you&rsquo;re told otherwise.
            </li>
          </ul>

          <h2 className={h2}>Your guaranteed first task</h2>
          <p>
            Look for issues labeled <strong>good first issue</strong> in the FreeForCharity
            repositories — they&rsquo;re real, scoped, and reviewed kindly. The{' '}
            <Link href="/contribute/">contribute page</Link> explains the label convention and links
            to the repos. Ship one small PR in week one, even a documentation fix: the point is to
            walk the whole path (branch → PR → review → merge) while stakes are low.
          </p>

          <h2 className={h2}>Week 2 — take a real slice</h2>
          <ul>
            <li>Pair with the volunteer who onboarded you on one charity task end-to-end.</li>
            <li>
              Pick your track: webmaster, M365 admin, PM (see{' '}
              <Link href="/volunteer-roles/">roles</Link>) — and tell us, so training (including
              sponsored certification exams) points the right way.
            </li>
            <li>
              Add yourself where volunteers are credited, if you wish — recognition is opt-in.
            </li>
          </ul>

          <p className="mt-8">
            Stuck on anything — access, tooling, or just &ldquo;what now?&rdquo; —{' '}
            <Link href="/contact-us/">say so early</Link>. Unblocking volunteers is the fastest
            charity-serving work we do.
          </p>
        </div>
      </div>
    </div>
  )
}
