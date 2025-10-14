import type { Skill } from "@/types/skill";
import { getSkillLevelDefinition, formatExperienceYears } from "@/lib/utils/skills";
import { Info } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const levelPercentage = (skill.level / 5) * 100;
  const levelDef = getSkillLevelDefinition(skill.level);

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
          <div className="flex items-center gap-1">
            <span className="text-gray-600 dark:text-gray-400">
              レベル{skill.level}: {levelDef.label}
            </span>
            <Tooltip
              content={
                <div className="max-w-xs">
                  <p className="font-semibold">{levelDef.label}</p>
                  <p className="mt-1 text-sm">{levelDef.description}</p>
                </div>
              }
            >
              <button
                type="button"
                className="translate-y-0.75 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="スキルレベルの詳細を表示"
              >
                <Info className="h-4 w-4" aria-hidden="true" role="img" />
              </button>
            </Tooltip>
          </div>
          {skill.yearsOfExperience && (
            <span className="text-gray-600 dark:text-gray-400">
              {formatExperienceYears(skill.yearsOfExperience)}
            </span>
          )}
        </div>
        <div
          role="progressbar"
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={5}
          className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
        >
          <div
            className="h-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
            style={{ width: `${levelPercentage}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">{skill.evidence}</p>

      {skill.description && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">{skill.description}</p>
      )}
    </div>
  );
}
