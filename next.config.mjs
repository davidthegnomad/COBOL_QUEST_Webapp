/** @type {import('next').NextConfig} */
const isDemo = process.env.BUILD_DEMO === 'true'

const nextConfig = {
  images: { unoptimized: true },
  ...(isDemo
    ? {
        output: 'export',
        basePath: '/DEMO/cobol-quest',
        trailingSlash: true,
      }
    : {}),
}

export default nextConfig
