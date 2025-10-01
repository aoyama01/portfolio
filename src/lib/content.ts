import fs from "fs";
import path from "path";
import { ProjectsCollectionSchema, type Project } from "@/types/project";
import { SkillSchema, ExperienceSchema, PersonalInfoSchema } from "@/types/common";
import type { Skill, Experience, PersonalInfo } from "@/types/common";

const DATA_DIR = path.join(process.cwd(), "content/data");
const PROJECTS_FILE = path.join(process.cwd(), "content/projects/projects.json");

/**
 * Read and parse JSON file
 */
function readJSONFile<T>(filePath: string): T {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
}

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
  try {
    const data = readJSONFile(PROJECTS_FILE);
    const validated = ProjectsCollectionSchema.parse(data);
    return validated.projects;
  } catch (error) {
    console.error("Error loading projects:", error);
    return [];
  }
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects();
  return projects.find((project) => project.slug === slug) || null;
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(limit?: number): Project[] {
  const projects = getAllProjects();
  const featured = projects.filter((project) => project.featured);

  if (limit) {
    return featured.slice(0, limit);
  }

  return featured;
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: string): Project[] {
  const projects = getAllProjects();
  return projects.filter((project) => project.category === category);
}

/**
 * Get projects by technology
 */
export function getProjectsByTechnology(technology: string): Project[] {
  const projects = getAllProjects();
  return projects.filter((project) => project.technologies.includes(technology));
}

/**
 * Get all unique technologies from projects
 */
export function getAllTechnologies(): string[] {
  const projects = getAllProjects();
  const technologies = new Set<string>();

  projects.forEach((project) => {
    project.technologies.forEach((tech) => technologies.add(tech));
  });

  return Array.from(technologies).sort();
}

/**
 * Get all skills
 */
export function getAllSkills(): Skill[] {
  try {
    const filePath = path.join(DATA_DIR, "skills.json");
    const data = readJSONFile<{ skills: unknown[] }>(filePath);

    return data.skills.map((skill) => SkillSchema.parse(skill));
  } catch (error) {
    console.error("Error loading skills:", error);
    return [];
  }
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: string): Skill[] {
  const skills = getAllSkills();
  return skills.filter((skill) => skill.category === category);
}

/**
 * Get all experiences
 */
export function getAllExperiences(): Experience[] {
  try {
    const filePath = path.join(DATA_DIR, "experience.json");
    const data = readJSONFile<{ experiences: unknown[] }>(filePath);

    return data.experiences.map((exp) => ExperienceSchema.parse(exp));
  } catch (error) {
    console.error("Error loading experiences:", error);
    return [];
  }
}

/**
 * Get personal info
 */
export function getPersonalInfo(): PersonalInfo | null {
  try {
    const filePath = path.join(DATA_DIR, "personal.json");
    const data = readJSONFile(filePath);

    return PersonalInfoSchema.parse(data);
  } catch (error) {
    console.error("Error loading personal info:", error);
    return null;
  }
}
