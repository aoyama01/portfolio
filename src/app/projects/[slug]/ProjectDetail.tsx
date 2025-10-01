import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectDetailProps {
  project: Project;
}

const statusLabels: Record<string, string> = {
  planning: "計画中",
  "in-progress": "開発中",
  completed: "完了",
  maintained: "メンテナンス中",
  archived: "アーカイブ",
};

const complexityLabels: Record<string, string> = {
  simple: "シンプル",
  intermediate: "中級",
  complex: "複雑",
  expert: "エキスパート",
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const formattedStartDate = new Date(project.startDate).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
  });

  const formattedEndDate = project.endDate
    ? new Date(project.endDate).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
      })
    : "現在";

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Link */}
      <Link
        href="/projects"
        className="text-foreground/70 hover:text-foreground mb-8 inline-flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        プロジェクト一覧に戻る
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{project.title}</h1>
        <p className="text-foreground/70 mb-6 text-lg md:text-xl">{project.description}</p>

        {/* Metadata */}
        <div className="text-foreground/60 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {formattedStartDate} - {formattedEndDate}
            </span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span>{statusLabels[project.status]}</span>
          </div>
          {project.complexity && (
            <>
              <span>•</span>
              <span>{complexityLabels[project.complexity]}</span>
            </>
          )}
        </div>
      </div>

      {/* Project Image */}
      <div className="border-border bg-foreground/5 relative mb-12 aspect-video w-full overflow-hidden rounded-lg border">
        <Image src={project.imageUrl} alt={project.title} fill className="object-cover" priority />
      </div>

      {/* Links */}
      <div className="mb-12 flex flex-wrap gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border bg-foreground/5 hover:bg-foreground/10 inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-colors"
          >
            <Github className="h-5 w-5" />
            GitHubリポジトリ
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
            ライブデモ
          </a>
        )}
      </div>

      {/* Technologies */}
      <div className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">使用技術</h2>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="border-border bg-foreground/5 rounded-lg border px-4 py-2 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* MDX Content - TODO: Implement MDX rendering */}
      {project.detailContent && (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-foreground/70">詳細なプロジェクト情報は準備中です。</p>
        </div>
      )}
    </div>
  );
}
