import { render, screen } from "@testing-library/react";
import { BlogEmptyState } from "./BlogEmptyState";

describe("BlogEmptyState", () => {
  it("準備中メッセージを表示する", () => {
    render(<BlogEmptyState />);
    expect(screen.getByText(/準備中/)).toBeInTheDocument();
  });

  it("説明文を表示する", () => {
    render(<BlogEmptyState />);
    expect(screen.getByText(/外部ブログサイトへの記事投稿を準備しています/)).toBeInTheDocument();
  });

  it("アイコンを表示する", () => {
    const { container } = render(<BlogEmptyState />);
    // lucide-reactのアイコンはsvg要素として描画される
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
