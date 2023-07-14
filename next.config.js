/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        domains: [
            "i.ytimg.com"
        ]
    },
}

module.exports = nextConfig
