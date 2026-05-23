import React from 'react'

export default function AdditionalInfo() {
  return (
    <>
      {/* Section 5 */}
      <ol className="list-decimal list-inside pb-[1em]" start={5}>
        <li>
          <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
            <strong>Do Not Track Signals</strong>
          </h2>
        </li>
      </ol>
      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        Some browsers have a &quot;Do Not Track&quot; feature that lets you tell websites that
        you do not want to have your online activities tracked. At this time, we do not respond
        to browser &quot;Do Not Track&quot; signals. However, you can control cookies through
        our cookie consent banner.
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
        <a href="/privacy-policy" className="text-blue-600 underline">
          Privacy Policy
        </a>
        .
      </p>
    </>
  )
}
