# Data Schema & Interface Specification

## ポートフォリオサイト

---

### Document Information

- **Project**: Portfolio Website
- **Version**: 1.0.0
- **Last Updated**: 2025 年 9 月 28 日
- **Author**: aoyama01
- **Status**: Draft
- **Purpose**: データ構造、型定義、インターフェース仕様の詳細定義

---

## Table of Contents

1. [Overview](#1-overview)
2. [Content Data Schemas](#2-content-data-schemas)
3. [Component Interface Specifications](#3-component-interface-specifications)
4. [API Data Structures](#4-api-data-structures)
5. [External API Integrations](#5-external-api-integrations)
6. [Validation Schemas](#6-validation-schemas)

---

## 1. Overview

### 1.1 Specification Scope

このドキュメントはポートフォリオサイトにおける以下の仕様を定義します：

- **データスキーマ**: プロジェクト、ブログ、スキル等のデータ構造
- **TypeScript 型定義**: 型安全性を保証する詳細な型仕様
- **コンポーネントインターフェース**: React コンポーネントの Props 仕様
- **API データ構造**: 外部 API 統合時のデータ形式
- **バリデーションルール**: 入力データの検証仕様

### 1.2 Design Principles

- **Type Safety**: TypeScript strict mode による型安全性
- **Data Consistency**: 一貫したデータ構造とネーミング規則
- **Extensibility**: 将来的な機能拡張を考慮した設計
- **Validation**: 堅牢なデータバリデーション

### 1.3 Naming Conventions

```typescript
// ファイル名: kebab-case
// 型名: PascalCase
// 変数名: camelCase
// 定数: SCREAMING_SNAKE_CASE

// 例
interface ProjectData {
  // 型名
  projectId: string; // 変数名
  isActive: boolean; // boolean は is/has prefix
  createdAt: string; // 日時は ISO 8601
}

const MAX_PROJECTS = 50; // 定数
```

---

## 2. Content Data Schemas

### 2.1 Project Schema

#### 2.1.1 Core Project Interface

```typescript
// src/types/project.ts
export interface Project {
  id: string; // Unique identifier (kebab-case)
  title: string; // Display title
  description: string; // Short description (max 200 chars)
  longDescription?: string; // Full description in Markdown
  technologies: string[]; // Technology stack
  category: ProjectCategory; // Project category
  status: ProjectStatus; // Development status
  featured: boolean; // Featured on homepage
  priority: number; // Display priority (1-100)

  // URLs
  githubUrl?: string; // GitHub repository URL
  demoUrl?: string; // Live demo URL
  designUrl?: string; // Design mockup URL

  // Media
  thumbnailUrl: string; // Thumbnail image
  imageUrls: string[]; // Additional images
  videoUrl?: string; // Demo video URL

  // Metrics
  stars?: number; // GitHub stars
  forks?: number; // GitHub forks
  downloads?: number; // NPM downloads

  // Dates
  startDate: string; // ISO 8601 format
  endDate?: string; // ISO 8601 format
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format

  // Technical Details
  architecture?: ProjectArchitecture;
  challenges?: string[]; // Technical challenges faced
  learnings?: string[]; // Key learnings
  futureImprovements?: string[]; // Planned improvements
}

export type ProjectCategory =
  | "web-development"
  | "mobile-development"
  | "data-analysis"
  | "machine-learning"
  | "devops"
  | "design"
  | "open-source"
  | "other";

export type ProjectStatus = "planning" | "in-progress" | "completed" | "maintained" | "deprecated";

export interface ProjectArchitecture {
  frontend?: string; // Frontend technology
  backend?: string; // Backend technology
  database?: string; // Database technology
  deployment?: string; // Deployment platform
  testing?: string; // Testing framework
  cicd?: string; // CI/CD pipeline
}
```

#### 2.1.2 Project Collection Schema

```typescript
// content/projects/projects.json
export interface ProjectsData {
  version: string; // Schema version
  lastUpdated: string; // ISO 8601 timestamp
  projects: Project[]; // Array of projects
  categories: ProjectCategoryInfo[];
  tags: string[]; // All available tags
}

export interface ProjectCategoryInfo {
  id: ProjectCategory;
  name: string; // Display name
  description: string; // Category description
  icon: string; // Icon name/component
  count: number; // Number of projects
}
```

### 2.2 Blog Post Schema

#### 2.2.1 Blog Post Interface

```typescript
// src/types/blog.ts
export interface BlogPost {
  slug: string; // URL slug (kebab-case)
  title: string; // Post title
  description: string; // Meta description
  content: string; // Full content (MDX)
  excerpt: string; // Short excerpt (auto-generated)

  // Categorization
  category: BlogCategory; // Primary category
  tags: string[]; // Post tags
  series?: string; // Part of series
  seriesOrder?: number; // Order in series

  // Publishing
  status: BlogStatus; // Publishing status
  featured: boolean; // Featured post
  publishedAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format

  // Content metadata
  readingTime: number; // Minutes to read
  wordCount: number; // Word count
  language: "ja" | "en"; // Content language

  // Author
  author: BlogAuthor;

  // SEO
  seo: BlogSEO;

  // Engagement (optional)
  viewCount?: number;
  likeCount?: number;
  shareCount?: number;
}

export type BlogCategory =
  | "tutorial"
  | "insights"
  | "review"
  | "news"
  | "personal"
  | "technical"
  | "career";

export type BlogStatus = "draft" | "published" | "archived";

export interface BlogAuthor {
  name: string;
  avatar: string;
  bio: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface BlogSEO {
  metaTitle?: string; // Custom meta title
  metaDescription?: string; // Custom meta description
  ogImage?: string; // Open Graph image
  canonicalUrl?: string; // Canonical URL
  keywords: string[]; // SEO keywords
}
```

#### 2.2.2 Blog Frontmatter Schema

```yaml
# MDX Frontmatter validation schema
title: string                   # Required
description: string             # Required
category: BlogCategory          # Required
tags: string[]                 # Required
featured: boolean              # Default: false
publishedAt: string            # ISO 8601, Required
updatedAt: string              # ISO 8601, Optional
readingTime: number            # Minutes, Optional (auto-calculated)
language: 'ja' | 'en'          # Default: 'ja'
series: string                 # Optional
seriesOrder: number            # Optional
seo:                          # Optional
  metaTitle: string
  metaDescription: string
  ogImage: string
  keywords: string[]
author:                       # Optional (defaults to site author)
  name: string
  avatar: string
  bio: string
```

### 2.3 Skills & Experience Schema

#### 2.3.1 Skills Interface

```typescript
// src/types/skills.ts
export interface SkillsData {
  categories: SkillCategory[];
  lastUpdated: string;
}

export interface SkillCategory {
  id: string; // Category identifier
  name: string; // Display name
  description: string; // Category description
  icon: string; // Icon identifier
  order: number; // Display order
  skills: Skill[]; // Skills in category
}

export interface Skill {
  name: string; // Skill name
  level: SkillLevel; // Proficiency level
  years: number; // Years of experience
  description?: string; // Skill description
  icon?: string; // Skill icon
  projects?: string[]; // Related project IDs
  certifications?: string[]; // Related certifications
  learningPath?: LearningPath; // How skill was acquired
}

export type SkillLevel = 1 | 2 | 3 | 4 | 5; // 1=Beginner, 5=Expert

export interface LearningPath {
  source: "self-taught" | "bootcamp" | "university" | "work" | "certification";
  startDate: string; // When started learning
  milestones: string[]; // Key learning milestones
}
```

#### 2.3.2 Experience Interface

```typescript
// src/types/experience.ts
export interface Experience {
  id: string;
  type: ExperienceType;
  company: string; // Company/Organization name
  position: string; // Job title/role
  description: string; // Role description
  location: string; // Work location
  remote: boolean; // Remote work

  // Duration
  startDate: string; // ISO 8601 format
  endDate?: string; // ISO 8601 format (null if current)
  current: boolean; // Currently working

  // Details
  achievements: string[]; // Key achievements
  technologies: string[]; // Technologies used
  projects: string[]; // Related project IDs

  // Company info
  companyInfo: {
    website?: string;
    industry: string;
    size: CompanySize;
    logo?: string;
  };
}

export type ExperienceType =
  | "full-time"
  | "part-time"
  | "internship"
  | "freelance"
  | "volunteer"
  | "education";

export type CompanySize =
  | "startup" // < 50
  | "small" // 50-200
  | "medium" // 200-1000
  | "large" // 1000+
  | "enterprise"; // 10000+
```

### 2.4 Personal Information Schema

#### 2.4.1 Personal Data Interface

```typescript
// src/types/personal.ts
export interface PersonalInfo {
  basic: BasicInfo;
  contact: ContactInfo;
  social: SocialLinks;
  preferences: PersonalPreferences;
  availability: Availability;
}

export interface BasicInfo {
  name: string;
  title: string; // Professional title
  bio: string; // Short bio
  location: string; // Current location
  avatar: string; // Avatar image URL
  resumeUrl?: string; // PDF resume URL

  // Detailed info
  about: {
    summary: string; // Longer summary
    interests: string[]; // Personal interests
    values: string[]; // Core values
    goals: string[]; // Career goals
  };
}

export interface ContactInfo {
  email: string; // Public email
  phone?: string; // Optional phone
  timezone: string; // Timezone (e.g., "Asia/Tokyo")
  languages: Language[]; // Spoken languages
}

export interface Language {
  code: string; // ISO 639-1 code
  name: string; // Language name
  level: LanguageLevel; // Proficiency level
}

export type LanguageLevel = "native" | "fluent" | "conversational" | "basic";

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  qiita?: string;
  zenn?: string;
  dev?: string;
  medium?: string;
  youtube?: string;
  instagram?: string;
}

export interface PersonalPreferences {
  workStyle: WorkStyle[];
  interests: TechnicalInterest[];
  industries: string[];
}

export type WorkStyle = "remote" | "hybrid" | "onsite" | "flexible";

export type TechnicalInterest =
  | "frontend"
  | "backend"
  | "fullstack"
  | "mobile"
  | "devops"
  | "data"
  | "ai-ml"
  | "design"
  | "management";

export interface Availability {
  status: AvailabilityStatus;
  startDate?: string; // When available to start
  notes?: string; // Additional notes
}

export type AvailabilityStatus = "available" | "open-to-opportunities" | "not-looking" | "busy";
```

---

## 3. Component Interface Specifications

### 3.1 UI Component Props

#### 3.1.1 Project Components

```typescript
// components/features/projects/ProjectCard.tsx
export interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured" | "compact";
  showTags?: boolean;
  showMetrics?: boolean;
  className?: string;
  onClick?: (project: Project) => void;
}

// components/features/projects/ProjectGrid.tsx
export interface ProjectGridProps {
  projects: Project[];
  loading?: boolean;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

// components/features/projects/ProjectFilter.tsx
export interface ProjectFilterProps {
  categories: ProjectCategoryInfo[];
  technologies: string[];
  selectedCategory?: ProjectCategory;
  selectedTechnology?: string;
  onCategoryChange: (category: ProjectCategory | undefined) => void;
  onTechnologyChange: (technology: string | undefined) => void;
  onReset: () => void;
}
```

#### 3.1.2 Blog Components

```typescript
// components/features/blog/BlogCard.tsx
export interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
  showExcerpt?: boolean;
  showReadingTime?: boolean;
  showAuthor?: boolean;
  className?: string;
}

// components/features/blog/BlogList.tsx
export interface BlogListProps {
  posts: BlogPost[];
  loading?: boolean;
  pagination?: PaginationProps;
  className?: string;
}

// components/features/blog/TableOfContents.tsx
export interface TableOfContentsProps {
  headings: TOCHeading[];
  activeId?: string;
  className?: string;
}

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}
```

#### 3.1.3 Common UI Components

```typescript
// components/ui/Button.tsx
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

// components/ui/Card.tsx
export interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

// components/ui/Modal.tsx
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlay?: boolean;
  className?: string;
}
```

### 3.2 Layout Components

#### 3.2.1 Header & Navigation

```typescript
// components/layout/Header.tsx
export interface HeaderProps {
  transparent?: boolean;
  className?: string;
}

// components/layout/Navigation.tsx
export interface NavigationProps {
  currentPath: string;
  mobile?: boolean;
  onLinkClick?: () => void;
}

export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
  badge?: string;
}
```

#### 3.2.2 SEO Components

```typescript
// components/layout/SEO.tsx
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: Record<string, any>;
}
```

---

## 4. API Data Structures

### 4.1 GitHub API Integration

#### 4.1.1 Repository Data

```typescript
// GitHub API response types
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  private: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

// Transformed data for internal use
export interface RepositoryData {
  id: number;
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage?: string;
  language?: string;
  stars: number;
  forks: number;
  topics: string[];
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  lastPush: string;
}
```

#### 4.1.2 GitHub Stats

```typescript
export interface GitHubStats {
  user: GitHubUser;
  repositories: {
    total: number;
    public: number;
    private: number;
    featured: RepositoryData[];
  };
  contributions: {
    total: number;
    currentStreak: number;
    longestStreak: number;
    thisYear: number;
  };
  languages: Record<string, number>; // language -> percentage
  activity: {
    commits: number;
    pullRequests: number;
    issues: number;
    reviews: number;
  };
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  blog: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}
```

### 4.2 Analytics Data

#### 4.2.1 Page Analytics

```typescript
export interface PageAnalytics {
  path: string;
  views: {
    total: number;
    unique: number;
    sessions: number;
  };
  engagement: {
    averageTime: number; // seconds
    bounceRate: number; // percentage
    exitRate: number; // percentage
  };
  traffic: {
    organic: number;
    direct: number;
    referral: number;
    social: number;
  };
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  period: {
    start: string;
    end: string;
  };
}

export interface SiteAnalytics {
  overview: {
    totalViews: number;
    uniqueVisitors: number;
    averageSessionDuration: number;
    bounceRate: number;
  };
  topPages: PageAnalytics[];
  referrers: Array<{
    source: string;
    visits: number;
    percentage: number;
  }>;
  countries: Array<{
    country: string;
    visits: number;
    percentage: number;
  }>;
}
```

---

## 5. External API Integrations

### 5.1 Content Management System (Future)

#### 5.1.1 Contentful Integration

```typescript
// If using Contentful in the future
export interface ContentfulProject {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    description: string;
    content: Document; // Rich text
    technologies: string[];
    category: string;
    featured: boolean;
    githubUrl?: string;
    demoUrl?: string;
    images: Asset[];
    startDate: string;
    endDate?: string;
  };
}

export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}
```

### 5.2 Email Service Integration

#### 5.2.1 SendGrid/Resend Integration (Contact Form)

```typescript
// Note: Contact forms are replaced with mailto links
// This is kept for future reference if needed

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: Record<string, string>;
}

export interface EmailRequest {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
  templateId?: string;
  dynamicTemplateData?: Record<string, any>;
}

export interface EmailResponse {
  messageId: string;
  status: "sent" | "queued" | "failed";
  timestamp: string;
}
```

---

## 6. Validation Schemas

### 6.1 Content Validation

#### 6.1.1 Project Validation

```typescript
import { z } from "zod";

export const projectSchema = z.object({
  id: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "ID must be lowercase alphanumeric with hyphens"),

  title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must be 200 characters or less"),

  longDescription: z.string().optional(),

  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required")
    .max(10, "Maximum 10 technologies allowed"),

  category: z.enum([
    "web-development",
    "mobile-development",
    "data-analysis",
    "machine-learning",
    "devops",
    "design",
    "open-source",
    "other",
  ]),

  status: z.enum(["planning", "in-progress", "completed", "maintained", "deprecated"]),

  featured: z.boolean(),
  priority: z.number().min(1).max(100),

  githubUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  designUrl: z.string().url().optional(),

  thumbnailUrl: z.string().url(),
  imageUrls: z.array(z.string().url()),
  videoUrl: z.string().url().optional(),

  stars: z.number().min(0).optional(),
  forks: z.number().min(0).optional(),
  downloads: z.number().min(0).optional(),

  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),

  challenges: z.array(z.string()).optional(),
  learnings: z.array(z.string()).optional(),
  futureImprovements: z.array(z.string()).optional(),
});

export type ProjectValidated = z.infer<typeof projectSchema>;
```

#### 6.1.2 Blog Post Validation

```typescript
export const blogPostSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),

  title: z.string().min(1, "Title is required").max(200, "Title must be 200 characters or less"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description must be 300 characters or less"),

  content: z.string().min(100, "Content must be at least 100 characters"),

  category: z.enum(["tutorial", "insights", "review", "news", "personal", "technical", "career"]),

  tags: z
    .array(z.string())
    .min(1, "At least one tag is required")
    .max(10, "Maximum 10 tags allowed"),

  series: z.string().optional(),
  seriesOrder: z.number().min(1).optional(),

  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean(),

  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),

  readingTime: z.number().min(1).max(120),
  wordCount: z.number().min(100),
  language: z.enum(["ja", "en"]),

  seo: z.object({
    metaTitle: z.string().max(60).optional(),
    metaDescription: z.string().max(160).optional(),
    ogImage: z.string().url().optional(),
    canonicalUrl: z.string().url().optional(),
    keywords: z.array(z.string()).max(10),
  }),
});

export type BlogPostValidated = z.infer<typeof blogPostSchema>;
```

### 6.2 Query Parameter Validation

#### 6.2.1 Project Filter Validation

```typescript
export const projectFilterSchema = z.object({
  page: z.coerce.number().min(1).max(1000).default(1),
  limit: z.coerce.number().min(1).max(50).default(12),
  category: z
    .enum([
      "web-development",
      "mobile-development",
      "data-analysis",
      "machine-learning",
      "devops",
      "design",
      "open-source",
      "other",
    ])
    .optional(),
  technology: z.string().max(50).optional(),
  featured: z.coerce.boolean().optional(),
  status: z.enum(["planning", "in-progress", "completed", "maintained", "deprecated"]).optional(),
  sort: z.enum(["date", "title", "priority", "stars"]).default("date"),
  order: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().max(100).optional(),
});

export type ProjectFilter = z.infer<typeof projectFilterSchema>;
```

#### 6.2.2 Blog Filter Validation

```typescript
export const blogFilterSchema = z.object({
  page: z.coerce.number().min(1).max(1000).default(1),
  limit: z.coerce.number().min(1).max(20).default(10),
  category: z
    .enum(["tutorial", "insights", "review", "news", "personal", "technical", "career"])
    .optional(),
  tag: z.string().max(50).optional(),
  featured: z.coerce.boolean().optional(),
  status: z.enum(["draft", "published", "archived"]).default("published"),
  sort: z.enum(["date", "title", "readingTime"]).default("date"),
  order: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().max(100).optional(),
  language: z.enum(["ja", "en"]).optional(),
});

export type BlogFilter = z.infer<typeof blogFilterSchema>;
```

---

## 7. File Structure Standards

### 7.1 Content File Organization

```
content/
├── projects/
│   ├── projects.json           # Project metadata
│   └── details/               # Project detail pages (MDX)
│       ├── portfolio-site.mdx
│       ├── ecommerce-app.mdx
│       └── data-dashboard.mdx
├── blog/                      # Blog posts (MDX)
│   ├── 2025/
│   │   ├── 01-nextjs-portfolio.mdx
│   │   ├── 02-typescript-tips.mdx
│   │   └── 03-performance-optimization.mdx
│   └── 2024/
│       └── ...
└── data/                      # Static data files
    ├── personal.json          # Personal information
    ├── skills.json            # Skills and experience
    ├── experience.json        # Work experience
    └── config.json            # Site configuration
```

### 7.2 Type Definition Organization

```
src/types/
├── index.ts                   # Re-export all types
├── common.ts                  # Common/shared types
├── project.ts                 # Project-related types
├── blog.ts                    # Blog-related types
├── skills.ts                  # Skills and experience types
├── personal.ts                # Personal information types
├── api.ts                     # API response types
├── component.ts               # React component prop types
└── external/                  # External API types
    ├── github.ts
    ├── analytics.ts
    └── cms.ts
```

---

## 8. Development Guidelines

### 8.1 Type Safety Rules

1. **Strict TypeScript**: All files must pass TypeScript strict mode
2. **No `any` types**: Use specific types or `unknown` with type guards
3. **Interface over Type**: Prefer interfaces for object shapes
4. **Zod validation**: All external data must be validated with Zod schemas
5. **Type guards**: Implement type guards for runtime type checking

### 8.2 Data Consistency Rules

1. **Immutable data**: All data transformations should be immutable
2. **Single source of truth**: Each piece of data should have one authoritative source
3. **Consistent naming**: Follow established naming conventions throughout
4. **Validation at boundaries**: Validate data at system boundaries (file reads, API calls)
5. **Error handling**: All data operations must handle potential errors gracefully

### 8.3 Component Interface Rules

1. **Explicit props**: All component props must be explicitly typed
2. **Optional by default**: Make props optional when reasonable defaults exist
3. **Composition over configuration**: Prefer composable components over heavily configured ones
4. **Event naming**: Event handlers should follow `onAction` pattern
5. **Forward refs**: Use `forwardRef` for components that might need DOM access

---
