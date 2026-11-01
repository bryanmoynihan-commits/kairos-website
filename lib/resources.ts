import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "resources");

export interface ResourceItem {
  number: number;
  title: string;
  /** The "**In short:**" line, shown while the item is collapsed. */
  summary: string;
  /** Everything after the summary, shown when the item is expanded. */
  body: string;
}

export interface Resource {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  readingTime: number;
  /** Markdown before the first numbered item. */
  intro: string;
  /** Numbered "## 1. Title" sections, rendered as collapsible items. */
  items: ResourceItem[];
  /** Markdown for any un-numbered "## " sections after the items. */
  outro: string;
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

const ITEM_HEADING = /^(\d+)\.\s+(.+)$/;
const SUMMARY = /^\*\*In short:\*\*\s*(.+?)\s*(?:\n\n|$)/s;

// Splits the markdown on "## " headings: text before the first heading is the
// intro, numbered headings become items, and the rest is kept as the outro.
function splitSections(content: string) {
  const [intro, ...chunks] = content.split(/^## /m);
  const items: ResourceItem[] = [];
  const outro: string[] = [];

  for (const chunk of chunks) {
    const newline = chunk.indexOf("\n");
    const heading = (newline === -1 ? chunk : chunk.slice(0, newline)).trim();
    const rest = newline === -1 ? "" : chunk.slice(newline + 1).trim();
    const match = heading.match(ITEM_HEADING);

    if (!match) {
      outro.push(`## ${chunk.trim()}`);
      continue;
    }

    const summaryMatch = rest.match(SUMMARY);
    items.push({
      number: Number(match[1]),
      title: match[2].trim(),
      // Capitalized: it stands alone once the "In short:" label is dropped.
      summary: summaryMatch ? summaryMatch[1].charAt(0).toUpperCase() + summaryMatch[1].slice(1) : "",
      body: summaryMatch ? rest.slice(summaryMatch[0].length).trim() : rest,
    });
  }

  return { intro: intro.trim(), items, outro: outro.join("\n\n") };
}

export function getResourceBySlug(slug: string): Resource | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  if (!data.published && data.published !== undefined) return null;

  return {
    slug,
    title: data.title,
    date: data.date,
    author: data.author,
    excerpt: data.excerpt,
    readingTime: calculateReadingTime(content),
    ...splitSections(content),
  };
}
