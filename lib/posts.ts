import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "operator-insights");

export type PostCategory = "RevOps" | "AI & Automation" | "Buying Guidance";

export interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: PostCategory;
  excerpt: string;
  tags: string[];
  published: boolean;
  readingTime: number;
  content: string;
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPosts(): Omit<Post, "content">[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(CONTENT_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: data.title,
        date: data.date,
        author: data.author,
        category: data.category as PostCategory,
        excerpt: data.excerpt,
        tags: data.tags || [],
        published: data.published ?? true,
        readingTime: calculateReadingTime(content),
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
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
    category: data.category as PostCategory,
    excerpt: data.excerpt,
    tags: data.tags || [],
    published: data.published ?? true,
    readingTime: calculateReadingTime(content),
    content,
  };
}
