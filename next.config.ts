import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone mode for Docker / Hostinger VPS builds when requested
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,

  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
    // Bypass image proxy in dev mode for instant rendering; enable edge optimization on Vercel
    unoptimized: process.env.NODE_ENV === "development",
  },

  // Tree-shake and optimize lucide-react icon imports for fast bundle delivery
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
