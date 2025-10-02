import type { Experience } from "@/types/common";

/**
 * Sort experiences by start date (newest first)
 */
export function sortExperiencesByDate(experiences: Experience[]): Experience[] {
  return [...experiences].sort((a, b) => {
    return b.startDate.getTime() - a.startDate.getTime();
  });
}
