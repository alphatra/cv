import type { NextConfig } from "next";
// Removed unused path import

const nextConfig: NextConfig = {
  serverExternalPackages: ['gray-matter'],
  // Disable ESLint checking during build
  eslint: {
    // Only run ESLint on local development, not during build
    ignoreDuringBuilds: true,
  },
  // Removed webpack config as it didn't solve the fs issue
};

export default nextConfig;
