import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MenuItem } from './types'

interface MobileNavProps {
  menuItems: MenuItem[]
  isMobileMenuOpen: boolean
  isScrolled: boolean
  pathname: string
  handleLinkClick: () => void
}

const MobileNav: React.FC<MobileNavProps> = ({
  menuItems,
  isMobileMenuOpen,
  isScrolled,
  pathname,
  handleLinkClick,
}) => {
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`lg:hidden absolute left-0 w-full overflow-hidden z-40 ${
            isScrolled ? 'top-[53px]' : 'top-[77px]'
          }`}
        >
          <div
            className={`max-w-[700px] mx-auto px-6 p-[5%] bg-white border-t-[3px] border-[#0567B1] shadow-[0_2px_5px_rgba(0,0,0,0.1)] h-[80vh] overflow-auto`}
          >
            <ul className="space-y-2">
              {menuItems.map((item, index) => {
                const isActive =
                  pathname === item.path || item.dropdownItems?.some((d) => d.path === pathname)
                return (
                  <li key={index}>
                    <Link
                      href={item.path}
                      onClick={handleLinkClick}
                      className={`block px-4 py-2 rounded-lg text-sm font-[600] ${
                        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.hasDropdown && (
                      <ul className="ml-4 mt-1">
                        {item.dropdownItems?.map((dropItem, dropIndex) => {
                          const isDropActive = pathname === dropItem.path
                          return (
                            <li key={dropIndex}>
                              <Link
                                href={dropItem.path}
                                onClick={handleLinkClick}
                                className={`block px-4 py-2 text-sm rounded-lg ${
                                  isDropActive
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                }`}
                              >
                                {dropItem.label}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileNav
