/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['enchante-images.s3.amazonaws.com'],
  },
  module: {
    serverRuntimeConfig: {
      HOST: '0.0.0.0',
      PORT: 3001,
    },
  },

  
};


module.exports = nextConfig;
