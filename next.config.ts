import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vinext's development image optimizer cannot serve local portfolio assets.
    unoptimized: true,
  },
};

export default nextConfig;
