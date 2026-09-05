import type { NextConfig } from "next";

// Served at https://<user>.github.io/omarchy-site/, so assets need this prefix.
const basePath = process.env.GITHUB_ACTIONS ? "/omarchy-site" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
