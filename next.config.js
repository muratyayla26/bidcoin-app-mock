/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "famousfoxes.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "arweave.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "we-assets.pinit.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "shdw-drive.genesysgo.net",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;

