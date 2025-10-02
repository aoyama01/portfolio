/**
 * Skill type definitions
 */

export type SkillCategory =
  | "Programming Languages"
  | "Frontend"
  | "Backend"
  | "DevOps"
  | "Testing"
  | "Design";

/**
 * スキルレベル (1-5段階)
 * 1: 入門 - 授業や独学で触れたことがある
 * 2: 基礎習得 - リファレンス参照でコーディングできる
 * 3: 中級 - 特性を理解し、適切な処理を考えてコーディングできる
 * 4: 実務レベル - チーム開発に1人で加わることができる
 * 5: エキスパート - 技術選定・設計・最適化を主導できる
 */
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface SkillLevelDefinition {
  level: SkillLevel;
  label: string;
  description: string;
  criteria: string;
}

export const SKILL_LEVELS: Record<SkillLevel, SkillLevelDefinition> = {
  5: {
    level: 5,
    label: "エキスパート",
    description: "技術選定・設計から実装・最適化まで主導できる",
    criteria: "アーキテクチャ設計、パフォーマンス最適化、チームへの技術指導が可能",
  },
  4: {
    level: 4,
    label: "実務レベル",
    description: "特性を理解し、実務でコーディングできる",
    criteria: "チーム開発に1人で加わり、タスクを完遂できる",
  },
  3: {
    level: 3,
    label: "中級",
    description: "特性を理解し、適切な処理を考えてコーディングできる",
    criteria: "リファレンス参照で独力実装可能、基本的な問題を自己解決できる",
  },
  2: {
    level: 2,
    label: "基礎習得",
    description: "基本的な処理をリファレンス参照でコーディングできる",
    criteria: "詳しい人のサポートがあれば実装可能、基本文法・構文を理解",
  },
  1: {
    level: 1,
    label: "入門",
    description: "授業や独学で触れたことがある",
    criteria: "チュートリアル完了レベル、基本概念を知っている",
  },
};

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel; // スキルレベル (1-5)
  yearsOfExperience: number;
  evidence: string; // レベルの根拠となる具体的な経験・実績
  description?: string; // 補足説明（任意）
}

export interface SkillsData {
  skills: Skill[];
}

export interface GroupedSkills {
  [category: string]: Skill[];
}
