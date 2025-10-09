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
 * 1: 入門 - 触れたことがある程度。チュートリアルを参考にしながら基本操作を実行できる。
 * 2: 基礎習得 - 基本的な操作や設定を理解しており、簡単なタスクを実行可能だが複雑な作業にはサポートが必要。
 * 3: 中級 - 基本的なタスクを1人で完遂可能。一般的な問題には自力で対応可。基本を理解し一定の応用も可能。
 * 4: 実務レベル - 中規模なタスクや問題解決が可能。新しい機能や設定もドキュメントを参照しながら試せる。
 * 5: エキスパート - 高度な作業や設定が自力で可能。複雑な問題も解決できる。後進指導やアドバイスができる。
 */
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface SkillLevelDefinition {
  level: SkillLevel;
  label: string;
  description: string;
}

export const SKILL_LEVELS: Record<SkillLevel, SkillLevelDefinition> = {
  5: {
    level: 5,
    label: "エキスパート",
    description:
      "高度な作業や設定が自力で可能。複雑な問題も解決できる。後進指導やアドバイスができる。アーキテクチャ設計、パフォーマンス最適化、チームへの技術指導が可能。",
  },
  4: {
    level: 4,
    label: "実務レベル",
    description:
      "中規模なタスクや問題解決が可能。新しい機能や設定もドキュメントを参照しながら試せる。チーム開発に1人で加わり、タスクを完遂できる。",
  },
  3: {
    level: 3,
    label: "中級",
    description:
      "基本的なタスクを1人で完遂可能。一般的な問題には自力で対応可。基本を理解し一定の応用も可能。リファレンス参照で独力実装可能、基本的な問題を自己解決できる。",
  },
  2: {
    level: 2,
    label: "基礎習得",
    description:
      "基本的な操作や設定を理解しており、簡単なタスクを実行可能だが複雑な作業にはサポートが必要。詳しい人のサポートがあれば実装可能、基本文法・構文を理解。",
  },
  1: {
    level: 1,
    label: "入門",
    description:
      "触れたことがある程度。チュートリアルを参考にしながら基本操作を実行できる。チュートリアル完了レベル、基本概念を知っている。",
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
