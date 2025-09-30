import { z } from "zod";

// Blog Category Types
export const BlogCategorySchema = z.enum(["tutorial", "insight", "case-study", "opinion"]);

export type BlogCategory = z.infer<typeof BlogCategorySchema>;

// Blog Post Frontmatter Schema
export const BlogFrontmatterSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(10).max(500),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  category: BlogCategorySchema,
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  author: z.string().optional(),
  coverImage: z.string().optional(),
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;

// Table of Contents Item
export const TOCItemSchema: z.ZodType<TOCItem> = z.lazy(() =>
  z.object({
    id: z.string(),
    title: z.string(),
    level: z.number().min(1).max(6),
    children: z.array(TOCItemSchema).optional(),
  })
);

export type TOCItem = {
  id: string;
  title: string;
  level: number;
  children?: TOCItem[];
};

// Blog Post Schema (with content)
export const BlogPostSchema = z.object({
  slug: z.string(),
  frontmatter: BlogFrontmatterSchema,
  content: z.string(),
  tableOfContents: z.array(TOCItemSchema).optional(),
  readingTime: z.number().optional(),
  wordCount: z.number().optional(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
