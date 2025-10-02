/**
 * Date formatting utilities
 */

/**
 * Format date to Japanese format (YYYY年M月)
 */
export function formatDateJapanese(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}年${month}月`;
}

/**
 * Format date range for experience period
 */
export function formatDateRange(startDate: Date, endDate?: Date): string {
  const start = formatDateJapanese(startDate);
  const end = endDate ? formatDateJapanese(endDate) : "現在";
  return `${start} - ${end}`;
}
