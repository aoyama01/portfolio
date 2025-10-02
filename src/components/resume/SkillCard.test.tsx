import { render, screen } from "@testing-library/react";
import { SkillCard } from "./SkillCard";
import type { Skill } from "@/types/skill";

describe("SkillCard", () => {
  const mockSkill: Skill = {
    id: "react",
    name: "React",
    category: "Frontend",
    proficiency: 5,
    yearsOfExperience: 4,
    description: "Hooks、Context API、パフォーマンス最適化",
  };

  it("スキル名を表示する", () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("スキルカテゴリを表示する", () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("習熟度レベルを表示する", () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText(/習熟度/)).toBeInTheDocument();
  });

  it("経験年数を表示する", () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText(/4年/)).toBeInTheDocument();
  });

  it("説明文を表示する", () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText("Hooks、Context API、パフォーマンス最適化")).toBeInTheDocument();
  });

  it("習熟度に応じたプログレスバーを表示する", () => {
    render(<SkillCard skill={mockSkill} />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "5");
    expect(progressBar).toHaveAttribute("aria-valuemax", "5");
  });

  it("習熟度が最大の場合、プログレスバーが100%表示される", () => {
    render(<SkillCard skill={mockSkill} />);
    const progressBar = screen.getByRole("progressbar");
    // proficiency 5 = 100%
    const progressFill = progressBar.querySelector("div");
    expect(progressFill).toHaveStyle({ width: "100%" });
  });
});
