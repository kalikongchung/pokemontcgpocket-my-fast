const withNextIntl = require('next-intl/plugin')('./i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'pbs.twimg.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'logos-world.net' },
    ],
  },
  
};

module.exports = withNextIntl(nextConfig);

