import React from 'react'
import Link from 'next/link'
import { FiChevronDown } from 'react-icons/fi'
import { MenuItem } from './types'

interface DesktopNavProps {
  menuItems: MenuItem[]
  pathname: string
  activeDropdown: number | null
  isScrolled: boolean
  handleLinkClick: () => void
  setActiveDropdown: (index: number | null) => void
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  menuItems,
  pathname,
  activeDropdown,
  isScrolled,
  handleLinkClick,
  setActiveDropdown,
}) => {
  return (
    <nav className="hidden lg:block transition-all duration-300">
      <ul className="flex items-center space-x-[1px] font-navbar font-[600]">
        {menuItems.map((item, index) => {
          const isActive =
            pathname === item.path || item.dropdownItems?.some((d) => d.path === pathname)
          const isOpen = activeDropdown === index

          return (
            <li
              key={index}
              className="relative py-6"
              onMouseEnter={() => setActiveDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.path}
                onClick={handleLinkClick}
                className={`flex items-center px-3 py-2 text-[14px] transition-colors duration-200 ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-500'
                }`}
              >
                {item.label}
                {item.hasDropdown && <FiChevronDown className="ml-1 mt-[3px] h-4 w-4" />}
              </Link>

              {item.hasDropdown && isOpen && (
                <div
                  className={`absolute left-0 ${
                    isScrolled ? 'top-[82%]' : 'top-[97%]'
                  } border-t-3 border-[#0567B1] px-3 shadow-[0_2px_5px_rgba(0,0,0,0.1)] bg-white min-w-[240px] z-50`}
                >
                  <div className="px-1 py-[20px]">
                    {item.dropdownItems?.map((dropItem, dropIndex) => {
                      const isDropActive = pathname === dropItem.path
                      return (
                        <Link
                          key={dropIndex}
                          href={dropItem.path}
                          onClick={handleLinkClick}
                          className={`block px-6 py-2 text-[14px] transition-colors duration-200 leading-[28px] ${
                            isDropActive
                              ? 'text-blue-600 bg-[#F0F7FF]'
                              : 'text-gray-700 hover:bg-[#F9F9F9] hover:text-gray-500'
                          }`}
                        >
                          {dropItem.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default DesktopNav
