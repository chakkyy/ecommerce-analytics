const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
'private'
    ],
  },
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: process.env.API_URL + '/:path*',
    },
  ],
  experimental: {
    proxyTimeout: 400000,
  },
};

module.exports = nextConfig;
