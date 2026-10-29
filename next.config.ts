import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        qualities: [75, 90, 100]
    },
    async redirects() {
        return [{ source: '/updates', destination: '/', permanent: true }]
    }
}

export default nextConfig
