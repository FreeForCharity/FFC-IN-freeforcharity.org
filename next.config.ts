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

export default nextConfig
