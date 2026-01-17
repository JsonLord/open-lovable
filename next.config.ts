import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = [...config.externals, 'undici'];
    }
    return config;
  },
};

export default nextConfig;
