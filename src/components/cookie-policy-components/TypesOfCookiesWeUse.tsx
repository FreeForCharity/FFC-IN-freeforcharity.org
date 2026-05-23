import React from 'react'

export default function TypesOfCookiesWeUse() {
  return (
    <>
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
        These cookies are essential for the website to function properly. They enable basic features
        like storing your cookie consent preferences. These cookies do not store any personally
        identifiable information and cannot be disabled.
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
        <strong>3.2 Analytics Cookies (Requires Consent)</strong>
      </p>
      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        These cookies help us understand how visitors interact with our website by collecting and
        reporting information anonymously. We use this information to improve our website and user
        experience.
      </p>

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
        These cookies are used to track visitors across websites. The intention is to display ads
        that are relevant and engaging for users and thereby more valuable for publishers and
        advertisers.
      </p>

      {/* Meta Pixel */}
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 className="font-semibold mb-2 text-[#333]">Meta Pixel (Facebook Pixel)</h4>
        <p className="text-sm mb-2 text-[#666]">
          The Meta Pixel is an analytics tool that helps us measure the effectiveness of advertising
          by understanding the actions people take on our website.
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
    </>
  )
}
