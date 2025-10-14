import { FolderGit2, FileText, Newspaper } from "lucide-react";
import { getExternalBlogPosts } from "@/lib/external-blog";
import { QuickAccessCard } from "./QuickAccessCard";

export async function QuickAccessSection() {
  const blogPosts = await getExternalBlogPosts();
  const hasBlogPosts = blogPosts.length > 0;

  // Quick Access Cards
  const quickAccessCards = [
    {
      title: "Projects",
      description: "技術的なプロジェクトとその実装内容",
      href: "/projects",
      icon: FolderGit2,
    },
    {
      title: "Resume",
      description: "スキル、学歴などの詳細情報",
      href: "/resume",
      icon: FileText,
    },
  ];

  if (hasBlogPosts) {
    quickAccessCards.push({
      title: "Blog",
      description: "技術記事やブログ投稿",
      href: "/blog",
      icon: Newspaper,
    });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-foreground/60 mb-3 text-sm font-semibold tracking-wide uppercase">
        Quick Access
      </h2>
      {quickAccessCards.map((card) => (
        <QuickAccessCard
          key={card.href}
          title={card.title}
          description={card.description}
          href={card.href}
          icon={card.icon}
        />
      ))}
    </div>
  );
}
