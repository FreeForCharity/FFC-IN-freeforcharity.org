import React from 'react'

export default function HowToManageCookies() {
  return (
    <>
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
          <strong>Decline All:</strong> Only essential cookies will be used
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Customize:</strong> Choose which types of cookies you want to allow
        </li>
      </ul>

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
    </>
  )
}
