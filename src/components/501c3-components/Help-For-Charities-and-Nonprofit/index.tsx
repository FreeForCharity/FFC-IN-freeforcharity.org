import React from 'react'
import Link from 'next/link'
import AccordionItem from '@/components/ui/Accordian'
import GuideLink from '@/components/ui/GuideLink'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'

const guide = (key: keyof typeof adminLinks) => ffcAdminUrl(adminLinks[key].newModel)

const index = () => {
  return (
    <div className="bg-[#fcfcfc] pt-[60px] pb-[25px] w-full max-w-[100%]">
      <div className="w-[90%] max-w-[90%] mx-auto py-[2%] items-center">
        <h1 className="text-[#b35000] text-[28px] font-[700] mb-[15px] text-center">
          Free For Charity 501c3 Supported Charity Products and Services
        </h1>
        <div className="mt-[20px] mb-[2.5%]">
          <p className="text-[18px] font-[500] color-black pb-[1em]" data-font="lato-font">
            Free For Charity is a US based 501c3 charity for charities that provides other US based
            501(c)(3) organizations with free .org domain name registration, professional website
            design tools and templates, as well as ongoing website management and digital
            infrastructure services.
          </p>
          <p className="text-[18px] font-[500] color-black pb-[1em]" data-font="lato-font">
            Our mission is to empower charities with a strong digital presence, enabling them to
            effectively communicate their cause and engage supporters online.
          </p>
          <p className="text-[18px] font-[500] color-black" data-font="lato-font">
            By offering these essential services always at no cost, we ensure that even small
            non-profits can present themselves professionally in the digital world, enhancing their
            visibility and impact.
          </p>
        </div>

        <div className="mb-[70px]">
          <h1
            className="text-[26px] font-[500] color-[#333] text-center pb-[10px]"
            data-font="aria-font"
          >
            Before You Begin Onboarding
          </h1>
          <h3
            className="text-[14px] font-[700] underline text-center text-[#666] pb-[10px]"
            data-font="aria-font"
          >
            Have all of this ready before you start. Your application also collects your website
            content, so we can build your site right after approval.
          </h3>

          <h2 className="text-[16px] font-[700] text-[#333] mb-[8px]" data-font="aria-font">
            Required on the 501(c)(3) application
          </h2>
          <ol
            className="text-[14px] font-[500] text-[#666] list-decimal list-outside space-y-3 pl-5 mb-[1em]"
            data-font="aria-font"
          >
            <li>
              Your organization&rsquo;s legal name and legal status, exactly as they appear on your
              IRS 501(c)(3) determination letter. Enter the legal name in the Company Name box when
              you create your account, too.
            </li>
            <li>EIN (Employer Identification Number), in the format NN-NNNNNNN</li>
            <li>
              Your mission in one or two plain sentences, and the year you were founded (see the{' '}
              <GuideLink href={guide('mission-statement')}>mission statement guide</GuideLink>)
            </li>
            <li>
              Your Candid (GuideStar) public profile link and full-profile link, with at least the
              Bronze Seal of Transparency (see our{' '}
              <Link href="/guidestar-guide/" className="text-[#0567B1] underline font-medium">
                GuideStar Guide
              </Link>{' '}
              and the <GuideLink href={guide('candid')}>Candid guide</GuideLink>)
            </li>
            <li>
              Your charity&rsquo;s Facebook Page and LinkedIn Page (organization Pages, not personal
              profiles; see the{' '}
              <GuideLink href={guide('facebook-page')}>Facebook Page guide</GuideLink> and the{' '}
              <GuideLink href={guide('linkedin-page')}>LinkedIn Page guide</GuideLink>)
            </li>
            <li>
              Board officers: your Chair, Secretary and Treasurer, each with their own phone number,
              individual email, and a working LinkedIn profile link. The profile doesn&rsquo;t need
              much public information, but it must exist and the link must open. Creating one is
              free (see the{' '}
              <GuideLink href={guide('linkedin-profile')}>LinkedIn profile guide</GuideLink> and the{' '}
              <GuideLink href={guide('board-requirements')}>board requirements</GuideLink>).
            </li>
            <li>
              The names of your Chair, Secretary and Treasurer as they should appear on your
              website, plus the consent tickbox. We can&rsquo;t accept your application unless all
              three agree to appear.
            </li>
            <li>
              Primary and technical contacts: a LinkedIn profile, phone number and individual email
              for each, plus your time zone and best contact hours
            </li>
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
              Your website domain (for example, yourcharity.org) and whether you already own it
            </li>
            <li>
              Your website content: your template choice (or &ldquo;Not sure&rdquo; and we&rsquo;ll
              recommend one), a tagline, a one- or two-sentence site description, a short
              description under 200 characters, and your first program&rsquo;s title and description
              (see the{' '}
              <GuideLink href={guide('website-templates')}>website templates guide</GuideLink>)
            </li>
            <li>
              Your Zeffy donation form link. Zeffy is free, so your charity keeps 100% of donations
              (see the <GuideLink href={guide('zeffy')}>Zeffy guide</GuideLink>).
            </li>
            <li>
              Your Idealist volunteer page link (see the{' '}
              <GuideLink href={guide('idealist')}>Idealist guide</GuideLink>)
            </li>
            <li>
              Agreement to our{' '}
              <Link href="/terms-of-service/" className="text-[#0567B1] underline font-medium">
                Terms of Service
              </Link>
              , confirmation that you&rsquo;re a US organization, and two short questions about AI
              tools (&ldquo;none&rdquo; is a fine answer)
            </li>
          </ol>

          <h2
            className="text-[16px] font-[700] text-[#333] mt-[20px] mb-[8px]"
            data-font="aria-font"
          >
            Optional
          </h2>
          <ul
            className="text-[14px] font-[500] text-[#666] list-disc list-outside space-y-2 pl-5"
            data-font="aria-font"
          >
            <li>Other names or abbreviations your organization goes by</li>
            <li>A Vice Chair and a Member-at-Large</li>
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

        <AccordionItem number="1" title=" External Validation Preparation">
          <h1
            className="font-[700] text-[18px] text-[#4A4A44] pb-[1em] underline"
            data-font="lato-font"
          >
            Before proceeding, ensure your charity agrees to use and sets up:
          </h1>
          <ol
            className="text-[18px] font-[500] text-[#4A4A44] list-decimal list-outside pl-5 pb-[23px]"
            data-font="lato-font"
          >
            <li>
              A yourcharityname@outlook.com Email Address
              <ol className="list-decimal list-outside ml-8 mt-1 space-y-1 text-[#666]">
                <li>
                  Used to sign up for all other accounts until you have your professional email
                  address
                </li>
              </ol>
            </li>

            <li>
              An up-to-date Candid (GuideStar) profile
              <ol className="list-decimal list-outside ml-8 mt-1 space-y-1 text-[#666]">
                <li>
                  (Please read our{' '}
                  <Link
                    href="/guidestar-guide/"
                    className="text-[#0567B1] underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GuideStar Guide
                  </Link>
                  , we require charities to have at least the Bronze Seal of Transparency to receive
                  our services.)
                </li>
              </ol>
            </li>

            <li>
              A Verified Nonprofit Facebook Page
              <ol className="list-decimal list-outside ml-8 mt-1 space-y-1 text-[#666]">
                <li>
                  Used as an initial validation for your charity mission and used by other
                  validators as proof of existence (
                  <GuideLink href={guide('facebook-page')}>Facebook Page guide</GuideLink>).
                </li>
              </ol>
            </li>

            <li>
              A Verified Nonprofit LinkedIn Page
              <ol className="list-decimal list-outside ml-8 mt-1 space-y-1 text-[#666]">
                <li>
                  Used as an initial validation for your charity Team Members and used by other
                  validators as proof of existence (
                  <GuideLink href={guide('linkedin-page')}>LinkedIn Page guide</GuideLink>).
                </li>
              </ol>
            </li>

            <li>
              A personal LinkedIn profile for your Chair, Secretary and Treasurer
              <ol className="list-decimal list-outside ml-8 mt-1 space-y-1 text-[#666]">
                <li>
                  How we confirm your officers are real people. It doesn&rsquo;t need much public
                  information, but it must exist and the link must open (
                  <GuideLink href={guide('linkedin-profile')}>LinkedIn profile guide</GuideLink>).
                </li>
              </ol>
            </li>

            <li>
              A GitHub account for your website maintainer
              <ol className="list-decimal list-outside ml-8 mt-1 space-y-1 text-[#666]">
                <li>
                  Your site lives on GitHub; we invite this account so your maintainer can edit it (
                  <GuideLink href={guide('github-account')}>GitHub account guide</GuideLink>).
                </li>
              </ol>
            </li>

            <li>
              A Zeffy donation form
              <ol className="list-decimal list-outside ml-8 mt-1 space-y-1 text-[#666]">
                <li>
                  Used to accept donations on your website. Zeffy is free, so your charity keeps
                  100% (<GuideLink href={guide('zeffy')}>Zeffy guide</GuideLink>).
                </li>
              </ol>
            </li>

            <li>
              An Idealist profile (formerly VolunteerMatch)
              <ol className="list-decimal list-outside ml-8 mt-1 space-y-1 text-[#666]">
                <li>
                  Used to gain board members and volunteers with a widget from your website (
                  <GuideLink href={guide('idealist')}>Idealist guide</GuideLink>).
                </li>
              </ol>
            </li>

            <li>
              A TechSoup account and validation
              <ol className="list-decimal list-outside ml-8 mt-1 space-y-1 text-[#666]">
                <li>Used to gain many charity discounts including QuickBooks</li>
              </ol>
            </li>

            <li>
              A Goodstack (formerly Percent) verification
              <ol className="list-decimal list-outside ml-8 mt-1 space-y-1 text-[#666]">
                <li>
                  The validator Google for Nonprofits uses to confirm your nonprofit status, and the
                  one Canva, Zoom, OpenAI and many other tools use for nonprofit discounts. Register
                  at{' '}
                  <a
                    href="https://goodstack.io/"
                    className="text-[#0567B1] underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    goodstack.io
                  </a>{' '}
                  (see our{' '}
                  <Link
                    href="/google-for-nonprofits-guide/"
                    className="text-[#0567B1] underline font-medium"
                  >
                    Google for Nonprofits guide
                  </Link>
                  ).
                </li>
              </ol>
            </li>

            <li>
              A PayPal account for nonprofits
              <ol className="list-decimal list-outside ml-8 mt-1 space-y-1 text-[#666]">
                <li>Used to accept donations on Facebook</li>
              </ol>
            </li>
          </ol>
          NOTE: If any item is not yet completed we recommend you complete them in the order listed
          above. If you run into issues reach out to us by text or call for help.
        </AccordionItem>

        <AccordionItem number="2" title=" Free For Charity Onboarding Form">
          <h1 className="font-[700] text-[18px] text-[#4A4A44] pb-[1em]" data-font="lato-font">
            Step 1: 501C3 Status Verification via GuideStar (Only approves US Based 501c
            organizations)
          </h1>
          <h1 className="font-[700] text-[18px] text-[#4A4A44] pb-[1em]" data-font="lato-font">
            What is GuideStar?
          </h1>
          <p className="text-[18px] font-[500] mb-[1em]">
            <span className="font-[700]">Our Benefit:</span> By using the GuideStar profile page for
            501C3 status verification, our organization aligns itself with a respected authority in
            non-profit transparency. This association strengthens our reputation as a diligent and
            responsible entity in the philanthropic sector.{' '}
            <span className="underline font-[700]">
              It also ensures that we can check the NTEE codes to match mission alignment.
            </span>
          </p>
          <p className="text-[18px] font-[500] mb-[1em]">
            <span className="font-[700]">Your Benefit:</span> For your charity, achieving validation
            through GuideStar enhances your charity’s credibility and visibility. It reassures
            donors and stakeholders of its legal compliance and ethical standing, potentially
            increasing funding opportunities.
          </p>

          <p className="text-[18px] font-[500] mb-[1em]">
            We require two links from your GuideStar page, the public profile link, and the ‘full
            profile’ link. See{' '}
            <Link href="/guidestar-guide/" className="text-[#0567B1]">
              our GuideStar guide
            </Link>{' '}
            for instructions on how to find them.
          </p>
          <h1 className="font-[700] text-[18px] text-[#4A4A44] pb-[1em]" data-font="lato-font">
            Step 2: Board Contact Information
          </h1>
          <p className="text-[18px] font-[500] mb-[1em]">
            We require full contact information for the three key roles on your charity’s board:
            President / Chair, Secretary, and Treasurer. That includes each officer&rsquo;s own
            phone, individual email, and a working LinkedIn profile link. You may optionally provide
            information for a Vice President / Vice Chair and/or an additional Member-At-Large, but
            the three key roles are non-optional.
          </p>
          <p className="text-[18px] font-[500] mb-[1em]">
            Every FFC website shows the charity&rsquo;s Chair, Secretary and Treasurer by name and
            role, so donors can see who leads it. Enter their names as they should appear and tick
            the consent box. We can&rsquo;t accept an application unless all three agree to appear.
          </p>
          <h1 className="font-[700] text-[18px] text-[#4A4A44] pb-[1em]" data-font="lato-font">
            Step 3: Primary and Technical Contact Information
          </h1>
          <p className="text-[18px] font-[500] mb-[1em]">
            We require full contact information for your charity’s primary and technical contacts.
            Additionally please provide the time-zone and best contact hours for the primary
            contact. The primary and technical contacts should match those listed in GuideStar.
          </p>
          <h1 className="font-[700] text-[18px] text-[#4A4A44] pb-[1em]" data-font="lato-font">
            Step 4: Your Website
          </h1>
          <p className="text-[18px] font-[500] mb-[1em]">
            The application collects everything we need to build your site, so there&rsquo;s no
            separate website application. Have ready: your website maintainer&rsquo;s GitHub
            username, your domain and whether you already own it, your template choice, tagline,
            site description, short description, first program, year founded, the public phone,
            email and city/state for your footer, and your Zeffy donation form and Idealist
            volunteer page links.
          </p>
          <p className="text-[18px] font-[500]">
            Not sure what a field means? The{' '}
            <GuideLink href={guide('application-fields')}>application field guide</GuideLink>{' '}
            explains every field and links to a free, step-by-step setup guide.
          </p>
        </AccordionItem>
      </div>
    </div>
  )
}

export default index
