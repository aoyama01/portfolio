import type { Skill, GroupedSkills, SkillLevel, SkillLevelDefinition } from "@/types/skill";
import { SKILL_LEVELS } from "@/types/skill";

/**
 * Group skills by their category
 * @param skills - Array of skills to group
 * @returns Object with categories as keys and arrays of skills as values
 */
export function groupSkillsByCategory(skills: Skill[]): GroupedSkills {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as GroupedSkills);
}

/**
 * Filter skills by category
 * @param skills - Array of skills to filter
 * @param category - Category to filter by, or null for all skills
 * @returns Filtered array of skills
 */
export function filterSkillsByCategory(skills: Skill[], category: string | null): Skill[] {
  if (category === null) {
    return skills;
  }
  return skills.filter((skill) => skill.category === category);
}

/**
 * Extract unique categories from skills
 * @param skills - Array of skills
 * @returns Array of unique category names
 */
export function getUniqueCategories(skills: Skill[]): string[] {
  const uniqueCategories = new Set(skills.map((skill) => skill.category));
  return Array.from(uniqueCategories);
}

/**
 * スキルレベルの詳細定義を取得
 * @param level - スキルレベル (1-5)
 * @returns レベル定義情報
 */
export function getSkillLevelDefinition(level: SkillLevel): SkillLevelDefinition {
  return SKILL_LEVELS[level];
}

/**
 * 経験年数を人間にわかりやすい形式でフォーマット
 * @param years - 経験年数（数値）
 * @returns フォーマット済みの文字列
 * @example
 * formatExperienceYears(0.25) => "3ヶ月"
 * formatExperienceYears(0.5) => "6ヶ月"
 * formatExperienceYears(1) => "1年"
 * formatExperienceYears(2.5) => "2年6ヶ月"
 */
export function formatExperienceYears(years: number): string {
  if (years < 1) {
    // 1年未満の場合は月単位で表示
    const months = Math.round(years * 12);
    return `${months}ヶ月`;
  }

  const fullYears = Math.floor(years);
  const remainingMonths = Math.round((years - fullYears) * 12);

  if (remainingMonths === 0) {
    // 整数年の場合
    return `${fullYears}年`;
  } else {
    // 年と月の両方を表示
    return `${fullYears}年${remainingMonths}ヶ月`;
  }
}
