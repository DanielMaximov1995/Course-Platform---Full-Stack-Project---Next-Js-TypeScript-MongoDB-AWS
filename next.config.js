/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com' , 'via.placeholder.com' , 'dvf-course.co.il']
    },
    generateEtags: false,
    experimental: {
        serverActions: true
    },
    // rewrites() {
    //     return [
    //         { source: `/${encodeURIComponent("אודות")}`, destination: '/about' },
    //         { source: `/${encodeURIComponent("צרו-קשר")}`, destination: '/contact' },
    //         { source: `/${encodeURIComponent("שיעורים")}`, destination: '/lessons' },
    //     ]
    // }
}

module.exports = nextConfig
