import Image from "next/image";
import { FolderGit2, FileText, Newspaper } from "lucide-react";
import { getPersonalInfo, getAllSkills, getAllProjects } from "@/lib/content";
import { getExternalBlogPosts } from "@/lib/external-blog";
import { SocialLinks } from "./SocialLinks";
import { Stats } from "./Stats";
import { QuickAccessCard } from "@/components/home/QuickAccessCard";

export async function HeroSection() {
  const personalInfo = getPersonalInfo();
  const skills = getAllSkills();
  const projects = getAllProjects();
  const blogPosts = await getExternalBlogPosts();

  // 主要スキルを抽出（level 3以上）
  const topSkills = skills.filter((skill) => skill.level >= 3).slice(0, 5);
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

  if (!personalInfo) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-8">
      <div className="grid gap-8 md:grid-cols-[3fr_2fr] md:gap-12">
        {/* 左側: メイン情報 */}
        <div className="space-y-8 md:max-w-xl">
          {/* プロフィール画像（小さめ） */}
          <div className="flex justify-center md:justify-start">
            <div className="border-border relative h-32 w-32 overflow-hidden rounded-full border-4">
              <Image
                src="/images/profile.jpg"
                alt={personalInfo.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 名前・肩書き */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {personalInfo.name}
            </h1>
            <p className="text-foreground/80 mt-3 text-xl sm:text-2xl">{personalInfo.title}</p>
          </div>

          {/* Bio と SocialLinks */}
          <div className="space-y-4">
            <p className="text-foreground/70 text-lg">{personalInfo.bio}</p>
            <SocialLinks socialLinks={personalInfo.socialLinks || {}} />
          </div>

          {/* 主要スキル */}
          {topSkills.length > 0 && (
            <div>
              <h2 className="text-foreground/60 mb-3 text-sm font-semibold tracking-wide uppercase">
                Main Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {topSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className="bg-foreground/10 rounded-full px-4 py-2 text-sm font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 統計情報 */}
          {/* <Stats projectCount={projects.length} /> */}
        </div>

        {/* 右側: Quick Access Cards (レスポンシブで下に移動) */}
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
      </div>
    </section>
  );
}
