# Project Structure

## Root Directory Organization

```
aoyama01/
├── .claude/              # Claude Code configuration
│   ├── commands/         # Custom slash commands for Kiro
│   └── hooks/           # Git hooks and automation
├── .kiro/               # Kiro spec-driven development
│   ├── steering/        # Project steering documents
│   └── specs/          # Feature specifications
├── src/                 # Main application source code
├── content/            # Content files (MDX, JSON)
├── public/             # Static assets
├── docs/               # Project documentation
├── tests/              # Test files
└── config/             # Configuration files
```

## Source Code Structure (src/)

### Next.js App Router Architecture
```
src/
├── app/                    # Next.js 14 App Router
│   ├── [locale]/          # Internationalization routing
│   │   ├── page.tsx       # Home page
│   │   ├── about/         # About page
│   │   ├── projects/      # Projects listing and details
│   │   │   ├── page.tsx   # Projects index
│   │   │   └── [slug]/    # Individual project pages
│   │   ├── resume/        # Resume/CV page
│   │   ├── blog/          # Blog system
│   │   │   ├── page.tsx   # Blog index
│   │   │   └── [slug]/    # Individual blog posts
│   │   ├── contact/       # Contact form page
│   │   └── api/           # API routes
│   │       ├── contact/   # Contact form handler
│   │       └── github/    # GitHub API proxy
│   ├── globals.css        # Global CSS styles
│   └── layout.tsx         # Root layout component
```

### Component Architecture
```
src/components/
├── ui/                    # Reusable UI primitives
│   ├── Button.tsx         # Button component variants
│   ├── Card.tsx           # Card layout component
│   ├── Input.tsx          # Form input components
│   ├── Modal.tsx          # Modal dialog component
│   └── LoadingSpinner.tsx # Loading states
├── layout/                # Layout-specific components
│   ├── Header.tsx         # Site header with navigation
│   ├── Footer.tsx         # Site footer
│   ├── Navigation.tsx     # Main navigation menu
│   └── SEO.tsx           # SEO meta tags component
├── features/              # Feature-specific components
│   ├── home/              # Homepage components
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsHighlight.tsx
│   │   └── StatsSection.tsx
│   ├── projects/          # Projects feature
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectFilter.tsx
│   │   └── ProjectDetail.tsx
│   ├── blog/              # Blog feature
│   │   ├── BlogCard.tsx
│   │   ├── BlogPost.tsx
│   │   └── BlogNavigation.tsx
│   └── contact/           # Contact feature
│       ├── ContactForm.tsx
│       └── ContactInfo.tsx
└── providers/             # React Context providers
    ├── ThemeProvider.tsx  # Dark/light theme
    ├── LanguageProvider.tsx # i18n support
    └── SWRProvider.tsx    # Data fetching config
```

### Utility and Configuration
```
src/
├── lib/                   # Utility functions and configurations
│   ├── utils.ts           # General utility functions
│   ├── constants.ts       # Application constants
│   ├── mdx.ts            # MDX processing utilities
│   ├── api.ts            # API client functions
│   └── validations.ts     # Form validation schemas
├── hooks/                 # Custom React hooks
│   ├── useTheme.ts        # Theme management
│   ├── useLanguage.ts     # Language switching
│   └── useLocalStorage.ts # localStorage utilities
├── types/                 # TypeScript type definitions
│   ├── project.ts         # Project data types
│   ├── blog.ts           # Blog post types
│   └── common.ts         # Shared types
└── styles/               # Additional CSS files
    └── components.css     # Component-specific styles
```

## Content Organization

### Content Structure
```
content/
├── projects/              # Project portfolio data
│   ├── projects.json      # Project metadata index
│   └── details/           # Individual project details
│       ├── portfolio-site.mdx
│       └── mobile-app.mdx
├── blog/                  # Blog articles
│   ├── 2025-09-28-nextjs-portfolio.mdx
│   └── 2025-10-01-typescript-tips.mdx
└── data/                  # Static data files
    ├── skills.json        # Technical skills
    ├── experience.json    # Work experience
    └── personal.json      # Personal information
```

### Static Assets
```
public/
├── images/                # Image assets
│   ├── projects/          # Project screenshots
│   ├── blog/             # Blog post images
│   └── profile/          # Profile photos
├── documents/            # Downloadable files
│   └── resume.pdf        # CV/Resume PDF
├── icons/                # Icon files
│   ├── favicon.ico
│   └── apple-touch-icon.png
├── robots.txt            # Search engine directives
└── sitemap.xml          # Site structure for SEO
```

## Code Organization Patterns

### File Naming Conventions
- **Components**: PascalCase (e.g., `ProjectCard.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Pages**: lowercase with hyphens (e.g., `about/page.tsx`)
- **Constants**: SCREAMING_SNAKE_CASE in files, PascalCase for files

### Import Organization
```typescript
// 1. React and Next.js imports
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 2. Third-party library imports
import { motion } from 'framer-motion';
import { format } from 'date-fns';

// 3. Internal imports (absolute paths using @/ alias)
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { Project } from '@/types/project';

// 4. Relative imports
import './component.css';
```

### Component Structure Pattern
```typescript
// Type definitions first
interface ComponentProps {
  // prop types
}

// Main component
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Hooks
  // Event handlers
  // Render logic

  return (
    // JSX
  );
}

// Default export (if needed)
export default ComponentName;
```

## Key Architectural Principles

### App Router Patterns
- **Server Components**: Default for static content
- **Client Components**: Only when interactivity is needed ("use client")
- **Layouts**: Shared UI elements across route groups
- **Loading/Error**: Specialized UI for loading and error states

### State Management Strategy
- **Server State**: SWR for external API data
- **Global State**: React Context for theme, language preferences
- **Local State**: useState/useReducer for component-specific state
- **URL State**: Next.js router for navigation and filtering

### Content Management Approach
- **MDX**: Blog posts with embedded React components
- **JSON**: Structured data for projects and skills
- **Static Generation**: Pre-built pages for optimal performance
- **ISR**: Incremental regeneration for content updates

### Testing Structure
```
tests/
├── __mocks__/            # Mock files for testing
├── components/           # Component unit tests
├── pages/               # Page integration tests
├── utils/               # Utility function tests
└── e2e/                # End-to-end tests
```

## Development Workflow Structure

### Configuration Files
```
config/
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS setup
├── tsconfig.json        # TypeScript configuration
├── jest.config.js       # Jest testing setup
├── .eslintrc.json      # ESLint rules
└── .prettierrc         # Prettier formatting
```

### Kiro Spec-Driven Development
```
.kiro/
├── steering/            # Project-wide guidance
│   ├── product.md       # Product context
│   ├── tech.md         # Technology decisions
│   └── structure.md    # This file
└── specs/              # Feature specifications
    └── [feature-name]/ # Individual feature specs
        ├── requirements.md
        ├── design.md
        └── tasks.md
```

This structure follows modern React/Next.js best practices while supporting the Kiro spec-driven development methodology for systematic feature development.