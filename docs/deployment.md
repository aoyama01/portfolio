# Deployment Guide

## Vercel デプロイメント手順

### 1. Vercel にプロジェクトをインポート＆ひとまずデプロイ

1. [Vercel](https://vercel.com) にログイン
2. "Add New Project" をクリック
3. GitHub リポジトリを選択
4. プロジェクト設定を確認
5. "Deploy" をクリック。デプロイ完了

### 2. 環境変数の設定

Vercel ダッシュボードで以下の環境変数を設定：

**必須**:

- `NEXT_PUBLIC_SITE_URL`: 本番環境のURL（例: https://your-domain.com）
- `NEXT_PUBLIC_SITE_NAME`: サイト名

**オプション（機能に応じて）**:

- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`: Google Analytics ID
- `GITHUB_TOKEN`: GitHub API トークン
- `RECAPTCHA_SECRET_KEY`: reCAPTCHA シークレットキー
- `RECAPTCHA_SITE_KEY`: reCAPTCHA サイトキー
- `EMAIL_SERVICE_API_KEY`: メールサービス API キー
- `EMAIL_FROM`: 送信元メールアドレス
- `EMAIL_TO`: 受信先メールアドレス

### 3. ドメイン設定

1. Vercel ダッシュボードで "Domains" タブを開く
2. カスタムドメインを追加
3. DNS レコードを設定:
   （お名前.comでドメインを取得していたので、DNSレコードもお名前.comで設定）
   1. Vercelの `Project Settings` > `Domains` で以下を控える
      - `A` レコードの Value（IP アドレス）
      - `CNAME` レコードの Value: （`xxxxx.vercel-dns-xxx.com`）
   2. お名前.com の DNS レコードの設定で、上記と対応するように`A` レコード、`CNAME` レコードを設定。
      ネームサーバーも付属してくるものを選択
   3. 数十分～数時間後にネームサーバーの設定が反映され、ドメインにアクセスが可能になる

### 4. デプロイメント

- **自動デプロイ**: `main` または `dev` ブランチへの push で自動的にデプロイ
- **プレビューデプロイ**: Pull Request ごとにプレビュー環境が作成される

### 5. SSL 証明書

Vercel が自動的に Let's Encrypt 証明書を発行・更新します。

## GitHub Actions CI/CD

### ワークフロー

`.github/workflows/ci.yml` が以下を自動実行：

1. **Pull Request / Push 時**:
   - ESLint チェック
   - TypeScript 型チェック
   - ビルド確認

### ローカルでの確認

```bash
# Lint
npm run lint

# Type check
npm run type-check

# Build
npm run build
```

## セキュリティヘッダー

`next.config.ts` で以下のセキュリティヘッダーを設定：

- `Strict-Transport-Security`: HTTPS 強制
- `X-Frame-Options`: クリックジャッキング防止
- `X-Content-Type-Options`: MIME スニッフィング防止
- `X-XSS-Protection`: XSS 攻撃防止
- `Referrer-Policy`: リファラー制御
- `Permissions-Policy`: 機能制限

## トラブルシューティング

### ビルドエラー

```bash
# ローカルでビルドテスト
npm run build

# 型エラー確認
npm run type-check
```

### 環境変数が反映されない

1. Vercel ダッシュボードで環境変数を確認
2. `NEXT_PUBLIC_` プレフィックスがクライアント側変数に付いているか確認
3. 再デプロイ

### パフォーマンス問題

- Vercel Analytics で Core Web Vitals を確認
- Next.js Image コンポーネントを使用して画像を最適化
- 不要な JavaScript を削除

## 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
