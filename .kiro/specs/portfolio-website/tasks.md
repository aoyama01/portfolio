# 実装計画

- [x] 1. プロジェクト基盤とインフラストラクチャの構築
- [x] 1.1 Next.js 15 + React 19 プロジェクトの初期化
  - Next.js 15.1+ App Router プロジェクトの作成
  - React 19 stable と TypeScript の厳密モード設定
  - Tailwind CSS 3.4+ と JIT コンパイル設定
  - ESLint、Prettier、Husky の開発環境構築
  - _Requirements: 全要件の基盤となる_

- [x] 1.2 ファイルベースコンテンツ管理システムの構築
  - MDX ファイル処理とフロントマター解析機能
  - JSON データファイルの構造化とバリデーション
  - 画像最適化と静的アセット管理
  - コンテンツ型定義と Zod スキーマ検証
  - _Requirements: 2.1-2.5, 5.1-5.5_

- [x] 1.3 Vercel デプロイメント環境の構築
  - Vercel プロジェクト設定と環境変数管理
  - GitHub Actions CI/CD パイプライン設定
  - セキュリティヘッダーと CSP 設定
  - ドメイン設定と SSL 証明書設定
  - _Requirements: 7.1-7.4, セキュリティ要件_

- [x] 2. コアレイアウトとナビゲーションシステム
- [x] 2.1 共通レイアウトとヘッダーナビゲーション
  - App Router レイアウト構造の実装
  - レスポンシブヘッダーナビゲーションメニュー
  - ロゴとホームリンクの統合
  - モバイル対応ハンバーガーメニュー
  - _Requirements: 1.3, 1.4, 1.5_

- [x] 2.1.1 ヘッダーとモバイル対応ハンバーガーメニューを修正
  - モバイルメニューの背景をヘッダーと同様の半透過背景 + backdrop-blur に変更
  - 現状: `bg-background` (完全不透明) → 修正後: `bg-white/95 backdrop-blur dark:bg-gray-900/95` (半透過)
    - 子コンポーネントの `backdrop-blur` が効かない問題：
      https://github.com/tailwindlabs/tailwindcss/discussions/15103
      CSS仕様: backdrop-filter は要素自身の背景には効かない。
      - bg-white/95 backdrop-blur と書くと、背景色がぼかし効果を覆い隠してしまう
      - 解決策：
        親・子コンポーネントの両方で `::before` 疑似要素を用いて背景とぼかしを分離
  - モバイル時に ThemeToggle をハンバーガーメニュー内（ナビゲーションリンクの下部右側）に配置
  - デスクトップ時は現状維持（Navigation の横に ThemeToggle）
  - Header で ThemeToggle をモバイル時には非表示にする
  - _Requirements: 1.3, 1.4, 1.5_

- [x] 2.2 ヒーローセクションとソーシャルリンク
  - プロフィール写真とキャッチコピー表示
  - 主要スキルのハイライト表示
  - GitHub、LinkedIn などの SNS リンク統合
  - 統計情報（貢献数、プロジェクト数）の動的表示
  - _Requirements: 1.1, 1.2_

- [x] 2.3 共通フッターとサイト構造
  - フッターナビゲーションと著作権表示
  - サイトマップとプライバシーポリシーリンク
  - 404 エラーページと適切なナビゲーション支援
  - URL 構造の最適化と SEO 対応
  - _Requirements: 1.4, 1.5, 7.2_

- [x] 3. プロジェクトポートフォリオシステム
- [x] 3.1 プロジェクト一覧とカード表示機能
  - プロジェクト JSON データの読み込みと表示
  - カード形式レイアウトとレスポンシブグリッド
  - プロジェクトメタデータ（タイトル、概要、技術、リンク）表示
  - ソート機能（新着順、カテゴリ別、複雑度別）
  - _Requirements: 2.1, 2.2_

- [x] 3.2 プロジェクトフィルタリング機能
  - 技術スタック別フィルタリング
  - カテゴリ別（Web アプリ、ライブラリ等）フィルタリング
  - 年度別・期間別フィルタリング
  - 複数条件による AND/OR 検索機能
  - _Requirements: 2.3_

- [x] 3.2.1 プロジェクトページのフィルターボタンスタイル統一
  - Resume ページ（SkillFilter）と同じボタンスタイルを適用
  - 選択時: `bg-blue-600 text-white`
  - 非選択時: `bg-gray-200 text-gray-700` (light) / `bg-gray-700 text-gray-300` (dark)
  - ホバー: `hover:bg-gray-300` (light) / `hover:bg-gray-600` (dark)
  - カテゴリフィルター、AND/OR モード切り替え、技術スタックボタンすべてに適用
  - _Requirements: 2.3, UI 一貫性_

- [x] 3.3 プロジェクト詳細ページシステム
  - 個別プロジェクト詳細ページルーティング
  - MDX コンテンツによる実装詳細と技術選択理由表示
  - スクリーンショット、動画デモ、コードサンプル統合
  - GitHub リポジトリとライブデモリンク
  - _Requirements: 2.4, 2.5_

- [ ] 4. レジュメ・経歴管理システム
- [x] 4.1 技術スキルと経験表示
  - スキル JSON データの構造化管理
  - 習熟度レベル（1-5 段階）の視覚的表示
  - 経験年数と技術カテゴリ別グループ化
  - スキル検索とフィルタリング機能
  - _Requirements: 3.1, 3.2_

- [x] 4.1.1 スキルレベル詳細表示機能
  - SKILL_LEVELSのcriteriaを削除してdescriptionに統一
  - SkillCard 内のスキルレベル部分にアイコン追加
  - カーソルホバーでポップアップ／ツールチップ表示
  - レベル定義（ラベル、説明、判定基準）の表示
  - レスポンシブ対応（モバイルではタップで表示）
  - _Requirements: 3.2_

- [x] 4.2 職歴と学歴の時系列表示
  - 職歴情報の時系列レイアウト
  - 学歴、資格、認定の構造化表示
  - プロジェクト実績との関連付け表示
  - アチーブメントハイライト機能
  - _Requirements: 3.1, 3.4_

- [x] 4.2.1 学歴表示機能の追加
  - Education 型定義とスキーマの作成（school, degree, field, startDate, endDate, gpa, activities, achievements）
  - education.json データファイルの作成（content/data/）
  - EducationSection コンポーネントの実装（ExperienceSection と同様のタイムラインレイアウト）
  - getAllEducation() 関数の実装（src/lib/content.ts）
  - Resume ページへの EducationSection 統合（ExperienceSection の下に配置）
  - EducationSection.test.tsx の作成（時系列ソート、空データ処理、データ表示テスト）
  - _Requirements: 3.1, 3.4_

- [ ] 4.3 PDF レジュメ生成機能
  - 印刷最適化された PDF レイアウト作成
  - ワンクリック PDF ダウンロード機能
  - レジュメ内容の動的組み立て
  - PDF メタデータと SEO 対応
  - _Requirements: 3.3_

- [ ] 5. セキュアお問い合わせシステム
- [x] 5.1 React 19 Actions ベースフォーム
  - useActionState フックによるフォーム状態管理
  - Server Actions によるサーバーサイド処理
  - フォーム入力フィールド（名前、メール、件名、メッセージ）
  - Zod スキーマによるバリデーション統合
  - _Requirements: 4.1_

- [ ] 5.2 フォームセキュリティとバリデーション
  - reCAPTCHA v3 統合とスコアベース検証
  - XSS 対策と入力データサニタイゼーション
  - レート制限と IP ベース制限
  - CSRF 対策とセキュリティトークン
  - _Requirements: 4.2_

- [ ] 5.3 メール送信とレスポンス処理
  - メール送信 API（SendGrid/Resend）統合
  - 送信成功時の確認メールとフォームリセット
  - エラー処理と具体的エラーメッセージ表示
  - 管理者通知とお問い合わせ管理記録
  - _Requirements: 4.3, 4.4, 4.6_

- [ ] 5.4 useOptimistic による UX 最適化
  - 楽観的更新による即座のフィードバック
  - 送信中状態の視覚的インジケーター
  - 期待応答時間とプライバシーポリシー表示
  - フォーム送信履歴と重複送信防止
  - _Requirements: 4.5_

- [ ] 6. ブログ・技術記事システム（外部ブログ統合）
- [x] 6.1 外部ブログリンク管理システムの構築
  - 外部ブログ記事データの JSON 管理（タイトル、URL、投稿先、公開日、タグ）
  - Zod スキーマによるブログデータ検証
  - 投稿先プラットフォーム定義（Qiita、Zenn、個人ブログ等）
  - 記事データ型定義とインターフェース設計
  - _Requirements: 5.1, 5.2_

- [x] 6.2 ブログ一覧ページの実装
  - 外部ブログ記事一覧のカード形式レイアウト
  - 各カードに外部リンク（新規タブで開く）とプラットフォームアイコン表示
  - 新着順ソートと公開日表示
  - タグ・プラットフォーム別フィルタリング機能
  - 記事が 0 件の場合の「準備中」EmptyState 表示
  - _Requirements: 5.1, 5.2, 5.5_

- [x] 6.3 ブログ記事が 0 件の場合にブログページを非公開にする機能
  - ナビゲーションメニューからブログリンクを条件付きで非表示
  - 404 ページのクイックリンクは常にすべて表示（静的ページのため）
  - ブログページへの直接アクセス時は EmptyState を表示（現状維持）
  - getExternalBlogPosts() の結果が空配列かどうかで判定
  - デスクトップナビゲーション（Navigation.tsx）の動的フィルタリング
  - モバイルナビゲーション（MobileMenu.tsx）の動的フィルタリング
  - ヘルパー関数（src/lib/navigation.ts）による一元管理
  - _Requirements: 5.5, UX 改善_

- [ ] 6.4 外部 API 統合準備（Phase 2 機能）
  - Qiita API、Zenn RSS 取得用のインターフェース設計
  - API レスポンスキャッシュ戦略の設計
  - 外部 API 障害時のフォールバック処理設計
  - 将来的な自動同期機能の技術調査
  - _Requirements: 5.3（将来拡張）_

- [ ] 7. テーマとアクセシビリティ機能
- [x] 7.1 ダークモード・テーマシステム
  - React Context によるテーマ状態管理
  - ライト・ダークモード切り替え機能
  - システム設定（OS）連動と設定保存
  - 全コンポーネントのテーマ対応スタイル
  - _Requirements: 6.2_

- [x] 7.2 レスポンシブデザインと Device 対応
  - モバイル・タブレット・デスクトップレイアウト
  - Tailwind CSS ブレークポイント活用
  - タッチデバイス最適化とジェスチャー対応
  - 画面サイズ別コンテンツ表示最適化
  - _Requirements: 6.1_

- [ ] 7.3 アクセシビリティとキーボードナビゲーション
  - WCAG 2.1 Level AA 準拠実装
  - キーボードナビゲーションとタブ順序最適化
  - フォーカス表示とスクリーンリーダー対応
  - 色彩コントラスト比とテキスト代替の確保
  - _Requirements: 6.3, 6.4_

- [ ] 7.4 ローディング状態と UX 向上
  - スケルトンスクリーンとローディング表示
  - ページ遷移アニメーションとプログレス表示
  - エラーバウンダリーと適切なエラー表示
  - 画像遅延読み込みと最適化
  - _Requirements: 6.5_

- [ ] 8. パフォーマンスと SEO 最適化
- [ ] 8.1 Core Web Vitals 最適化
  - Largest Contentful Paint（LCP）< 2.5s 実現
  - First Input Delay（FID）< 100ms と Cumulative Layout Shift（CLS）< 0.1
  - Next.js Image コンポーネントと WebP/AVIF 対応
  - 静的生成とインクリメンタル静的再生成（ISR）
  - _Requirements: 7.1_

- [ ] 8.2 SEO メタデータと構造化データ
  - React 19 ネイティブメタデータサポート活用
  - ページ別メタタグとタイトル最適化
  - JSON-LD 構造化データの実装
  - XML サイトマップ自動生成
  - _Requirements: 7.2_

- [ ] 8.3 ソーシャルメディア最適化
  - OpenGraph プロトコル対応
  - Twitter Card メタデータ統合
  - 各ページのソーシャル共有最適化
  - プレビュー画像と説明文の自動生成
  - _Requirements: 7.3_

- [ ] 8.4 画像とアセット最適化
  - Next.js Image による自動最適化
  - 複数フォーマット（WebP、AVIF）サポート
  - 遅延読み込みと適切な画像サイジング
  - CDN 配信とキャッシュ戦略最適化
  - _Requirements: 7.4_

- [ ] 9. 国際化（i18n）システム
- [ ] 9.1 多言語ルーティングシステム
  - Next.js App Router 国際化機能活用
  - URL パス（/ja/、/en/）による言語ルーティング
  - 言語検出とデフォルト言語設定
  - 言語切り替え UI とナビゲーション統合
  - _Requirements: 8.2_

- [ ] 9.2 コンテンツ多言語化
  - 翻訳リソース JSON ファイル管理
  - React 19 Server Actions による言語切り替え
  - 言語設定の永続化（Cookie/LocalStorage）
  - ブラウザ言語設定の自動検出
  - _Requirements: 8.1, 8.3_

- [ ] 9.3 多言語コンテンツ管理
  - 静的コンテンツの日英対応
  - ブログ記事の言語別管理
  - 未翻訳コンテンツのフォールバック表示
  - 言語固有コンテンツの適切な案内
  - _Requirements: 8.4_

- [ ] 10. システム統合とテスト
- [ ] 10.1 コンポーネント単体テスト
  - React 19 Server Actions のテスト実装
  - useActionState、useOptimistic フックのテスト
  - MDX プロセッサーとコンテンツ解析テスト
  - バリデーション関数群とユーティリティテスト
  - _Requirements: 全要件の品質保証_

- [ ] 10.2 統合テストとエンドツーエンドテスト
  - Server Actions とクライアントコンポーネント統合テスト
  - お問い合わせフォーム送信から完了までのフローテスト
  - 言語切り替えと国際化機能テスト
  - パフォーマンステストと Core Web Vitals 検証
  - _Requirements: 全要件のシステム統合_

- [ ] 10.3 最終システム検証と調整
  - 全要件に対する受入基準の検証
  - アクセシビリティ監査と WCAG 2.1 準拠確認
  - セキュリティテストと脆弱性スキャン
  - 本番環境デプロイとドメイン設定完了
  - _Requirements: 全要件の完全実装確認_

## UX改善タスク

- [ ] 11. ホームページの UX 改善とナビゲーション最適化
- [ ] 11.1 ホームページに主要ページへのクイックアクセスカードを追加
  - ホームページ（HeroSection）の下部に Projects、Resume、Blog（記事がある場合）へのカードリンクを追加
  - カード形式で表示：タイトル、説明、アイコンを含む
  - レスポンシブグリッドレイアウト（モバイル: 1列、タブレット: 2列、デスクトップ: 3列）
  - ナビゲーションバーをクリックしなくても主要ページに直接アクセス可能にする
  - 現状: ナビゲーションバーが隠れているため、一度クリックしないとアクセスできない
  - 改善後: ホームページから直接カードをクリックしてアクセス可能
  - _Requirements: UX改善、アクセシビリティ向上_

- [ ] 11.2 プロジェクト詳細ページのリンクを一時的に非表示
  - プロジェクト詳細ページへの「詳細を見る」リンクを削除
  - src/app/projects/[slug]/ProjectDetail.tsx は残す（将来の実装のため）
  - ProjectCard コンポーネントの修正
    - 現状: カード画像のみプロジェクト詳細ページへのリンク
    - 改善後: カード画像のみGitHubリポジトリページへのリンク
  - プロジェクト詳細ページの GitHubリポジトリリンクとライブデモリンクを強調表示
  - ProjectCard に GitHubリポジトリとライブデモへの直接リンクを追加（既に実装済み）
  - プロジェクトの詳細情報は GitHub README に記載し、ポートフォリオサイトはシンプルにする方針
  - _Requirements: UX改善、情報アーキテクチャの最適化_

- [ ] 11.3 Projectsページのフィルター機能を削除
  - ProjectsClient コンポーネントから以下の機能を削除:
    - 技術スタック別フィルタリング（selectedTechnologies, toggleTechnology）
    - 年度別フィルタリング（selectedYear）
    - AND/OR 検索モード切り替え（filterMode）
    - 詳細フィルター表示/非表示トグル（showAdvancedFilters）
  - 並び替え機能（sortBy）も削除を検討（新着順のみでシンプルに）
  - カテゴリフィルター（selectedCategory）は残す
  - シンプルな表示に変更: カテゴリ別タブと新着順の一覧のみ
  - _Requirements: UX簡素化、プロジェクト一覧の可読性向上_

- [ ] 12. フッターとナビゲーションの視覚的改善
- [ ] 12.1 フッターのデザインをシンプルに変更
  - 現状のフッター構造を分析（Footer.tsx）
    - Navigation セクション: Home, Projects, Resume, Blog, Contact
    - Legal セクション: Privacy Policy, Sitemap
    - Connect セクション: GitHub, LinkedIn, Twitter
  - フッターの目立ちすぎる問題を解決
    - 背景色を控えめに変更（border-t のみでシンプルに）
    - パディングを削減（py-8 → py-6）
    - フォントサイズを小さく（text-sm → text-xs）
  - Blog リンクをフッターから削除（ブログ記事が0件の場合は非表示）
  - Contact リンクをフッターから削除（問い合わせフォーム未実装のため）
  - _Requirements: UX改善、視覚的階層の最適化_

- [ ] 13. スキル表示の改善（経験年数の表示形式）
- [ ] 13.1 スキルカードの経験年数表示を月単位で表示
  - SkillCard コンポーネントの経験年数表示を改善
    - 現状: "0.25年" → 改善後: "3ヶ月"
    - 現状: "0.5年" → 改善後: "6ヶ月"
    - 現状: "1年" → そのまま "1年"
    - 現状: "2.5年" → 改善後: "2年6ヶ月" または "2.5年"（1年未満の場合のみ月単位）
  - formatExperienceYears ユーティリティ関数を作成（src/lib/utils/skills.ts）
    - 1年未満の場合: "X ヶ月"
    - 1年以上の場合: "X 年" または "X 年 Y ヶ月"（小数点がある場合）
  - SkillCard.tsx の経験年数表示部分を更新
  - skills.json の yearsOfExperience フィールドはそのまま（数値型を維持）
  - _Requirements: UX改善、可読性向上_

- [ ] 14. Resumeページのセクション名変更
- [ ] 14.1 「職歴」を「インターンシップ」に変更
  - ExperienceSection コンポーネントのタイトルを変更
    - 現状: "スキル", "職歴", "学歴" → 改善後: "Skill", "Internship", "Education"
  - Resume ページのセクション構成:
    - スキル（SkillsSectionWithFilter）
    - インターンシップ（ExperienceSection）
    - 学歴（EducationSection）
  - _Requirements: コンテンツの正確性、ユーザープロフィールの明確化_

- [ ] 15. Contactページの一時的な非表示
- [ ] 15.1 Contactページをナビゲーションから削除
  - Navigation.tsx と MobileMenu.tsx から Contact リンクを削除
  - Footer.tsx から Contact リンクを削除（12.1 で対応）
  - src/lib/navigation.ts の allNavItems から Contact を削除
  - Contact ページ自体（src/app/contact/page.tsx）は残す（将来の実装のため）
  - メールアドレスの直接記載について:
    - Footer の Connect セクションに Email リンクを追加することを検討
    - または Resume ページに連絡先情報セクションを追加
  - 問い合わせフォーム機能（メールAPI）は別プロジェクトとして切り出す可能性あり
  - _Requirements: UX改善、実装状況に応じた UI 調整_
