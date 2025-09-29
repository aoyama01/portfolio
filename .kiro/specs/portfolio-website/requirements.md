# Requirements Document

## はじめに

個人ポートフォリオプラットフォーム - 技術力・実績・人物像を効果的に伝える現代的な Web サイト。就職活動およびキャリア形成において、従来のレジュメでは表現しきれない実装力・問題解決能力・継続的な学習姿勢を可視化し、採用担当者およびエンジニアとの効果的なコミュニケーションを実現する。

## Requirements

### Requirement 1: ポートフォリオ表示とナビゲーション

**目的:** 訪問者として、技術者の基本情報とスキル概要を即座に把握できるよう、効果的なホーム画面とナビゲーションを提供したい。そうすることで、短時間で候補者の適性を判断できる。

#### 受入基準

1. WHEN 訪問者がサイトにアクセスしたとき THEN Portfolio Website SHALL プロフィール写真、キャッチコピー、主要スキルを含むヒーローセクションを表示する
2. WHERE ヒーローセクションにおいて THE Portfolio Website SHALL GitHub、LinkedIn などの外部 SNS へのリンクを適切なアイコンと共に表示する
3. WHEN 訪問者がナビゲーションメニューを操作するとき THEN Portfolio Website SHALL プロジェクト、レジュメ、ブログ、お問い合わせページへの明確なリンクを提供する
4. WHERE 全てのページにおいて THE Portfolio Website SHALL 統一されたヘッダーナビゲーションとフッターを表示する
5. WHEN 訪問者がロゴまたはホームリンクをクリックしたとき THEN Portfolio Website SHALL ホームページに遷移する

### Requirement 2: プロジェクト・ポートフォリオ展示

**目的:** 採用担当者として、技術者の実装力と技術選択能力を具体的に確認できるよう、プロジェクトを効果的に展示したい。そうすることで、技術的適性を正確に評価できる。

#### 受入基準

1. WHEN 訪問者がプロジェクト一覧ページにアクセスしたとき THEN Portfolio Website SHALL カード形式でプロジェクトを表示する
2. WHEN 訪問者がプロジェクトカードを操作するとき THEN Portfolio Website SHALL プロジェクトタイトル、概要、使用技術、GitHub/デモリンクを表示する
3. WHEN 訪問者がフィルター機能を使用するとき THEN Portfolio Website SHALL 技術スタック別、カテゴリ別、年度別でプロジェクトを絞り込み表示する
4. WHEN 訪問者がプロジェクトカードをクリックしたとき THEN Portfolio Website SHALL 詳細ページに遷移し、実装の詳細、技術選択理由、学習内容を表示する
5. WHERE プロジェクト詳細ページにおいて THE Portfolio Website SHALL スクリーンショット、動画デモ、コードサンプルを含む視覚的コンテンツを提供する

### Requirement 3: レジュメ・経歴管理

**目的:** 採用担当者として、技術者のスキルレベル、職歴、資格を体系的に確認できるよう、構造化されたレジュメ情報を提供したい。そうすることで、採用判断に必要な情報を効率的に収集できる。

#### 受入基準

1. WHEN 訪問者がレジュメページにアクセスしたとき THEN Portfolio Website SHALL 技術スキル、職歴、学歴、資格を明確なセクションに分けて表示する
2. WHEN 訪問者がスキルセクションを閲覧するとき THEN Portfolio Website SHALL 各技術の習熟度レベル（1-5 段階）と経験年数を表示する
3. WHEN 訪問者が PDF ダウンロードボタンをクリックしたとき THEN Portfolio Website SHALL 印刷最適化されたレジュメ PDF を生成・ダウンロード提供する
4. WHERE レジュメページにおいて THE Portfolio Website SHALL 職歴とプロジェクト実績を時系列で整理して表示する

### Requirement 4: お問い合わせとコミュニケーション

**目的:** 採用担当者として、興味を持った技術者に安全かつ簡単に連絡できるよう、セキュアなお問い合わせ機能を提供したい。そうすることで、円滑な採用プロセスを開始でき、同時にプライバシーとセキュリティを確保できる。

#### 受入基準

1. WHEN 訪問者がお問い合わせページにアクセスしたとき THEN Portfolio Website SHALL 名前、メールアドレス、件名、メッセージの入力フィールドを含むセキュアフォームを表示する
2. WHEN 訪問者がフォームを送信するとき THEN Portfolio Website SHALL 入力データのバリデーション（XSS 対策、文字数制限）と reCAPTCHA 認証を実行する
3. IF フォーム送信が成功した場合 THEN Portfolio Website SHALL 送信完了メッセージを表示し、フォームをリセットし、確認メールを送信者に自動送信する
4. IF フォーム送信でエラーが発生した場合 THEN Portfolio Website SHALL 具体的なエラーメッセージを表示し、入力データを保持する
5. WHERE お問い合わせページにおいて THE Portfolio Website SHALL 期待応答時間（48 時間以内）とプライバシーポリシーへのリンクを表示する
6. WHEN お問い合わせが受信されたとき THEN Portfolio Website SHALL 管理者に通知メールを送信し、問い合わせ管理システムに記録する

### Requirement 5: ブログ・技術記事システム

**目的:** 訪問者として、技術者の継続的な学習姿勢と技術的洞察を確認できるよう、技術ブログ機能を提供したい。そうすることで、技術者の成長性とコミュニケーション能力を評価できる。

#### 受入基準

1. WHEN 訪問者がブログページにアクセスしたとき THEN Portfolio Website SHALL 記事一覧をカード形式で新着順に表示する
2. WHEN 訪問者が記事カードを操作するとき THEN Portfolio Website SHALL タイトル、概要、投稿日、読了時間、タグを表示する
3. WHEN 訪問者が記事をクリックしたとき THEN Portfolio Website SHALL 記事詳細ページに遷移し、MDX 対応の技術記事を表示する
4. WHERE 記事詳細ページにおいて THE Portfolio Website SHALL シンタックスハイライト付きコードブロック、目次、共有ボタンを提供する
5. WHEN 訪問者がタグまたはカテゴリをクリックしたとき THEN Portfolio Website SHALL 関連記事の絞り込み表示を行う

### Requirement 6: ユーザーエクスペリエンスとアクセシビリティ

**目的:** すべての訪問者として、デバイスや能力に関わらず快適にサイトを閲覧できるよう、レスポンシブデザインとアクセシビリティ対応を提供したい。そうすることで、幅広いユーザーが情報にアクセスできる。

#### 受入基準

1. WHEN 訪問者が異なるデバイスでアクセスするとき THEN Portfolio Website SHALL モバイル、タブレット、デスクトップに最適化されたレイアウトを提供する
2. WHEN 訪問者がダークモード切り替えを操作するとき THEN Portfolio Website SHALL ライト・ダークテーマ間の切り替えを実行し、設定を保存する
3. WHERE 全てのページにおいて THE Portfolio Website SHALL WCAG 2.1 Level AA 準拠のアクセシビリティ機能を提供する
4. WHEN 訪問者がキーボードナビゲーションを使用するとき THEN Portfolio Website SHALL 適切なフォーカス表示とタブ順序を提供する
5. WHILE ページ読み込み中 THE Portfolio Website SHALL ローディング状態やスケルトンスクリーンを表示する

### Requirement 7: パフォーマンスと SEO 最適化

**目的:** 検索エンジンと訪問者として、高速で発見しやすいサイトにアクセスできるよう、パフォーマンスと SEO 最適化を提供したい。そうすることで、効率的な情報取得と検索結果での上位表示を実現できる。

#### 受入基準

1. WHEN 訪問者がページにアクセスするとき THEN Portfolio Website SHALL Core Web Vitals（LCP < 2.5s, FID < 100ms, CLS < 0.1）の基準を満たす
2. WHEN 検索エンジンがサイトをクロールするとき THEN Portfolio Website SHALL 適切なメタタグ、構造化データ、XML サイトマップを提供する
3. WHERE 全てのページにおいて THE Portfolio Website SHALL OpenGraph、TwitterCard に対応したソーシャルメディア最適化を実装する
4. WHEN 訪問者が画像を読み込むとき THEN Portfolio Website SHALL 最適化された画像フォーマット（WebP/AVIF）と遅延読み込みを使用する

### Requirement 8: 多言語対応（国際化）

**目的:** 国際的な採用担当者として、言語の壁なくポートフォリオを閲覧できるよう、多言語対応を提供したい。そうすることで、グローバルな採用機会を拡大できる。

#### 受入基準

1. WHEN 訪問者が言語切り替えを操作するとき THEN Portfolio Website SHALL 日本語・英語間の切り替えを実行し、設定を保存する
2. WHERE 全てのページにおいて THE Portfolio Website SHALL 選択された言語に応じたコンテンツと URL パス（/ja/, /en/）を提供する
3. WHEN 初回訪問者がアクセスするとき THEN Portfolio Website SHALL ブラウザの言語設定に基づいて適切な言語を自動選択する
4. WHERE 多言語対応が困難なコンテンツ（ブログ記事等）において THE Portfolio Website SHALL 言語切り替え時の適切な案内またはフォールバック表示を提供する
