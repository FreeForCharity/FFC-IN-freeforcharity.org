import React from 'react'
import Transparentbtn from '@/components/ui/Transparentbtn'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'

// Free For Charity's Idealist presence. The general board lists every live
// opportunity; specific postings are linked where they exist.
const IDEALIST_BOARD =
  'https://www.idealist.org/en/nonprofit/356bfc8e2ae64f83beea4a4e677e99d7-free-for-charity-state-college#opportunities'
const IDEALIST_WEB_DEVELOPER =
  'https://www.idealist.org/en/volunteer-opportunity/c3d5f8b143224d4dbe7074d138a63370-charity-web-developer-state-college-pa-free-for-charity-state-college'
const IDEALIST_RECRUITER =
  'https://www.idealist.org/en/volunteer-opportunity/685f715b4d294936898237da5d2649a6-volunteer-recruiter-and-onboarding-manager-state-college-pa-free-for-charity-state-college'

// Established volunteer roles beyond the featured Web Developer track. Each
// links to its FFC Admin detail page (`adminPath`, null where one doesn't exist
// yet) and an Idealist application (`idealistUrl` — a specific posting where
// one exists, otherwise the general board until a posting is created).
const volunteerRoles: {
  title: string
  blurb: string
  adminPath: string | null
  idealistUrl: string
}[] = [
  {
    title: 'Microsoft 365 Administrator',
    blurb:
      'Run email, identity, and security for charities—and earn your MS-900 (FFC sponsors the exam).',
    adminPath: '/volunteer/microsoft-365-admin/',
    idealistUrl: IDEALIST_BOARD,
  },
  {
    title: 'Google Workspace Administrator',
    blurb:
      'Provision users, drives, and security controls, and support charity staff across Google Workspace.',
    adminPath: '/volunteer/google-workspace-admin/',
    idealistUrl: IDEALIST_BOARD,
  },
  {
    title: 'Data & Analytics',
    blurb:
      'Measure impact with consent-gated analytics, dashboards, and on-page SEO alongside the web team.',
    adminPath: '/volunteer/data-analytics/',
    idealistUrl: IDEALIST_BOARD,
  },
  {
    title: 'Canva Designer',
    blurb:
      'Create brand kits, social templates, and marketing collateral for nonprofits with Canva Pro.',
    adminPath: '/volunteer/canva-designer/',
    idealistUrl: IDEALIST_BOARD,
  },
  {
    title: 'Volunteer Recruiter & Onboarding Manager',
    blurb:
      'Manage FFC’s volunteer pipeline: post opportunities, screen applicants, and onboard new volunteers.',
    // FFC Admin detail page pending; the role details live on the Idealist posting for now.
    adminPath: null,
    idealistUrl: IDEALIST_RECRUITER,
  },
  {
    title: 'Military Volunteers (MOVSM)',
    blurb:
      'Serving or a veteran? Contribute in any FFC role and track hours toward MOVSM recognition.',
    adminPath: '/volunteer/military-volunteers/',
    idealistUrl: IDEALIST_BOARD,
  },
]

const Index = () => {
  return (
    <div className="w-full pt-[60px] pb-[40px] bg-[#FCFCFC]">
      {/* Main Content Container */}
      <div className="w-full max-w-[90%] md:max-w-[80%] py-4 mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-[30px] md:text-[40px] font-[700] leading-[44px] text-[#b35000] mb-[20px]">
            Free For Charity Volunteer Options
          </h1>
          <p className="text-[18px] font-[500] text-black pb-[1em]" data-font="lato-font">
            Free For Charity is always looking for motivated and skilled people from around the US
            to help guide and participate in our training programs and direct support to charities.
          </p>
          <p className="text-[18px] font-[700] text-black mb-[50px]" data-font="lato-font">
            You can help in the following ways:
          </p>
        </div>

        {/* Callout Box */}
        <div className="bg-[#2D7F87] py-[20px] md:py-[40px] md:px-[60px]  px-[30px] flex flex-col items-center justify-center text-center">
          <h1
            className="text-[26px] font-[500] leading-[26px] text-white pb-[10px]"
            data-font="aria-font"
          >
            IMPORTANT: A Prerequisite for All Applicants
          </h1>
          <p
            className="text-[14px] font-[500] leading-[24px] text-white pb-[1em]"
            data-font="aria-font"
          >
            To ensure the highest standards of security and competence for the non-profits we serve,
            all prospective volunteers must first complete our{' '}
            <span className="font-[700]">Core Competencies Training Program.</span> This mandatory
            first step is our “proving ground” and ensures you have the foundational skills needed
            to succeed.
          </p>
          <p
            className="text-[14px] font-[500] leading-[24px] text-white pb-[20px]"
            data-font="aria-font"
          >
            After you have successfully completed the training and received your certificate, you
            may then apply for one of the specific roles listed below.
          </p>
          <Transparentbtn
            text="Click Here to Start the Core Competencies Training"
            href="/ffc-volunteer-proving-ground-core-competencies/"
            color="#fff"
          />
        </div>
      </div>

      {/* Volunteer Roles We're Seeking */}
      <div className="w-full max-w-[90%] md:max-w-[80%] mx-auto pt-[20px] pb-[20px]">
        <div className="text-center mb-[40px]">
          <h2 className="text-[28px] md:text-[36px] font-[700] leading-[40px] text-[#b35000] mb-[14px]">
            Volunteer Roles We&rsquo;re Seeking
          </h2>
          <p
            className="text-[18px] font-[500] leading-[28px] text-black max-w-[820px] mx-auto"
            data-font="lato-font"
          >
            Our biggest need is building free charity websites with AI development agents&mdash;but
            we staff every part of a nonprofit&rsquo;s technology: Microsoft 365 and Google
            Workspace administration, data &amp; analytics, design, and the people who recruit and
            onboard volunteers. Every role has full details on the FFC Admin portal and an
            application on Idealist. Pick the one that fits you&mdash;then complete the Core
            Competencies prerequisite above to get started.
          </p>
        </div>

        {/* Featured: AI-assisted web development (our largest workflow) */}
        <div className="bg-[#2A6682] rounded-[20px] p-8 text-white mb-[24px]">
          <span className="inline-block text-[13px] font-[700] uppercase tracking-wider bg-white text-[#2A6682] px-[12px] py-[4px] rounded-full mb-[14px]">
            Most needed
          </span>
          <h3 className="text-[26px] font-[700] mb-[10px]" data-font="lato-font">
            AI-Assisted Web Developers
          </h3>
          <p className="text-[16px] font-[500] leading-[26px] mb-[20px]" data-font="lato-font">
            Build fast, secure GitHub Pages websites for nonprofits using AI development agents
            (Claude and GitHub Copilot) with Next.js, React, and Tailwind CSS. This is our largest
            and fastest-growing volunteer workflow&mdash;every site you help ship puts another
            charity online for free.
          </p>
          <div className="flex flex-wrap gap-x-[24px] gap-y-[12px] items-center">
            <a
              href={IDEALIST_WEB_DEVELOPER}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[8px] rounded-[10px] bg-white px-[24px] py-[10px] text-[16px] font-[700] text-[#2A6682] transition-opacity hover:opacity-90"
              data-font="lato-font"
            >
              <span>Apply on Idealist</span>
              <span aria-hidden="true">&rarr;</span>
              <span className="sr-only">(opens Idealist in a new tab)</span>
            </a>
            <a
              href={ffcAdminUrl('/volunteer/web-developer/')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[8px] text-[16px] font-[600] text-white underline-offset-4 hover:underline"
              data-font="lato-font"
            >
              <span>Position details on FFC Admin</span>
              <span aria-hidden="true">&rarr;</span>
              <span className="sr-only">(opens FFC Admin in a new tab)</span>
            </a>
            <a
              href={ffcAdminUrl(adminLinks['developer-environment-setup'].newModel)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[8px] text-[16px] font-[600] text-white underline-offset-4 hover:underline"
              data-font="lato-font"
            >
              <span>Set up your AI dev environment</span>
              <span aria-hidden="true">&rarr;</span>
              <span className="sr-only">(opens FFC Admin in a new tab)</span>
            </a>
          </div>
        </div>

        {/* The rest of the established roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {volunteerRoles.map((role) => (
            <div
              key={role.title}
              className="flex flex-col bg-white rounded-[20px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.08)] p-6"
            >
              <h3 className="text-[22px] font-[700] text-[#1D6E90] mb-[10px]" data-font="lato-font">
                {role.title}
              </h3>
              <p
                className="text-[16px] font-[500] leading-[26px] text-[#333] mb-[18px] grow"
                data-font="lato-font"
              >
                {role.blurb}
              </p>
              <div className="flex flex-wrap gap-x-[20px] gap-y-[8px]">
                {role.adminPath ? (
                  <a
                    href={ffcAdminUrl(role.adminPath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[6px] text-[15px] font-[600] text-[#1D6E90] hover:underline"
                    data-font="lato-font"
                  >
                    <span>Position details on FFC Admin</span>
                    <span aria-hidden="true">&rarr;</span>
                    <span className="sr-only">(opens FFC Admin in a new tab)</span>
                  </a>
                ) : null}
                <a
                  href={role.idealistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[6px] text-[15px] font-[600] text-[#b35000] hover:underline"
                  data-font="lato-font"
                >
                  <span>Apply on Idealist</span>
                  <span aria-hidden="true">&rarr;</span>
                  <span className="sr-only">(opens Idealist in a new tab)</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-[720px] mx-auto mt-[28px]">
          <AdminGuideLink
            href={ffcAdminUrl(adminLinks['contributor-ladder'].newModel)}
            label="See the FFC contributor ladder"
            description="Wondering how volunteers grow into bigger roles? Follow the contributor ladder on the FFC Admin portal."
          />
        </div>
      </div>

      {/* Two-Column Section - Responsive */}
      <div className="w-full max-w-[90%] mx-auto py-[3%] flex flex-col md:flex-row gap-8 md:gap-0">
        {/* Left Column */}
        <div className="w-full md:w-[47%] md:mr-[5.5%]">
          <h1 className="text-[28px] font-[700] leading-[31px] text-[#b35000]">
            You can create a measurable impact to the success of charities nation wide with your
            donation or volunteer hours.
          </h1>
          <p
            className="text-[18px] font-[500] leading-[27px] mb-[5.82%] mt-[20px]"
            data-font="lato-font"
          >
            Every organizations success ultimately falls down to how much support the organization
            received for its causes. Here at Free For Charity it is our mission to provide world
            class training programs that at the same time help charities throughout the United
            States.
          </p>
          <h1 className="text-[28px] font-[700] leading-[31px] text-[#b35000]">
            We cannot do the work we do without your support.
          </h1>
          <p
            className="text-[18px] font-[500] leading-[27px] pb-[1em] mt-[20px]"
            data-font="lato-font"
          >
            From the day to day costs of running servers, websites, and paying for software to
            support our training programs; Free For Charity can always put to good use your
            donation. Consider your options to donate today.
          </p>
          <p className="text-[18px] font-[500] leading-[27px] mb-[5.82%]" data-font="lato-font">
            In addition to financial support, Free For Charity also needs community support through{' '}
            <a href="/volunteer/" className="text-[#0567B1]">
              skilled volunteers
            </a>{' '}
            and gifts in kind (such as services or products sold by your business). Take a look at
            the volunteer opportunities today.
          </p>
        </div>

        {/* Right Column - Button */}
        <div>
          <a
            href="https://www.idealist.org/en/nonprofit/356bfc8e2ae64f83beea4a4e677e99d7-free-for-charity-state-college#opportunities"
            className="inline-block px-6 py-3 text-[16px] font-bold text-white bg-[#0056B3] rounded-md text-center no-underline transition-colors duration-300 ease-in-out hover:bg-[#004494]"
            data-font="aria-font"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Our Volunteer Opportunities on Idealist
          </a>
        </div>
      </div>
    </div>
  )
}

export default Index
