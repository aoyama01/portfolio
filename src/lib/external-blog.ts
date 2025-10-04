import fs from "fs";
import path from "path";
import { ExternalBlogPost, ExternalBlogPostSchema } from "@/types/external-blog";

const BLOG_DATA_PATH = path.join(process.cwd(), "content", "data", "external-blog.json");

/**
 * 外部ブログ記事データを読み込む
 */
async function loadExternalBlogData(): Promise<ExternalBlogPost[]> {
  try {
    // ファイルが存在しない場合は空配列を返す
    if (!fs.existsSync(BLOG_DATA_PATH)) {
      return [];
    }

    const fileContent = fs.readFileSync(BLOG_DATA_PATH, "utf-8");
    const data = JSON.parse(fileContent);

    // データの配列でない場合は空配列
    if (!Array.isArray(data)) {
      return [];
    }

    // 各記事をスキーマで検証
    const validatedPosts = data
      .map((post) => {
        try {
          return ExternalBlogPostSchema.parse(post);
        } catch (error) {
          console.warn(`Invalid blog post data:`, post, error);
          return null;
        }
      })
      .filter((post): post is ExternalBlogPost => post !== null);

    return validatedPosts;
  } catch (error) {
    console.error("Failed to load external blog data:", error);
    return [];
  }
}

/**
 * すべての外部ブログ記事を取得（公開日降順）
 */
export async function getExternalBlogPosts(): Promise<ExternalBlogPost[]> {
  const posts = await loadExternalBlogData();

  // 公開日の新しい順にソート
  return posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

/**
 * IDで外部ブログ記事を取得
 */
export async function getExternalBlogPostById(id: string): Promise<ExternalBlogPost | undefined> {
  const posts = await loadExternalBlogData();
  return posts.find((post) => post.id === id);
}

/**
 * プラットフォームでフィルタリング
 */
export async function getExternalBlogPostsByPlatform(
  platform: string
): Promise<ExternalBlogPost[]> {
  const posts = await getExternalBlogPosts();
  return posts.filter((post) => post.platform === platform);
}

/**
 * タグでフィルタリング
 */
export async function getExternalBlogPostsByTag(tag: string): Promise<ExternalBlogPost[]> {
  const posts = await getExternalBlogPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

/**
 * すべてのタグを取得（重複なし）
 */
export async function getAllBlogTags(): Promise<string[]> {
  const posts = await getExternalBlogPosts();
  const allTags = posts.flatMap((post) => post.tags);
  return Array.from(new Set(allTags)).sort();
}

/**
 * すべてのプラットフォームを取得（重複なし）
 */
export async function getAllBlogPlatforms(): Promise<string[]> {
  const posts = await getExternalBlogPosts();
  const allPlatforms = posts.map((post) => post.platform);
  return Array.from(new Set(allPlatforms)).sort();
}
