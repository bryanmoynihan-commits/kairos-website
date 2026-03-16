"use client";

import { useEffect } from "react";
import { trackArticleView } from "@/lib/analytics";

interface ArticleTrackerProps {
  slug: string;
  category: string;
  readingTime: number;
}

export default function ArticleTracker({
  slug,
  category,
  readingTime,
}: ArticleTrackerProps) {
  useEffect(() => {
    trackArticleView(slug, category, readingTime);
  }, [slug, category, readingTime]);

  return null;
}
