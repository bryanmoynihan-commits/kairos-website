import Link from "next/link";
import type { Post } from "@/lib/posts";

interface PostCardProps {
  post: Omit<Post, "content">;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/operator-insights/${post.slug}`}
      className="group block rounded-lg border border-[#1f1f1f] bg-[#0a0a0a] p-6 hover:-translate-y-1 hover:border-[#333] hover:bg-[#111111]/40 hover:shadow-[0_0_30px_rgba(240,237,232,0.04)] transition-all duration-300"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="text-xs uppercase tracking-widest text-[#2dd4bf]">
          {post.category}
        </span>
        <span className="text-xs text-[#555]">·</span>
        <span className="text-xs text-[#555]">{post.readingTime} min read</span>
      </div>

      <h3 className="text-lg font-semibold text-[#f0ede8] leading-snug mb-2 group-hover:text-white transition-colors duration-200">
        {post.title}
      </h3>

      <p className="text-sm text-[#c0bdb8]/70 leading-relaxed line-clamp-3 mb-4">
        {post.excerpt}
      </p>

      <time className="text-xs text-[#555]" dateTime={post.date}>
        {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    </Link>
  );
}
