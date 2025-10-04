import { getExternalBlogPosts } from "@/lib/external-blog";
import { BlogClient } from "./BlogClient";

export const metadata = {
  title: "Blog",
  description: "技術ブログ記事の一覧です。Qiita、Zennなどで公開している記事をまとめています。",
};

export default async function BlogPage() {
  const posts = await getExternalBlogPosts();

  return <BlogClient initialPosts={posts} />;
}
