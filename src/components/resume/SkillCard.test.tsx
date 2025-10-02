import { render, screen } from "@testing-library/react";
import { SkillCard } from "./SkillCard";
import type { Skill } from "@/types/skill";

describe("SkillCard", () => {
  const mockSkill: Skill = {
    id: "react",
    name: "React",
    category: "Frontend",
    level: 5,
    yearsOfExperience: 4,
    evidence: "10万DAUのダッシュボード開発、Server Components設計",
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

  it("スキルレベルを表示する", () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText(/レベル/)).toBeInTheDocument();
    expect(screen.getByText(/エキスパート/)).toBeInTheDocument();
  });

  it("経験年数を表示する", () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText(/4年/)).toBeInTheDocument();
  });

  it("根拠を表示する", () => {
    render(<SkillCard skill={mockSkill} />);
    expect(
      screen.getByText("10万DAUのダッシュボード開発、Server Components設計")
    ).toBeInTheDocument();
  });

  it("レベルに応じたプログレスバーを表示する", () => {
    render(<SkillCard skill={mockSkill} />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "5");
    expect(progressBar).toHaveAttribute("aria-valuemax", "5");
  });

  it("レベルが最大の場合、プログレスバーが100%表示される", () => {
    render(<SkillCard skill={mockSkill} />);
    const progressBar = screen.getByRole("progressbar");
    // level 5 = 100%
    const progressFill = progressBar.querySelector("div");
    expect(progressFill).toHaveStyle({ width: "100%" });
  });
});
