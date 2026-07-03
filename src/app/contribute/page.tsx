import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'

export const metadata = pageMetadata({
  title: 'Contribute on GitHub',
  description:
    'Free For Charity is built in the open. Pick up a good-first-issue in our repositories and help charities with a pull request — no formal signup required.',
  canonical: '/contribute/',
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

const repos = [
  {
    name: 'FFC-IN-freeforcharity.org',
    href: 'https://github.com/FreeForCharity/FFC-IN-freeforcharity.org',
    what: 'This website — content, components, accessibility, tests. The friendliest place to start.',
  },
  {
    name: 'FFC-IN-FFC_Single_Page_Template',
    href: 'https://github.com/FreeForCharity/FFC-IN-FFC_Single_Page_Template',
    what: 'The template every new charity site starts from — improvements here reach every future charity.',
  },
  {
    name: 'FFC-IN-Footer_Only_Template',
    href: 'https://github.com/FreeForCharity/FFC-IN-Footer_Only_Template',
    what: 'The minimal template (team + footer) for charities that just need a presence.',
  },
  {
    name: 'FFC-Cloudflare-Automation',
    href: 'https://github.com/FreeForCharity/FFC-Cloudflare-Automation',
    what: 'Infrastructure automation: DNS, metrics pipelines, operational workflows (PowerShell + GitHub Actions).',
  },
]

export default function Contribute() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Contribute on GitHub — Help Charities With a Pull Request
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Everything Free For Charity builds is open source. If you can open a pull request, you
            can help a nonprofit <em>today</em> — no application form, no meeting, no minimum
            commitment. Sustained contributors naturally grow into named{' '}
            <Link href="/volunteer-roles/">volunteer roles</Link> (with training and sponsored
            certifications), but the door in is just… a PR.
          </p>

          <h2 className={h2}>Where to contribute</h2>
          <ul>
            {repos.map((repo) => (
              <li key={repo.name}>
                <a href={repo.href} target="_blank" rel="noopener noreferrer">
                  <strong>{repo.name}</strong>
                </a>{' '}
                — {repo.what}
              </li>
            ))}
          </ul>

          <h2 className={h2}>Finding a first task</h2>
          <p>
            Issues labeled <strong>good first issue</strong> are scoped, self-contained, and
            reviewed kindly. Comment &ldquo;I&rsquo;ll take this&rdquo; on the issue before you
            start so nobody duplicates your work.
          </p>

          <h2 className={h2}>The house rules (reviewers will check these)</h2>
          <ul>
            <li>
              <strong>Conventional Commits:</strong> <code>feat:</code>, <code>fix:</code>,{' '}
              <code>docs:</code>, <code>test:</code>, <code>chore:</code> prefixes on commit
              messages.
            </li>
            <li>
              <strong>Branch + PR, never direct to main.</strong> Link your PR to its issue
              (&ldquo;Fixes #123&rdquo;).
            </li>
            <li>
              <strong>kebab-case</strong> for all web folder names (SEO + screen-reader friendly).
            </li>
            <li>
              <strong>Accessibility is enforced</strong> — jest-axe and WCAG scans run in CI, and
              PRs that fail them don&rsquo;t merge.
            </li>
            <li>
              <strong>Run the checks locally</strong> before pushing: lint, unit tests, build (each
              repo&rsquo;s README lists the commands).
            </li>
          </ul>

          <h2 className={h2}>Why this matters</h2>
          <p>
            A fix to a shared template ships to every charity built from it; a clearer guide page
            deflects dozens of support conversations. Small PRs here have unusually large blast
            radius — that&rsquo;s the fun of it. See the <Link href="/impact/">impact page</Link>{' '}
            for what the volunteer engine has produced so far.
          </p>

          <p className="mt-8">
            Ready for more than drive-by PRs? The{' '}
            <Link href="/volunteer-onboarding-guide/">volunteer onboarding guide</Link> shows what
            your first two weeks as a regular look like.
          </p>
        </div>
      </div>
    </div>
  )
}
