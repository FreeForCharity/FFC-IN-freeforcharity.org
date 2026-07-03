import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'

export const metadata = pageMetadata({
  title: "Choosing Your Charity's .org Domain",
  description:
    'How to pick a nonprofit domain name without fear: naming rules, availability, why .org, who owns it, and what Free For Charity pays for.',
  canonical: '/choosing-your-org-domain/',
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

export default function ChoosingYourOrgDomain() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          Choosing Your Charity&rsquo;s .org Domain — Without the Fear
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            We learned something running Free For Charity: many small nonprofits never get email or
            a website because they&rsquo;re <em>afraid of the domain step</em> — afraid of picking
            the wrong name, afraid of the cost, afraid of a technical commitment they don&rsquo;t
            understand. So let&rsquo;s remove all three fears up front:
          </p>
          <ul>
            <li>
              <strong>FFC pays for it.</strong> We buy and renew .org domains for supported
              charities (about $16.50/year — our cost, never yours).
            </li>
            <li>
              <strong>Your charity owns its identity.</strong> The domain is registered for your
              organization&rsquo;s use; if you ever leave FFC, we help you transfer it out. You are
              never locked in.
            </li>
            <li>
              <strong>&ldquo;Wrong&rdquo; is recoverable.</strong> If you outgrow a name, you can
              add a better domain later and redirect the old one. No decision here is fatal.
            </li>
          </ul>

          <h2 className={h2}>Rules of thumb for a good name</h2>
          <ul>
            <li>
              <strong>Shorter beats clever.</strong> People type it on phones and read it on flyers.
              Aim for 2–3 words.
            </li>
            <li>
              <strong>Say it aloud.</strong> If you have to spell it or explain a pun, keep looking.
              (&ldquo;Expert&rsquo;s Exchange&rdquo; famously learned this the hard way.)
            </li>
            <li>
              <strong>Hyphens and numbers cause trouble</strong> — skip them unless your legal name
              demands one.
            </li>
            <li>
              <strong>Match your everyday name,</strong> not your full legal name. If everyone calls
              you &ldquo;Hope Pantry,&rdquo; <em>hopepantry.org</em> beats{' '}
              <em>hopecommunityfoodpantryinc.org</em>.
            </li>
            <li>
              <strong>Check the words that form at the seams</strong> when words run together.
            </li>
          </ul>

          <h2 className={h2}>Why .org?</h2>
          <p>
            .org has meant &ldquo;nonprofit&rdquo; to the public since 1985. Donors trust it, search
            engines expect it for charities, and it&rsquo;s almost always more available than .com.
            That&rsquo;s why the FFC domain program is built around it — see{' '}
            <Link href="/domains/">our domains program</Link> for what&rsquo;s included (DNS,
            security, renewals — all managed for you).
          </p>

          <h2 className={h2}>Checking availability</h2>
          <p>
            Any registrar&rsquo;s search box will tell you if a name is free (you don&rsquo;t have
            to buy anything to check). Make a shortlist of three names in case your first choice is
            taken, then <Link href="/contact-us/">send us the list</Link> — we&rsquo;ll register the
            best available one for you.
          </p>

          <h2 className={h2}>Already own a domain somewhere else?</h2>
          <p>
            Great — nothing is wasted. We can either manage it where it is, transfer it into
            FFC&rsquo;s management so renewals stop costing you money, or set up your new .org
            alongside it and redirect. Tell us what you have during onboarding.
          </p>

          <h2 className={h2}>Who controls the domain? (The honest answer)</h2>
          <p>
            FFC holds the registration and DNS for supported charities so that renewals never lapse
            and security stays configured — lapsed domains and hijacked DNS are how small charities
            lose their email and websites. Your organization&rsquo;s right to the name is
            documented, and transfer-out is always available on request. Domain safety is also
            covered in our <Link href="/charity-security-guide/">security guide</Link>.
          </p>

          <h2 className={h2}>Next step</h2>
          <p>
            Once your domain exists, set up{' '}
            <Link href="/m365-email-guide/">free Microsoft 365 email</Link> at it — that&rsquo;s the
            moment your charity starts looking as professional as the work you do.
          </p>
        </div>
      </div>
    </div>
  )
}
