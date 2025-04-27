import type { NextConfig } from "next";
// Removed unused path import

const nextConfig: NextConfig = {
  serverExternalPackages: ['gray-matter'],
  // Removed webpack config as it didn't solve the fs issue
};

export default nextConfig;
