/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com' ,  'dvf-course.co.il']
    },
    generateEtags: false,
    experimental: {
        serverActions: true
    },
}

module.exports = nextConfig
