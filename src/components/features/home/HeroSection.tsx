import Image from "next/image";
import { getPersonalInfo, getAllSkills, getAllProjects } from "@/lib/content";
import { SocialLinks } from "./SocialLinks";
import { Stats } from "./Stats";

export function HeroSection() {
  const personalInfo = getPersonalInfo();
  const skills = getAllSkills();
  const projects = getAllProjects();

  // 主要スキルを抽出（proficiency 4以上）
  const topSkills = skills.filter((skill) => skill.proficiency >= 4).slice(0, 5);

  if (!personalInfo) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        {/* 左側: プロフィール写真 */}
        <div className="flex items-center justify-center lg:justify-start">
          <div className="border-border relative h-64 w-64 overflow-hidden rounded-full border-4 sm:h-80 sm:w-80">
            <Image
              src="/images/profile.jpg"
              alt={personalInfo.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* 右側: テキスト情報 */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {personalInfo.name}
            </h1>
            <p className="text-foreground/80 mt-3 text-xl sm:text-2xl">{personalInfo.title}</p>
          </div>

          <p className="text-foreground/70 text-lg">{personalInfo.bio}</p>

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

          {/* ソーシャルリンク */}
          <SocialLinks socialLinks={personalInfo.socialLinks} />

          {/* 統計情報 */}
          <Stats projectCount={projects.length} />
        </div>
      </div>
    </section>
  );
}
