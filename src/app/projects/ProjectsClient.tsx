"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project, ProjectCategory, ComplexityLevel } from "@/types/project";
import { X } from "lucide-react";
import { FEATURES } from "@/lib/config/features";

interface ProjectsClientProps {
  initialProjects: Project[];
}

type SortOption = "newest" | "oldest" | "category" | "complexity";
type FilterMode = "AND" | "OR";

const categoryLabels: Record<ProjectCategory, string> = {
  "web-app": "Webアプリ",
  research: "研究",
  "mobile-app": "モバイルアプリ",
  library: "ライブラリ",
  tool: "ツール",
  experiment: "実験",
};

const complexityOrder: Record<ComplexityLevel, number> = {
  simple: 1,
  intermediate: 2,
  complex: 3,
  expert: 4,
};

// Unified button styles consistent with SkillFilter component
const BUTTON_STYLES = {
  selected: "bg-blue-600 text-white",
  unselected:
    "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
  techSelected: "border-blue-600 bg-blue-600 text-white",
  techUnselected:
    "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
} as const;

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">("all");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [filterMode, setFilterMode] = useState<FilterMode>("AND");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(initialProjects.map((p) => p.category));
    return Array.from(cats).sort();
  }, [initialProjects]);

  // Get unique technologies
  const technologies = useMemo(() => {
    const techs = new Set<string>();
    initialProjects.forEach((p) => p.technologies.forEach((t) => techs.add(t)));
    return Array.from(techs).sort();
  }, [initialProjects]);

  // Get unique years
  const years = useMemo(() => {
    const yrs = new Set<number>();
    initialProjects.forEach((p) => {
      yrs.add(new Date(p.startDate).getFullYear());
      if (p.endDate) {
        yrs.add(new Date(p.endDate).getFullYear());
      }
    });
    return Array.from(yrs).sort((a, b) => b - a);
  }, [initialProjects]);

  // Toggle technology selection
  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedTechnologies([]);
    setSelectedYear("all");
  };

  // Check if any filter is active
  const hasActiveFilters =
    selectedCategory !== "all" || selectedTechnologies.length > 0 || selectedYear !== "all";

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let projects = [...initialProjects];

    if (filterMode === "AND") {
      // AND mode: all conditions must match
      // Filter by category
      if (selectedCategory !== "all") {
        projects = projects.filter((p) => p.category === selectedCategory);
      }

      // Filter by technologies
      if (selectedTechnologies.length > 0) {
        projects = projects.filter((p) =>
          selectedTechnologies.every((tech) => p.technologies.includes(tech))
        );
      }

      // Filter by year
      if (selectedYear !== "all") {
        const year = parseInt(selectedYear);
        projects = projects.filter((p) => {
          const startYear = new Date(p.startDate).getFullYear();
          const endYear = p.endDate ? new Date(p.endDate).getFullYear() : startYear;
          return year >= startYear && year <= endYear;
        });
      }
    } else {
      // OR mode: at least one condition must match
      if (hasActiveFilters) {
        projects = projects.filter((p) => {
          const conditions: boolean[] = [];

          // Only add conditions that are actually selected
          if (selectedCategory !== "all") {
            conditions.push(p.category === selectedCategory);
          }

          if (selectedTechnologies.length > 0) {
            conditions.push(selectedTechnologies.some((tech) => p.technologies.includes(tech)));
          }

          if (selectedYear !== "all") {
            const year = parseInt(selectedYear);
            const startYear = new Date(p.startDate).getFullYear();
            const endYear = p.endDate ? new Date(p.endDate).getFullYear() : startYear;
            conditions.push(year >= startYear && year <= endYear);
          }

          // If no conditions selected, show all; otherwise match any condition
          return conditions.length === 0 || conditions.some((c) => c);
        });
      }
    }

    // Sort
    switch (sortBy) {
      case "newest":
        projects.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        break;
      case "oldest":
        projects.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        break;
      case "category":
        projects.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "complexity":
        projects.sort((a, b) => {
          const aComplexity = a.complexity ? complexityOrder[a.complexity] : 0;
          const bComplexity = b.complexity ? complexityOrder[b.complexity] : 0;
          return bComplexity - aComplexity;
        });
        break;
    }

    return projects;
  }, [
    initialProjects,
    selectedCategory,
    selectedTechnologies,
    selectedYear,
    sortBy,
    filterMode,
    hasActiveFilters,
  ]);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">Projects</h1>
        <p className="text-foreground/70 text-lg">
          技術的なプロジェクトとその実装内容をご紹介します。
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Primary Filters Row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === "all" ? BUTTON_STYLES.selected : BUTTON_STYLES.unselected
              }`}
            >
              すべて
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category ? BUTTON_STYLES.selected : BUTTON_STYLES.unselected
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>

          {/* Sort - conditionally hidden based on feature flag */}
          {FEATURES.projectFilters.sortOptions && (
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-foreground/70 text-sm font-medium">
                並び替え:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border-border bg-background focus:ring-foreground/20 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
              >
                <option value="newest">新着順</option>
                <option value="oldest">古い順</option>
                <option value="category">カテゴリ別</option>
                <option value="complexity">複雑度順</option>
              </select>
            </div>
          )}
        </div>

        {/* Advanced Filters Toggle - conditionally hidden based on feature flag */}
        {FEATURES.projectFilters.advancedFilters && (
          <>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors"
              >
                {showAdvancedFilters ? "詳細フィルターを隠す" : "詳細フィルターを表示"}
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 text-sm font-medium text-red-500 transition-colors hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                  フィルターをクリア
                </button>
              )}
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="border-border space-y-4 rounded-lg border p-4">
                {/* Filter Mode Toggle */}
                <div className="flex items-center gap-4">
                  <span className="text-foreground/70 text-sm font-medium">検索モード:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilterMode("AND")}
                      className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                        filterMode === "AND" ? BUTTON_STYLES.selected : BUTTON_STYLES.unselected
                      }`}
                    >
                      AND（すべて一致）
                    </button>
                    <button
                      onClick={() => setFilterMode("OR")}
                      className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                        filterMode === "OR" ? BUTTON_STYLES.selected : BUTTON_STYLES.unselected
                      }`}
                    >
                      OR（いずれか一致）
                    </button>
                  </div>
                </div>

                {/* Technology Filter */}
                <div>
                  <label className="text-foreground/70 mb-2 block text-sm font-medium">
                    技術スタック:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => toggleTechnology(tech)}
                        className={`rounded-lg border px-3 py-1 text-sm font-medium transition-colors ${
                          selectedTechnologies.includes(tech)
                            ? BUTTON_STYLES.techSelected
                            : BUTTON_STYLES.techUnselected
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year Filter */}
                <div>
                  <label
                    htmlFor="year"
                    className="text-foreground/70 mb-2 block text-sm font-medium"
                  >
                    年度:
                  </label>
                  <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="border-border bg-background focus:ring-foreground/20 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                  >
                    <option value="all">すべて</option>
                    {years.map((year) => (
                      <option key={year} value={year.toString()}>
                        {year}年
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Project Count */}
      <div className="text-foreground/60 mb-6 text-sm">
        {filteredProjects.length}件のプロジェクト
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-foreground/60 py-12 text-center">
          <p>該当するプロジェクトが見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}
