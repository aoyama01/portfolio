import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

/**
 * Rehype plugin to preserve raw code text before syntax highlighting
 * This allows the copy button to access the original, unformatted code
 */
export function rehypeRawCode() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      // Find pre > code elements
      if (node.tagName === "pre" && node.children.length === 1) {
        const codeElement = node.children[0];

        if (
          codeElement.type === "element" &&
          codeElement.tagName === "code" &&
          codeElement.children.length === 1
        ) {
          const textNode = codeElement.children[0];

          // Extract raw text before syntax highlighting
          if (textNode.type === "text") {
            // Store raw code as data attribute on pre element
            node.properties = node.properties || {};
            node.properties["data-raw"] = textNode.value;
          }
        }
      }
    });
  };
}
