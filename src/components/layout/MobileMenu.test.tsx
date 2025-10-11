import { render, screen, fireEvent } from "@testing-library/react";
import { MobileMenu } from "./MobileMenu";
import { ThemeProvider } from "@/providers/ThemeProvider";

// usePathnameをモック
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
}));

// window.matchMediaをモック
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// テストヘルパー: ThemeProviderでラップ
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe("MobileMenu", () => {
  describe("ブログ記事が存在する場合", () => {
    it("メニューを開いたときにBlogリンクを表示する", () => {
      renderWithTheme(<MobileMenu hasBlogPosts={true} />);
      const toggleButton = screen.getByLabelText("Toggle menu");
      fireEvent.click(toggleButton);
      expect(screen.getByText("Blog")).toBeInTheDocument();
    });

    it("メニューを開いたときにすべてのナビゲーションアイテムを表示する", () => {
      renderWithTheme(<MobileMenu hasBlogPosts={true} />);
      const toggleButton = screen.getByLabelText("Toggle menu");
      fireEvent.click(toggleButton);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Blog")).toBeInTheDocument();
      expect(screen.getByText("Resume")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });
  });

  describe("ブログ記事が存在しない場合", () => {
    it("メニューを開いたときにBlogリンクを表示しない", () => {
      renderWithTheme(<MobileMenu hasBlogPosts={false} />);
      const toggleButton = screen.getByLabelText("Toggle menu");
      fireEvent.click(toggleButton);
      expect(screen.queryByText("Blog")).not.toBeInTheDocument();
    });

    it("メニューを開いたときにBlog以外のナビゲーションアイテムを表示する", () => {
      renderWithTheme(<MobileMenu hasBlogPosts={false} />);
      const toggleButton = screen.getByLabelText("Toggle menu");
      fireEvent.click(toggleButton);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Resume")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });
  });
});
