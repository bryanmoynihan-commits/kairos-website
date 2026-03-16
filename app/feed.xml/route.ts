import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  const base = "https://kairosperformance.ai";

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${base}/operator-insights/${post.slug}</link>
      <guid isPermaLink="true">${base}/operator-insights/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.category}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Operator Insights — Kairos Performance</title>
    <link>${base}/operator-insights</link>
    <description>Perspectives on RevOps, AI-native operations, and scaling revenue systems.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(feed.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
