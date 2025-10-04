import { Calendar, ExternalLink } from "lucide-react";
import type { ExternalBlogPost } from "@/types/external-blog";
import { PLATFORM_METADATA } from "@/types/external-blog";

interface ExternalBlogCardProps {
  post: ExternalBlogPost;
}

export function ExternalBlogCard({ post }: ExternalBlogCardProps) {
  const platformMeta = PLATFORM_METADATA[post.platform];
  const formattedDate = post.publishedAt.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group border-border bg-background relative flex flex-col overflow-hidden rounded-lg border transition-all hover:shadow-lg">
      {/* Featured Badge */}
      {post.featured && (
        <div className="bg-foreground text-background absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-semibold">
          Featured
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Platform Badge */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-sm font-medium"
            style={{
              backgroundColor: `${platformMeta.color}15`,
              color: platformMeta.color,
            }}
          >
            {platformMeta.displayName}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-xl font-bold">{post.title}</h3>

        {/* Description */}
        {post.description && (
          <p className="text-foreground/70 mb-4 line-clamp-3 flex-1 text-sm">{post.description}</p>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="border-border bg-foreground/5 rounded border px-2 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="text-foreground/60 px-2 py-1 text-xs">+{post.tags.length - 4}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="border-border flex items-center justify-between border-t pt-4">
          <div className="text-foreground/60 flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground relative z-10 transition-colors"
              aria-label={`${post.title}を外部サイトで開く`}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
