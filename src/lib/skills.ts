import fs from "fs";
import path from "path";
import type { SkillsData } from "@/types/skill";

export function getSkills(): SkillsData {
  const filePath = path.join(process.cwd(), "content/data/skills.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}
