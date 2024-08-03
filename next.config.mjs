/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "saffron-bucket.storage.iran.liara.space",
      },
    ],
  },
};

export default nextConfig;
