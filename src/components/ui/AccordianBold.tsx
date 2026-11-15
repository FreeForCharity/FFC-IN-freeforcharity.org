import React from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'

interface AccordionItemProps {
  number: string
  title: string
  children: React.ReactNode
}

// Built on native <details>/<summary> (Modern Web Guidance:
// ui-components/accordion). The browser owns the open/closed state, exposes
// it to assistive tech, handles the keyboard, and keeps closed answers in the
// HTML (Chromium also opens the matching answer for find-in-page), so this
// needs no client JavaScript.
// The open/close slide is CSS (.faq-details in globals.css).
const AccordionItem: React.FC<AccordionItemProps> = ({ number, title, children }) => {
  return (
    <details className="faq-details group mb-5 border-[6px] border-[#0C71C3] rounded-[25px] overflow-hidden">
      <summary className="w-full px-4 py-3 flex items-center justify-between text-left transition-colors duration-300 cursor-pointer list-none [&::-webkit-details-marker]:hidden group-open:bg-white/90">
        {/* Text takes remaining space */}
        <span
          className="font-[500] text-[20px] md:text-[26px] flex-1 pr-3 transition-colors duration-300 text-[#666] group-open:text-[#333]"
          data-font="aria-font"
        >
          {number}.{title}
        </span>

        {/* Decorative icon; the open state is announced from <details> itself */}
        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center" aria-hidden="true">
          <FaPlus className="group-open:hidden w-5 h-5 text-white bg-[#1c6e92] p-1 rounded-full" />
          <FaMinus className="hidden group-open:block w-5 h-5 text-white bg-[#1c6e92] p-1 rounded-full" />
        </span>
      </summary>

      <div
        className="px-4 pb-4 pt-2 text-gray-700 text-[14px] font-[500] bg-white/90"
        data-font="aria-font"
      >
        {children}
      </div>
    </details>
  )
}

export default AccordionItem
