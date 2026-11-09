/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  
  // TAMBAHAN: Konfigurasi agar Next.js mengizinkan gambar dari Supabase Storage
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sfzqmzsgrkzpdvpqybpa.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;