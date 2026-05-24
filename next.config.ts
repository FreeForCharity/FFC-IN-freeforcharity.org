import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // Canonicalize every page to its trailing-slash form. Apache's
  // DirectorySlash + DirectoryIndex serve out/about-us/index.html
  // directly and redirect bare /about-us -> /about-us/ for free, which
  // also sidesteps the RSC-sidecar/.html collision that broke staging.
  trailingSlash: true,
  // Images configuration
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'freeforcharity.org',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
      },
    ],
  },
  // Optional: base path and asset prefix if using a subdirectory deployment
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
}

// Bundle analyzer is opt-in via `npm run build:analyze` (which sets
// ANALYZE=true). The dynamic import means @next/bundle-analyzer is
// only resolved when actually requested — a production install that
// omits devDependencies (`npm ci --omit=dev` etc.) still loads this
// config file without ERR_MODULE_NOT_FOUND because the import only
// runs when ANALYZE is set, and ANALYZE is never set during a
// production build.
export default (async () => {
  if (process.env.ANALYZE !== 'true') return nextConfig
  const { default: bundleAnalyzer } = await import('@next/bundle-analyzer')
  return bundleAnalyzer({ enabled: true })(nextConfig)
})()
