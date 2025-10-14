import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("NotFound", () => {
  it("404メッセージを表示する", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("すべてのクイックリンクを表示する", () => {
    render(<NotFound />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Resume")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    // Contact is removed from navigation (Task 15.1)
  });

  it("Homeリンクは表示しない", () => {
    render(<NotFound />);
    // Quick Linksセクションには "Home" は含まれない（Go to Homeボタンとは別）
    const links = screen.queryAllByRole("link", { name: "Home" });
    // "Go to Home"ボタンのみが存在する
    expect(links.length).toBe(0);
  });

  it("Go to Homeボタンを表示する", () => {
    render(<NotFound />);
    expect(screen.getByText("Go to Home")).toBeInTheDocument();
  });

  it("Go Backボタンを表示する", () => {
    render(<NotFound />);
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });
});
