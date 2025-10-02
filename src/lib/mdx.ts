import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogFrontmatterSchema, type BlogPost } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const PROJECTS_DETAIL_DIR = path.join(process.cwd(), "content/projects/details");

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Calculate word count
 */
export function calculateWordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}

/**
 * Get all MDX files from a directory
 */
export function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

/**
 * Parse MDX file and extract frontmatter
 */
export function parseMDXFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  return { frontmatter: data, content };
}

/**
 * Get all blog posts
 */
export function getAllBlogPosts(): BlogPost[] {
  const files = getMDXFiles(BLOG_DIR);

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const { frontmatter, content } = parseMDXFile(filePath);

    // Validate and parse frontmatter
    const validatedFrontmatter = BlogFrontmatterSchema.parse(frontmatter);

    return {
      slug,
      frontmatter: validatedFrontmatter,
      content,
      readingTime: calculateReadingTime(content),
      wordCount: calculateWordCount(content),
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => {
    return b.frontmatter.date.getTime() - a.frontmatter.date.getTime();
  });
}

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { frontmatter, content } = parseMDXFile(filePath);
  const validatedFrontmatter = BlogFrontmatterSchema.parse(frontmatter);

  return {
    slug,
    frontmatter: validatedFrontmatter,
    content,
    readingTime: calculateReadingTime(content),
    wordCount: calculateWordCount(content),
  };
}

/**
 * Get project detail MDX content
 */
export function getProjectDetail(
  slug: string
): { content: string; frontmatter: Record<string, unknown> } | null {
  const filePath = path.join(PROJECTS_DETAIL_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { content, frontmatter } = parseMDXFile(filePath);
  return { content, frontmatter };
}

/**
 * Get all blog slugs for static generation
 */
export function getAllBlogSlugs(): string[] {
  const files = getMDXFiles(BLOG_DIR);
  return files.map((filename) => filename.replace(/\.mdx$/, ""));
}

/**
 * Get posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter((post) => post.frontmatter.tags.includes(tag));
}

/**
 * Get posts by category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter((post) => post.frontmatter.category === category);
}

/**
 * Get featured posts
 */
export function getFeaturedBlogPosts(limit?: number): BlogPost[] {
  const allPosts = getAllBlogPosts();
  const featured = allPosts.filter((post) => post.frontmatter.featured && !post.frontmatter.draft);

  if (limit) {
    return featured.slice(0, limit);
  }

  return featured;
}
