export function ChildrensPrivacy() {
  return (
    <>
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
          <strong>Age Restrictions:</strong> Our services are not intended for individuals under the
          age of 13.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Parental Consent:</strong> We do not knowingly collect personal information from
          children under 13 without parental consent. If you believe we might have any information
          from or about a child under 13, please contact us immediately.
        </li>
      </ul>
    </>
  )
}
