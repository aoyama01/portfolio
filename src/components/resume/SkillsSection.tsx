import type { Skill } from "@/types/skill";
import { SkillCard } from "./SkillCard";
import { groupSkillsByCategory } from "@/lib/utils/skills";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  if (skills.length === 0) {
    return (
      <section className="py-8">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Skill</h2>
        <p className="text-gray-600 dark:text-gray-400">スキル情報がありません</p>
      </section>
    );
  }

  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <section className="py-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Skill</h2>

      <div className="space-y-8">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
              {category}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categorySkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
