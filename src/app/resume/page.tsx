import { getSkills } from "@/lib/skills";
import { SkillsSectionWithFilter } from "@/components/resume";

export default function ResumePage() {
  const { skills } = getSkills();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-gray-100">Resume</h1>

      <SkillsSectionWithFilter skills={skills} />
    </div>
  );
}
