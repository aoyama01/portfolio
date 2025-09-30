import { z } from "zod";

// Project Category Types
export const ProjectCategorySchema = z.enum([
  "web-app",
  "mobile-app",
  "library",
  "tool",
  "experiment",
]);

export type ProjectCategory = z.infer<typeof ProjectCategorySchema>;

// Project Status Types
export const ProjectStatusSchema = z.enum([
  "planning",
  "in-progress",
  "completed",
  "maintained",
  "archived",
]);

export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

// Complexity Level Types
export const ComplexityLevelSchema = z.enum(["simple", "intermediate", "complex", "expert"]);

export type ComplexityLevel = z.infer<typeof ComplexityLevelSchema>;

// Project Schema
export const ProjectSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(500),
  technologies: z.array(z.string()).min(1),
  category: ProjectCategorySchema,
  complexity: ComplexityLevelSchema.optional(),
  featured: z.boolean().default(false),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  status: ProjectStatusSchema.default("completed"),
  githubUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  imageUrl: z.string(),
  detailContent: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

// Projects Collection Schema
export const ProjectsCollectionSchema = z.object({
  projects: z.array(ProjectSchema),
});

export type ProjectsCollection = z.infer<typeof ProjectsCollectionSchema>;
