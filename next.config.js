/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "resizing.flixster.com",
      },
    ],
  },
};

module.exports = nextConfig;
