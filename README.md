# Portfolio Website

A modern portfolio platform built with Next.js 15, showcasing projects, blog posts, and professional experience. This site demonstrates technical expertise through its implementation while effectively presenting skills and achievements.

## 🎯 Project Overview

This portfolio website serves multiple purposes:

- **Job Applications**: Showcase technical skills and projects to recruiters and hiring managers
- **Technical Interviews**: Demonstrate implementation capabilities and problem-solving approaches
- **Career Documentation**: Maintain a comprehensive record of skills and growth
- **Professional Networking**: Create connections within the industry

## 🚀 Tech Stack

### Core Framework

- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.1** - UI library
- **TypeScript 5** - Type-safe JavaScript

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework with JIT compilation
- **Lucide React** - Icon library
- **@tailwindcss/typography** - Beautiful typographic defaults for MDX content

### Content Management

- **MDX** - Markdown with React components for blog posts
- **@next/mdx** - Next.js MDX integration
- **gray-matter** - Frontmatter parsing
- **rehype-highlight** - Syntax highlighting for code blocks
- **remark-gfm** - GitHub Flavored Markdown support

### Development Tools

- **ESLint 9** - Code linting with Next.js recommended rules
- **Prettier 3** - Code formatting with Tailwind plugin
- **Husky** - Git hooks for quality gates
- **lint-staged** - Pre-commit file processing

### Testing

- **Jest 29** - JavaScript testing framework
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers for DOM

### Utilities

- **date-fns** - Date formatting and manipulation
- **Zod** - Schema validation for forms

## 📋 Prerequisites

- **Node.js**: 20.x or higher
- **npm**: 10.x or higher
- **Git**: For version control

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```bash
   # Required for development
   NODE_ENV=development
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME="Portfolio Website"

   # Optional: GitHub API for repository stats
   GITHUB_TOKEN=your_github_token

   # Required for production: Contact form
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret
   RECAPTCHA_SITE_KEY=your_recaptcha_site_key

   # Required for production: Email service
   EMAIL_SERVICE_API_KEY=your_email_api_key
   EMAIL_FROM=your.email@example.com
   EMAIL_TO=your.email@example.com
   ```

## 🚦 Getting Started

### Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

Create an optimized production build:

```bash
npm run build
```

### Running Production Build Locally

After building, start the production server:

```bash
npm start
```

## 📝 Available Scripts

### Development

- `npm run dev` - Start Next.js development server (port 3000)
- `npm run build` - Create production build
- `npm start` - Start production server

### Code Quality

- `npm run lint` - Run ESLint to check code issues
- `npm run lint:fix` - Automatically fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Testing

- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode

## 📁 Project Structure

```
portfolio/
├── .claude/              # Claude Code configuration and commands
├── .kiro/                # Kiro spec-driven development files
│   ├── steering/         # Project guidance documents
│   └── specs/           # Feature specifications
├── content/             # Content files
│   ├── blog/            # Blog post MDX files
│   ├── data/            # Static JSON data
│   └── projects/        # Project content
├── docs/                # Project documentation
├── public/              # Static assets
│   ├── images/          # Image files
│   └── robots.txt       # SEO configuration
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── blog/        # Blog pages
│   │   ├── contact/     # Contact page
│   │   ├── projects/    # Projects pages
│   │   ├── resume/      # Resume page
│   │   └── actions/     # Server actions
│   ├── components/      # React components
│   │   ├── blog/        # Blog components
│   │   ├── contact/     # Contact components
│   │   ├── features/    # Feature-specific components
│   │   ├── layout/      # Layout components
│   │   ├── mdx/         # MDX components
│   │   ├── projects/    # Project components
│   │   ├── resume/      # Resume components
│   │   └── ui/          # Reusable UI components
│   ├── lib/             # Utility functions
│   ├── providers/       # React Context providers
│   └── types/           # TypeScript type definitions
├── tests/               # Test files
└── package.json         # Project dependencies
```

## 🎨 Key Features

### Current Features

- **Blog System**: MDX-powered blog with syntax highlighting and GitHub Flavored Markdown
- **Projects Portfolio**: Showcase of technical projects with detailed descriptions
- **Resume/CV**: Professional experience and skills presentation
- **Contact Form**: Secure contact form with validation
- **Responsive Design**: Mobile-first design approach
- **SEO Optimization**: Meta tags, sitemap, and robots.txt

### Planned Features

- Dark mode theme toggle
- Internationalization (Japanese/English)
- Analytics integration
- Advanced animations
- Full-text search

## 🔧 Configuration Files

- **next.config.ts** - Next.js configuration with MDX and security headers
- **tsconfig.json** - TypeScript compiler options
- **eslint.config.mjs** - ESLint rules and configuration
- **tailwind.config.js** - Tailwind CSS customization
- **jest.config.mjs** - Jest testing configuration
- **postcss.config.mjs** - PostCSS plugins configuration

## 🌐 Deployment

### Vercel (Recommended)

This project is optimized for deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

Configuration is already set in `vercel.json`:

- Framework: Next.js
- Region: Tokyo (hnd1)
- Deployment branches: main, dev

### Manual Deployment

For other platforms:

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the `.next` folder and necessary files to your hosting service

3. Ensure Node.js runtime is available

4. Set required environment variables

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Structure

- Component tests in `__tests__` directories
- Integration tests for pages
- Utility function tests

## 🔐 Security

Security headers are configured in `next.config.ts`:

- Strict Transport Security (HSTS)
- X-Frame-Options (Clickjacking protection)
- X-Content-Type-Options (MIME sniffing prevention)
- X-XSS-Protection
- Referrer Policy
- Permissions Policy

## 📊 Performance

Target metrics (Lighthouse):

- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

Optimization strategies:

- Next.js Image component with AVIF/WebP support
- Static generation (SSG) for optimal loading
- Code splitting and dynamic imports
- Bundle size monitoring

## 🤝 Development Workflow

This project uses **Kiro spec-driven development** methodology:

1. **Specifications** in `.kiro/specs/` - Feature requirements and design
2. **Steering documents** in `.kiro/steering/` - Project-wide guidance
3. **Custom commands** in `.claude/commands/` - Development automation

### Git Hooks

Pre-commit hooks ensure code quality:

- ESLint checks and auto-fix
- Prettier formatting
- TypeScript type checking

## 📖 Documentation

Additional documentation in the `docs/` directory:

- Product Requirements Document (PRD)
- Technical Design
- Data Schema Specification
- Deployment Guide

## 🐛 Troubleshooting

### Common Issues

**Port 3000 already in use:**

```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
# Or use a different port
npm run dev -- -p 3001
```

**Module not found errors:**

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**TypeScript errors:**

```bash
# Run type checking
npm run type-check
```

**WSL-specific issues:**
If file watching doesn't work on WSL, ensure `WATCHPACK_POLLING=true` is set in `.env.local`

## 📄 License

This project is private and not licensed for public use.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
