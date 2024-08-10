// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skillicons.dev',
        port: '',
        pathname: '/icons*',
      },
    ],
    dangerouslyAllowSVG: true, // Enable SVG support
  },
};

module.exports = nextConfig;
