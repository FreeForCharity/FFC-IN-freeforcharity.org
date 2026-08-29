import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'Free For Charity privacy policy describing how we collect, use, and protect your personal information.',
  canonical: '/privacy-policy/',
})

export default function PrivacyPolicy() {
  return (
    <div className="pt-[140px] pb-[54px]">
      <div className="py-[27px] w-[90%] md:w-[80%] mx-auto">
        <div data-font="aria-font">
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]"></p>
          <h1 className="text-[30px] text-[#333] pb-[10px] leading-[1em] font-[500]">
            <strong>Privacy Policy</strong>
          </h1>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            <em>Effective Date: 08-29-2026</em>
          </p>

          {/* Section 1 */}
          <ol className="list-decimal list-inside pb-[1em]">
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Introduction</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            At Free For Charity, accessible from https://freeforcharity.org, your privacy is one of
            our primary concerns. This Privacy Policy document contains types of information we
            collect and record, and how we use it. By using our website, you hereby consent to our
            Privacy Policy and agree to its terms.
          </p>

          {/* Section 2 */}
          <ol className="list-decimal list-inside pb-[1em]" start={2}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Who We Are</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            Our website address is: https://freeforcharity.org
          </p>

          {/* Section 3 */}
          <ol className="list-decimal list-inside pb-[1em]" start={3}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Information We Collect</strong>
              </h2>
            </li>
          </ol>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            <strong>3.1. Information You Send Us Directly</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            This website has no comment system, no user accounts, and no way to upload files, so
            there is nothing here that collects your information as you browse. We receive personal
            information only when you deliberately send it:
          </p>
          <ul className="list-disc list-inside space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Email:</strong> When you write to us using an address published on this site,
              we receive whatever you choose to include in that message.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Applications for our services:</strong> Applying as a charity takes you to our
              client portal, where you provide your organization&apos;s details so we can verify
              eligibility and set up services.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Donations:</strong> Donation forms are operated by Zeffy. What you enter goes
              to Zeffy, who pass us the donation record.
            </li>
          </ul>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
            <strong>3.2. Forms Hosted by Third Parties</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            A few tasks — submitting a testimonial, reporting volunteer hours — use forms hosted by
            Microsoft rather than built into this website. Opening one takes you to Microsoft&apos;s
            service, and what you submit there is governed by their privacy terms as well as ours.
            Volunteer hour reports are used to produce aggregate totals; we do not publish
            individual submissions without asking you first.
          </p>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
            <strong>3.3. Cookies</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            This website is a static site. There are no user accounts, no login, and no comment
            system, so we set no login, comment, or authoring cookies. The cookies you may encounter
            are:
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Your cookie choice:</strong> A single cookie recording the preferences you set
              in our cookie banner, so we do not ask again on every page. Set regardless of what you
              choose, because it is what remembers the choice.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Analytics:</strong> Google Analytics measures how the site is used. Where the
              law requires your prior permission — the EEA, the UK, and Switzerland — it sets no
              cookies and collects no identifiers until you accept; it still counts the visit in an
              aggregate, cookie-free way. Elsewhere it uses cookies from your first visit, and you
              can turn it off at any time.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Session recording:</strong> Microsoft Clarity records how visitors move
              through pages, and runs only if you explicitly accept analytics cookies. It is off
              until then, everywhere in the world.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Live chat:</strong> Tawk.to powers the chat widget and sets cookies so a
              conversation survives moving between pages.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Donation forms:</strong> Our donation forms are operated by Zeffy and set
              their own cookies when you open one. These are needed for the donation to work.
            </li>
          </ul>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            Our{' '}
            <Link href="/cookie-policy/" className="text-blue-600 underline">
              Cookie Policy
            </Link>{' '}
            lists each cookie by name, purpose, and how long it lasts, and you can change your
            choice at any time from the cookie settings link in our footer.
          </p>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
            <strong>3.4. Embedded Content from Other Websites</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            Some pages embed content operated by other organizations — most notably our donation
            forms, which are provided by Zeffy, and charity verification badges from Candid
            (GuideStar). Embedded content behaves as if you had visited that other website directly.
            Those websites may:
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Collect data about you.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">Use cookies.</li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Embed additional third-party tracking.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Monitor your interaction with the embedded content, including tracking your
              interaction if you have an account and are logged in to that website.
            </li>
          </ul>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            When you open a donation form, we ask Zeffy to count that page view in our own Google
            Analytics so we can see how many people reach a donation form and where they came from.
            We do not receive donation amounts, payment details, or donor identities through
            analytics; what you enter into a donation form goes to Zeffy, and their privacy policy
            governs it. Your donation record reaches us from Zeffy directly, not from analytics.
          </p>

          {/* Section 4 */}
          <ol className="list-decimal list-inside pb-[1em]" start={4}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>How We Use Your Information</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            We use the collected information for various purposes:
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>To Operate and Maintain Our Website:</strong> Ensuring smooth functionality
              and user experience.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>To Improve Customer Service:</strong> Your information helps us respond to
              your requests and support needs more efficiently.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>To Personalize User Experience:</strong> Understanding how our users utilize
              the services and resources provided.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>To Process Transactions:</strong> Information provided during transactions is
              used strictly for order processing.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>To Send Periodic Emails:</strong> Using the email address to send information
              and updates pertaining to your interests.
            </li>
          </ul>

          {/* Section 5 */}
          <ol className="list-decimal list-inside pb-[1em]" start={5}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Who We Share Your Data With</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            We respect your privacy and do not sell, trade, or rent your personal identification
            information to others. However:
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Service Providers:</strong> We may share your information with third-party
              service providers to help us operate our website or administer activities on our
              behalf, such as sending out newsletters or surveys.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Spam Detection Services:</strong> Visitor comments may be checked through
              automated spam detection services.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Legal Obligations:</strong> We may disclose your information if required to do
              so by law or in response to valid requests by public authorities.
            </li>
          </ul>

          {/* Section 6 */}
          <ol className="list-decimal list-inside pb-[1em]" start={6}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Data Retention</strong>
              </h2>
            </li>
          </ol>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            <strong>6.1. Comments</strong>
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Retention Period:</strong> Comments and their metadata are retained
              indefinitely. This allows us to recognize and approve any follow-up comments
              automatically.
            </li>
          </ul>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
            <strong>6.2. Registered Users</strong>
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>User Profiles:</strong> For users that register on our website, we store the
              personal information provided in their user profile.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>User Rights:</strong> All users can see, edit, or delete their personal
              information at any time (except for changing their username). Website administrators
              can also view and edit this information.
            </li>
          </ul>

          {/* Section 7 */}
          <ol className="list-decimal list-inside pb-[1em]" start={7}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Your Rights Over Your Data</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            You have the following data protection rights:
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Access and Portability:</strong> Request a copy of the personal data we hold
              about you.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Correction:</strong> Request that we correct any personal information if it is
              inaccurate or incomplete.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Erasure:</strong> Request that we erase your personal data, under certain
              conditions.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Restrict Processing:</strong> Object to our processing of your personal data,
              under certain conditions.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Withdraw Consent:</strong> Withdraw your consent at any time where we relied
              on your consent to process your personal information.
            </li>
          </ul>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            To exercise these rights, please contact us at{' '}
            <a href="mailto:clarkemoyer@freeforcharity.org" className="text-[#0056B3] underline">
              clarkemoyer@freeforcharity.org
            </a>{' '}
            or 520-222-8104.
          </p>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
            <strong>7.1. Your Rights in the European Union, United Kingdom, and EEA (GDPR)</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            If you visit from the European Union, the United Kingdom, or the wider European Economic
            Area, the EU General Data Protection Regulation (GDPR) or the UK GDPR applies to our
            handling of your personal data, and this subsection supplements the rights listed above.
            We process personal data only on these legal bases:
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Consent:</strong> Analytics and marketing cookies are off until you opt in
              through the cookie consent banner. You can withdraw consent at any time via Cookie
              Preferences, and withdrawal deletes the associated tracking cookies from your browser.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Legitimate interests:</strong> Operating, securing, and improving this website
              — for example essential cookies and server logs — balanced against your rights.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Legal obligation:</strong> Where processing is required to comply with
              applicable law.
            </li>
          </ul>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            In addition to the rights above, you have the right to receive your data in a portable
            format, to object to processing based on legitimate interests, and to withdraw any
            consent at any time without affecting the lawfulness of processing before withdrawal. We
            will respond to requests within the time limits the GDPR sets. You also have the right
            to lodge a complaint with your national data protection supervisory authority (in the
            UK, the Information Commissioner&apos;s Office).
          </p>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
            <strong>7.2. Your California Privacy Rights (CCPA/CPRA)</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            If you are a California resident, the California Consumer Privacy Act, as amended by the
            California Privacy Rights Act (CCPA/CPRA), gives you specific rights, and this
            subsection supplements the rest of this policy.
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>We do not sell or share your personal information:</strong> Free For Charity
              does not sell personal information, and does not share it for cross-context behavioral
              advertising, as those terms are defined by California law — and has not done so in the
              preceding 12 months. We do not knowingly collect or sell the personal information of
              anyone under 16, and we do not collect sensitive personal information beyond what is
              necessary to provide this website and our services, nor use it to infer
              characteristics about you.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Your rights:</strong> To know what personal information we collect, use, and
              disclose, and to access it; to delete personal information we collected from you; to
              correct inaccurate personal information; to opt out of any sale or sharing (not
              applicable, since we do neither); to limit the use of sensitive personal information;
              and to not be discriminated against for exercising any of these rights.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Opt-out preference signals (Global Privacy Control / Do Not Track):</strong>{' '}
              Tracking on this site is opt-in for every visitor, everywhere: analytics and marketing
              cookies stay off until you accept them, and declining or withdrawing consent keeps you
              — or returns you — to that untracked state. Because we also do not sell or share
              personal information, every visitor already receives at least the protection a Global
              Privacy Control or Do Not Track signal would request.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Exercising your rights:</strong> Submit a request to{' '}
              <a href="mailto:clarkemoyer@freeforcharity.org" className="text-[#0056B3] underline">
                clarkemoyer@freeforcharity.org
              </a>
              . We will verify your request using information associated with your interactions with
              us, you may use an authorized agent to submit a request on your behalf, and we will
              respond within the timeframes California law requires.
            </li>
          </ul>

          {/* Section 8 */}
          <ol className="list-decimal list-inside pb-[1em]" start={8}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Security Measures</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            We implement a variety of security measures to maintain the safety of your personal
            information:
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Secure Socket Layer (SSL) Technology:</strong> To encrypt sensitive
              information transmitted online.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Access Controls:</strong> Limited access to your personal data to those
              employees, agents, contractors, and other third parties who have a business need to
              know.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Regular Security Audits:</strong> To identify and address potential
              vulnerabilities.
            </li>
          </ul>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] italic">
            However, please note that no method of transmission over the Internet or method of
            electronic storage is 100% secure.
          </p>

          {/* Section 9 */}
          <ol className="list-decimal list-inside pb-[1em]" start={9}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Third-Party Links</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            Our website may contain links to external sites that are not operated by us. We have no
            control over and assume no responsibility for the content, privacy policies, or
            practices of any third-party sites or services. We encourage you to review the Privacy
            Policy of every site you visit.
          </p>

          {/* Section 10 */}
          <ol className="list-decimal list-inside pb-[1em]" start={10}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Children’s Privacy</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            Protecting the privacy of young children is especially important:
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Age Restrictions:</strong> Our services are not intended for individuals under
              the age of 13.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Parental Consent:</strong> We do not knowingly collect personal information
              from children under 13 without parental consent. If you believe we might have any
              information from or about a child under 13, please contact us immediately.
            </li>
          </ul>

          {/* Section 11 */}
          <ol className="list-decimal list-inside pb-[1em]" start={11}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>International Data Transfers</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            Your information may be transferred to—and maintained on—computers located outside of
            your state, province, country, or other governmental jurisdiction where data protection
            laws may differ:
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Consent to Transfer:</strong> Your consent to this Privacy Policy followed by
              your submission of such information represents your agreement to that transfer.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Compliance with Laws:</strong> We will take all steps reasonably necessary to
              ensure that your data is treated securely and in accordance with this Privacy Policy.
            </li>
          </ul>

          {/* Section 12 */}
          <ol className="list-decimal list-inside pb-[1em]" start={12}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Changes to This Privacy Policy</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            We may update our Privacy Policy from time to time:
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Notification of Changes:</strong> Any changes will be posted on this page with
              an updated effective date.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Review Periodically:</strong> We encourage users to frequently check this page
              for any changes to stay informed about how we are helping to protect the personal
              information we collect.
            </li>
          </ul>

          {/* Section 13 */}
          <ol className="list-decimal list-inside pb-[1em]" start={13}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Contact Us</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Email:</strong>{' '}
              <a href="mailto:clarkemoyer@freeforcharity.org" className="text-[#0056B3] underline">
                clarkemoyer@freeforcharity.org
              </a>{' '}
              520-222-8104
            </li>
          </ul>

          {/* Section 14 */}
          <ol className="list-decimal list-inside pb-[1em]" start={14}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Additional Information</strong>
              </h2>
            </li>
          </ol>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            <strong>14.1. Data Protection Officer</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            We have appointed a Data Protection Officer (DPO) responsible for overseeing questions
            in relation to this Privacy Policy:
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Contact DPO:</strong> Clarke Moyer{' '}
              <a href="mailto:clarkemoyer@freeforcharity.org" className="text-[#0056B3] underline">
                clarkemoyer@freeforcharity.org
              </a>{' '}
              520-222-8104
            </li>
          </ul>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[700] mt-[1.5em]">
            Your trust matters to us, and we are committed to protecting your personal information
            and using it responsibly.
          </p>
        </div>
      </div>
    </div>
  )
}
