'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiMenu } from 'react-icons/fi'
import { LiaSearchSolid } from 'react-icons/lia'
import { RxCross2 } from 'react-icons/rx'
import { assetPath } from '@/lib/assetPath'
import { menuItems } from './constants'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null) // 🔹 dropdown control
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchToggle = () => setIsSearchOpen(!isSearchOpen)
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null) // 🔹 also close dropdowns on any click
  }

  return (
    <header
      id="header"
      className={`w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-300 ${
        isScrolled ? 'h-[55px]' : 'h-[80px]'
      }`}
    >
      <div className="w-full">
        <div className="mx-auto max-w-[1080px]">
          <div className="flex items-center px-2 transition-all duration-300">
            {/* Logo */}
            <div
              className={`transition-all duration-300 ${isScrolled ? 'w-[110px]' : 'w-[150px]'}`}
            >
              <Link href="/" onClick={handleLinkClick} className="block">
                <img
                  src={assetPath('/Images/ffc-logo-banner.webp')}
                  alt="Free For Charity"
                  className={`transition-all duration-300 ${isScrolled ? 'h-7' : 'h-11'}`}
                />
              </Link>
            </div>

            {/* Menu or Search */}
            {!isSearchOpen ? (
              <div className="flex items-center justify-end sm:pl-[50px] md:pl-[70px] w-full">
                {/* Desktop Menu */}
                <DesktopNav
                  menuItems={menuItems}
                  pathname={pathname}
                  activeDropdown={activeDropdown}
                  isScrolled={isScrolled}
                  handleLinkClick={handleLinkClick}
                  setActiveDropdown={setActiveDropdown}
                />

                {/* Search Icon */}
                <div className="hidden lg:flex items-center">
                  <button
                    onClick={handleSearchToggle}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label="Search"
                  >
                    <LiaSearchSolid className="h-5 w-5 cursor-pointer" />
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 text-gray-600 hover:text-blue-600"
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
                >
                  {isMobileMenuOpen ? (
                    <RxCross2 className="h-6 w-6" />
                  ) : (
                    <FiMenu className="h-6 w-6" />
                  )}
                </button>
              </div>
            ) : (
              // Search Input
              <div className="w-full max-w-[750px] ml-auto flex items-center justify-between transition-all duration-300">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSearchToggle}
                  className="ml-2 p-2 text-gray-600"
                  aria-label="Close search"
                >
                  <RxCross2 className="cursor-pointer h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileNav
        menuItems={menuItems}
        isMobileMenuOpen={isMobileMenuOpen}
        isScrolled={isScrolled}
        pathname={pathname}
        handleLinkClick={handleLinkClick}
      />
    </header>
  )
}

export default Header
