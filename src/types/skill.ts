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

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 1-5 scale
  yearsOfExperience: number;
  description?: string;
}

export interface SkillsData {
  skills: Skill[];
}

export interface GroupedSkills {
  [category: string]: Skill[];
}
