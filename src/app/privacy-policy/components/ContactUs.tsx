export function ContactUs() {
  return (
    <>
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
    </>
  )
}
