import React from 'react'
import Link from 'next/link'

type SmartLinkProps = React.ComponentPropsWithoutRef<'a'> & { href: string }

/**
 * Anchor that routes root-relative URLs through next/link.
 *
 * The GitHub Pages staging deploy builds with
 * NEXT_PUBLIC_BASE_PATH=/FFC-IN-freeforcharity.org, and only next/link applies
 * that prefix — a raw <a href="/foo/"> resolves against the domain root and
 * 404s there while working fine in production. next/link also emits the
 * trailing-slash form that `trailingSlash: true` canonicalizes to, avoiding a
 * redirect hop.
 *
 * Everything else (absolute http(s) URLs, mailto:, tel:, bare #hash) falls
 * through to a plain <a>, which is what those need. Same branch StepCard makes
 * inline; this exists for the shared components that take an href prop and
 * cannot know which kind they will be handed.
 */
const SmartLink: React.FC<SmartLinkProps> = ({ href, children, ...rest }) => {
  const isInternal = href.startsWith('/') && !href.startsWith('//')

  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}

export default SmartLink
