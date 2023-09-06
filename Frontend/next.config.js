/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['enchante-images.s3.amazonaws.com'], // Agrega aquí tu dominio de imagen
  },

};

module.exports = nextConfig;
