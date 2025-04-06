import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "bafybeifhqoqwtxiultgggtnnbkysqwh73yml467djeas2cbpgkmtwpemxa.ipfs.dweb.link",
      },
    ],
  },
};

export default nextConfig;
