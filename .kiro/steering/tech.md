# Technology Stack

## Architecture

### System Design
- **Architecture Pattern**: Jamstack (JavaScript, APIs, Markup)
- **Deployment Strategy**: Static Site Generation (SSG) with Incremental Static Regeneration (ISR)
- **Content Management**: File-based (Phase 1) → Headless CMS (Phase 2)
- **State Management**: React Context + SWR for data fetching

## Frontend Stack

### Core Framework
```yaml
Next.js: 14.2+
  - App Router architecture
  - TypeScript strict mode enabled
  - Static generation (SSG) primary
  - Server-side rendering (SSR) as needed
```

### UI and Styling
```yaml
Tailwind CSS: 3.4+
  - JIT (Just-In-Time) compilation
  - Custom design tokens
  - Dark mode support (class strategy)
  - Responsive breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)

Icons: Lucide React
Fonts: Inter (Google Fonts)
```

### State Management
```yaml
Global State: React Context
  - ThemeContext (dark mode)
  - LanguageContext (i18n)
  - UserPreferencesContext

Data Fetching: SWR 2.2+
  - GitHub API integration
  - External API caching
  - Optimistic updates
```

### Development Tools
```yaml
TypeScript: 5.2+
ESLint: 8.x + recommended rules
Prettier: 3.x + Tailwind plugin
Husky: Git hooks for quality gates
lint-staged: Pre-commit file processing
```

## Content Management

### Phase 1: File-based
```yaml
MDX: Blog articles with syntax highlighting
JSON: Structured project data
Gray-matter: Frontmatter parsing
Rehype/Remark: Markdown processing plugins
```

### Phase 2: Headless CMS (Planned)
```yaml
Options: Contentful or Sanity
Integration: Webhook-based regeneration
Preview: Draft content preview mode
```

## Infrastructure

### Hosting and Deployment
```yaml
Primary Platform: Vercel
  - Zero-config deployment
  - Edge Functions
  - Built-in image optimization
  - Analytics integration

DNS and CDN: Cloudflare
  - Global CDN
  - Security headers
  - Performance optimization
```

### CI/CD Pipeline
```yaml
GitHub Actions:
  Pull Request Triggers:
    - ESLint execution
    - TypeScript type checking
    - Jest unit tests
    - Lighthouse CI performance tests

  Main Branch Triggers:
    - Production deployment
    - Sitemap generation
    - Performance monitoring
```

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run type-check   # TypeScript validation
```

### Testing and Quality
```bash
npm run test         # Jest unit tests
npm run test:watch   # Jest watch mode
npm run lighthouse   # Lighthouse CI
npm run format       # Prettier formatting
```

### Content Management
```bash
npm run build-sitemap  # Generate XML sitemap
npm run optimize-images # Image optimization
npm run validate-content # Content validation
```

## Environment Variables

### Development (.env.local)
```bash
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
GITHUB_TOKEN=
RECAPTCHA_SECRET_KEY=
RECAPTCHA_SITE_KEY=
```

### Production (.env.production)
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://aoyama01.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
RECAPTCHA_SECRET_KEY=6Xxxxxxxxxxxxxxxxx
RECAPTCHA_SITE_KEY=6Xxxxxxxxxxxxxxxxx
EMAIL_SERVICE_API_KEY=SG.xxxxxxxxxx
```

## Port Configuration

### Development Ports
- **Main Application**: 3000 (Next.js dev server)
- **Storybook**: 6006 (Component development)
- **Jest**: N/A (Test runner)

### External Service Integration
- **GitHub API**: api.github.com (repository data)
- **reCAPTCHA**: google.com/recaptcha (form security)
- **Analytics**: vercel-insights.com (performance tracking)

## Performance Requirements

### Core Web Vitals Targets
| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint (FCP) | < 1.8s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| First Input Delay (FID) | < 100ms | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| Time to Interactive (TTI) | < 3.8s | Lighthouse |

### Optimization Strategies
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Dynamic imports for heavy components
- **Bundle Analysis**: Regular bundle size monitoring
- **Cache Strategy**: ISR + SWR for optimal content freshness

## Security Configuration

### Security Headers (next.config.js)
```javascript
Content-Security-Policy: Strict content sources
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Form Security
- **Input Validation**: Zod schema validation
- **XSS Protection**: Input sanitization
- **Bot Prevention**: Google reCAPTCHA v3
- **Rate Limiting**: Vercel Edge Functions

## Monitoring and Analytics

### Performance Monitoring
- **Vercel Analytics**: Real user metrics
- **Lighthouse CI**: Automated performance testing
- **Core Web Vitals**: Continuous monitoring

### Error Tracking
- **Vercel Functions**: Built-in error logging
- **Client-side Errors**: Custom error boundary
- **Form Submission**: Success/failure tracking