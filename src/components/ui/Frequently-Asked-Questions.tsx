'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { assetPath } from '@/lib/assetPath'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
}

const FrequentlyAskedQuestions: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState('0px')
  const contentRef = useRef<HTMLDivElement>(null)

  const toggle = () => {
    const next = !isOpen
    setIsOpen(next)
    if (contentRef.current) {
      setHeight(next ? `${contentRef.current.scrollHeight}px` : '0px')
    }
  }

  return (
    <div className="mb-5 overflow-hidden" data-font="lato-font">
      {/* Header */}
      <button
        onClick={toggle}
        className={`w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer`}
        aria-expanded={isOpen}
      >
        {/* Text takes remaining space */}
        <span className={`font-[400] text-[20px] md:text-[32px] flex-1 pr-3`} data-font="lato-font">
          {title}
        </span>

        {/* Icon container with fixed width */}
        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          {isOpen ? (
            <Image
              src={assetPath('/Svgs/up-arrow.svg')}
              alt="up arrow"
              width={40}
              height={13}
            ></Image>
          ) : (
            <Image
              src={assetPath('/Svgs/down-arrow.svg')}
              alt="down arrow"
              width={40}
              height={16}
            ></Image>
          )}
        </span>
      </button>

      {/* Content */}
      <div
        className={`border-b-[2px] border-[#B7B7B7] overflow-hidden transition-all duration-800 ease-in-out`}
        style={{ maxHeight: height }}
      >
        <div
          ref={contentRef}
          className="px-4 pb-4 pt-2 transition-colors duration-300 text-[#555555] text-[20px] md:text-[25px] font-[400]"
          data-font="lato-font"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default FrequentlyAskedQuestions
