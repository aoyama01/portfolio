import { render, screen } from "@testing-library/react";
import { ProjectsClient } from "./ProjectsClient";
import type { Project } from "@/types/project";
import { FEATURES } from "@/lib/config/features";

describe("ProjectsClient - Button Style Consistency", () => {
  const mockProjects: Project[] = [
    {
      id: "1",
      slug: "test-project",
      title: "Test Project",
      description: "A test project",
      technologies: ["React", "TypeScript"],
      category: "web-app",
      featured: false,
      startDate: "2025-01-01",
      imageUrl: "/test.jpg",
    },
  ];

  describe("カテゴリフィルターボタン", () => {
    it("選択時に bg-blue-600 text-white クラスを持つ", () => {
      render(<ProjectsClient initialProjects={mockProjects} />);

      const allButton = screen.getByRole("button", { name: "すべて" });
      expect(allButton).toHaveClass("bg-blue-600", "text-white");
    });

    it("非選択時に bg-gray-200 text-gray-700 (light mode) クラスを持つ", () => {
      render(<ProjectsClient initialProjects={mockProjects} />);

      const webAppButton = screen.getByRole("button", { name: "Webアプリ" });
      expect(webAppButton).toHaveClass("bg-gray-200", "text-gray-700");
    });

    it("非選択時に hover:bg-gray-300 クラスを持つ", () => {
      render(<ProjectsClient initialProjects={mockProjects} />);

      const webAppButton = screen.getByRole("button", { name: "Webアプリ" });
      expect(webAppButton).toHaveClass("hover:bg-gray-300");
    });

    it("ダークモード時に非選択ボタンが dark:bg-gray-700 dark:text-gray-300 クラスを持つ", () => {
      render(<ProjectsClient initialProjects={mockProjects} />);

      const webAppButton = screen.getByRole("button", { name: "Webアプリ" });
      expect(webAppButton).toHaveClass("dark:bg-gray-700", "dark:text-gray-300");
    });

    it("ダークモード時にホバーで dark:hover:bg-gray-600 クラスを持つ", () => {
      render(<ProjectsClient initialProjects={mockProjects} />);

      const webAppButton = screen.getByRole("button", { name: "Webアプリ" });
      expect(webAppButton).toHaveClass("dark:hover:bg-gray-600");
    });
  });

  // Advanced filters tests - only run when feature is enabled
  (FEATURES.projectFilters.advancedFilters ? describe : describe.skip)(
    "AND/ORモード切り替えボタン",
    () => {
      it("選択時に bg-blue-600 text-white クラスを持つ", async () => {
        render(<ProjectsClient initialProjects={mockProjects} />);

        // 詳細フィルターを表示
        const advancedToggle = screen.getByRole("button", {
          name: "詳細フィルターを表示",
        });
        await advancedToggle.click();

        const andButton = screen.getByRole("button", { name: "AND（すべて一致）" });
        expect(andButton).toHaveClass("bg-blue-600", "text-white");
      });

      it("非選択時に bg-gray-200 text-gray-700 クラスを持つ", async () => {
        render(<ProjectsClient initialProjects={mockProjects} />);

        const advancedToggle = screen.getByRole("button", {
          name: "詳細フィルターを表示",
        });
        await advancedToggle.click();

        const orButton = screen.getByRole("button", { name: "OR（いずれか一致）" });
        expect(orButton).toHaveClass("bg-gray-200", "text-gray-700");
      });
    }
  );

  (FEATURES.projectFilters.advancedFilters ? describe : describe.skip)(
    "技術スタックフィルターボタン",
    () => {
      it("選択時に border-blue-600 bg-blue-600 text-white クラスを持つ", async () => {
        render(<ProjectsClient initialProjects={mockProjects} />);

        const advancedToggle = screen.getByRole("button", {
          name: "詳細フィルターを表示",
        });
        await advancedToggle.click();

        const reactButton = screen.getByRole("button", { name: "React" });
        await reactButton.click();

        expect(reactButton).toHaveClass("border-blue-600", "bg-blue-600", "text-white");
      });

      it("非選択時に border-gray-300 bg-gray-100 text-gray-700 クラスを持つ", async () => {
        render(<ProjectsClient initialProjects={mockProjects} />);

        const advancedToggle = screen.getByRole("button", {
          name: "詳細フィルターを表示",
        });
        await advancedToggle.click();

        const reactButton = screen.getByRole("button", { name: "React" });
        expect(reactButton).toHaveClass("border-gray-300", "bg-gray-100", "text-gray-700");
      });

      it("非選択時にホバーで hover:bg-gray-200 クラスを持つ", async () => {
        render(<ProjectsClient initialProjects={mockProjects} />);

        const advancedToggle = screen.getByRole("button", {
          name: "詳細フィルターを表示",
        });
        await advancedToggle.click();

        const reactButton = screen.getByRole("button", { name: "React" });
        expect(reactButton).toHaveClass("hover:bg-gray-200");
      });
    }
  );
});
