import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any other Next.js config options here
};

export default withNextra(nextConfig);
