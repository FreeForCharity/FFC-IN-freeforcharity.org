import React from 'react'

export default function WhatAreCookies() {
  return (
    <>
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
    </>
  )
}
