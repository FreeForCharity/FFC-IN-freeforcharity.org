import React from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'

interface AccordionItemProps {
  number: string
  title: string
  children: React.ReactNode
}

// Built on native <details>/<summary> (Modern Web Guidance:
// ui-components/accordion). The browser owns the open/closed state, exposes
// it to assistive tech, handles the keyboard, and lets find-in-page and
// #fragment links reach closed answers, so this needs no client JavaScript.
// The open/close slide is CSS (.faq-details in globals.css).
const AccordionItem: React.FC<AccordionItemProps> = ({ number, title, children }) => {
  return (
    <details className="faq-details group mb-5 border border-[#1c6e92] rounded-[10px] overflow-hidden bg-white">
      <summary className="w-full px-4 py-3 flex items-center justify-between text-left transition-colors duration-300 cursor-pointer list-none [&::-webkit-details-marker]:hidden group-open:bg-white/90">
        {/* Text takes remaining space */}
        <span className="font-[600] text-[22px] flex-1 pr-3 text-gray-900">
          {number}.{title}
        </span>

        {/* Decorative icon; the open state is announced from <details> itself */}
        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center" aria-hidden="true">
          <FaPlus className="group-open:hidden w-5 h-5 text-white bg-[#1c6e92] p-1 rounded-full" />
          <FaMinus className="hidden group-open:block w-5 h-5 text-white bg-[#1c6e92] p-1 rounded-full" />
        </span>
      </summary>

      <div className="px-4 pb-4 pt-2 text-gray-700 text-[18px] font-[500]" data-font="lato-font">
        {children}
      </div>
    </details>
  )
}

export default AccordionItem
