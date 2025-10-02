import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkillFilter } from "./SkillFilter";
import type { SkillCategory } from "@/types/skill";

describe("SkillFilter", () => {
  const categories: SkillCategory[] = [
    "Programming Languages",
    "Frontend",
    "Backend",
    "DevOps",
    "Testing",
  ];

  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it("全カテゴリフィルターボタンを表示する", () => {
    render(
      <SkillFilter
        categories={categories}
        selectedCategory={null}
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(screen.getByRole("button", { name: "全て" })).toBeInTheDocument();
    categories.forEach((category) => {
      expect(screen.getByRole("button", { name: category })).toBeInTheDocument();
    });
  });

  it("カテゴリをクリックするとフィルターが変更される", async () => {
    const user = userEvent.setup();
    render(
      <SkillFilter
        categories={categories}
        selectedCategory={null}
        onFilterChange={mockOnFilterChange}
      />
    );

    const frontendButton = screen.getByRole("button", { name: "Frontend" });
    await user.click(frontendButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith("Frontend");
  });

  it("選択されたカテゴリが視覚的にハイライトされる", () => {
    render(
      <SkillFilter
        categories={categories}
        selectedCategory="Frontend"
        onFilterChange={mockOnFilterChange}
      />
    );

    const frontendButton = screen.getByRole("button", { name: "Frontend" });
    expect(frontendButton).toHaveClass("bg-blue-600");
  });

  it("全てボタンをクリックするとフィルターがクリアされる", async () => {
    const user = userEvent.setup();
    render(
      <SkillFilter
        categories={categories}
        selectedCategory="Frontend"
        onFilterChange={mockOnFilterChange}
      />
    );

    const allButton = screen.getByRole("button", { name: "全て" });
    await user.click(allButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith(null);
  });
});
