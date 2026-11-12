import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'

export const metadata = pageMetadata({
  title: 'Cookie Policy',
  description:
    'Free For Charity cookie policy explaining how we use cookies and similar tracking technologies on our website.',
  canonical: '/cookie-policy/',
})

// Update this date when the policy changes
const LAST_UPDATED = 'August 30, 2026'

export default function CookiePolicy() {
  return (
    <div className="pt-[140px] pb-[54px]">
      <div className="py-[27px] w-[90%] md:w-[80%] mx-auto">
        <div data-font="aria-font">
          <h1 className="text-[30px] text-[#333] pb-[10px] leading-[1em] font-[500]">
            <strong>Cookie Policy</strong>
          </h1>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            <em>Last Updated: {LAST_UPDATED}</em>
          </p>

          {/* Section 1 */}
          <ol className="list-decimal list-inside pb-[1em]">
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>What Are Cookies?</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            Cookies are small text files that are placed on your device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to
            website owners. Cookies can be &quot;persistent&quot; or &quot;session&quot; cookies.
            Persistent cookies remain on your device after you close your browser, while session
            cookies are deleted when you close your browser.
          </p>

          {/* Section 2 */}
          <ol className="list-decimal list-inside pb-[1em]" start={2}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>How We Use Cookies</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            When you visit our website, we use cookies to:
          </p>
          <ul className="list-disc list-inside space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Remember your cookie consent preferences
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Understand how you use our website (see section 3.2 for when your permission is
              required)
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Analyze website traffic and user behavior (see section 3.2)
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Improve our website and user experience
            </li>
          </ul>

          {/* Section 3 */}
          <ol className="list-decimal list-inside pb-[1em]" start={3}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Types of Cookies We Use</strong>
              </h2>
            </li>
          </ol>

          {/* 3.1 Necessary Cookies */}
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            <strong>3.1 Necessary Cookies (Always Active)</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            These cookies are essential for the website to function properly. They enable basic
            features like storing your cookie consent preferences. These cookies do not store any
            personally identifiable information and cannot be disabled.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4 text-[#333]">Cookie Name</th>
                  <th className="text-left py-2 pr-4 text-[#333]">Purpose</th>
                  <th className="text-left py-2 text-[#333]">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-mono text-[#666]">cookie-consent</td>
                  <td className="py-2 pr-4 text-[#666]">Stores your cookie preferences</td>
                  <td className="py-2 text-[#666]">12 months</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3.2 Analytics Cookies */}
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
            <strong>3.2 Analytics Cookies</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            These cookies help us understand how visitors interact with our website by collecting
            and reporting information anonymously. We use this information to improve our website
            and user experience.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
            <p className="text-sm text-[#333] mb-2">
              <strong>When we ask permission first</strong>
            </p>
            <p className="text-sm text-[#666] mb-2">
              We apply the strictest setting to everyone: no matter where in the world you are,
              Google Analytics sets{' '}
              <strong>
                no analytics or advertising cookies and collects no identifiers from your device
              </strong>{' '}
              until you accept. It still counts your visit in an aggregate, cookie-free way so we
              know how many people used the site — that measurement cannot be tied back to you or to
              your next visit.
            </p>
            <p className="text-sm text-[#666] mb-2">
              There is no country in which analytics cookies are set before you choose. You can turn
              them off at any time using the cookie settings link in our footer, and we will delete
              the cookies listed below when you do.
            </p>
            <p className="text-sm text-[#666] mb-2">
              The same rule applies to every visitor, so nothing depends on where you are.
            </p>
            <p className="text-sm text-[#666]">
              <strong>Microsoft Clarity is different.</strong> It records how visitors move through
              pages, so it runs <strong>only if you explicitly accept</strong> analytics cookies —
              everywhere in the world, not just in Europe. Declining, or simply not answering the
              banner, keeps it off.
            </p>
          </div>

          {/* Google Analytics */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2 text-[#333]">Google Analytics</h4>
            <p className="text-sm mb-2 text-[#666]">
              Google Analytics is a web analytics service offered by Google that tracks and reports
              website traffic. We use Google Analytics to understand how users interact with our
              website.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 text-[#333]">Cookie Name</th>
                    <th className="text-left py-2 pr-4 text-[#333]">Purpose</th>
                    <th className="text-left py-2 text-[#333]">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-[#666]">_ga</td>
                    <td className="py-2 pr-4 text-[#666]">Distinguishes unique users</td>
                    <td className="py-2 text-[#666]">2 years</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-[#666]">_ga_*</td>
                    <td className="py-2 pr-4 text-[#666]">Maintains session state</td>
                    <td className="py-2 text-[#666]">2 years</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-[#666]">_gid</td>
                    <td className="py-2 pr-4 text-[#666]">Distinguishes users</td>
                    <td className="py-2 text-[#666]">24 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-2 text-gray-600">
              Privacy Policy:{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                https://policies.google.com/privacy
              </a>
            </p>
          </div>

          {/* Microsoft Clarity */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2 text-[#333]">Microsoft Clarity</h4>
            <p className="text-sm mb-2 text-[#666]">
              Microsoft Clarity is a user behavior analytics tool that helps us understand how users
              interact with our website through session recordings and heatmaps.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 text-[#333]">Cookie Name</th>
                    <th className="text-left py-2 pr-4 text-[#333]">Purpose</th>
                    <th className="text-left py-2 text-[#333]">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-[#666]">_clck</td>
                    <td className="py-2 pr-4 text-[#666]">Persists Clarity User ID</td>
                    <td className="py-2 text-[#666]">1 year</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-[#666]">_clsk</td>
                    <td className="py-2 pr-4 text-[#666]">Session cookie</td>
                    <td className="py-2 text-[#666]">1 day</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-2 text-gray-600">
              Privacy Policy:{' '}
              <a
                href="https://privacy.microsoft.com/en-us/privacystatement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                https://privacy.microsoft.com/privacystatement
              </a>
            </p>
          </div>

          {/* 3.3 Marketing Cookies */}
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
            <strong>3.3 Marketing Cookies (Requires Consent)</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            These cookies are used to track visitors across websites. The intention is to display
            ads that are relevant and engaging for users and thereby more valuable for publishers
            and advertisers.
          </p>

          {/* Meta Pixel */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2 text-[#333]">Meta Pixel (Facebook Pixel)</h4>
            <p className="text-sm mb-2 text-[#666]">
              The Meta Pixel is an analytics tool that helps us measure the effectiveness of
              advertising by understanding the actions people take on our website.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 text-[#333]">Cookie Name</th>
                    <th className="text-left py-2 pr-4 text-[#333]">Purpose</th>
                    <th className="text-left py-2 text-[#333]">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-[#666]">_fbp</td>
                    <td className="py-2 pr-4 text-[#666]">Tracks user behavior for advertising</td>
                    <td className="py-2 text-[#666]">3 months</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-[#666]">fr</td>
                    <td className="py-2 pr-4 text-[#666]">Enables ad delivery and targeting</td>
                    <td className="py-2 text-[#666]">3 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-2 text-gray-600">
              Privacy Policy:{' '}
              <a
                href="https://www.facebook.com/privacy/policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                https://www.facebook.com/privacy/policy/
              </a>
            </p>
          </div>

          {/* 3.4 Functional Cookies */}
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
            <strong>3.4 Functional Cookies</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            These support features you actively use. They are not used to build a profile of you or
            for advertising, and because removing them would break the feature itself, they are not
            covered by the analytics and marketing choices above.
          </p>

          {/* Tawk.to */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2 text-[#333]">Tawk.to (Live Chat)</h4>
            <p className="text-sm mb-2 text-[#666]">
              Powers the chat widget. Its cookies keep a conversation attached to you as you move
              between pages, so you do not lose your place mid-conversation.
            </p>
            <p className="text-xs mt-2 text-gray-600">
              Privacy Policy:{' '}
              <a
                href="https://www.tawk.to/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                https://www.tawk.to/privacy-policy/
              </a>
            </p>
          </div>

          {/* Zeffy */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2 text-[#333]">Zeffy (Donation Forms)</h4>
            <p className="text-sm mb-2 text-[#666]">
              Every donation form on this site is operated by Zeffy, either embedded in the page or
              opened on their website. Zeffy sets its own cookies when a form loads; these are
              required for a donation to complete. What you enter into a donation form goes to
              Zeffy, and their privacy policy governs it.
            </p>
            <p className="text-sm mb-2 text-[#666]">
              We ask Zeffy to count donation-form page views in our own Google Analytics, so we can
              see how many people reach a form and where they came from. That measurement covers
              page views and referral sources only — we do not receive donation amounts, payment
              details, or donor identities through analytics.
            </p>
            <p className="text-xs mt-2 text-gray-600">
              Legal &amp; Privacy:{' '}
              <a
                href="https://support.zeffy.com/legal-data-privacy-security"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                https://support.zeffy.com/legal-data-privacy-security
              </a>
            </p>
          </div>

          {/* Section 4 */}
          <ol className="list-decimal list-inside pb-[1em]" start={4}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>How to Manage Cookies</strong>
              </h2>
            </li>
          </ol>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            You have several options for managing cookies:
          </p>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            <strong>4.1 Cookie Consent Banner</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            When you first visit our website, you&apos;ll see a cookie consent banner. You can:
          </p>
          <ul className="list-disc list-inside space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Accept All:</strong> Allow all cookies including analytics and marketing
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Decline All:</strong> We delete the analytics and marketing cookies listed
              above, stop Microsoft Clarity, and set no further ones. Google Analytics keeps
              counting your visit in an aggregate, cookie-free way that cannot identify you or
              recognize you on a return visit — see section 3.2.
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Customize:</strong> Choose which types of cookies you want to allow
            </li>
          </ul>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            You do not have to answer the banner. If you ignore it, the rules in section 3.2 apply:
            in Europe and the UK nothing is stored until you say yes, and Microsoft Clarity stays
            off wherever you are.
          </p>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
            <strong>4.2 Browser Settings</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            Most web browsers allow you to control cookies through their settings. You can
            typically:
          </p>
          <ul className="list-disc list-inside space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              View what cookies are stored and delete them individually
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Block third-party cookies
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Block all cookies from specific websites
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Block all cookies from being set
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              Delete all cookies when you close your browser
            </li>
          </ul>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            Please note that if you block all cookies, you may not be able to use all features of
            our website.
          </p>

          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
            <strong>4.3 Opt-Out Links</strong>
          </p>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            You can opt out of specific third-party cookies:
          </p>
          <ul className="list-disc list-inside space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Google Analytics:</strong>{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Meta (Facebook):</strong>{' '}
              <a
                href="https://www.facebook.com/settings/?tab=ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Facebook Ad Settings
              </a>
            </li>
          </ul>

          {/* Section 5 */}
          <ol className="list-decimal list-inside pb-[1em]" start={5}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Do Not Track and Global Privacy Control Signals</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            Some browsers send a &quot;Do Not Track&quot; or Global Privacy Control signal telling
            websites you do not want your online activities tracked. This site does not read those
            signals. We do not sell or share personal information as defined by the CCPA/CPRA, so
            there is no sale or sharing for such a signal to opt you out of. Analytics cookies are
            never set before you accept, anywhere in the world (see section 3.2); wherever you are,
            you can turn them off at any time using the cookie settings link in our footer, and we
            delete the cookies those tools set when you do. Microsoft Clarity and the Meta Pixel
            never run without your explicit opt-in, anywhere in the world.
          </p>

          {/* Section 6 */}
          <ol className="list-decimal list-inside pb-[1em]" start={6}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Updates to This Cookie Policy</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            We may update this Cookie Policy from time to time to reflect changes in our practices
            or for other operational, legal, or regulatory reasons. Please review this policy
            periodically for changes.
          </p>

          {/* Section 7 */}
          <ol className="list-decimal list-inside pb-[1em]" start={7}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>Contact Us</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            If you have questions about our use of cookies, please contact us:
          </p>
          <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Email:</strong>{' '}
              <a href="mailto:privacy@freeforcharity.org" className="text-blue-600 underline">
                privacy@freeforcharity.org
              </a>
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Emergency Contact:</strong> Clarke Moyer
            </li>
            <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
              <strong>Phone:</strong>{' '}
              <a href="tel:+15202228104" className="text-blue-600 underline">
                520-222-8104
              </a>
            </li>
          </ul>

          {/* Section 8 */}
          <ol className="list-decimal list-inside pb-[1em]" start={8}>
            <li>
              <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
                <strong>More Information</strong>
              </h2>
            </li>
          </ol>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            For more information about how we handle your personal data, please see our{' '}
            <Link href="/privacy-policy/" className="text-blue-600 underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
