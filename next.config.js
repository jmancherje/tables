/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "resizing.flixster.com",
      },
      {
        protocol: "https",
        hostname: "images.fandango.com",
      },
    ],
  },
};

module.exports = nextConfig;
