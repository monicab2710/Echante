/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  pageExtensions: ['page.tsx', 'page.ts', 'route.tsx', 'route.ts']
};

module.exports = nextConfig;
