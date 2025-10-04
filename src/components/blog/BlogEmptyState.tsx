import { FileText } from "lucide-react";

export function BlogEmptyState() {
  return (
    <div className="bg-background border-border flex min-h-[400px] flex-col items-center justify-center rounded-lg border p-12 text-center">
      <div className="bg-foreground/5 mb-6 rounded-full p-6">
        <FileText className="text-foreground/40 h-12 w-12" />
      </div>
      <h3 className="mb-2 text-xl font-bold">ブログ記事準備中</h3>
      <p className="text-foreground/60 max-w-md text-sm">
        外部ブログサイトへの記事投稿を準備しています。
        <br />
        Qiita、Zennなどで技術記事を公開予定です。
      </p>
    </div>
  );
}
