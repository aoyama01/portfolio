import { MDXRemote } from "next-mdx-remote-client/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { rehypeRawCode } from "@/lib/rehype-raw-code";
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
            rehypePlugins: [
              rehypeRawCode, // Must run before syntax highlighting
              rehypeHighlight,
              rehypeSlug,
            ],
          },
        }}
        components={{
          pre: CodeBlock,
        }}
      />
    </div>
  );
}
