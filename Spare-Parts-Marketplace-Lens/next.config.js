/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {fs: false};
    return config;
  },

  ignoreBuildErrors: true,
  reactStrictMode: true,
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "ipfs",
    //     hostname: "**",
    //   },
    // ],
    domains: [
      'ipfs',
      'arweave.net',
      'media.lenster.xyz',
      'ipfs.infura.io',
      'lens.infura-ipfs.io'
    ],
  },
}

module.exports = nextConfig
