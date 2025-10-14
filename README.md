# Portfolio Website

モダンなWeb技術を活用した個人ポートフォリオサイト。Next.js 15 + React 19を使用し、プロジェクト紹介、ブログシステム、スキル紹介を実装。キャリア形成において、技術力・実績・人物像を効果的に伝えることを目的としています。

## 目次

- [開発した背景](#開発した背景)
- [デモ](#デモ)
- [主要機能](#主要機能)
- [使用技術](#使用技術)
- [セットアップ](#セットアップ)
- [ビルド・デプロイ](#ビルドデプロイ)
- [ディレクトリ構造](#ディレクトリ構造)
- [こだわり・工夫した点](#こだわり工夫した点)
- [テストの実行](#テストの実行)
- [環境変数の設定](#環境変数の設定)
- [今後の展望](#今後の展望)

## 開発した背景

従来のレジュメでは表現しきれない**実装力・問題解決能力・継続的な学習姿勢**を可視化したいという想いから開発しました。キャリア形成において関わる採用担当者やエンジニアの方に対して以下を効果的に伝えることを目標としています：

- **技術スタックの幅広さと深さ**: 実務で培った技術力の可視化
- **プロジェクト実装力**: 設計から実装、デプロイまでの一貫した経験
- **コード品質へのこだわり**: TypeScript strict mode、テスト、セキュリティ対策の徹底
- **継続的な学習姿勢**: ブログを通じた技術発信と知識の共有

技術選択自体もポートフォリオとしての価値を持つよう、最新のベストプラクティスを実装しています。

## デモ

プロジェクトは以下の環境にデプロイされています：

- **本番環境**: https://www.aoyama01.com
- **開発環境**: Vercel Preview Deployments

### 主要ページ

- **ホーム**: プロフィール、主要スキル、クイックアクセス
- **プロジェクト一覧**: 実装したプロジェクトの詳細紹介
- **レジュメ**: スキル、経験、学歴の一覧
- **ブログ**: 技術記事とナレッジの共有
- **お問い合わせ**: セキュアなコンタクトフォーム

## 主要機能

### 実装済み機能

- **ポートフォリオ管理**
  - プロジェクト一覧表示（カード形式）
  - プロジェクト詳細ページ（MDX対応）
  - 技術スタック・カテゴリー別フィルタリング

- **レジュメ管理**
  - スキルセクション（カテゴリー別表示、習熟度レベル付き）
  - 経験セクション（職歴、実績）
  - 学歴セクション

- **ブログシステム**
  - MDXによるブログ記事管理
  - シンタックスハイライト（rehype-highlight）
  - GitHub Flavored Markdown対応（remark-gfm）
  - 外部ブログ連携機能

- **UI/UX**
  - ダークモード対応（システム設定連動）
  - レスポンシブデザイン（モバイルファースト）
  - アクセシビリティ対応（WCAG 2.1 Level AA準拠）

- **セキュリティ**
  - セキュリティヘッダー設定（CSP, HSTS, X-Frame-Options等）
  - フォームバリデーション（Zod統合）
  - XSS/CSRF対策

- **SEO最適化**
  - 動的サイトマップ生成
  - Meta tags最適化
  - セマンティックHTML構造

## 使用技術

### Frontend

| 技術 | バージョン | 用途 |
|------|----------|------|
| [Next.js](https://nextjs.org/) | 15.5.4 | フレームワーク（App Router使用） |
| [React](https://react.dev/) | 19.1.1 | UIライブラリ（Server Components対応） |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | 型安全な開発（Strict mode有効） |
| [Tailwind CSS](https://tailwindcss.com/) | ^4 | スタイリング（JIT コンパイル） |

### Content Management

| 技術 | バージョン | 用途 |
|------|----------|------|
| [@next/mdx](https://nextjs.org/docs/app/building-your-application/configuring/mdx) | ^15.5.4 | MDX統合 |
| [next-mdx-remote-client](https://www.npmjs.com/package/next-mdx-remote-client) | ^2.1.6 | リモートMDX処理 |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | ^4.0.3 | Frontmatter解析 |
| [rehype-highlight](https://github.com/rehypejs/rehype-highlight) | ^7.0.2 | シンタックスハイライト |
| [rehype-slug](https://github.com/rehypejs/rehype-slug) | ^6.0.0 | 見出しID自動生成 |
| [remark-gfm](https://github.com/remarkjs/remark-gfm) | ^4.0.1 | GitHub Flavored Markdown |

### Development Tools

| 技術 | バージョン | 用途 |
|------|----------|------|
| [ESLint](https://eslint.org/) | ^9 | 静的コード解析 |
| [Prettier](https://prettier.io/) | ^3.3.0 | コードフォーマット |
| [Husky](https://typicode.github.io/husky/) | ^9.0.0 | Git hooks管理 |
| [lint-staged](https://github.com/lint-staged/lint-staged) | ^15.2.0 | ステージファイルのみLint |
| [Jest](https://jestjs.io/) | ^29.7.0 | テストフレームワーク |
| [Testing Library](https://testing-library.com/) | ^16.0.0 | React コンポーネントテスト |

### Validation & Utilities

| 技術 | バージョン | 用途 |
|------|----------|------|
| [Zod](https://zod.dev/) | ^4.1.11 | スキーマバリデーション |
| [date-fns](https://date-fns.org/) | ^4.1.0 | 日付操作ライブラリ |
| [lucide-react](https://lucide.dev/) | ^0.544.0 | アイコンライブラリ |

### DevOps & Infrastructure

| 技術 | 用途 |
|------|------|
| [Vercel](https://vercel.com/) | ホスティング、CI/CD、Analytics |
| [GitHub Actions](https://github.com/features/actions) | CI/CDパイプライン |
| Git | バージョン管理 |

## セットアップ

### 前提条件

以下がインストールされていることを確認してください：

- **Node.js**: 20.x 以上
- **npm**: 10.x 以上
- **Git**: 2.x 以上

### インストール

1. リポジトリをクローン

```bash
git clone https://github.com/aoyama01/portfolio.git
cd portfolio
```

2. 依存関係をインストール

```bash
npm install
```

3. 環境変数を設定

```bash
cp .env.local .env.local
```

`.env.local` を編集して必要な環境変数を設定してください（詳細は[環境変数の設定](#環境変数の設定)を参照）。

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### その他の開発コマンド

```bash
# 型チェック
npm run type-check

# Lint実行
npm run lint

# Lint自動修正
npm run lint:fix

# コードフォーマット
npm run format

# テスト実行
npm test

# テスト（Watch mode）
npm run test:watch
```

## ビルド・デプロイ

### 本番ビルド

```bash
npm run build
```

ビルド成果物は `.next` ディレクトリに生成されます。

### 本番サーバーの起動（ローカル確認）

```bash
npm run start
```

### Vercelへのデプロイ

#### 自動デプロイ（推奨）

`main` ブランチへのプッシュで自動的に本番環境にデプロイされます。

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

#### 手動デプロイ

Vercel CLIを使用した手動デプロイ：

```bash
# Vercel CLIのインストール（初回のみ）
npm i -g vercel

# デプロイ
vercel

# 本番環境へのデプロイ
vercel --prod
```

## ディレクトリ構造

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # ホームページ
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── globals.css         # グローバルスタイル
│   │   ├── projects/           # プロジェクト一覧・詳細
│   │   ├── resume/             # レジュメページ
│   │   ├── blog/               # ブログ一覧・詳細
│   │   ├── contact/            # お問い合わせ
│   │   ├── privacy/            # プライバシーポリシー
│   │   ├── actions/            # Server Actions
│   │   └── sitemap.ts          # サイトマップ生成
│   ├── components/             # Reactコンポーネント
│   │   ├── ui/                 # 基本UIコンポーネント
│   │   ├── layout/             # レイアウトコンポーネント
│   │   ├── features/           # 機能別コンポーネント
│   │   ├── home/               # ホームページコンポーネント
│   │   ├── projects/           # プロジェクト関連
│   │   ├── resume/             # レジュメ関連
│   │   ├── blog/               # ブログ関連
│   │   ├── contact/            # コンタクトフォーム
│   │   └── mdx/                # MDXコンポーネント
│   ├── lib/                    # ユーティリティ・設定
│   │   ├── content.ts          # コンテンツ取得関数
│   │   ├── mdx.ts              # MDX処理
│   │   ├── navigation.ts       # ナビゲーション設定
│   │   ├── skills.ts           # スキルデータ処理
│   │   ├── external-blog.ts    # 外部ブログ統合
│   │   └── utils/              # ユーティリティ関数
│   ├── providers/              # Context Providers
│   │   └── ThemeProvider.tsx   # ダークモード管理
│   └── types/                  # TypeScript型定義
│       ├── project.ts          # プロジェクト型
│       ├── skill.ts            # スキル型
│       ├── blog.ts             # ブログ型
│       └── common.ts           # 共通型
├── content/                    # コンテンツファイル
│   ├── projects/               # プロジェクト情報
│   │   ├── projects.json       # プロジェクト一覧
│   │   └── details/            # プロジェクト詳細（MDX）
│   ├── blog/                   # ブログ記事（MDX）
│   └── data/                   # 静的データ
│       ├── personal.json       # 個人情報
│       ├── skills.json         # スキル情報
│       ├── experience.json     # 職歴情報
│       └── education.json      # 学歴情報
├── public/                     # 静的ファイル
│   ├── images/                 # 画像ファイル
│   └── robots.txt              # クローラー設定
├── docs/                       # プロジェクトドキュメント
│   ├── prd.md                  # 要件定義書
│   ├── technical-design.md     # 技術設計書
│   ├── deployment.md           # デプロイ手順
│   └── adr/                    # アーキテクチャ決定記録
└── .github/                    # GitHub設定
    └── workflows/              # GitHub Actions

```

## こだわり・工夫した点

### 技術的なこだわり

1. **最新技術スタックの採用**
   - Next.js 15 + React 19の最新機能（Server Components、App Router）を活用
   - TypeScript strict modeによる型安全性の徹底
   - Tailwind CSS 4による高速なスタイリング

2. **パフォーマンス最適化**
   - 静的生成（SSG）による高速なページロード
   - 画像最適化（AVIF/WebP対応）
   - コード分割とバンドル最適化
   - Core Web Vitals 90点以上を目標

3. **セキュリティ対策の徹底**
   - セキュリティヘッダーの包括的な設定（CSP, HSTS, X-Frame-Options等）
   - Zodによる厳密なバリデーション
   - XSS/CSRF対策の実装

4. **保守性・拡張性の追求**
   - Feature-based ディレクトリ構造
   - コンポーネントの責務分離
   - MDX + JSONによる柔軟なコンテンツ管理
   - 包括的なTypeScript型定義

5. **開発体験（DX）の向上**
   - ESLint + Prettierによるコード品質維持
   - Huskyによるpre-commit hooks
   - Jest + Testing Libraryによる自動テスト
   - 詳細なコメントとドキュメント

### UX/UIのこだわり

- **アクセシビリティ対応**: WCAG 2.1 Level AA準拠、スクリーンリーダー対応
- **レスポンシブデザイン**: モバイルファースト設計、全デバイス対応
- **ダークモード対応**: システム設定との連動、手動切り替え可能
- **直感的なナビゲーション**: クリアな情報アーキテクチャ

### コンテンツのこだわり

- **具体的な実績の可視化**: プロジェクト詳細、技術選定理由、学びの記録
- **継続的な更新**: ブログを通じた技術発信と知識の共有
- **ストーリー性**: 開発背景や課題解決のプロセスを明確に記載

## テストの実行

### 単体テスト

```bash
# すべてのテストを実行
npm test

# Watch modeでテスト実行
npm run test:watch

# カバレッジレポート生成
npm test -- --coverage
```

### テスト対象

- **コンポーネントテスト**: UI コンポーネントの動作確認
- **ユニットテスト**: ユーティリティ関数の検証
- **型テスト**: TypeScript型定義の正確性確認

テストファイルは各ソースファイルと同じディレクトリに `*.test.tsx` または `*.test.ts` として配置されています。

## 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```bash
# 環境設定
NODE_ENV=development

# サイト情報
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Portfolio Website"

# （オプション）外部API統合
# GitHub Personal Access Token（プロジェクト情報取得用）
GITHUB_TOKEN=your_github_token

# （オプション）Google Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# （オプション）reCAPTCHA（お問い合わせフォーム用）
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

### 環境変数の説明

| 変数名 | 必須 | 説明 |
|--------|------|------|
| `NODE_ENV` | ○ | 実行環境（development/production） |
| `NEXT_PUBLIC_SITE_URL` | ○ | サイトのベースURL |
| `NEXT_PUBLIC_SITE_NAME` | ○ | サイト名 |
| `GITHUB_TOKEN` | × | GitHub API アクセス用トークン |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | × | Google Analytics測定ID |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | × | reCAPTCHA サイトキー |
| `RECAPTCHA_SECRET_KEY` | × | reCAPTCHA シークレットキー |

## 今後の展望

### Phase 2: 機能拡張（予定）

- [ ] **Headless CMS統合**: Contentful/Sanityによる直感的なコンテンツ管理
- [ ] **国際化対応（i18n）**: 日本語/英語の切り替え機能
- [ ] **PDF Export機能**: レジュメのワンクリックPDF生成
- [ ] **お問い合わせフォーム実装**: reCAPTCHA統合によるセキュアなフォーム
- [ ] **ブログ検索機能**: 全文検索とタグフィルタリング
- [ ] **アニメーション強化**: Framer Motionによる滑らかなページ遷移

### Phase 3: 最適化・高度な機能（予定）

- [ ] **Analytics統合**: Google Analytics 4 / Vercel Analytics
- [ ] **A/Bテスト**: 効果的なCTA配置の検証
- [ ] **E2Eテスト**: Playwrightによる統合テスト
- [ ] **Storybook統合**: コンポーネントカタログの構築
- [ ] **PWA対応**: オフライン閲覧とプッシュ通知
- [ ] **パフォーマンス監視**: Lighthouse CI / Sentry統合

### 継続的な改善

- **週次**: コンテンツ更新（ブログ記事、プロジェクト追加）
- **月次**: スキル・経験の更新、依存関係のアップデート
- **四半期**: デザイン見直し、新機能追加、セキュリティ監査

---

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## お問い合わせ

ご質問やご提案がございましたら、以下の方法でお気軽にお問い合わせください：

- **GitHub Issues**: [Issues](https://github.com/aoyama01/portfolio/issues)
- **LinkedIn**: [Shunya Aoyama](https://www.linkedin.com/in/shunya-aoyama)

---

**Built with ❤️ using Next.js, React, and TypeScript**