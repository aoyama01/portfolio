# ADR 0001: Feature Flags for Temporary UI Changes

## Status

Accepted

## Date

2025-10-13

## Context

ポートフォリオサイトのUX改善の一環として、Projectsページの高度なフィルター機能（技術スタック、年度、AND/ORモード、ソートオプション）を一時的に非表示にする必要が生じた。ただし、将来的にユーザーフィードバックに基づいて機能を復元する可能性があるため、コードを完全に削除するのではなく、簡単に再有効化できる仕組みが必要。

### 要件

1. **復元可能性**: 将来的に機能を簡単に元に戻せること
2. **メンテナンス性**: コードの可読性と保守性を維持すること
3. **拡張性**: 他の機能にも同様のアプローチを適用できること
4. **シンプルさ**: 個人ポートフォリオサイトに適した実装複雑度
5. **型安全性**: TypeScriptの型チェックが効くこと

### 検討したアプローチ

#### 1. 環境変数ベースのFeature Flag

**実装例:**

```typescript
const enableFilters = process.env.NEXT_PUBLIC_ENABLE_PROJECT_FILTERS === "true";
```

**Pros:**

- 実装が最もシンプル
- デプロイ環境ごとに切り替え可能
- ビルド時最適化が効く

**Cons:**

- 変更にデプロイが必要
- Git管理外のため変更履歴が残りにくい
- チーム内での設定共有に注意が必要

#### 2. 設定ファイルベースのFeature Flag（選択）

**実装例:**

```typescript
// src/lib/config/features.ts
export const FEATURES = {
  projectFilters: {
    enabled: false,
    advancedFilters: false,
    sortOptions: false,
  },
} as const;
```

**Pros:**

- Git管理可能で変更履歴が残る
- TypeScriptの型安全性が保たれる
- 粒度の細かい制御が可能
- コメントで理由やロードマップを記載できる
- 他の機能フラグも一元管理できる
- ビルド時最適化が効く（Tree Shaking）

**Cons:**

- 変更にデプロイが必要
- ランタイムでの動的切り替え不可

#### 3. 条件付きコメントアウト

**実装例:**

```typescript
// TEMPORARY: Filters hidden for UX simplification
/*
const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
*/
```

**Pros:**

- 最も単純
- 復元が容易

**Cons:**

- コメントが長くなると可読性低下
- ESLintがコメント内をチェックしない
- 「死んだコード」と区別がつきにくい

#### 4. 専用Feature Flagライブラリ（flagsmith等）

**実装例:**

```typescript
const enableFilters = await flagsmith.hasFeature("project_filters");
```

**Pros:**

- ランタイムでの即座の切り替え可能
- A/Bテスト対応
- ダッシュボードでの管理

**Cons:**

- 外部サービス依存
- ネットワークレイテンシー
- 個人ポートフォリオには過剰（オーバーエンジニアリング）

## Decision

**アプローチ2: 設定ファイルベースのFeature Flag**を採用する。

### 理由

1. **Git管理による変更履歴の保持**: いつ、なぜ機能を無効化したかが明確に記録される
2. **型安全性**: TypeScriptの型チェックが効き、設定ミスを防げる
3. **粒度の細かい制御**: 機能単位での有効/無効化が可能
4. **拡張性**: 将来的に他の機能フラグも追加しやすい
5. **適切な複雑度**: 個人ポートフォリオサイトに適したシンプルさ
6. **ドキュメント性**: コメントで理由や履歴を記載できる
7. **パフォーマンス**: ビルド時に決定されるため、ランタイムオーバーヘッドなし

### 実装方針

```typescript
// src/lib/config/features.ts
export const FEATURES = {
  projectFilters: {
    enabled: false, // Master switch
    advancedFilters: false, // Technology/Year/Mode filters
    sortOptions: false, // Sort dropdown
    categoryFilter: true, // Keep category filter
  },
} as const;
```

各コンポーネントでは以下のように使用:

```typescript
import { FEATURES } from '@/lib/config/features';

const filterConfig = FEATURES.projectFilters;

return (
  <>
    <CategoryFilter /> {/* Always visible */}
    {filterConfig.advancedFilters && <AdvancedFilters />}
    {filterConfig.sortOptions && <SortDropdown />}
  </>
);
```

## Consequences

### Positive

- ✅ 機能の有効/無効をコードレビュー可能な形で管理できる
- ✅ コメントで意思決定の理由を明確に記載できる
- ✅ 復元時はフラグをtrueに変更するだけ
- ✅ Tree Shakingにより、無効化された機能のコードもバンドルから除外される（Next.js最適化）
- ✅ 他の機能（Blog comments、Resume PDFダウンロード等）にも同様のパターンを適用可能

### Negative

- ❌ 機能の有効/無効を変更するにはデプロイが必要
- ❌ A/Bテストやユーザーセグメント別の出し分けはできない（ただし、個人ポートフォリオでは不要）

### Neutral

- 🔄 定期的に使用されていないフラグを見直し、完全に削除するか判断する必要がある
- 🔄 フラグが増えすぎないよう、一時的なフラグと恒久的なフラグを区別する

## Follow-up Actions

1. `src/lib/config/features.ts` を作成
2. `ProjectsClient.tsx` を更新してフラグを参照
3. テストを更新（フラグがfalseの場合のテストケースを追加）
4. 将来的なレビュー日を設定（例: 3ヶ月後にフラグの必要性を再評価）

## References

- Task 11.3: Projects page filter removal
- [Feature Flags Best Practices](https://martinfowler.com/articles/feature-toggles.html)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
