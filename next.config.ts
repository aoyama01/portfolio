import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            // HTTPS 強制
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // クリックジャッキング対策
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            // MIMEタイプのスニッフィング防止
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // XSS対策
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            // リファラー制御
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // 機能制御
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight, rehypeSlug],
  },
});

export default withMDX(nextConfig);
