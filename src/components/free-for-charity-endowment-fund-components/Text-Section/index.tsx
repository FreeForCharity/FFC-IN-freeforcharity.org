import React from 'react'

const index = () => {
  return (
    <div className="py-[40px]">
      <aside
        role="note"
        aria-label="Notice from the founder"
        className="w-[90%] md:w-[80%] mx-auto bg-[#fff8e6] border-l-4 border-[#f0a500] rounded-r-md px-[24px] py-[20px] text-[16px] md:text-[18px] leading-[28px] text-[#333]"
        id="fauna-font"
      >
        <strong>The endowment is real — the page is still being polished.</strong> We&rsquo;re
        actively building out this page with more detail. If you&rsquo;d like to talk to someone
        before you give, founder Clarke Moyer answers the phone:{' '}
        <a
          href="tel:+15202228104"
          className="text-[#003566] underline decoration-2 underline-offset-4 hover:text-[#0567B1]"
        >
          (520) 222-8104
        </a>
        .
      </aside>
    </div>
  )
}

export default index
