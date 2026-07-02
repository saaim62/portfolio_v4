/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16+ uses Turbopack by default — no webpack overrides needed
  // Minimal, production-ready configuration for the portfolio

  // Image optimization using modern remotePatterns (replaces deprecated images.domains)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Security headers for production deployment
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;