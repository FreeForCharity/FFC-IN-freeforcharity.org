import React from 'react'
import Image from 'next/image'
import { assetPath } from '@/lib/assetPath'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
}

// Built on native <details>/<summary> (Modern Web Guidance:
// ui-components/accordion). The browser owns the open/closed state, exposes
// it to assistive tech, handles the keyboard, and keeps closed answers in the
// HTML (Chromium also opens the matching answer for find-in-page), so this
// needs no client JavaScript.
// The open/close slide is CSS (.faq-details in globals.css).
const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  return (
    <details
      className="faq-details group shadow-[0px_16px_16px_0px_#11253E0F] mb-5 p-2 border-[5px] border-[#F58629] rounded-[10px] overflow-hidden"
      data-font="lato-font"
    >
      <summary className="w-full px-4 py-3 flex items-center justify-between text-left transition-colors duration-300 cursor-pointer list-none [&::-webkit-details-marker]:hidden group-open:bg-white/90">
        <span className="font-[400] text-[28px] lg:text-[36px] leading-[100%] flex-1 pr-3 transition-colors duration-300">
          {title}
        </span>

        {/* Decorative icon; the open state is announced from <details> itself */}
        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center" aria-hidden="true">
          <Image
            width={51}
            height={51}
            src={assetPath('/Svgs/plus.svg')}
            alt=""
            className="group-open:hidden"
          />
          <Image
            width={51}
            height={51}
            src={assetPath('/Svgs/minus.svg')}
            alt=""
            className="hidden group-open:block"
          />
        </span>
      </summary>

      <div
        className="px-4 pb-4 pt-2 text-[22px] lg:text-[25px] font-[400] bg-white/90"
        data-font="lato-font"
      >
        {children}
      </div>
    </details>
  )
}

export default AccordionItem
