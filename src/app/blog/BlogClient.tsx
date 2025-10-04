"use client";

import { useState, useMemo } from "react";
import { ExternalBlogCard } from "@/components/blog/ExternalBlogCard";
import { BlogEmptyState } from "@/components/blog/BlogEmptyState";
import type { ExternalBlogPost } from "@/types/external-blog";
import { PLATFORM_METADATA } from "@/types/external-blog";
import { X } from "lucide-react";

interface BlogClientProps {
  initialPosts: ExternalBlogPost[];
}

type SortOption = "newest" | "oldest" | "platform";

export function BlogClient({ initialPosts }: BlogClientProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // プラットフォーム一覧を取得
  const platforms = useMemo(() => {
    const platformSet = new Set(initialPosts.map((p) => p.platform));
    return Array.from(platformSet).sort();
  }, [initialPosts]);

  // タグ一覧を取得
  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    initialPosts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [initialPosts]);

  // タグの選択/解除
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // すべてのフィルターをクリア
  const clearAllFilters = () => {
    setSelectedPlatform("all");
    setSelectedTags([]);
  };

  // アクティブなフィルターがあるか
  const hasActiveFilters = selectedPlatform !== "all" || selectedTags.length > 0;

  // フィルター・ソート済みの記事一覧
  const filteredPosts = useMemo(() => {
    let posts = [...initialPosts];

    // プラットフォームでフィルター
    if (selectedPlatform !== "all") {
      posts = posts.filter((p) => p.platform === selectedPlatform);
    }

    // タグでフィルター（AND条件：選択したタグすべてを含む記事）
    if (selectedTags.length > 0) {
      posts = posts.filter((p) => selectedTags.every((tag) => p.tags.includes(tag)));
    }

    // ソート
    switch (sortBy) {
      case "newest":
        posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
        break;
      case "oldest":
        posts.sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime());
        break;
      case "platform":
        posts.sort((a, b) => a.platform.localeCompare(b.platform));
        break;
    }

    return posts;
  }, [initialPosts, selectedPlatform, selectedTags, sortBy]);

  // 記事が0件の場合は空状態を表示
  if (initialPosts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Blog</h1>
          <p className="text-foreground/70 text-lg">
            技術ブログ記事の一覧です。Qiita、Zennなどで公開している記事をまとめています。
          </p>
        </div>
        <BlogEmptyState />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">Blog</h1>
        <p className="text-foreground/70 text-lg">
          技術ブログ記事の一覧です。Qiita、Zennなどで公開している記事をまとめています。
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Primary Filters Row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Platform Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedPlatform("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedPlatform === "all"
                  ? "bg-foreground text-background"
                  : "bg-foreground/10 hover:bg-foreground/20"
              }`}
            >
              すべて
            </button>
            {platforms.map((platform) => {
              const meta = PLATFORM_METADATA[platform];
              return (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedPlatform === platform
                      ? "bg-foreground text-background"
                      : "bg-foreground/10 hover:bg-foreground/20"
                  }`}
                >
                  {meta.displayName}
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-foreground/70 text-sm font-medium">
              並び替え:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border-border bg-background focus:ring-foreground/20 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            >
              <option value="newest">新着順</option>
              <option value="oldest">古い順</option>
              <option value="platform">プラットフォーム別</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors"
          >
            {showAdvancedFilters ? "タグフィルターを隠す" : "タグフィルターを表示"}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-sm font-medium text-red-500 transition-colors hover:text-red-600"
            >
              <X className="h-4 w-4" />
              フィルターをクリア
            </button>
          )}
        </div>

        {/* Tag Filters */}
        {showAdvancedFilters && tags.length > 0 && (
          <div className="border-border space-y-4 rounded-lg border p-4">
            <div>
              <label className="text-foreground/70 mb-2 block text-sm font-medium">タグ:</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-lg border px-3 py-1 text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-foreground/5 hover:bg-foreground/10"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Count */}
      <div className="text-foreground/60 mb-6 text-sm">{filteredPosts.length}件の記事</div>

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <ExternalBlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-foreground/60 py-12 text-center">
          <p>該当する記事が見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}
