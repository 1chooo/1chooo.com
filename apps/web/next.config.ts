import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  transpilePackages: [
    "@workspace/ui",
    "@workspace/activity-calendar",
    "@workspace/github-calendar"
  ],
};

export default nextConfig;
