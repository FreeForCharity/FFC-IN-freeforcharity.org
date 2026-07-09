// Canonical origin for the site. Defaults to production. Override at
// build time with NEXT_PUBLIC_SITE_ORIGIN so a staging deploy points
// absolute /hub/ URLs at the staging origin instead of production.
// Any trailing slash on the env var is stripped so concatenation below
// produces clean URLs (`origin + '/hub'`, not `origin/ + /hub`).
//
// Most internal hrefs should be relative (`/about-us`, not
// `https://freeforcharity.org/about-us`) — Next.js routes the relative
// form to whichever origin the page was served from. SITE_ORIGIN is
// only needed when emitting URLs that must be absolute (Open Graph
// metadata, canonical tags, JSON-LD, cross-origin links to /hub/).
export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://freeforcharity.org'
).replace(/\/+$/, '')

// WHMCS lives at /hub/ on the same origin (deployed as a sibling
// directory of the Next.js export inside cPanel). Cross-origin links
// to /hub/ have to be absolute so a same-origin <Link> doesn't try
// to route them through the Next.js router. All such links go through
// these helpers so a staging deploy can point at staging WHMCS if
// the operator ever stands one up.

const HUB_BASE = `${SITE_ORIGIN}/hub`

/**
 * Returns an absolute URL into the WHMCS hub at the given subpath.
 *   hubUrl()                  → https://freeforcharity.org/hub/
 *   hubUrl('/globaladmin')    → https://freeforcharity.org/hub/globaladmin
 *   hubUrl('globaladmin')     → https://freeforcharity.org/hub/globaladmin
 */
export function hubUrl(path: string = '/'): string {
  if (path === '' || path === '/') return `${HUB_BASE}/`
  const trimmed = path.startsWith('/') ? path : `/${path}`
  return `${HUB_BASE}${trimmed}`
}

/**
 * WHMCS product-configurator URL for a hosted product ID.
 *   hubCart(3) → https://freeforcharity.org/hub/cart.php?a=confproduct&i=3
 *
 * Accepts string for forward-compat with WHMCS product slugs that
 * might be non-numeric; string values are URL-encoded so any stray
 * special characters can't break the URL.
 */
export function hubCart(productId: number | string): string {
  const encoded = typeof productId === 'number' ? productId : encodeURIComponent(productId)
  return `${HUB_BASE}/cart.php?a=confproduct&i=${encoded}`
}

/**
 * WHMCS "add to cart" URL for a specific product id. Preferred over
 * hubCart() index links when deep-linking to a known product, because
 * `a=add&pid=` targets the product by its stable id rather than a
 * cart-position index that shifts when the catalog is reordered.
 *   hubAddProduct(16) → https://freeforcharity.org/hub/cart.php?a=add&pid=16
 */
export function hubAddProduct(pid: number): string {
  return `${HUB_BASE}/cart.php?a=add&pid=${pid}`
}

/**
 * WHMCS product ids for the charity onboarding application forms.
 * These are the stable entry points for each charity type; see
 * FreeForCharity/FFC-Cloudflare-Automation#657 / #658.
 */
export const ONBOARDING_PID = { pre501c3: 16, full501c3: 33 } as const

/**
 * WHMCS product ids for the two domain products in the charity journey:
 * register a brand-new .org vs. transfer an existing domain (both managed
 * in Cloudflare). See FreeForCharity/FFC-Cloudflare-Automation#657.
 */
export const DOMAIN_PID = { register: 39, transfer: 41 } as const

/**
 * WHMCS store-listing URL for a slug under /hub/store/.
 *   hubStore('ffc-consulting/nonprofit-charity-onboarding')
 *     → https://freeforcharity.org/hub/store/ffc-consulting/nonprofit-charity-onboarding
 */
export function hubStore(slug: string): string {
  return `${HUB_BASE}/store/${slug.replace(/^\/+/, '')}`
}
