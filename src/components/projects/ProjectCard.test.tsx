import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types/project";
import { FEATURES } from "@/lib/config/features";

describe("ProjectCard - showDetailPage behavior", () => {
  const baseProject: Project = {
    id: "1",
    slug: "test-project",
    title: "Test Project",
    description: "Test project description for testing purposes",
    technologies: ["React", "TypeScript"],
    category: "web-app",
    featured: false,
    startDate: new Date("2025-01-01"),
    status: "completed",
    githubUrl: "https://github.com/test/project",
    imageUrl: "/images/test.png",
  };

  describe("showDetailPage: true の場合", () => {
    it("画像クリックで詳細ページに遷移する（内部リンク）", () => {
      const projectWithDetailPage: Project = {
        ...baseProject,
        showDetailPage: true,
      };

      render(<ProjectCard project={projectWithDetailPage} />);

      // Next.js Link で詳細ページに遷移するリンクを確認
      const detailLink = screen.getByRole("link", {
        name: `View ${baseProject.title} details`,
      });

      expect(detailLink).toBeInTheDocument();
      expect(detailLink).toHaveAttribute("href", `/projects/${baseProject.slug}`);
      // 内部リンクなので target="_blank" はない
      expect(detailLink).not.toHaveAttribute("target", "_blank");
    });

    it("グローバルフラグが false でも詳細ページに遷移する", () => {
      // グローバルフラグは現在 false
      expect(FEATURES.projectDetailPage.enabled).toBe(false);

      const projectWithDetailPage: Project = {
        ...baseProject,
        showDetailPage: true,
      };

      render(<ProjectCard project={projectWithDetailPage} />);

      const detailLink = screen.getByRole("link", {
        name: `View ${baseProject.title} details`,
      });
      expect(detailLink).toHaveAttribute("href", `/projects/${baseProject.slug}`);
    });
  });

  describe("showDetailPage: false の場合", () => {
    it("画像クリックでGitHubリポジトリに遷移する（外部リンク）", () => {
      const projectWithoutDetailPage: Project = {
        ...baseProject,
        showDetailPage: false,
      };

      render(<ProjectCard project={projectWithoutDetailPage} />);

      // GitHub リンクを確認
      const githubLink = screen.getByRole("link", {
        name: `View ${baseProject.title} on GitHub`,
      });

      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute("href", baseProject.githubUrl);
      expect(githubLink).toHaveAttribute("target", "_blank");
      expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("showDetailPage: 未設定（undefined）の場合", () => {
    it("グローバルフラグに従う（現在は false なので GitHub リンク）", () => {
      const projectWithoutSetting: Project = {
        ...baseProject,
        // showDetailPage フィールドなし
      };

      render(<ProjectCard project={projectWithoutSetting} />);

      const githubLink = screen.getByRole("link", {
        name: `View ${baseProject.title} on GitHub`,
      });

      // グローバルフラグが false なので GitHub リンク
      expect(githubLink).toHaveAttribute("href", baseProject.githubUrl);
      expect(githubLink).toHaveAttribute("target", "_blank");
    });
  });

  describe("GitHubUrl がない場合", () => {
    it("showDetailPage: false でもリンクなし", () => {
      const projectWithoutGithub: Project = {
        ...baseProject,
        githubUrl: undefined,
        showDetailPage: false,
      };

      render(<ProjectCard project={projectWithoutGithub} />);

      // リンクが存在しないことを確認（View on GitHub も View project details もない）
      expect(
        screen.queryByRole("link", { name: `View ${baseProject.title} on GitHub` })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: `View ${baseProject.title} details` })
      ).not.toBeInTheDocument();
    });

    it("showDetailPage: true なら詳細ページに遷移", () => {
      const projectWithoutGithub: Project = {
        ...baseProject,
        githubUrl: undefined,
        showDetailPage: true,
      };

      render(<ProjectCard project={projectWithoutGithub} />);

      const detailLink = screen.getByRole("link", {
        name: `View ${baseProject.title} details`,
      });
      expect(detailLink).toHaveAttribute("href", `/projects/${baseProject.slug}`);
    });
  });

  describe("優先順位テスト", () => {
    it("showDetailPage: true が最優先（グローバルフラグより優先）", () => {
      const project: Project = {
        ...baseProject,
        showDetailPage: true,
      };

      render(<ProjectCard project={project} />);

      const detailLink = screen.getByRole("link", {
        name: `View ${baseProject.title} details`,
      });

      // グローバルフラグは false だが、個別設定が true なので詳細ページ
      expect(detailLink).toHaveAttribute("href", `/projects/${baseProject.slug}`);
    });

    it("showDetailPage: undefined → グローバルフラグ → GitHubUrl の順", () => {
      const project: Project = {
        ...baseProject,
        // showDetailPage なし → グローバルフラグ（false）→ GitHubUrl
      };

      render(<ProjectCard project={project} />);

      const githubLink = screen.getByRole("link", {
        name: `View ${baseProject.title} on GitHub`,
      });
      expect(githubLink).toHaveAttribute("href", baseProject.githubUrl);
    });
  });
});
