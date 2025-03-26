/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: "tailwindui.com",
      },
      {
        protocol: 'https',
        hostname: 'fpvmuwqjsufybflwwsmi.supabase.co',
      }
    ],
  },
  //  compiler: { 
  //   removeConsole: {
  //     exclude: ['error', 'warn']
  //   }
  //  }
};

export default nextConfig;
