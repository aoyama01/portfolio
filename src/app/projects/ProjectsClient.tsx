"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project, ProjectCategory, ComplexityLevel } from "@/types/project";

interface ProjectsClientProps {
  initialProjects: Project[];
}

type SortOption = "newest" | "oldest" | "category" | "complexity";

const categoryLabels: Record<ProjectCategory, string> = {
  "web-app": "Webアプリ",
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

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">("all");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(initialProjects.map((p) => p.category));
    return Array.from(cats).sort();
  }, [initialProjects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let projects = [...initialProjects];

    // Filter by category
    if (selectedCategory !== "all") {
      projects = projects.filter((p) => p.category === selectedCategory);
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
  }, [initialProjects, selectedCategory, sortBy]);

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
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-foreground text-background"
                : "bg-foreground/10 hover:bg-foreground/20"
            }`}
          >
            すべて
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-foreground text-background"
                  : "bg-foreground/10 hover:bg-foreground/20"
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* Sort */}
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
