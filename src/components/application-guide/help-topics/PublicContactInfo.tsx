import React from 'react'
import Link from 'next/link'
import { type Track } from '@/data/application-fields'
import Ext from './Ext'

/** Also covers what is public vs. private (the former "supporting documents" topic). */
const PublicContactInfo: React.FC<{ track: Track }> = ({ track }) => (
  <>
    <p>
      The application asks for two kinds of contact information: what the public sees in your
      website footer, and private contacts we use while we work with you. Getting both right builds
      donor trust and keeps your volunteers’ personal details private.
    </p>

    <h2>Your website footer: phone, email and location</h2>
    <p>
      Every FFC website shows how to reach the charity. A charity with no findable way to contact it
      looks abandoned, or worse. Both applications require a public phone number, a public email
      address, and your city and state.
    </p>

    <h3>Email options, best to worst</h3>
    <ol>
      <li>
        <strong>Email at your own domain</strong> (like <code>info@yourcharity.org</code>). The
        strongest sign of legitimacy. We help you set up free Microsoft 365 email after your website
        is live and your domain is registered (see{' '}
        <Link href="/m365-email-guide/">free Microsoft 365 email for your charity</Link>), and you
        can switch your footer to it then.
      </li>
      <li>
        <strong>A charity-owned free address</strong>, such as an outlook.com or Gmail account
        created for the charity. A good choice for the application, as long as the organization, not
        one person, controls the login.
      </li>
      <li>
        <strong>Someone’s personal email.</strong> Avoid it: it ties the charity to one person, and
        their inbox becomes public.
      </li>
    </ol>

    <h3>Phone options, best to worst</h3>
    <ol>
      <li>
        <strong>A charity-owned number</strong> that forwards to whoever is on duty: Google Voice
        (free), Microsoft Teams Phone, T-Mobile DIGITS for Business, or an office phone system.
      </li>
      <li>
        <strong>A personal cell phone.</strong> Workable at the very start, but it puts a
        volunteer’s number on the public web. Plan to move off it.
      </li>
      <li>
        <strong>A landline</strong>, if your organization already has one.
      </li>
    </ol>

    <h3>Set up a free Google Voice number</h3>
    <ol>
      <li>Create a Google account for the charity (not a personal one), or use one you have.</li>
      <li>
        Go to <Ext href="https://voice.google.com">voice.google.com</Ext>, choose a number in your
        area, and link it to that account.
      </li>
      <li>Set calls to forward to the volunteer or officer currently on duty.</li>
      <li>Put the number in the application’s public phone field.</li>
    </ol>
    <p>
      Step-by-step with screenshots:{' '}
      <Ext href="https://ffcadmin.org/guides/google-voice/">
        Set up a public phone number (Google Voice)
      </Ext>
      .
    </p>

    <h3>Other charity-owned phone options</h3>
    <ul>
      <li>
        <strong>Microsoft Teams Phone:</strong> once your charity has Microsoft 365, add a Teams
        Phone license, get a number in the Teams admin center, and route calls to a shared main line
        or call queue.
      </li>
      <li>
        <strong>T-Mobile DIGITS for Business:</strong> add a DIGITS line to a T-Mobile for Business
        account and share it across officers’ phones, so the number stays with the charity.
      </li>
    </ul>

    <h3>Location: city and state only</h3>
    <p>
      Your footer shows a city and state, never a street address and never anyone’s home. If you
      need a mailing address for donor checks or official mail, see{' '}
      <Link href={`/${track}/help/mailing-address/`}>choosing a mailing address</Link>.
    </p>

    <h2>Private contacts we work with</h2>
    {track === '501c3' ? (
      <p>
        The 501(c)(3) application asks for a <strong>primary contact</strong> (who we work with
        during onboarding) and a <strong>technical contact</strong> (who handles your website and
        accounts), each with a LinkedIn profile, phone number and individual email address, plus
        your US time zone and the hours you are available. Your Chair, Secretary and Treasurer also
        give their own phone and email. All of these stay private.
      </p>
    ) : (
      <p>
        The Pre-501(c)(3) application asks for the phone number we should call you on and the best
        time to reach you. Both stay private.
      </p>
    )}
    <p>
      Use individual email addresses rather than a shared inbox, so we always know who we are
      talking to, and double-check every digit of each phone number.
    </p>

    <h2 id="public-and-private">What’s public and what stays private</h2>
    <ul>
      <li>
        <strong>Public, on your website:</strong> your organization’s name, EIN (if you have one),
        mission, tagline, descriptions and programs, the footer phone, email and city and state,
        your Chair, Secretary and Treasurer by name and role (with their consent), and your social
        media, Candid, donation and volunteer links.
      </li>
      <li>
        <strong>Private, used only to review and support your application:</strong> the phone
        numbers and email addresses of your officers and contacts, and your best contact times.
      </li>
      <li>
        <strong>Never send in the application or by email:</strong> bank or financial account
        details, passwords, donor or beneficiary personal information, or details of a security
        problem. If you find a security issue on your site, follow our{' '}
        <Link href="/vulnerability-disclosure-policy/">vulnerability disclosure policy</Link>.
      </li>
    </ul>
  </>
)

export default PublicContactInfo
