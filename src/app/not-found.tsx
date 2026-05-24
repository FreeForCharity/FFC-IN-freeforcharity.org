import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for could not be found.',
  robots: { index: false, follow: false },
}

const popularDestinations = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/donate', label: 'Donate' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/help-for-charities', label: 'Help for Charities' },
  { href: '/contact-us', label: 'Contact Us' },
]

export default function NotFound() {
  return (
    <div className="pt-[140px] pb-[80px]">
      <div className="w-[90%] md:w-[80%] mx-auto max-w-[720px] text-center" id="aria-font">
        <p className="text-[14px] font-[500] text-[#666] uppercase tracking-wider mb-[10px]">
          404 &mdash; Page Not Found
        </p>
        <h1 className="text-[36px] leading-[44px] font-[600] text-[#333] mb-[20px] md:text-[44px] md:leading-[52px]">
          We couldn&rsquo;t find that page
        </h1>
        <p className="text-[16px] leading-[26px] font-[500] text-[#555] mb-[16px]">
          The page may have moved, the URL may be misspelled, or it may no longer exist.
        </p>
        <p className="text-[16px] leading-[26px] font-[500] text-[#555] mb-[32px]">
          Try one of the destinations below, or head back to the home page.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[32px] text-left max-w-[480px] mx-auto">
          {popularDestinations.map((dest) => (
            <li key={dest.href}>
              <Link
                href={dest.href}
                className="block px-[16px] py-[12px] rounded border border-[#e5e5e5] text-[#333] hover:border-[#f47c20] hover:text-[#f47c20] transition-colors"
              >
                {dest.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-[14px] leading-[22px] font-[500] text-[#888]">
          Still can&rsquo;t find what you&rsquo;re looking for?{' '}
          <Link href="/contact-us" className="text-[#f47c20] underline">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
