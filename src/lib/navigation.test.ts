import { getFilteredNavItems, allNavItems } from "./navigation";

describe("navigation helpers", () => {
  describe("getFilteredNavItems", () => {
    it("ブログ記事が存在する場合、すべてのナビゲーションアイテムを返す", () => {
      const result = getFilteredNavItems(true);
      expect(result).toEqual(allNavItems);
      expect(result).toHaveLength(4);
      expect(result.map((item) => item.label)).toEqual(["Home", "Projects", "Blog", "Resume"]);
    });

    it("ブログ記事が存在しない場合、Blogアイテムを除外する", () => {
      const result = getFilteredNavItems(false);
      expect(result).toHaveLength(3);
      expect(result.map((item) => item.label)).toEqual(["Home", "Projects", "Resume"]);
      expect(result.find((item) => item.href === "/blog")).toBeUndefined();
    });

    it("フィルタリングされた配列はallNavItemsを変更しない", () => {
      const originalLength = allNavItems.length;
      getFilteredNavItems(false);
      expect(allNavItems).toHaveLength(originalLength);
      expect(allNavItems.find((item) => item.href === "/blog")).toBeDefined();
    });
  });
});
