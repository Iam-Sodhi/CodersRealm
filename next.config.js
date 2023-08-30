/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { // this is to use server actions in the foem
        serverActions: true,
      },
}

module.exports = nextConfig
