# External Blog Data

このディレクトリには、外部ブログサイトに投稿した記事のメタデータを管理するJSONファイルがあります。

## ファイル

- `external-blog.json`: 外部ブログ記事のメタデータ

## データ形式

```json
[
  {
    "id": "blog-001",
    "title": "Next.js 15の新機能を試してみた",
    "description": "Next.js 15で追加された新機能について詳しく解説します。",
    "url": "https://qiita.com/user/items/abc123",
    "platform": "qiita",
    "publishedAt": "2025-10-01",
    "tags": ["nextjs", "react", "typescript"],
    "featured": false
  }
]
```

## フィールド説明

| フィールド    | 型       | 必須 | 説明                                |
| ------------- | -------- | ---- | ----------------------------------- |
| `id`          | string   | ✓    | 記事の一意なID                      |
| `title`       | string   | ✓    | 記事タイトル（1-200文字）           |
| `description` | string   | -    | 記事の説明文（最大1000文字）        |
| `url`         | string   | ✓    | 記事のURL                           |
| `platform`    | string   | ✓    | プラットフォーム名（下記参照）      |
| `publishedAt` | string   | ✓    | 公開日（YYYY-MM-DD形式）            |
| `tags`        | string[] | -    | タグ（デフォルト: []）              |
| `featured`    | boolean  | -    | 注目記事フラグ（デフォルト: false） |

## サポートされてる（予定の）プラットフォーム

- `qiita`: Qiita
- `zenn`: Zenn
- `note`: note
- `dev`: DEV Community
- `medium`: Medium
- `hashnode`: Hashnode
- `personal`: 個人ブログ

## 記事の追加方法

1. `external-blog.json`を開く
2. 上記のフォーマットに従って新しい記事オブジェクトを配列に追加
3. `id`は他の記事と重複しない一意な値を設定
4. ファイルを保存

## バリデーション

データは[Zod](https://zod.dev/)スキーマで検証されます。無効なデータは自動的にスキップされ、コンソールに警告が表示されます。

## 例

```json
[
  {
    "id": "qiita-nextjs-15",
    "title": "Next.js 15の新機能まとめ",
    "description": "App Router、Server Actionsなど、Next.js 15の主要な新機能を解説",
    "url": "https://qiita.com/username/items/abc123",
    "platform": "qiita",
    "publishedAt": "2025-10-01",
    "tags": ["nextjs", "react", "web"],
    "featured": true
  },
  {
    "id": "zenn-typescript-tips",
    "title": "TypeScriptの型安全性を高めるTips",
    "url": "https://zenn.dev/username/articles/xyz789",
    "platform": "zenn",
    "publishedAt": "2025-09-28",
    "tags": ["typescript", "tips"]
  }
]
```
