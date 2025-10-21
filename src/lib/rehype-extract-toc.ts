import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';
import { toString } from 'hast-util-to-string';

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

export interface TocOptions {
  exportRef?: { current: TocItem[] };
}

/**
 * Rehype plugin to extract table of contents from headings
 * Extracts h2, h3, and h4 headings with their IDs and text
 */
export function rehypeExtractToc(options: TocOptions = {}) {
  return (tree: Root) => {
    const toc: TocItem[] = [];

    visit(tree, 'element', (node: Element) => {
      // Only extract h2, h3, h4
      if (['h2', 'h3', 'h4'].includes(node.tagName)) {
        const depth = parseInt(node.tagName.substring(1));
        const text = toString(node);

        // Get the ID from the node properties (added by rehype-slug)
        const id = node.properties?.id as string;

        if (id && text) {
          toc.push({
            id,
            text,
            depth,
          });
        }
      }
    });

    // Export the TOC via the options reference
    if (options.exportRef) {
      options.exportRef.current = toc;
    }
  };
}
