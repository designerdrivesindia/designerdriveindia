import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow images from any HTTPS host so admins can paste external image URLs
    // without editing this file each time. Trade-off: the Image Optimization
    // endpoint will fetch/optimize from any host (a mild abuse/bandwidth vector).
    // For tighter control in production, replace "**" with your known hosts
    // (e.g. your S3/CloudFront media origin) and have admins upload via /admin/media.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
