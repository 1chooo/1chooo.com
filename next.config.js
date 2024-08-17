// next.config.js
const nextConfig = {
  images: {
    domains: ['skillicons.dev', 'blog.1chooo.com'], // Use domains instead of remotePatterns
    dangerouslyAllowSVG: true, // Enable SVG support for remote SVG images
    unoptimized: true, // Disable image optimization to avoid issues with remote images
  },
};

module.exports = nextConfig;
