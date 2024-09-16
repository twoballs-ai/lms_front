/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
    sassOptions: {
      // You can add options like including custom paths here if needed
      includePaths: ['./src/styles'], // Example custom path
    },
  };
  
  export default nextConfig;
  