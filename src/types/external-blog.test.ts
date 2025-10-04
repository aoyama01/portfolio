import { describe, it, expect } from "@jest/globals";
import {
  ExternalBlogPlatformSchema,
  ExternalBlogPostSchema,
  type ExternalBlogPlatform,
  type ExternalBlogPost,
} from "./external-blog";

describe("ExternalBlogPlatformSchema", () => {
  it("有効なプラットフォーム名を受け入れる", () => {
    expect(ExternalBlogPlatformSchema.parse("qiita")).toBe("qiita");
    expect(ExternalBlogPlatformSchema.parse("zenn")).toBe("zenn");
    expect(ExternalBlogPlatformSchema.parse("note")).toBe("note");
    expect(ExternalBlogPlatformSchema.parse("dev")).toBe("dev");
    expect(ExternalBlogPlatformSchema.parse("medium")).toBe("medium");
    expect(ExternalBlogPlatformSchema.parse("hashnode")).toBe("hashnode");
    expect(ExternalBlogPlatformSchema.parse("personal")).toBe("personal");
  });

  it("無効なプラットフォーム名を拒否する", () => {
    expect(() => ExternalBlogPlatformSchema.parse("invalid")).toThrow();
    expect(() => ExternalBlogPlatformSchema.parse("")).toThrow();
    expect(() => ExternalBlogPlatformSchema.parse(123)).toThrow();
  });
});

describe("ExternalBlogPostSchema", () => {
  const validBlogPost = {
    id: "blog-001",
    title: "Next.js 15の新機能を試してみた",
    url: "https://qiita.com/user/items/abc123",
    platform: "qiita",
    publishedAt: "2025-10-01",
    tags: ["nextjs", "react"],
  };

  it("有効な外部ブログ記事データを受け入れる", () => {
    const result = ExternalBlogPostSchema.parse(validBlogPost);
    expect(result.id).toBe("blog-001");
    expect(result.title).toBe("Next.js 15の新機能を試してみた");
    expect(result.platform).toBe("qiita");
    expect(result.publishedAt).toBeInstanceOf(Date);
  });

  it("必須フィールドがない場合はエラーを投げる", () => {
    expect(() => ExternalBlogPostSchema.parse({})).toThrow();
    expect(() => ExternalBlogPostSchema.parse({ title: "Title only" })).toThrow();
  });

  it("オプショナルフィールドが省略可能", () => {
    const minimalPost = {
      id: "blog-002",
      title: "Minimal Post",
      url: "https://zenn.dev/user/articles/xyz",
      platform: "zenn",
      publishedAt: "2025-10-02",
    };

    const result = ExternalBlogPostSchema.parse(minimalPost);
    expect(result.tags).toEqual([]);
    expect(result.description).toBeUndefined();
    expect(result.featured).toBe(false);
  });

  it("タグのデフォルト値が空配列", () => {
    const postWithoutTags = {
      id: "blog-003",
      title: "Post without tags",
      url: "https://example.com",
      platform: "personal",
      publishedAt: "2025-10-03",
    };

    const result = ExternalBlogPostSchema.parse(postWithoutTags);
    expect(result.tags).toEqual([]);
  });

  it("featuredのデフォルト値がfalse", () => {
    const postWithoutFeatured = {
      id: "blog-004",
      title: "Post without featured flag",
      url: "https://example.com",
      platform: "personal",
      publishedAt: "2025-10-04",
    };

    const result = ExternalBlogPostSchema.parse(postWithoutFeatured);
    expect(result.featured).toBe(false);
  });

  it("無効なURLを拒否する", () => {
    const invalidUrl = { ...validBlogPost, url: "not-a-url" };
    expect(() => ExternalBlogPostSchema.parse(invalidUrl)).toThrow();
  });

  it("タイトルの文字数制限を検証する", () => {
    const tooLongTitle = {
      ...validBlogPost,
      title: "a".repeat(201),
    };
    expect(() => ExternalBlogPostSchema.parse(tooLongTitle)).toThrow();

    const emptyTitle = { ...validBlogPost, title: "" };
    expect(() => ExternalBlogPostSchema.parse(emptyTitle)).toThrow();
  });

  it("説明文の文字数制限を検証する", () => {
    const tooLongDescription = {
      ...validBlogPost,
      description: "a".repeat(1001),
    };
    expect(() => ExternalBlogPostSchema.parse(tooLongDescription)).toThrow();
  });

  it("日付文字列をDateオブジェクトに変換する", () => {
    const result = ExternalBlogPostSchema.parse(validBlogPost);
    expect(result.publishedAt).toBeInstanceOf(Date);
    expect(result.publishedAt.getFullYear()).toBe(2025);
    expect(result.publishedAt.getMonth()).toBe(9); // 0-indexed
    expect(result.publishedAt.getDate()).toBe(1);
  });
});
