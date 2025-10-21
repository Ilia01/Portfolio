export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

/**
 * Extracts table of contents from markdown content
 * Parses h2, h3, and h4 headings and generates slugs
 */
export function extractTocFromMarkdown(content: string): TocItem[] {
  const toc: TocItem[] = [];

  // Regex to match markdown headings (## Heading, ### Heading, #### Heading)
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length; // Number of # symbols
    const text = match[2].trim();

    // Generate slug from heading text (same logic as rehype-slug)
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    toc.push({
      id,
      text,
      depth,
    });
  }

  return toc;
}
