import { render, screen } from "@testing-library/react";
import { ExperienceSection } from "./ExperienceSection";
import type { Experience } from "@/types/common";

describe("ExperienceSection", () => {
  const mockExperiences: Experience[] = [
    {
      company: "Tech Company A",
      position: "Senior Frontend Developer",
      startDate: new Date("2023-01-01"),
      endDate: new Date("2024-12-31"),
      description: "Led frontend development team",
      achievements: ["Implemented new design system", "Improved performance by 40%"],
      technologies: ["React", "TypeScript", "Next.js"],
    },
    {
      company: "Startup B",
      position: "Full Stack Developer",
      startDate: new Date("2021-06-01"),
      endDate: new Date("2022-12-31"),
      description: "Developed full-stack applications",
      achievements: ["Built MVP from scratch"],
      technologies: ["Node.js", "React"],
    },
    {
      company: "Current Company",
      position: "Tech Lead",
      startDate: new Date("2025-01-01"),
      description: "Leading technical decisions",
      achievements: ["Architected new microservices platform"],
      technologies: ["Go", "Kubernetes", "React"],
    },
  ];

  it("職歴情報がない場合、適切なメッセージを表示する", () => {
    render(<ExperienceSection experiences={[]} />);
    expect(screen.getByText("インターンシップ情報がありません")).toBeInTheDocument();
  });

  it("職歴情報を時系列順（新しい順）に表示する", () => {
    render(<ExperienceSection experiences={mockExperiences} />);

    const cards = screen.getAllByTestId("experience-card");
    expect(cards).toHaveLength(3);

    // 新しい順に表示されることを確認
    expect(cards[0]).toHaveTextContent("Current Company");
    expect(cards[1]).toHaveTextContent("Tech Company A");
    expect(cards[2]).toHaveTextContent("Startup B");
  });

  it("各職歴カードに会社名と役職を表示する", () => {
    render(<ExperienceSection experiences={mockExperiences} />);

    expect(screen.getByText("Tech Company A")).toBeInTheDocument();
    expect(screen.getByText("Senior Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Startup B")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
  });

  it("勤務期間を適切なフォーマットで表示する", () => {
    render(<ExperienceSection experiences={mockExperiences} />);

    expect(screen.getByText("2023年1月 - 2024年12月")).toBeInTheDocument();
    expect(screen.getByText("2021年6月 - 2022年12月")).toBeInTheDocument();
    expect(screen.getByText(/2025年1月 - 現在/)).toBeInTheDocument();
  });

  it("職務内容の説明を表示する", () => {
    render(<ExperienceSection experiences={mockExperiences} />);

    expect(screen.getByText("Led frontend development team")).toBeInTheDocument();
    expect(screen.getByText("Developed full-stack applications")).toBeInTheDocument();
  });

  it("実績・成果をリスト形式で表示する", () => {
    render(<ExperienceSection experiences={mockExperiences} />);

    expect(screen.getByText("Implemented new design system")).toBeInTheDocument();
    expect(screen.getByText("Improved performance by 40%")).toBeInTheDocument();
    expect(screen.getByText("Built MVP from scratch")).toBeInTheDocument();
  });

  it("使用技術をタグ形式で表示する", () => {
    render(<ExperienceSection experiences={mockExperiences} />);

    // Reactは複数の職歴に含まれるため、getAllByTextを使用
    expect(screen.getAllByText("React").length).toBeGreaterThan(0);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("実績がない場合、実績セクションを表示しない", () => {
    const experienceWithoutAchievements: Experience[] = [
      {
        company: "Company C",
        position: "Developer",
        startDate: new Date("2020-01-01"),
        endDate: new Date("2021-01-01"),
        description: "Development work",
      },
    ];

    render(<ExperienceSection experiences={experienceWithoutAchievements} />);

    expect(screen.queryByText("主な実績")).not.toBeInTheDocument();
  });

  it("使用技術がない場合、技術タグを表示しない", () => {
    const experienceWithoutTech: Experience[] = [
      {
        company: "Company D",
        position: "Manager",
        startDate: new Date("2020-01-01"),
        endDate: new Date("2021-01-01"),
        description: "Management work",
      },
    ];

    render(<ExperienceSection experiences={experienceWithoutTech} />);

    // 技術タグのコンテナが存在しないことを確認
    const card = screen.getByTestId("experience-card");
    expect(card).not.toHaveTextContent("使用技術");
  });

  it("セクションタイトルを表示する", () => {
    render(<ExperienceSection experiences={mockExperiences} />);

    expect(screen.getByRole("heading", { name: "Internship" })).toBeInTheDocument();
  });

  it("時系列表示のための視覚的インジケーターを含む", () => {
    const { container } = render(<ExperienceSection experiences={mockExperiences} />);

    // タイムラインの視覚要素が存在することを確認
    const timeline = container.querySelector('[data-testid="timeline-indicator"]');
    expect(timeline).toBeInTheDocument();
  });
});
