import Link from "next/link";
import Image from "next/image";
import { Calendar, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/types/project";
import { FEATURES } from "@/lib/config/features";

interface ProjectCardProps {
  project: Project;
}

const categoryLabels: Record<string, string> = {
  "web-app": "Webアプリ",
  "mobile-app": "モバイルアプリ",
  library: "ライブラリ",
  tool: "ツール",
  experiment: "実験",
};

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

export function ProjectCard({ project }: ProjectCardProps) {
  const formattedDate = new Date(project.startDate).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
  });

  // Determine link destination based on feature flag
  const imageLink = FEATURES.projectDetailPage.enabled
    ? `/projects/${project.slug}` // Link to detail page when enabled
    : project.githubUrl || null; // Link to GitHub when disabled (or null if no GitHub URL)

  const imageLinkLabel = FEATURES.projectDetailPage.enabled
    ? `View ${project.title} details`
    : `View ${project.title} on GitHub`;

  return (
    <div className="group border-border bg-background relative flex flex-col overflow-hidden rounded-lg border transition-all hover:shadow-lg">
      {/* Featured Badge */}
      {project.featured && (
        <div className="bg-foreground text-background absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-semibold">
          Featured
        </div>
      )}

      {/* Image */}
      <div className="bg-foreground/5 relative aspect-video w-full overflow-hidden transition-transform hover:scale-105">
        <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
        {/* Link Overlay - conditionally rendered based on feature flag */}
        {imageLink &&
          (FEATURES.projectDetailPage.enabled ? (
            <Link href={imageLink} className="absolute inset-0" aria-label={imageLinkLabel}>
              <span className="sr-only">View project details</span>
            </Link>
          ) : (
            <a
              href={imageLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
              aria-label={imageLinkLabel}
            >
              <span className="sr-only">View on GitHub</span>
            </a>
          ))}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category and Status */}
        <div className="mb-3 flex items-center gap-2 text-sm">
          <span className="bg-foreground/10 rounded-full px-3 py-1 font-medium">
            {categoryLabels[project.category] || project.category}
          </span>
          <span className="text-foreground/60">{statusLabels[project.status]}</span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold">{project.title}</h3>

        {/* Description */}
        <p className="text-foreground/70 mb-4 line-clamp-3 flex-1 text-sm">{project.description}</p>

        {/* Technologies */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="border-border bg-foreground/5 rounded border px-2 py-1 text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-foreground/60 px-2 py-1 text-xs">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="border-border flex items-center justify-between border-t pt-4">
          <div className="text-foreground/60 flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
            {project.complexity && (
              <>
                <span>•</span>
                <span>{complexityLabels[project.complexity]}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 transition-colors hover:scale-105"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 transition-colors hover:scale-105"
                aria-label="Demo"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
