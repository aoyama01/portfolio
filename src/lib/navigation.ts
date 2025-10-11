/**
 * ナビゲーションアイテムの型定義
 */
export interface NavItem {
  href: string;
  label: string;
}

/**
 * すべてのナビゲーションアイテム
 */
export const allNavItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

/**
 * ブログ記事の有無に応じてナビゲーションアイテムをフィルタリング
 * @param hasBlogPosts - ブログ記事が存在するかどうか
 * @returns フィルタリングされたナビゲーションアイテム
 */
export function getFilteredNavItems(hasBlogPosts: boolean): NavItem[] {
  if (hasBlogPosts) {
    return allNavItems;
  }
  // ブログ記事が0件の場合、Blogリンクを除外
  return allNavItems.filter((item) => item.href !== "/blog");
}
