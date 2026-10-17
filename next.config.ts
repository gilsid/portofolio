import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Slug Inggris dipetakan ke folder yang sama dengan slug Indonesia.
  // (Alamat bahasa yang salah, mis. /en/tentang, diarahkan di middleware.ts.)
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/en/about", destination: "/en/tentang" },
        { source: "/en/projects/:id", destination: "/en/proyek/:id" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
