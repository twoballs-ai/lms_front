/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['backend.courserio.ru','127.0.0.1'], // Add your allowed hostnames here
  },
  typescript: {
    ignoreBuildErrors: true, // Отключает проверку ошибок TypeScript при сборке
  },
  sassOptions: {
    // You can add options like including custom paths here if needed
    includePaths: ['./src/styles'], // Example custom path
  },
};

export default nextConfig;