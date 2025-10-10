import { getSkills } from "@/lib/skills";
import { getAllExperiences, getAllEducation } from "@/lib/content";
import { SkillsSectionWithFilter, ExperienceSection, EducationSection } from "@/components/resume";

export default function ResumePage() {
  const { skills } = getSkills();
  const experiences = getAllExperiences();
  const education = getAllEducation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-gray-100">Resume</h1>

      <SkillsSectionWithFilter skills={skills} />

      <ExperienceSection experiences={experiences} />

      <EducationSection education={education} />
    </div>
  );
}
