import type { Skill } from "@/types/skill";

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const proficiencyPercentage = (skill.proficiency / 5) * 100;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{skill.name}</h3>
        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {skill.category}
        </span>
      </div>

      <div className="mb-3">
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">習熟度: {skill.proficiency}/5</span>
          <span className="text-gray-600 dark:text-gray-400">{skill.yearsOfExperience}年</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={skill.proficiency}
          aria-valuemin={0}
          aria-valuemax={5}
          className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
        >
          <div
            className="h-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
            style={{ width: `${proficiencyPercentage}%` }}
          />
        </div>
      </div>

      {skill.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
      )}
    </div>
  );
}
