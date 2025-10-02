import { MDXRemote } from "next-mdx-remote-client/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";

/**
 * Render MDX content using React Server Components
 */
export function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight, rehypeSlug],
          },
        }}
        components={{
          pre: CodeBlock,
        }}
      />
    </div>
  );
}
