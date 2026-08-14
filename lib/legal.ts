import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "legal");

export interface LegalDoc {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  content: string;
}

export function getLegalDoc(slug: string): LegalDoc | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title,
    description: data.description,
    lastUpdated: data.lastUpdated,
    content,
  };
}
