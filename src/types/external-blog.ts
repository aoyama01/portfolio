import { z } from "zod";

/**
 * 外部ブログプラットフォーム
 */
export const ExternalBlogPlatformSchema = z.enum([
  "qiita",
  "zenn",
  "note",
  "dev",
  "medium",
  "hashnode",
  "personal",
]);

export type ExternalBlogPlatform = z.infer<typeof ExternalBlogPlatformSchema>;

/**
 * 外部ブログ記事のスキーマ
 */
export const ExternalBlogPostSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  url: z.string().url(),
  platform: ExternalBlogPlatformSchema,
  publishedAt: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export type ExternalBlogPost = z.infer<typeof ExternalBlogPostSchema>;

/**
 * プラットフォーム情報（表示用メタデータ）
 */
export interface PlatformMetadata {
  name: string;
  displayName: string;
  iconName: string;
  color: string;
  baseUrl: string;
}

/**
 * プラットフォームメタデータのマッピング
 */
export const PLATFORM_METADATA: Record<ExternalBlogPlatform, PlatformMetadata> = {
  qiita: {
    name: "qiita",
    displayName: "Qiita",
    iconName: "qiita",
    color: "#55C500",
    baseUrl: "https://qiita.com",
  },
  zenn: {
    name: "zenn",
    displayName: "Zenn",
    iconName: "zenn",
    color: "#3EA8FF",
    baseUrl: "https://zenn.dev",
  },
  note: {
    name: "note",
    displayName: "note",
    iconName: "note",
    color: "#41C9B4",
    baseUrl: "https://note.com",
  },
  dev: {
    name: "dev",
    displayName: "DEV",
    iconName: "dev",
    color: "#0A0A0A",
    baseUrl: "https://dev.to",
  },
  medium: {
    name: "medium",
    displayName: "Medium",
    iconName: "medium",
    color: "#000000",
    baseUrl: "https://medium.com",
  },
  hashnode: {
    name: "hashnode",
    displayName: "Hashnode",
    iconName: "hashnode",
    color: "#2962FF",
    baseUrl: "https://hashnode.com",
  },
  personal: {
    name: "personal",
    displayName: "Personal Blog",
    iconName: "globe",
    color: "#6366F1",
    baseUrl: "",
  },
};
