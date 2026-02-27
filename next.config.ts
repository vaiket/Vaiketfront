import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wabridge.com",
        pathname: "/_next/static/media/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "vaiket.com" }],
        destination: "https://www.vaiket.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
