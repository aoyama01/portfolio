"use client";

import { useState, useMemo } from "react";
import type { Skill, SkillCategory } from "@/types/skill";
import { SkillFilter } from "./SkillFilter";
import { SkillsSection } from "./SkillsSection";

interface SkillsSectionWithFilterProps {
  skills: Skill[];
}

export function SkillsSectionWithFilter({ skills }: SkillsSectionWithFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);

  // Extract unique categories from skills
  const categories = useMemo(() => {
    const uniqueCategories = new Set(skills.map((skill) => skill.category));
    return Array.from(uniqueCategories);
  }, [skills]);

  // Filter skills based on selected category
  const filteredSkills = useMemo(() => {
    if (selectedCategory === null) {
      return skills;
    }
    return skills.filter((skill) => skill.category === selectedCategory);
  }, [skills, selectedCategory]);

  return (
    <div>
      <SkillFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onFilterChange={setSelectedCategory}
      />
      <SkillsSection skills={filteredSkills} />
    </div>
  );
}
