import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'adorable-badger-817.convex.cloud',
        pathname: '/api/storage/**',
      },
    ],
    qualities: [100, 75],
  },
}

export default nextConfig
