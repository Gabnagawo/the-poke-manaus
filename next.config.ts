import type { NextConfig } from "next";

const exportar = process.env.EXPORTAR === "1";

const nextConfig: NextConfig = {
  ...(exportar ? { output: "export" as const, distDir: ".next-export" } : {}),
  images: {
    ...(exportar ? { unoptimized: true } : {}),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
