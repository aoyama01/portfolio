# Product Requirements Document (PRD)

## ポートフォリオサイト

---

### Document Information

- **Product**: Portfolio Website
- **Version**: 1.0.0
- **Last Updated**: 2025 年 9 月 28 日
- **Author**: aoyama01
- **Status**: Initial Draft

---

## 1. Executive Summary

### 1.1 Product Vision

就職活動およびキャリア形成において、技術力・実績・人物像を効果的に伝える個人ポートフォリオプラットフォームを構築する。従来のレジュメでは表現しきれない実装力・問題解決能力・継続的な学習姿勢を可視化し、採用担当者およびエンジニアとの効果的なコミュニケーションを実現する。

### 1.2 Business Objectives

- 技術力と実績の効果的な可視化による採用機会の拡大
- 自己ブランディング基盤の確立
- 継続的な成長記録・発信プラットフォームの構築
- 実装スキル自体のポートフォリオとしての証明

### 1.3 Success Metrics

| Metric                   | Target               | Time Frame |
| ------------------------ | -------------------- | ---------- |
| Monthly Unique Visitors  | 100+                 | 3 months   |
| Average Session Duration | 2+ minutes           | 3 months   |
| Contact Inquiries        | 2+ per month         | 6 months   |
| Lighthouse Score         | 90+ (all categories) | Launch     |
| Content Updates          | Weekly               | Ongoing    |

---

## 2. Market Analysis

### 2.1 Target Users

#### Primary Users

| User Type             | Goals                            | Key Requirements                         |
| --------------------- | -------------------------------- | ---------------------------------------- |
| 採用担当者            | スキル・実績確認、人物像把握     | 見やすさ、実績の具体性、連絡しやすさ     |
| エンジニア/技術責任者 | 技術力詳細確認、協働可能性判断   | コード品質、技術選定、問題解決アプローチ |
| 自分自身              | スキル棚卸し、成長記録、振り返り | 更新しやすさ、データ一元管理             |

#### User Personas

**Persona 1: HR 採用担当者**

- 年齢: 20-40 代
- 技術理解: 中
- 重視要素: 見やすさ、実績の具体性、コミュニケーション能力
- 利用場面: 書類選考、面接前の事前調査

**Persona 2: エンジニアリングマネージャー**

- 年齢: 30-50 代
- 技術理解: 高
- 重視要素: 技術的深度、問題解決力、成長性
- 利用場面: 技術面接、チーム適性判断

---

## 3. Product Requirements

### 3.1 Core Features (Must Have)

#### 3.1.1 Home Page

- **Hero Section**: キャッチコピー、プロフィール写真、CTA
- **Highlights**: 主要プロジェクト 3-5 個、最新ブログ記事 3 件
- **Stats**: GitHub 貢献、プロジェクト数、技術数、ブログ投稿数

#### 3.1.2 Projects Section

- **Project Listing**: カード形式、フィルタリング（技術/年/カテゴリ）
- **Project Details**: 概要、技術詳細、ビジュアル、学習と振り返り
- **Navigation**: ソート機能（新着/人気/複雑度）

#### 3.1.3 Resume Page

- **Skills**: 技術スタック（習熟度レベル付き）、ソフトスキル
- **Experience**: 職歴、インターンシップ、OSS 貢献
- **Certifications**: 技術資格、オンラインコース修了証
- **PDF Export**: ワンクリック PDF 生成・ダウンロード

#### 3.1.4 Contact Form

- **Basic Form**: 名前、メール、件名、本文
- **Security**: reCAPTCHA 統合、サニタイゼーション
- **Alternative Contact**: SNS リンク、カレンダー予約

### 3.2 Enhanced Features (Should Have)

#### 3.2.1 Blog System

- **Article Management**: MDX 対応、シンタックスハイライト
- **Navigation**: カテゴリータグ、検索機能、目次
- **Social Features**: 共有ボタン、読了時間表示

#### 3.2.2 About Page

- **Profile Details**: 経歴、興味分野、価値観、パーソナリティ
- **Timeline**: 学歴、職歴、マイルストーン

#### 3.2.3 Internationalization

- **Language Support**: 日本語/英語切り替え
- **URL Management**: /ja/, /en/ ベース
- **Auto Detection**: ブラウザ言語設定連動

#### 3.2.4 Dark Mode

- **System Integration**: OS 設定連動
- **Manual Toggle**: 手動切り替え可能
- **Persistence**: localStorage 保存

### 3.3 Nice to Have Features

#### 3.3.1 Advanced Interactions

- **Animations**: スクロールアニメーション、ホバーエフェクト
- **Transitions**: ページ遷移アニメーション
- **Loading States**: スケルトンスクリーン

#### 3.3.2 Search & Filter

- **Full-text Search**: プロジェクト、ブログ記事
- **Advanced Filtering**: タグベース、複数条件 AND/OR

---

## 4. Technical Requirements

### 4.1 Technology Stack

#### Frontend

```yaml
Framework: Next.js 14+
Language: TypeScript 5+
Styling: Tailwind CSS 3+
State Management:
  - React Context (global state)
  - SWR/TanStack Query (data fetching)
```

#### Content Management

```yaml
Phase 1 (MVP):
  - MDX files (blog, project details)
  - JSON files (structured data)
Phase 2 (Extended):
  - Headless CMS (Contentful/Sanity)
  - GitHub API (repository info)
```

#### Infrastructure

```yaml
Hosting: Vercel
CDN: Vercel Edge Network
Domain: Custom domain
DNS: Cloudflare
CI/CD: GitHub Actions
```

### 4.2 Performance Requirements

| Metric                         | Target  | Measurement |
| ------------------------------ | ------- | ----------- |
| First Contentful Paint (FCP)   | < 1.8s  | Lighthouse  |
| Largest Contentful Paint (LCP) | < 2.5s  | Lighthouse  |
| First Input Delay (FID)        | < 100ms | Lighthouse  |
| Cumulative Layout Shift (CLS)  | < 0.1   | Lighthouse  |
| Time to Interactive (TTI)      | < 3.8s  | Lighthouse  |

### 4.3 Security Requirements

#### HTTPS & Headers

- SSL/TLS certificate implementation
- Automatic HTTP to HTTPS redirect
- Security headers (CSP, X-Frame-Options, HSTS)

#### Data Protection

- Form input sanitization
- XSS protection
- Input validation

### 4.4 Accessibility Requirements

#### WCAG 2.1 Level AA Compliance

- Semantic HTML structure
- ARIA labels implementation
- Keyboard navigation support
- Screen reader compatibility
- Color contrast 4.5:1+
- Focus indicators
- Reduced motion support

### 4.5 SEO Requirements

#### Technical SEO

- Meta tags optimization (title, description)
- Structured data (JSON-LD)
- XML sitemap
- robots.txt
- Canonical URLs

#### Content SEO

- Open Graph Protocol support
- Twitter Card support
- Proper heading structure (h1-h6)

---

## 5. Development Roadmap

### Phase 1: MVP (1-2 weeks)

**Scope**: Core functionality for immediate use

- [] Basic page structure (Home, Projects, Resume, Contact)
- [] Responsive design
- [] Basic SEO optimization
- [] GitHub Actions deployment
- [] Vercel hosting setup

**Deliverables**:

- Functional portfolio site
- 3-5 projects showcased
- Basic resume information
- Contact form

### Phase 2: Feature Enhancement (2-3 weeks)

**Scope**: Extended functionality and improved UX

- [] Project detail pages
- [] Blog system (MDX)
- [] Dark mode support
- [] Internationalization (JP/EN)
- [] Contact form implementation
- [] Animations and interactions
- [] PDF export functionality

**Deliverables**:

- Full-featured portfolio site
- 5-10 blog articles
- Enhanced user experience
- Multi-language support

### Phase 3: Optimization & Advanced Features (1-2 weeks)

**Scope**: Performance optimization and advanced capabilities

- [] Performance optimization
- [] Analytics integration
- [] A/B testing implementation
- [] CMS integration (if needed)
- [] E2E testing
- [] Storybook integration
- [] Monitoring & alerting setup

**Deliverables**:

- Production-ready site
- Continuous improvement foundation
- Complete documentation
- Monitoring infrastructure

---

## 6. Quality Assurance

### 6.1 Testing Strategy

#### Unit Testing

- Component testing with Jest/React Testing Library
- Coverage target: 70%+
- Utility function testing

#### Integration Testing

- API integration testing
- Form submission testing
- Navigation flow testing

#### End-to-End Testing

- Critical user journeys
- Cross-browser compatibility
- Mobile responsiveness

#### Performance Testing

- Lighthouse CI integration
- Core Web Vitals monitoring
- Load testing

### 6.2 Code Quality

#### Standards

- TypeScript strict mode
- ESLint/Prettier configuration
- Git pre-commit hooks

#### Documentation

- Component documentation (Storybook)
- API documentation
- README.md maintenance
- Deployment guides

---

## 7. Operations & Maintenance

### 7.1 Content Management

#### Regular Updates

- **Weekly**: Blog posts, project updates
- **Monthly**: Skills and experience updates
- **Quarterly**: Design and feature reviews

#### Content Strategy

- Technical blog posts (tutorial, insights)
- Project case studies
- Career progression updates
- Industry trend commentary

### 7.2 Monitoring & Analytics

#### Key Metrics

- Page views and unique visitors
- User engagement (session duration, bounce rate)
- Contact form submissions
- Performance metrics (Core Web Vitals)

#### Tools

- Google Analytics 4
- Vercel Analytics
- Lighthouse CI
- Error monitoring (Sentry)

### 7.3 Maintenance Schedule

#### Weekly

- Content updates
- Analytics review
- Security updates

#### Monthly

- Dependency updates
- Performance testing
- Backup verification

#### Quarterly

- Feature planning
- Design updates
- Security audit

---

## 8. Risk Management

### 8.1 Technical Risks

| Risk                      | Impact | Probability | Mitigation                              |
| ------------------------- | ------ | ----------- | --------------------------------------- |
| Implementation complexity | High   | Medium      | Phased approach, technical research     |
| Performance degradation   | Medium | Medium      | Regular monitoring, optimization        |
| Security vulnerabilities  | High   | Low         | Security best practices, regular audits |
| Content management burden | High   | High        | CMS integration, automated workflows    |

### 8.2 Business Risks

| Risk                         | Impact | Probability | Mitigation                              |
| ---------------------------- | ------ | ----------- | --------------------------------------- |
| Low visitor engagement       | High   | Medium      | SEO optimization, content marketing     |
| Outdated content             | Medium | High        | Automated reminders, CMS workflows      |
| Technical skill obsolescence | High   | Low         | Continuous learning, technology updates |

---

## 9. Budget & Resources

### 9.1 Development Resources

- **Development Time**: 120-160 hours (2-4 weeks)
- **Skills Required**: Frontend development, Design, Content creation

### 9.2 Infrastructure Costs

#### Initial Setup

| Item   | Annual Cost | Notes                                                                                                     |
| ------ | ----------- | --------------------------------------------------------------------------------------------------------- |
| Domain | ¥0-4,000    | Already have .com domain free for first year. Intended to use .dev domain (but this is not free (¥4,000)) |

#### Operational Costs (Monthly)

| Item        | Cost      | Notes                    |
| ----------- | --------- | ------------------------ |
| Hosting     | ¥0-2,400  | Vercel free/pro tier     |
| Monitoring  | ¥0-1,000  | Basic free tier usage    |
| Maintenance | 4-8 hours | Content updates included |

---

## 10. Appendix

### 10.1 Reference Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### 10.2 Implementation Checklist

- [x] Domain acquisition (aoyama01.com)
- [ ] GitHub repository setup
- [ ] Vercel account configuration
- [ ] Development environment setup
- [ ] Design mockup creation
- [ ] Content preparation (projects, about)
- [ ] SEO metadata preparation
- [ ] Test plan development
- [ ] Release plan finalization

---
