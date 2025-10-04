import { describe, it, expect, beforeEach } from "@jest/globals";
import { getExternalBlogPosts, getExternalBlogPostById } from "./external-blog";
import * as fs from "fs";
import * as path from "path";

describe("getExternalBlogPosts", () => {
  it("外部ブログ記事の配列を返す", async () => {
    const posts = await getExternalBlogPosts();
    expect(Array.isArray(posts)).toBe(true);
  });

  it("各記事が正しい型を持つ", async () => {
    const posts = await getExternalBlogPosts();

    if (posts.length > 0) {
      const post = posts[0];
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("url");
      expect(post).toHaveProperty("platform");
      expect(post).toHaveProperty("publishedAt");
      expect(post.publishedAt).toBeInstanceOf(Date);
    }
  });

  it("公開日の新しい順でソートされている", async () => {
    const posts = await getExternalBlogPosts();

    if (posts.length > 1) {
      for (let i = 0; i < posts.length - 1; i++) {
        expect(posts[i].publishedAt.getTime()).toBeGreaterThanOrEqual(
          posts[i + 1].publishedAt.getTime()
        );
      }
    }
  });

  it("記事が0件の場合は空配列を返す", async () => {
    // この場合でもエラーを投げず、空配列を返すべき
    const posts = await getExternalBlogPosts();
    expect(Array.isArray(posts)).toBe(true);
  });
});

describe("getExternalBlogPostById", () => {
  it("指定されたIDの記事を返す", async () => {
    const posts = await getExternalBlogPosts();

    if (posts.length > 0) {
      const firstPostId = posts[0].id;
      const post = await getExternalBlogPostById(firstPostId);

      expect(post).toBeDefined();
      expect(post?.id).toBe(firstPostId);
    }
  });

  it("存在しないIDの場合はundefinedを返す", async () => {
    const post = await getExternalBlogPostById("non-existent-id");
    expect(post).toBeUndefined();
  });
});
