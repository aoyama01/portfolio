import { render, screen } from "@testing-library/react";
import { Navigation } from "./Navigation";

// usePathnameをモック
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
}));

describe("Navigation", () => {
  describe("ブログ記事が存在する場合", () => {
    it("Blogリンクを表示する", () => {
      render(<Navigation hasBlogPosts={true} />);
      expect(screen.getByText("Blog")).toBeInTheDocument();
    });

    it("すべてのナビゲーションアイテムを表示する", () => {
      render(<Navigation hasBlogPosts={true} />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Blog")).toBeInTheDocument();
      expect(screen.getByText("Resume")).toBeInTheDocument();
      // Contact is removed from navigation (Task 15.1)
    });
  });

  describe("ブログ記事が存在しない場合", () => {
    it("Blogリンクを表示しない", () => {
      render(<Navigation hasBlogPosts={false} />);
      expect(screen.queryByText("Blog")).not.toBeInTheDocument();
    });

    it("Blog以外のナビゲーションアイテムを表示する", () => {
      render(<Navigation hasBlogPosts={false} />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Resume")).toBeInTheDocument();
      // Contact is removed from navigation (Task 15.1)
    });
  });
});
