import type { Experience } from "@/types/common";
import { formatDateRange } from "@/lib/utils/date";
import { sortExperiencesByDate } from "@/lib/utils/experience";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (experiences.length === 0) {
    return (
      <section className="py-8">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Internship</h2>
        <p className="text-gray-600 dark:text-gray-400">インターンシップ情報がありません</p>
      </section>
    );
  }

  const sortedExperiences = sortExperiencesByDate(experiences);

  return (
    <section className="py-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Internship</h2>

      <div className="relative">
        {/* Timeline indicator */}
        <div
          className="absolute top-0 bottom-0 left-0 w-0.5 bg-gray-300 dark:bg-gray-700"
          data-testid="timeline-indicator"
          aria-hidden="true"
        />

        <div className="space-y-8">
          {sortedExperiences.map((experience, index) => (
            <div
              key={`${experience.company}-${index}`}
              className="relative pl-8"
              data-testid="experience-card"
            >
              {/* Timeline dot */}
              <div
                className="absolute top-2 left-0 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-blue-600 dark:border-gray-900"
                aria-hidden="true"
              />

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                {/* Header: Company and Position */}
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {experience.company}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{experience.position}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {formatDateRange(experience.startDate, experience.endDate)}
                  </p>
                </div>

                {/* Description */}
                <p className="mb-4 text-gray-600 dark:text-gray-400">{experience.description}</p>

                {/* Achievements */}
                {experience.achievements && experience.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      主な実績
                    </h4>
                    <ul className="list-inside list-disc space-y-1">
                      {experience.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {experience.technologies && experience.technologies.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      使用技術
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
