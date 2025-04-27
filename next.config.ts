import type { NextConfig } from "next";
// Removed unused path import

const nextConfig: NextConfig = {
  experimental: {
    // Potentially help module resolution for packages using fs
    serverComponentsExternalPackages: ['gray-matter'],
  },
  // Removed webpack config as it didn't solve the fs issue
};

export default nextConfig;
