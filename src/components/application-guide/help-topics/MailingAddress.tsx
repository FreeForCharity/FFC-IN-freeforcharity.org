import React from 'react'
import Link from 'next/link'

const MailingAddress: React.FC = () => (
  <>
    <p>
      Your footer always shows your city and state. If you give a public street address on the
      application, we add it too. Use an office, commercial mailbox or registered-agent address,
      never a volunteer’s home.
    </p>
    <p>
      The street address is optional: many charities have no public office, and city and state are
      all donors need to see that you are a real, local organization. You may still want a mailing
      address for donor checks, state filings and official mail. Here are the options, from least to
      most preferred. Only the last three belong in your footer.
    </p>

    <h2>Mailing address options</h2>
    <ul>
      <li>
        <strong>A volunteer’s home.</strong> Works at the very start, but it exposes someone’s home
        address on state records and looks informal.
      </li>
      <li>
        <strong>A USPS PO box.</strong> Cheap and private, but it can’t receive courier deliveries,
        and some states won’t accept one for official filings.
      </li>
      <li>
        <strong>A commercial mailbox</strong> (such as a UPS Store box). A real street address with
        a suite number that accepts courier deliveries.
      </li>
      <li>
        <strong>A real office address</strong>, if you have one.
      </li>
      <li>
        <strong>A registered agent service.</strong> The strongest option: a compliant address in
        each state you register in, with legal and state mail reliably forwarded to you.
      </li>
    </ul>

    <h2>How a registered agent works</h2>
    <p>
      A registered agent receives legal papers and official state mail on your behalf in the states
      you choose, scans it, and notifies you, usually the same business day. Nothing important gets
      lost, and a board member’s home address stays off the public record.
    </p>
    <p>
      We recommend <strong>Northwest Registered Agent</strong> for its privacy practices, flat
      pricing and responsive mail scanning. It is a recommendation, not a requirement: any
      registered agent service is fine. As of 2026, Northwest’s registered-agent service is free for
      the first year, then about $125 a year per state.
    </p>
    <p>
      FFC can set your charity up under our central Northwest account so renewals and mail routing
      are handled consistently; you cover the annual fee. Prefer to hold your own account? That
      works too. Either way, ask us through our <Link href="/contact-us/">contact page</Link>.
    </p>

    <h2>Registering in more than one state</h2>
    <p>
      If your charity asks for donations in more than one state, you may need to register, and keep
      a registered agent, in each of them. Check each state’s charity registration rules before you
      start fundraising there.
    </p>
  </>
)

export default MailingAddress
