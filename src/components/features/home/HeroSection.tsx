import Image from "next/image";
import { getPersonalInfo, getAllSkills, getAllProjects } from "@/lib/content";
import { SocialLinks } from "./SocialLinks";
import { Stats } from "./Stats";
import { QuickAccessSection } from "@/components/home/QuickAccessSection";

export async function HeroSection() {
  const personalInfo = getPersonalInfo();
  const skills = getAllSkills();
  const projects = getAllProjects();

  // 主要スキルを抽出（level 3以上）
  const topSkills = skills.filter((skill) => skill.level >= 3).slice(0, 5);

  if (!personalInfo) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-8">
      <div className="grid gap-8 md:grid-cols-[2.5fr_2fr] md:gap-12">
        {/* 左側: メイン情報 */}
        <div className="space-y-8 md:max-w-xl">
          {/* プロフィール画像 */}
          <div className="flex justify-center md:justify-start">
            <div className="border-border relative h-40 w-40 overflow-hidden rounded-full border-4 md:h-32 md:w-32">
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
        <QuickAccessSection />
      </div>
    </section>
  );
}
