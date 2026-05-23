import React from 'react'

export default function HowWeUseCookies() {
  return (
    <>
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
          Understand how you use our website (with your consent)
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          Analyze website traffic and user behavior (with your consent)
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          Improve our website and user experience
        </li>
      </ul>
    </>
  )
}
