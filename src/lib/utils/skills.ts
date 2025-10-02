import type { Skill, GroupedSkills } from "@/types/skill";

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
