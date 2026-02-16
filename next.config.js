/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'images.unsplash.com'],
  },
  env: {
    NEXT_PUBLIC_WHATSAPP_NUMBER: '5542999887766',
    NEXT_PUBLIC_SITE_URL: 'https://bellamassa.com.br',
  },
}

module.exports = nextConfig
