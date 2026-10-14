import React from 'react'
import Link from 'next/link'
import GuideLink from '@/components/ui/GuideLink'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'

const guide = (key: keyof typeof adminLinks) => ffcAdminUrl(adminLinks[key].newModel)

const IRS_EIN_URL =
  'https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online'

/**
 * What the Pre-501(c)(3) Charity Onboarding application (WHMCS pid 16) asks
 * for, split into required and optional. Mirrors the live form as changed on
 * 2026-10-14; the field-by-field guide on FFC Admin is the detailed reference.
 */
const ApplicationChecklist = () => {
  return (
    <section
      id="before-you-apply"
      aria-labelledby="before-you-apply-heading"
      className="bg-[#FCFCFC] pb-[50px] scroll-mt-[120px]"
    >
      <div className="w-[90%] mx-auto">
        <h2
          id="before-you-apply-heading"
          className="text-[#b35000] text-[28px] font-[700] mb-[15px] text-center"
        >
          Before You Apply: What the Application Asks For
        </h2>
        <p className="text-[18px] font-[500] text-black mb-[20px]" data-font="lato-font">
          Have all of this ready before you start. Your application also collects your website
          content, so we can build your site right after approval.
        </p>

        <h3 className="text-[20px] font-[700] text-[#333] mb-[10px]" data-font="lato-font">
          Required on the pre-501(c)(3) application
        </h3>
        <ol
          className="text-[16px] font-[500] text-[#4A4A44] list-decimal list-outside space-y-3 pl-5 mb-[24px]"
          data-font="lato-font"
        >
          <li>
            Your organization&rsquo;s legal name, exactly as it appears on your state filing. Enter
            it in the Company Name box when you create your account, too.
          </li>
          <li>
            Your EIN (Employer Identification Number). Don&rsquo;t have one yet? You can{' '}
            <GuideLink href={IRS_EIN_URL}>get a free EIN from the IRS online</GuideLink>, or enter
            NONE on the application for now and we can help you get one.
          </li>
          <li>Your organization&rsquo;s legal status</li>
          <li>
            Your mission in one or two plain sentences, and the year you were founded or began
            operating (see the{' '}
            <Link
              href="/pre501c3/help/mission-statement/"
              className="text-[#0567B1] underline font-medium"
            >
              mission statement guide
            </Link>
            )
          </li>
          <li>
            Your Candid (GuideStar) profile link (see our{' '}
            <Link href="/guidestar-guide/" className="text-[#0567B1] underline font-medium">
              GuideStar Guide
            </Link>{' '}
            and the <GuideLink href={guide('candid')}>Candid guide</GuideLink>)
          </li>
          <li>
            Your group&rsquo;s Facebook Page and LinkedIn Page (organization Pages, not personal
            profiles; see the{' '}
            <GuideLink href={guide('facebook-page')}>Facebook Page guide</GuideLink> and the{' '}
            <GuideLink href={guide('linkedin-page')}>LinkedIn Page guide</GuideLink>)
          </li>
          <li>The names and roles of at least three team members</li>
          <li>
            A working LinkedIn profile link for your Chair, Secretary and Treasurer. The profile
            doesn&rsquo;t need much public information, but it must exist and the link must open.
            Creating one is free (see the{' '}
            <GuideLink href={guide('linkedin-profile')}>LinkedIn profile guide</GuideLink>).
          </li>
          <li>
            The names of your Chair, Secretary and Treasurer as they should appear on your website,
            plus the consent tickbox. We can&rsquo;t accept your application unless all three agree
            to appear.
          </li>
          <li>The phone number you want us to reach you at, and the best time to call</li>
          <li>
            Your website maintainer&rsquo;s GitHub username. We invite this account to your
            site&rsquo;s repository so your maintainer can edit it (see the{' '}
            <GuideLink href={guide('github-account')}>free GitHub account guide</GuideLink>).
          </li>
          <li>
            A public phone number, email and city/state for your website footer. A free{' '}
            <GuideLink href={guide('google-voice')}>Google Voice number</GuideLink> and a free
            outlook.com address both work. City and state only, never a home address.
          </li>
          <li>
            Your current or desired domain name (for example, yourgroup.org), whether you already
            have a domain, whether you have web hosting, and who your hosting provider is
          </li>
          <li>
            Your website content: your template choice (or &ldquo;Not sure&rdquo; and we&rsquo;ll
            recommend one), a tagline, a one- or two-sentence site description, a short description
            under 200 characters, and your first program&rsquo;s title and description (see the{' '}
            <GuideLink href={guide('website-templates')}>website templates guide</GuideLink>)
          </li>
          <li>
            Whether you&rsquo;ve been approved by{' '}
            <GuideLink href={guide('techsoup')}>TechSoup</GuideLink>, and whether you have a
            business email provider (and which one)
          </li>
          <li>
            Agreement to our{' '}
            <Link href="/terms-of-service/" className="text-[#0567B1] underline font-medium">
              Terms of Service
            </Link>
            , confirmation that you&rsquo;re a US organization, and two short questions about AI
            tools (if you don&rsquo;t use AI tools yet, just say so)
          </li>
        </ol>

        <h3 className="text-[20px] font-[700] text-[#333] mb-[10px]" data-font="lato-font">
          Optional for pre-501(c)(3) groups
        </h3>
        <ul
          className="text-[16px] font-[500] text-[#4A4A44] list-disc list-outside space-y-2 pl-5"
          data-font="lato-font"
        >
          <li>
            Your Zeffy donation form link and Idealist volunteer page link. Add them if you can.
            They&rsquo;re optional only for groups that can&rsquo;t get them yet, and required once
            you apply as a 501(c)(3) (see the{' '}
            <GuideLink href={guide('zeffy')}>Zeffy guide</GuideLink> and the{' '}
            <GuideLink href={guide('idealist')}>Idealist guide</GuideLink>).
          </li>
          <li>Your Candid full-profile link</li>
          <li>LinkedIn links for your team members, and up to two more team members</li>
          <li>Other names or abbreviations your group goes by</li>
          <li>A second and third program</li>
          <li>Other leaders to show on your website (only with their agreement)</li>
          <li>Instagram, X and YouTube links</li>
          <li>
            Your current website or page, including free sites without their own domain (such as
            Canva, brand.page, Wix or Google Sites)
          </li>
          <li>Your domain registrar, if you already own your domain</li>
          <li>SEO keywords and a brand color</li>
          <li>
            A link to your logo. No link? After your site is created, your maintainer gets a first
            &ldquo;Add your logo&rdquo; issue on GitHub and uploads it there.
          </li>
        </ul>
      </div>
    </section>
  )
}

export default ApplicationChecklist
