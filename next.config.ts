import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'images.loox.io' },
      { protocol: 'https', hostname: 'checkout.monetizedprofiles.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/product/:handle', destination: '/products/:handle', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },
      { source: '/bonus/top-niches', destination: '/guides/top-niches', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
