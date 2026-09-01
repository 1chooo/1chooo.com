import withMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'img.1chooo.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.moma.org', pathname: '/**' },
      { protocol: 'https', hostname: 'www.mauritshuis.nl', pathname: '/**' },
      { protocol: 'https', hostname: 'www.artic.edu', pathname: '/**' },
    ],
  },
};

export default withMDX()(nextConfig)
