/**
 * Feature flags for the portfolio website
 *
 * Note: Changes require rebuild and deployment
 *
 * @see docs/adr/0001-feature-flags-for-temporary-ui-changes.md
 */
export const FEATURES = {
  /**
   * Project filters configuration
   *
   * History:
   * - 2025-10-13: Temporarily disabled for UX simplification (Task 11.3)
   * - May re-enable in future based on user feedback
   *
   * Review date: 2026-01-13 (3 months)
   */
  projectFilters: {
    /**
     * Master switch for all filter features
     * When false, only category filter remains visible
     */
    enabled: false,

    /**
     * Advanced filters (Technology, Year, AND/OR mode)
     * Requires `enabled: true` to work
     */
    advancedFilters: false,

    /**
     * Sort options dropdown (newest/oldest/category/complexity)
     * Requires `enabled: true` to work
     */
    sortOptions: false,

    /**
     * Category filter (Webアプリ, ツール, etc.)
     * Always available regardless of `enabled` state
     */
    categoryFilter: true,
  },

  // Future feature flags can be added here
  // Example:
  // blog: {
  //   comments: false,
  //   reactions: false,
  // },
  // resume: {
  //   downloadPdf: false,
  // },
} as const;

export type FeatureFlags = typeof FEATURES;
