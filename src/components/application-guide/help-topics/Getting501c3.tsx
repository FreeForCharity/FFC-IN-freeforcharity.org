import React from 'react'
import Link from 'next/link'
import Ext from './Ext'

const EIN_URL =
  'https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online'

/** Pre-501(c)(3) only. Also covers Form 1023 vs. 1023-EZ and fiscal sponsorship. */
const Getting501c3: React.FC = () => (
  <>
    <p>
      You can work with Free For Charity before the IRS recognizes your organization: that is what
      the Pre-501(c)(3) application is for. This page explains the usual path to 501(c)(3) status,
      which IRS form to file, how fiscal sponsorship fits in, and what you can do with us while you
      wait.
    </p>

    <h2>The usual path to 501(c)(3)</h2>
    <ol>
      <li>
        <strong>Incorporate as a nonprofit in your state.</strong> You file articles of
        incorporation with your state, usually through the Secretary of State. The exact legal name
        on that filing is what goes in the application’s legal name field.
      </li>
      <li>
        <strong>Get an EIN from the IRS.</strong> It is free and takes minutes online:{' '}
        <Ext href={EIN_URL}>apply for an EIN online (IRS)</Ext>. Never pay a website to get one for
        you.
      </li>
      <li>
        <strong>Adopt bylaws and hold an organizing board meeting.</strong> Bylaws set out how your
        board works. Record the meeting in minutes; the IRS and grantmakers may ask to see them. Our{' '}
        <Link href="/pre501c3/help/board-requirements/">board requirements</Link> page explains the
        three officers every application asks for.
      </li>
      <li>
        <strong>File Form 1023 or Form 1023-EZ</strong> with the IRS for federal tax-exempt status
        (see below).
      </li>
      <li>
        <strong>Keep your status once you have it.</strong> Recognized charities file an annual
        return; for most small charities that is the free 990-N e-Postcard. Missing three years in a
        row means automatic revocation. See the{' '}
        <Link href="/irs-990n-filing-guide/">IRS 990-N filing guide</Link>.
      </li>
    </ol>

    <h2 id="form-1023">Form 1023 or Form 1023-EZ?</h2>
    <p>
      Two IRS forms grant federal tax exemption. <strong>Form 1023-EZ</strong> is a short online
      form for small organizations: generally those that expect under $50,000 a year in gross
      receipts, have under $250,000 in total assets, and pass the eligibility worksheet in the
      form’s instructions. <strong>Form 1023</strong> (the long form) is required for everyone else,
      and it gives you a more thorough foundation if you expect to grow.
    </p>
    <p>
      Both are filed online and carry an IRS user fee; check the IRS for the current amount. A
      1023-EZ is often decided within weeks, while the long form can take several months. Read the
      IRS pages before you choose:{' '}
      <Ext href="https://www.irs.gov/forms-pubs/about-form-1023-ez">About Form 1023-EZ</Ext> and{' '}
      <Ext href="https://www.irs.gov/forms-pubs/about-form-1023">About Form 1023</Ext>.
    </p>

    <h2>What you can do with FFC while you wait</h2>
    <ul>
      <li>
        Apply now on the Pre-501(c)(3) application. You don’t have to wait for your determination
        letter.
      </li>
      <li>
        No EIN yet? On the pre-501(c)(3) application only, you may enter NONE in the EIN field, and
        we can help you get one.
      </li>
      <li>
        Your Candid profile, Zeffy donation form and Idealist page are optional on this form,
        because most groups cannot set them up before the IRS recognizes them.
      </li>
      <li>
        When your IRS determination letter arrives, let us know through our{' '}
        <Link href="/contact-us/">contact page</Link> so we can update your record.
      </li>
    </ul>

    <h2 id="fiscal-sponsorship">Fiscal sponsorship</h2>
    <p>
      A fiscal sponsor is an existing 501(c)(3) that lets your project operate under its tax-exempt
      status, so donors can give tax-deductibly before you have your own. Here is how we work with
      sponsored projects:
    </p>
    <ul>
      <li>
        <strong>We work through the sponsor.</strong> The sponsoring 501(c)(3) applies on the{' '}
        <Link href="/501c3/application-guide/">501(c)(3) application</Link> and confirms the project
        is officially theirs. That isn’t a formality: the Microsoft 365 and Google Workspace
        nonprofit grants attach to the sponsor’s 501(c)(3), so the sponsor has to be the applicant
        of record.
      </li>
      <li>
        <strong>Pursuing your own 501(c)(3) as well?</strong> Then your project applies on this
        Pre-501(c)(3) application.
      </li>
      <li>
        <strong>Corporate fiscal sponsors</strong> (such as Tides, Open Collective or Players
        Philanthropy Fund) and <strong>franchise or national-affiliate chapters</strong> (posts,
        lodges and chapters): please <Link href="/contact-us/">talk with us</Link> before applying.
        Our mission is building independent charities, so these arrangements need a conversation
        first.
      </li>
      <li>
        <strong>Only considering fiscal sponsorship?</strong> Talk with us first. We’ll help you
        weigh independence against speed.
      </li>
    </ul>
  </>
)

export default Getting501c3
