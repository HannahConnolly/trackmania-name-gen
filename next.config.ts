import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // static export for GitHub Pages; the deploy workflow sets the base path
  output: "export",
  basePath: process.env.PAGES_BASE_PATH ?? "",
};

export default nextConfig;
