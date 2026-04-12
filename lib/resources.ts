import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "resources");
const GATE_MARKER = "<!-- GATE -->";

export interface Resource {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  formHeadline: string;
  formSubhead: string;
  readingTime: number;
  publicContent: string;
  gatedContent: string;
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getResourceBySlug(slug: string): Resource | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  if (!data.published && data.published !== undefined) return null;

  const markerIndex = content.indexOf(GATE_MARKER);
  let publicContent: string;
  let gatedContent: string;

  if (markerIndex === -1) {
    console.warn(
      `[resources] No <!-- GATE --> marker in ${slug}.md — entire article will render as public.`
    );
    publicContent = content;
    gatedContent = "";
  } else {
    publicContent = content.slice(0, markerIndex).trimEnd();
    gatedContent = content.slice(markerIndex + GATE_MARKER.length).trimStart();
  }

  return {
    slug,
    title: data.title,
    date: data.date,
    author: data.author,
    excerpt: data.excerpt,
    formHeadline: data.formHeadline,
    formSubhead: data.formSubhead,
    readingTime: calculateReadingTime(content),
    publicContent,
    gatedContent,
  };
}
