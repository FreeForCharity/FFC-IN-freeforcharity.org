import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import AccordionItem from '@/components/ui/Accordian'

export const metadata = pageMetadata({
  title: 'Charity Support FAQ',
  description:
    'The questions charities actually ask Free For Charity — email at your domain, who owns the domain, onboarding timelines, site changes, migration, and costs.',
  canonical: '/charity-faq/',
})

// The ten most-repeated questions from the full census of FFC's support
// conversations (2023–2025), each answered with a link to the guide that
// resolves it (issue #376). Aggregate insight only — no thread content.
const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: 'How do we get email at our own domain (you@yourcharity.org)?',
    answer: (
      <>
        Through Microsoft&rsquo;s free nonprofit grant — Microsoft 365 Business Basic costs
        qualified 501(c)(3)s nothing, and FFC handles the technical DNS steps for you. Follow the{' '}
        <Link href="/m365-email-guide/" className="text-[#0567B1] underline">
          M365 email guide
        </Link>
        .
      </>
    ),
  },
  {
    question: 'Who owns our domain name — us or Free For Charity?',
    answer: (
      <>
        Your organization&rsquo;s right to the name is yours; FFC holds the registration and DNS so
        renewals never lapse and security stays configured. If you ever leave the program, we help
        you transfer the domain out — no lock-in. Details in{' '}
        <Link href="/choosing-your-org-domain/" className="text-[#0567B1] underline">
          the domain guide
        </Link>
        .
      </>
    ),
  },
  {
    question: 'What does any of this cost our charity?',
    answer: (
      <>
        Nothing. FFC pays the hard costs (about $16.50/year per charity, mostly the .org domain) and
        volunteers donate the labor. See{' '}
        <Link href="/cost-transparency/" className="text-[#0567B1] underline">
          exactly what that covers
        </Link>
        .
      </>
    ),
  },
  {
    question: 'How long does onboarding take, and what happens when?',
    answer: (
      <>
        Domain and email typically land within the first week or two; the website takes 2–6 weeks
        depending mostly on how quickly content (logo, photos, text) is ready. The full picture is
        in{' '}
        <Link href="/charity-onboarding-journey/" className="text-[#0567B1] underline">
          your onboarding journey
        </Link>
        .
      </>
    ),
  },
  {
    question: 'Our website needs a change — who do we ask, and how fast is it?',
    answer: (
      <>
        Send change requests through the{' '}
        <Link href="/contact-us/" className="text-[#0567B1] underline">
          contact page
        </Link>{' '}
        with the page address and the exact text/image changes. Volunteers usually turn small
        changes around within days; a silent week means a message slipped through — please nudge us.
      </>
    ),
  },
  {
    question: 'Can you migrate our old WordPress (or other) site?',
    answer: (
      <>
        Yes — migrating legacy charity sites to fast, secure static hosting is a core FFC program.
        We rebuild your content on the FFC template, launch it at your domain, and retire the old
        hosting bill. Start via{' '}
        <Link href="/help-for-charities/" className="text-[#0567B1] underline">
          Help for Charities
        </Link>
        .
      </>
    ),
  },
  {
    question: 'Our email/website seems down — what do we check first?',
    answer: (
      <>
        First check whether it&rsquo;s just you (try another device/network). Then contact us with
        what you saw and when — DNS and hosting issues are usually fixable the same day. The{' '}
        <Link href="/charity-security-guide/" className="text-[#0567B1] underline">
          security guide
        </Link>{' '}
        also covers what to do if you suspect a compromise rather than an outage.
      </>
    ),
  },
  {
    question: 'How do we accept online donations without losing a cut to fees?',
    answer: (
      <>
        Use Zeffy — 0% fees, so 100% of each gift reaches you, with automatic tax receipts. We use
        it ourselves and can embed it on your FFC site. See the{' '}
        <Link href="/zeffy-donations-guide/" className="text-[#0567B1] underline">
          Zeffy guide
        </Link>
        .
      </>
    ),
  },
  {
    question: 'What is a Candid (GuideStar) seal and do we need one?',
    answer: (
      <>
        It&rsquo;s the nonprofit transparency badge funders check before giving. Earning Gold or
        Platinum takes a few hours once and ~30 minutes a year after that — and FFC requires at
        least a claimed profile during validation. Walkthrough:{' '}
        <Link href="/guidestar-guide/" className="text-[#0567B1] underline">
          GuideStar guide
        </Link>
        .
      </>
    ),
  },
  {
    question: "We're not a 501(c)(3) yet — can you still help us?",
    answer: (
      <>
        Yes. Pre-501c3 organizations are a big part of who we serve: we help with the domain, email,
        and the path to determination. Start with{' '}
        <Link href="/pre501c3/" className="text-[#0567B1] underline">
          Pre-501c3 onboarding
        </Link>{' '}
        and keep the{' '}
        <Link href="/irs-990n-filing-guide/" className="text-[#0567B1] underline">
          990-N guide
        </Link>{' '}
        for after your approval.
      </>
    ),
  },
]

export default function CharityFaq() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-4">
          Charity Support FAQ
        </h1>
        <p className="font-[var(--font-lato)] text-[18px] leading-[28px] text-[#555] mb-8">
          These are the ten questions charities actually ask us most — taken from a full census of
          our support conversations, answered once, properly. If yours isn&rsquo;t here,{' '}
          <Link href="/contact-us/" className="text-[#0567B1] underline">
            ask us
          </Link>{' '}
          and it may become number eleven.
        </p>

        <div>
          {faqs.map((faq, idx) => (
            <AccordionItem key={faq.question} number={String(idx + 1)} title={` ${faq.question}`}>
              <p className="font-[var(--font-lato)] text-[17px] leading-[27px] text-[#555] pb-2">
                {faq.answer}
              </p>
            </AccordionItem>
          ))}
        </div>

        <p className="font-[var(--font-lato)] text-[16px] leading-[26px] text-[#555] mt-8">
          Looking for deeper walkthroughs? Every topic above has a full guide in the{' '}
          <Link href="/guides/" className="text-[#0567B1] underline">
            guides hub
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
