/** @type {import('next').NextConfig} */
const nextConfig = {reactStrictMode: true,
    // Add this if you're using dynamically imported components
    experimental: {
      esmExternals: 'loose', // This might be necessary for some npm packages
    },};

export default nextConfig;
