import { render, screen } from "@testing-library/react";
import { EducationSection } from "./EducationSection";
import type { Education } from "@/types/common";

describe("EducationSection", () => {
  const mockEducation: Education[] = [
    {
      school: "東京大学",
      degree: "学士",
      field: "情報工学",
      startDate: new Date("2018-04-01"),
      endDate: new Date("2022-03-31"),
      gpa: "3.8/4.0",
      activities: ["プログラミングサークル", "アルゴリズム研究会"],
      achievements: ["学部長賞受賞", "国際学会での論文発表"],
    },
    {
      school: "京都大学大学院",
      degree: "修士",
      field: "人工知能",
      startDate: new Date("2022-04-01"),
      endDate: new Date("2024-03-31"),
      lab: "機械学習研究室",
      gpa: "4.0/4.0",
      achievements: ["最優秀論文賞"],
    },
    {
      school: "早稲田大学",
      degree: "学士",
      field: "コンピュータサイエンス",
      startDate: new Date("2025-04-01"),
    },
  ];

  it("学歴情報がない場合、適切なメッセージを表示する", () => {
    render(<EducationSection education={[]} />);
    expect(screen.getByText("学歴情報がありません")).toBeInTheDocument();
  });

  it("学歴情報を時系列順（新しい順）に表示する", () => {
    render(<EducationSection education={mockEducation} />);

    const cards = screen.getAllByTestId("education-card");
    expect(cards).toHaveLength(3);

    // 新しい順に表示されることを確認
    expect(cards[0]).toHaveTextContent("早稲田大学");
    expect(cards[1]).toHaveTextContent("京都大学大学院");
    expect(cards[2]).toHaveTextContent("東京大学");
  });

  it("各学歴カードに学校名と学位・専攻を表示する", () => {
    render(<EducationSection education={mockEducation} />);

    expect(screen.getByText("東京大学")).toBeInTheDocument();
    expect(screen.getByText("学士 - 情報工学")).toBeInTheDocument();
    expect(screen.getByText("京都大学大学院")).toBeInTheDocument();
    expect(screen.getByText("修士 - 人工知能")).toBeInTheDocument();
  });

  it("在学期間を適切なフォーマットで表示する", () => {
    render(<EducationSection education={mockEducation} />);

    expect(screen.getByText("2018年4月 - 2022年3月")).toBeInTheDocument();
    expect(screen.getByText("2022年4月 - 2024年3月")).toBeInTheDocument();
    expect(screen.getByText(/2025年4月 - 現在/)).toBeInTheDocument();
  });

  it("GPAが存在する場合に表示する", () => {
    render(<EducationSection education={mockEducation} />);

    expect(screen.getByText(/GPA: 3.8\/4.0/)).toBeInTheDocument();
    expect(screen.getByText(/GPA: 4.0\/4.0/)).toBeInTheDocument();
  });

  it("研究室情報が存在する場合に表示する", () => {
    render(<EducationSection education={mockEducation} />);

    expect(screen.getByText(/研究室: 機械学習研究室/)).toBeInTheDocument();
  });

  it("研究室情報がない場合、研究室セクションを表示しない", () => {
    render(<EducationSection education={mockEducation} />);

    const cards = screen.getAllByTestId("education-card");
    // 東京大学のカード（研究室情報なし）には研究室テキストがないことを確認
    expect(cards[2]).not.toHaveTextContent("研究室:");
  });

  it("課外活動をリスト形式で表示する", () => {
    render(<EducationSection education={mockEducation} />);

    expect(screen.getByText("プログラミングサークル")).toBeInTheDocument();
    expect(screen.getByText("アルゴリズム研究会")).toBeInTheDocument();
  });

  it("実績・受賞をリスト形式で表示する", () => {
    render(<EducationSection education={mockEducation} />);

    expect(screen.getByText("学部長賞受賞")).toBeInTheDocument();
    expect(screen.getByText("国際学会での論文発表")).toBeInTheDocument();
    expect(screen.getByText("最優秀論文賞")).toBeInTheDocument();
  });

  it("課外活動がない場合、課外活動セクションを表示しない", () => {
    const educationWithoutActivities: Education[] = [
      {
        school: "Test University",
        degree: "Bachelor",
        field: "Computer Science",
        startDate: new Date("2020-01-01"),
        endDate: new Date("2024-01-01"),
      },
    ];

    render(<EducationSection education={educationWithoutActivities} />);

    expect(screen.queryByText("課外活動")).not.toBeInTheDocument();
  });

  it("実績がない場合、実績セクションを表示しない", () => {
    const educationWithoutAchievements: Education[] = [
      {
        school: "Test University",
        degree: "Bachelor",
        field: "Computer Science",
        startDate: new Date("2020-01-01"),
        endDate: new Date("2024-01-01"),
      },
    ];

    render(<EducationSection education={educationWithoutAchievements} />);

    expect(screen.queryByText("実績・受賞")).not.toBeInTheDocument();
  });

  it("セクションタイトルを表示する", () => {
    render(<EducationSection education={mockEducation} />);

    expect(screen.getByRole("heading", { name: "学歴" })).toBeInTheDocument();
  });

  it("時系列表示のための視覚的インジケーターを含む", () => {
    const { container } = render(<EducationSection education={mockEducation} />);

    // タイムラインの視覚要素が存在することを確認
    const timeline = container.querySelector('[data-testid="timeline-indicator"]');
    expect(timeline).toBeInTheDocument();
  });
});
