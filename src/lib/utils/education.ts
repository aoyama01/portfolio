import type { Education } from "@/types/common";

/**
 * Sort education by start date (newest first)
 */
export function sortEducationByDate(education: Education[]): Education[] {
  return [...education].sort((a, b) => {
    return b.startDate.getTime() - a.startDate.getTime();
  });
}
