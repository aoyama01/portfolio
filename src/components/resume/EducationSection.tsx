import type { Education } from "@/types/common";
import { formatDateRange } from "@/lib/utils/date";
import { sortEducationByDate } from "@/lib/utils/education";

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  if (education.length === 0) {
    return (
      <section className="py-8">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Education</h2>
        <p className="text-gray-600 dark:text-gray-400">学歴情報がありません</p>
      </section>
    );
  }

  const sortedEducation = sortEducationByDate(education);

  return (
    <section className="py-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Education</h2>

      <div className="relative">
        {/* Timeline indicator */}
        <div
          className="absolute top-0 bottom-0 left-0 w-0.5 bg-gray-300 dark:bg-gray-700"
          data-testid="timeline-indicator"
          aria-hidden="true"
        />

        <div className="space-y-8">
          {sortedEducation.map((edu, index) => (
            <div
              key={`${edu.school}-${index}`}
              className="relative pl-8"
              data-testid="education-card"
            >
              {/* Timeline dot */}
              <div
                className="absolute top-2 left-0 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-blue-600 dark:border-gray-900"
                aria-hidden="true"
              />

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                {/* Header: School and Degree/Field */}
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {edu.school}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {edu.degree} - {edu.field}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </p>
                  {edu.lab && <p className="text-sm text-gray-600 dark:text-gray-400">{edu.lab}</p>}
                </div>

                {/* GPA */}
                {edu.gpa && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">GPA: {edu.gpa}</p>
                  </div>
                )}

                {/* Activities */}
                {edu.activities && edu.activities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      課外活動
                    </h4>
                    <ul className="list-inside list-disc space-y-1">
                      {edu.activities.map((activity, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements */}
                {edu.achievements && edu.achievements.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      実績・受賞
                    </h4>
                    <ul className="list-inside list-disc space-y-1">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement}
                        </li>
                      ))}
                    </ul>
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
