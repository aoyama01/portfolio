import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Note:
  // Next.js turbopackでmdxを使う方法について https://zenn.dev/masan_eeic/articles/e4d7ea8eb2aa5c
  // 以下のエラーでは解決せず
  // [Error: loader /mnt/d/dev/repo/portfolio/node_modules/@next/mdx/mdx-rs-loader.js for match "#next-mdx" does not have serializable options. Ensure that options passed are plain JavaScript objects and values.]
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
