import { pageMetadata } from '@/lib/page-metadata'
import React from 'react'
import { ffcAdminUrl } from '@/data/admin-links'

export const metadata = pageMetadata({
  title: 'FFC Admin — the technical backbone',
  description:
    'FFC Admin (ffcadmin.org) is the technical and automation backbone of Free For Charity: the developer environment, automation, training, site management, guides, and runbooks that build and maintain every charity website. Use this map to jump straight into a section.',
  canonical: '/ffcadmin/',
  noindex: true,
})

interface AdminSection {
  title: string
  /** ffcadmin.org section index path. */
  href: string
  blurb: string
  links: { label: string; path: string }[]
}

const sections: AdminSection[] = [
  {
    title: 'Start here',
    href: '/',
    blurb: 'What Free For Charity delivers, who it is for, and how to get involved.',
    links: [
      { label: 'What FFC delivers', path: '/what-ffc-delivers/' },
      { label: 'Get involved', path: '/get-involved/' },
      { label: 'Charity prerequisites', path: '/charity-prerequisites/' },
      { label: 'Roadmap', path: '/roadmap/' },
    ],
  },
  {
    title: 'Developer & automation',
    href: '/automation/',
    blurb: 'The engine room: the dev environment, tech stack, and automation that build the sites.',
    links: [
      { label: 'Developer environment setup', path: '/developer-environment-setup/' },
      { label: 'Tech stack', path: '/tech-stack/' },
      { label: 'Automation', path: '/automation/' },
      { label: 'Testing', path: '/testing/' },
      { label: 'Documentation', path: '/documentation/' },
    ],
  },
  {
    title: 'Sites management',
    href: '/sites-list/',
    blurb: 'Every charity site FFC runs, tracked through development, maintenance, and migration.',
    links: [
      { label: 'Sites list', path: '/sites-list/' },
      { label: 'In development', path: '/sites-list/development/' },
      { label: 'In maintenance', path: '/sites-list/maintenance/' },
      { label: 'Migrations', path: '/sites-list/migration/' },
    ],
  },
  {
    title: 'Volunteer',
    href: '/volunteer/',
    blurb: 'The roles volunteers fill to build and run the platform.',
    links: [
      { label: 'Web developer', path: '/volunteer/web-developer/' },
      { label: 'Microsoft 365 admin', path: '/volunteer/microsoft-365-admin/' },
      { label: 'Google Workspace admin', path: '/volunteer/google-workspace-admin/' },
      { label: 'Data analytics', path: '/volunteer/data-analytics/' },
      { label: 'Canva designer', path: '/volunteer/canva-designer/' },
    ],
  },
  {
    title: 'Training & recognition',
    href: '/training/',
    blurb: 'Structured learning paths, continuing-education credits, and the contributor ladder.',
    links: [
      { label: 'Training', path: '/training/' },
      { label: 'Training plan', path: '/training-plan/' },
      { label: 'Continuing education', path: '/continuing-education/' },
      { label: 'Contributor ladder', path: '/contributor-ladder/' },
      { label: 'Recognition', path: '/recognition/' },
    ],
  },
  {
    title: 'Guides',
    href: '/guides/',
    blurb:
      'Step-by-step how-tos, from building a site to accounts, security, and productivity tools.',
    links: [
      {
        label: 'Build a charity site from the template',
        path: '/guides/build-charity-site-from-template/',
      },
      { label: 'WordPress → Next.js migration', path: '/guides/wordpress-to-nextjs-guide/' },
      { label: 'Microsoft 365 email', path: '/guides/microsoft-365-email/' },
      { label: 'Candid (GuideStar) seal', path: '/guides/candid/' },
      { label: 'Multi-factor authentication', path: '/guides/multi-factor-authentication/' },
    ],
  },
  {
    title: 'Site owner',
    href: '/site-owner/',
    blurb: 'For the charities whose sites are live: accept your invite and make everyday edits.',
    links: [
      { label: 'Accept your invitation', path: '/site-owner/accept-invitation/' },
      { label: 'Common edits', path: '/site-owner/common-edits/' },
      { label: 'Site owner training', path: '/site-owner/training/' },
    ],
  },
  {
    title: 'Intake help',
    href: '/intake-help/',
    blurb: 'What a charity needs to prepare during onboarding — the details we collect and why.',
    links: [
      { label: 'Getting 501(c)(3)', path: '/intake-help/getting-501c3/' },
      { label: '501(c)(3) application', path: '/intake-help/501c3-application/' },
      { label: 'Mission statement', path: '/intake-help/mission-statement/' },
      { label: 'GuideStar / Candid', path: '/intake-help/guidestar-candid/' },
    ],
  },
  {
    title: 'Legacy WordPress admin',
    href: '/legacy-wordpress-administration/',
    blurb: 'Runbooks for the legacy WordPress/cPanel stack still used by some existing sites.',
    links: [
      { label: 'Legacy administration home', path: '/legacy-wordpress-administration/' },
      {
        label: 'cPanel backup SOP',
        path: '/legacy-wordpress-administration/wordpress-cpanel-backup-sop/',
      },
      {
        label: 'Escalation runbook',
        path: '/legacy-wordpress-administration/wordpress-escalation-runbook/',
      },
    ],
  },
]

const AdminCard = ({ section }: { section: AdminSection }) => (
  <div className="bg-white rounded-[12px] border border-[#e6edf3] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.08)] p-[24px]">
    <a
      href={ffcAdminUrl(section.href)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-[8px] text-[20px] font-[700] text-[#1a2e35] hover:text-[#0567B1]"
    >
      <span>{section.title}</span>
      <span aria-hidden="true">→</span>
    </a>
    <p className="mt-[8px] mb-[16px] text-[15px] leading-[23px] text-[#555]">{section.blurb}</p>
    <ul className="space-y-[8px]">
      {section.links.map((link) => (
        <li key={link.path}>
          <a
            href={ffcAdminUrl(link.path)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-[8px] text-[15px] font-[500] text-[#0567B1] hover:underline underline-offset-4"
          >
            <span aria-hidden="true" className="text-[#9aa8b3]">
              ›
            </span>
            <span>{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
)

export default function FfcAdmin() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[linear-gradient(135deg,_#0b2740_0%,_#0567B1_100%)] text-white">
        <div className="w-[90%] max-w-[1100px] mx-auto pt-[150px] pb-[70px]">
          <span className="inline-block mb-[18px] rounded-full bg-white/15 px-[16px] py-[6px] text-[13px] font-[700] uppercase tracking-[1.5px]">
            ffcadmin.org
          </span>
          <h1 className="mb-[20px] max-w-[820px] text-[38px] md:text-[52px] font-[700] leading-[46px] md:leading-[60px]">
            The technical backbone that runs Free For Charity
          </h1>
          <p className="max-w-[760px] text-[18px] md:text-[20px] font-[400] leading-[29px] text-white/90">
            FFC Admin is the operational core of the whole system. It holds the developer
            environment, the automation, the training, the site-by-site management, and the
            step-by-step runbooks that build and maintain every charity website we deliver. This
            page is your map into it.
          </p>
          <div className="mt-[30px]">
            <a
              href={ffcAdminUrl('/')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-[10px] rounded-[10px] bg-white px-[28px] py-[15px] text-[17px] font-[700] text-[#0567B1] transition-transform duration-200 hover:scale-[1.03]"
            >
              <span>Go to the FFC Admin portal</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* What it is — the backbone */}
      <section className="w-[90%] max-w-[1100px] mx-auto py-[56px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[28px]">
          <div>
            <h2 className="mb-[10px] text-[20px] font-[700] text-[#1a2e35]">One source of truth</h2>
            <p className="text-[16px] leading-[26px] text-[#555]">
              Every workflow, standard, and guide lives on ffcadmin.org — so freeforcharity.org can
              stay focused on charities and donors while the how-it-works detail stays in one place.
            </p>
          </div>
          <div>
            <h2 className="mb-[10px] text-[20px] font-[700] text-[#1a2e35]">
              Automation &amp; AI-driven builds
            </h2>
            <p className="text-[16px] leading-[26px] text-[#555]">
              The developer environment, tech stack, and automation that let volunteers build fast,
              secure charity sites with AI development agents are all documented and maintained
              here.
            </p>
          </div>
          <div>
            <h2 className="mb-[10px] text-[20px] font-[700] text-[#1a2e35]">
              Training &amp; runbooks
            </h2>
            <p className="text-[16px] leading-[26px] text-[#555]">
              Volunteer roles, learning paths, the contributor ladder, and the operational runbooks
              that keep every site online — the backbone that makes free, sustainable delivery work.
            </p>
          </div>
        </div>
      </section>

      {/* Sitemap-style section grid */}
      <section className="bg-[#F5F8FB] py-[56px]">
        <div className="w-[90%] max-w-[1100px] mx-auto">
          <div className="text-center max-w-[720px] mx-auto mb-[40px]">
            <h2 className="mb-[12px] text-[30px] font-[700] text-[#0567B1]">Jump into a section</h2>
            <p className="text-[17px] leading-[27px] text-[#555]">
              A map of the FFC Admin portal. Pick a section to open it directly on ffcadmin.org.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {sections.map((section) => (
              <AdminCard key={section.href + section.title} section={section} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-[90%] max-w-[1100px] mx-auto py-[56px] text-center">
        <h2 className="mb-[14px] text-[26px] font-[700] text-[#1a2e35]">
          Ready to dive into the full portal?
        </h2>
        <a
          href={ffcAdminUrl('/')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-[10px] rounded-[10px] bg-[#0567B1] px-[28px] py-[15px] text-[17px] font-[700] text-white transition-colors hover:bg-[#045a9b]"
        >
          <span>Go to the FFC Admin portal</span>
          <span aria-hidden="true">→</span>
        </a>
      </section>
    </div>
  )
}
