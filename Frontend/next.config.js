/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['enchante-images.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
