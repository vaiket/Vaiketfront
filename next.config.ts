import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wabridge.com",
        pathname: "/_next/static/media/**",
      },
    ],
  },
};

export default nextConfig;
