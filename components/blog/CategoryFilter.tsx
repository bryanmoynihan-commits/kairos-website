"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense } from "react";
import type { Post, PostCategory } from "@/lib/posts";
import FadeIn from "@/components/FadeIn";
import PostCard from "./PostCard";

const CATEGORIES: (PostCategory | "All")[] = [
  "All",
  "RevOps",
  "AI & Automation",
  "Buying Guidance",
];

interface CategoryFilterProps {
  posts: Omit<Post, "content">[];
}

function CategoryFilterInner({ posts }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = searchParams.get("category") || "All";

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  function handleCategoryChange(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-12">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
              activeCategory === category
                ? "bg-[#2dd4bf]/10 text-[#2dd4bf] border border-[#2dd4bf]/30"
                : "text-[#999] border border-[#1f1f1f] hover:text-[#c0bdb8] hover:border-[#333]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.1}>
              <PostCard post={post} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-[#555] text-base">
            No articles in this category yet. Check back soon.
          </p>
        </div>
      )}
    </>
  );
}

export default function CategoryFilter({ posts }: CategoryFilterProps) {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      }
    >
      <CategoryFilterInner posts={posts} />
    </Suspense>
  );
}
