import { render, screen } from "@testing-library/react";
import { SkillsSection } from "./SkillsSection";
import type { Skill } from "@/types/skill";

describe("SkillsSection", () => {
  const mockSkills: Skill[] = [
    {
      id: "react",
      name: "React",
      category: "Frontend",
      level: 5,
      yearsOfExperience: 4,
      evidence: "ダッシュボード開発経験",
      description: "Hooks、Context API",
    },
    {
      id: "nodejs",
      name: "Node.js",
      category: "Backend",
      level: 4,
      yearsOfExperience: 3,
      evidence: "REST API実装経験",
      description: "Express.js、REST API",
    },
    {
      id: "typescript",
      name: "TypeScript",
      category: "Programming Languages",
      level: 4,
      yearsOfExperience: 3,
      evidence: "型安全な設計実践",
      description: "型安全な開発",
    },
  ];

  it("セクションタイトルを表示する", () => {
    render(<SkillsSection skills={mockSkills} />);
    expect(screen.getByRole("heading", { name: /スキル/ })).toBeInTheDocument();
  });

  it("全てのスキルを表示する", () => {
    render(<SkillsSection skills={mockSkills} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("カテゴリ別にグループ化して表示する", () => {
    render(<SkillsSection skills={mockSkills} />);
    expect(screen.getByRole("heading", { name: "Frontend", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Backend", level: 3 })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Programming Languages",
        level: 3,
      })
    ).toBeInTheDocument();
  });

  it("スキルが空の場合、メッセージを表示する", () => {
    render(<SkillsSection skills={[]} />);
    expect(screen.getByText(/スキル情報がありません/)).toBeInTheDocument();
  });
});
