import { render, screen } from "@testing-library/react";
import { ExternalBlogCard } from "./ExternalBlogCard";
import type { ExternalBlogPost } from "@/types/external-blog";

describe("ExternalBlogCard", () => {
  const mockBlogPost: ExternalBlogPost = {
    id: "blog-001",
    title: "Next.js 15の新機能を試してみた",
    description: "Next.js 15で追加された新機能について詳しく解説します。",
    url: "https://qiita.com/user/items/abc123",
    platform: "qiita",
    publishedAt: new Date("2025-10-01"),
    tags: ["nextjs", "react", "typescript"],
    featured: false,
  };

  it("記事タイトルを表示する", () => {
    render(<ExternalBlogCard post={mockBlogPost} />);
    expect(screen.getByText("Next.js 15の新機能を試してみた")).toBeInTheDocument();
  });

  it("記事の説明を表示する", () => {
    render(<ExternalBlogCard post={mockBlogPost} />);
    expect(
      screen.getByText("Next.js 15で追加された新機能について詳しく解説します。")
    ).toBeInTheDocument();
  });

  it("プラットフォーム名を表示する", () => {
    render(<ExternalBlogCard post={mockBlogPost} />);
    expect(screen.getByText("Qiita")).toBeInTheDocument();
  });

  it("公開日を表示する", () => {
    render(<ExternalBlogCard post={mockBlogPost} />);
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  it("タグを表示する", () => {
    render(<ExternalBlogCard post={mockBlogPost} />);
    expect(screen.getByText("nextjs")).toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
  });

  it("外部リンクが新規タブで開く", () => {
    render(<ExternalBlogCard post={mockBlogPost} />);
    const link = screen.getByRole("link", {
      name: /Next.js 15の新機能を試してみた/,
    });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("featuredバッジを表示する", () => {
    const featuredPost = { ...mockBlogPost, featured: true };
    render(<ExternalBlogCard post={featuredPost} />);
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("説明がない場合でもエラーにならない", () => {
    const postWithoutDescription = { ...mockBlogPost, description: undefined };
    render(<ExternalBlogCard post={postWithoutDescription} />);
    expect(screen.getByText("Next.js 15の新機能を試してみた")).toBeInTheDocument();
  });

  it("タグが空の場合でもエラーにならない", () => {
    const postWithoutTags = { ...mockBlogPost, tags: [] };
    render(<ExternalBlogCard post={postWithoutTags} />);
    expect(screen.getByText("Next.js 15の新機能を試してみた")).toBeInTheDocument();
  });
});
