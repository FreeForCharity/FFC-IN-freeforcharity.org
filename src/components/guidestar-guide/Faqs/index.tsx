import React from 'react'
import AccordianBold from '@/components/ui/AccordianBold'
import Image from 'next/image'
import Transparentbtn from '@/components/ui/Transparentbtn'
import { assetPath } from '@/lib/assetPath'

const index = () => {
  return (
    <div className="w-full">
      <div className="w-[90%] mx-auto py-[40px] ">
        <div className="pt-[26px] w-full max-w-[90%] sm:max-w-[90%] mx-auto">
          <h1
            className="text-[25px] md:text-[30px] font-[500] text-[#333] pb-[1em]"
            data-font="aria-font"
          >
            1. Achieving Gold or Platinum Seal of Transparency
          </h1>
          <AccordianBold number="1" title=" Claim Your Nonprofit Profile">
            <ul className="list-disc list-inside space-y-1 pb-[1em]">
              <li>
                <strong className="text-[#666]">Create an account:</strong> Go to{' '}
                <a href="https://app.candid.org/" className="text-[#0567B1]">
                  app.candid.org
                </a>{' '}
                and create a free account if you don’t have one. This is where profiles now live —
                the old guidestar.org “Update Nonprofit Profile” editor has been replaced by the
                Candid app.
              </li>
              <li>
                <strong className="text-[#666]">Find your nonprofit profile:</strong> Search for
                your organization using its name or Employer Identification Number (EIN).
              </li>
              <li>
                <strong className="text-[#666]"> Claim the profile:</strong> Follow the prompts to
                verify your connection to the nonprofit. Only a designated staff member can claim
                the profile, but you can invite others later to manage it​ (
                <a
                  href="https://candid.org/claim-nonprofit-profile/how-to-earn-a-candid-seal-of-transparency/claim-your-profile/"
                  className="text-[#0567B1]"
                >
                  Candid
                </a>
                )​(
                <a
                  href="https://learning.candid.org/linking-your-organization-to-your-candid-account/443939"
                  className="text-[#0567B1]"
                >
                  Candid Learning
                </a>
                ).
              </li>
            </ul>
            <p>
              NOTE: If your nonprofit is already claimed, then current management has to “Add
              Managers” to allow your email to update the profile.
            </p>
          </AccordianBold>

          <AccordianBold number="2" title=" Earn a Bronze Seal of Transparency">
            <p className="pb-[1em]">
              Bronze is the “donors can find you and fund your work” tier. In the current editor
              these fields are spread across the <strong>Organization</strong>,{' '}
              <strong>People</strong> and <strong>Donation</strong> sections in the left-hand nav:
            </p>
            <ul className="list-disc list-inside space-y-1 pb-[1em]">
              <li>
                <strong className="text-[#666]">Organization › About us:</strong> Organization name.
              </li>
              <li>
                <strong className="text-[#666]">Organization › What we do:</strong> Mission
                statement, subject area, and organization population served.
              </li>
              <li>
                <strong className="text-[#666]">Organization › Contact info:</strong> Mailing or
                primary address, and website (or tick “don’t have one”).
              </li>
              <li>
                <strong className="text-[#666]">People:</strong> Primary contact name and email,
                plus leader name and leader role (and co-leader name and role, if you have one).
              </li>
              <li>
                <strong className="text-[#666]">Donation:</strong> Legal name of organization, EIN
                for the payable organization, and payment address — or tick “don’t accept
                donations.”
              </li>
              <li>
                <strong className="text-[#666]"> Publication:</strong> Once all required fields are
                completed, publish your updates to earn the Bronze Seal​ ​ (
                <a
                  href="https://candid.org/claim-nonprofit-profile/how-to-earn-a-candid-seal-of-transparency/bronze-seal/"
                  className="text-[#0567B1]"
                >
                  Candid
                </a>
                )​(
                <a
                  href="https://cdn.candid.org/seals-of-transparency/2026/candid-seals-guide-2026.pdf"
                  className="text-[#0567B1]"
                >
                  2026 Seals guide
                </a>
                ).
              </li>
            </ul>
          </AccordianBold>

          <AccordianBold number="3" title=" Earn a Silver Seal of Transparency">
            <p className="pb-[1em]">
              Silver is a single section — <strong>Program</strong> — and it is what guides funding
              decisions. Add each program you run:
            </p>
            <ul className="list-disc list-inside space-y-1 pb-[1em]">
              <li>
                <strong className="text-[#666]">Required for each program:</strong>
                <ul className="list-disc list-inside space-y-1 pl-[20px] pb-[20px]">
                  <li>Program name</li>
                  <li>Program description (the services provided)</li>
                  <li>Program geographic area served</li>
                </ul>
              </li>
              <li>
                <strong className="text-[#666]">Optional but worth doing: </strong> Program subject
                area and program population served — the target population that benefits from your
                services. The Program section now saves automatically as you type, so you can’t lose
                work partway through ({' '}
                <a
                  href="https://candid.org/blogs/candid-2026-seals-of-transparency-made-faster-easier-nonprofits-more-donations/"
                  className="text-[#0567B1]"
                >
                  Candid
                </a>{' '}
                ).
              </li>
              <li>
                <strong className="text-[#666]"> Publication:</strong> After entering these details,
                publish to earn the Silver Seal​​ ​ (
                <a
                  href="https://candid.org/claim-nonprofit-profile/how-to-earn-a-candid-seal-of-transparency/silver-seal/"
                  className="text-[#0567B1]"
                >
                  Candid
                </a>
                )​(
                <a
                  href="https://cdn.candid.org/seals-of-transparency/2026/candid-seals-guide-2026.pdf"
                  className="text-[#0567B1]"
                >
                  2026 Seals guide
                </a>
                ).
              </li>
            </ul>
          </AccordianBold>

          <AccordianBold number="4" title=" Earn a Gold Seal of Transparency">
            <p className="pb-[1em]">
              <strong>Gold is the minimum Free For Charity requires.</strong> It covers two
              sections, <strong>Financials</strong> and <strong>Demographics</strong>. Note that
              Candid replaced the old “DEI” questions with a Demographics section — and at Gold it
              only asks about your leader, not your whole board.
            </p>
            <ul className="list-disc list-inside space-y-1 pb-[1em]">
              <li>
                <strong className="text-[#666]">Financials:</strong> Upload <em>one</em> of the
                following, and it must come from the latest available fiscal year (for the 2026 seal
                that means 2024 or 2025):
                <ul className="list-disc list-inside space-y-1 pl-[20px] pb-[20px]">
                  <li>An audited financial statement, or</li>
                  <li>Form 990, 990-EZ, 990-PF, or 990-N</li>
                </ul>
                A 990-N postcard counts, so small organizations are not shut out of Gold.
              </li>
              <li>
                <strong className="text-[#666]">Demographics — leader (and co-leader): </strong>{' '}
                Race &amp; ethnicity, gender identity, transgender identity, sexual orientation, and
                disability status. <strong>“Decline to state”</strong> and{' '}
                <strong>“We do not collect this information”</strong> are valid answers and still
                satisfy the requirement — you are never forced to disclose anything.
              </li>
              <li>
                <strong className="text-[#666]"> Publication:</strong> Once financials and leader
                demographics are in place, publish your profile to obtain the Gold Seal​​ ​ (
                <a
                  href="https://candid.org/claim-nonprofit-profile/how-to-earn-a-candid-seal-of-transparency/gold-seal/"
                  className="text-[#0567B1]"
                >
                  Candid
                </a>
                )​(
                <a
                  href="https://cdn.candid.org/seals-of-transparency/2026/candid-seals-guide-2026.pdf"
                  className="text-[#0567B1]"
                >
                  2026 Seals guide
                </a>
                ).
              </li>
            </ul>
          </AccordianBold>

          <AccordianBold number="5" title=" Earn a Platinum Seal of Transparency">
            <p className="pb-[1em]">
              Platinum adds three things on top of Gold: <strong>board</strong> demographics, at
              least one impact metric, and your goals and strategy.
            </p>
            <ul className="list-disc list-inside space-y-1 pb-[1em]">
              <li>
                <strong className="text-[#666]">Demographics — board:</strong> The same five
                categories you answered for your leader (race &amp; ethnicity, gender identity,
                transgender identity, sexual orientation, disability status), now for your board.
                “Decline to state” and “We do not collect this information” remain valid answers.
              </li>
              <li>
                <strong className="text-[#666]">Impact:</strong> At least one quantitative metric —
                a metric name and{' '}
                <strong>a value for the most recent completed year (2025 for the 2026 seal)</strong>
                . This is the requirement organizations most often trip over: an older value alone
                will not unlock Platinum. Examples include:
                <ul className="list-disc list-inside space-y-1 pl-[20px] pb-[20px]">
                  <li>Number of individuals served</li>
                  <li>
                    Outcomes from specific programs (e.g., scholarships awarded, animals
                    rehabilitated, etc.)
                  </li>
                  <li>Any relevant performance indicators specific to your mission</li>
                </ul>
              </li>
              <li>
                <strong className="text-[#666]">Goals &amp; strategy: </strong> Your organization’s
                goals, your strategies, and what you aim to solve. You do not need a formal
                strategic plan — past grant applications or board reports are usually enough to
                write these from​ ({' '}
                <a
                  href="https://learning.candid.org/earn-a-platinum-seal-of-transparency/378977"
                  className="text-[#0567B1]"
                >
                  Candid Learning
                </a>{' '}
                ).
              </li>
              <li>
                <strong className="text-[#666]"> Publication:</strong> After entering demographics,
                metrics, and goals, publish your updates to earn the highest level, the Platinum
                Seal. Published changes appear on your profile within about 15 minutes (
                <a
                  href="https://candid.org/claim-nonprofit-profile/how-to-earn-a-candid-seal-of-transparency/platinum-seal/"
                  className="text-[#0567B1]"
                >
                  Candid
                </a>
                )​(
                <a
                  href="https://candid.org/blogs/what-is-a-seal-of-transparency-your-questions-about-candid-seals-answered/"
                  className="text-[#0567B1]"
                >
                  Candid insights
                </a>
                ).
              </li>
            </ul>
          </AccordianBold>
        </div>

        <div className="pt-[26px] max-w-[90%] sm:max-w-[90%] mx-auto">
          <h1
            className="text-[25px] md:text-[30px] font-[500] text-[#333] pb-[1em]"
            data-font="aria-font"
          >
            2. Preparing to share your profile with Free For Charity
          </h1>
          <p className="text-[14px] font-[500] text-[#666] mb-[30px]" data-font="aria-font">
            Once you have published, open the <strong>Benefits</strong> page — the{' '}
            <strong>Seal benefits</strong> button in the editor’s top bar, next to “Save draft” and
            “Publish updates.” (This replaced the old three-tab “Step 1: Update / Step 2: Publish /
            Step 3: Benefits” screen on guidestar.org, so older screenshots and walkthroughs will
            not match what you see.) Candid lists four things your seal unlocks:
          </p>
          <ul
            className="list-disc list-inside space-y-2 text-[14px] font-[500] text-[#666] mb-[30px]"
            data-font="aria-font"
          >
            <li>
              <strong>Donations with Apple Pay</strong> — your organization becomes eligible to
              accept Apple Pay; you ask your donation platform to enable the button.
            </li>
            <li>
              <strong>Sharable full organization profile link</strong> — the “Get your sharable
              link” button. Anyone who clicks it sees your <em>full</em> profile with no login
              required. <strong>This is the link the FFC onboarding form asks for.</strong>
            </li>
            <li>
              <strong>Outreach toolkit</strong> — “Get your toolkit” gives you images, sample copy,
              and tips for announcing your seal on social media, email, or print.
            </li>
            <li>
              <strong>Dynamic Seal web widget</strong> — “Get your dynamic seal widget” generates
              the embed code covered further down this page. Install it once and it updates itself
              each year you earn a new seal.
            </li>
          </ul>
          <Image
            src={assetPath('/Images/preparing-to-share.webp')}
            alt="The Benefits page in app.candid.org listing Apple Pay donations, the sharable full profile link, the outreach toolkit, and the dynamic Seal web widget"
            width={780}
            height={100}
            className="w-[780px] h-auto object-cover"
          />
        </div>

        <div className="pt-[26px] w-[90%] mx-auto text-[14px]" data-font="aria-font">
          <p className="font-[700] text-[#666] pb-[1em]">
            Here is an example of the links to copy into the FFC onboarding form:
          </p>
          <p className="font-[700] text-[#666] pb-[1em]">
            (These are examples only — please copy the links from your own Candid profile. The old{' '}
            <code>guidestar.org/profile/shared/…</code> format is retired; current links are issued
            on <code>app.candid.org</code>.)
          </p>
          <p className="font-[500] text-[#666] pb-[1em]">
            Candid gives you <strong>two different links</strong>, and the onboarding form asks for
            both. They look similar, so it is worth knowing what separates them:
          </p>
          <p className="font-[500] text-[#666] pb-[1em]">
            <strong>1. Public Profile link.</strong> This is your profile&rsquo;s permanent home —
            what anyone finds by searching Candid, and what you would put on a business card. It
            shows the public portion of your profile only. FFC&rsquo;s:
          </p>
          <a
            href="https://app.candid.org/profile/9326392/free-for-charity-46-2471893"
            className="text-[#0567B1] break-all"
          >
            https://app.candid.org/profile/9326392/free-for-charity-46-2471893
          </a>
          <p className="font-[500] text-[#666] pb-[1em] pt-[1em]">
            <strong>2. Full Profile (sharable) link</strong>, from{' '}
            <strong>Benefits &rsaquo; Get your sharable link</strong>. Same profile, but the{' '}
            <code>pkId</code> on the end unlocks the <em>full</em> profile — everything you filled
            in — for anyone who clicks, with no Candid login and no limit on views. That is why FFC
            asks for it: we can verify your seal-level data without an account. Note the slug is
            slightly different from the public link; copy the whole URL, query string and all,
            because dropping the <code>?pkId=…</code> silently turns it back into an ordinary public
            link. FFC&rsquo;s:
          </p>
          <a
            href="https://app.candid.org/profile/9326392/free-for-charity/?pkId=7232730a-03b5-467f-a82c-443dcd2122ed&isActive=true"
            className="break-all font-[500] text-[#0567B1]"
          >
            https://app.candid.org/profile/9326392/free-for-charity/?pkId=7232730a-03b5-467f-a82c-443dcd2122ed&amp;isActive=true
          </a>
          <p className="font-[500] text-[#666] pb-[1em] pt-[1em]">
            The number both links share (9326392) is your <strong>Candid nonprofit id</strong>. You
            will need it again for the seal embed below, and it is not the same as your EIN — the
            EIN is the 46-2471893 on the end of the public slug.
          </p>
          <p className="font-[500] text-[#666] pb-[1em] pt-[1em]">
            <strong>3. FFC Candid Seal Code.</strong> Not needed for the onboarding form, but you
            will need it later, when you put the seal on your own site. The link inside this snippet
            is a third variant again — Candid pairs the public slug with the <code>pkId</code> — so
            take it from the widget page rather than assembling it yourself:
          </p>
          <p className="text-center text-[#0567B1] pb-[1em]">
            {/* Candid widget intentionally external — dynamic badge must load from their servers */}
            <a
              href="https://app.candid.org/profile/9326392/free-for-charity-46-2471893/?pkId=7232730a-03b5-467f-a82c-443dcd2122ed"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- external dynamic Candid badge served from their host; not a local optimizable asset */}
              <img
                src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/9326392/svg"
                alt="Candid Seal of Transparency"
              />
            </a>
          </p>
          <h3 className="text-[20px] font-[600] text-[#333] pb-[0.5em]">
            Put your seal on your website — and never update it again
          </h3>
          <p className="font-[500] text-[#666] pb-[1em]">
            Don&rsquo;t upload the seal as an image file: a saved image goes stale the moment you
            renew (we learned this on our own site). Use the embed from{' '}
            <strong>Benefits &rsaquo; Get your dynamic seal widget</strong> instead — the seal is
            served live from Candid keyed to your profile, so the year and level update
            automatically every time you publish, and one install carries you through every future
            seal. This is what Candid hands you, with FFC&rsquo;s values filled in:
          </p>
          <pre className="whitespace-pre-wrap break-all bg-[#f5f5f5] text-left text-[13px] leading-[20px] p-4 mb-[1em] rounded border border-gray-200">
            {`<a aria-label="Free For Charity" href="https://app.candid.org/profile/9326392/free-for-charity-46-2471893/?pkId=7232730a-03b5-467f-a82c-443dcd2122ed" target="_blank">
  <img alt="Candid Seal of Transparency"
       src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/9326392/svg" />
</a>`}
          </pre>
          <p className="font-[500] text-[#666] pb-[1em]">
            Paste your own version rather than this one: both the <code>9326392</code> id and the{' '}
            <code>pkId</code> are specific to FFC. One change we do recommend making to the code
            Candid gives you — it ships the image with an empty <code>alt=&quot;&quot;</code>, which
            leaves screen-reader users with nothing. Set it to{' '}
            <code>alt=&quot;Candid Seal of Transparency&quot;</code> as shown above.
          </p>
          <p className="font-[500] text-[#666] pb-[1em]">
            (The seal above is exactly this embed running with FFC&rsquo;s own id, 9326392 — as is
            the seal in this site&rsquo;s footer.) If FFC hosts your website, just send us your
            nonprofit id and we&rsquo;ll add it for you.
          </p>
          <p className="font-[500] text-[#666] pb-[1em]">
            Please keep your Candid profile handy while filling out the FFC onboarding form. A
            significant portion of the information we require can be copied over from what you
            provided to Candid while achieving your Seal of Transparency.
          </p>
        </div>

        <div className="pt-[26px] max-w-[90%] sm:max-w-[90%] mx-auto text-[14px] flex items-center justify-center">
          <Transparentbtn text="Continue Onboarding with Free For Charity" href="/501c3/" />
        </div>
      </div>
    </div>
  )
}

export default index
