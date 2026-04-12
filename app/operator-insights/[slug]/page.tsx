import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import FadeIn from "@/components/FadeIn";
import PostCard from "@/components/blog/PostCard";
import ArrowIcon from "@/components/ArrowIcon";
import ArticleTracker from "@/components/ArticleTracker";
import Footer from "@/components/Footer";
import TrackedLink from "@/components/TrackedLink";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `https://kairosperformance.ai/operator-insights/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Operator Insights`,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://kairosperformance.ai",
    },
    publisher: {
      "@type": "Organization",
      name: "Kairos Performance",
      url: "https://kairosperformance.ai",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://kairosperformance.ai/operator-insights/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ArticleTracker
        slug={post.slug}
        category={post.category}
        readingTime={post.readingTime}
      />

      <article className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back link */}
          <FadeIn>
            <Link
              href="/operator-insights"
              className="inline-flex items-center gap-2 text-sm text-[#999] hover:text-[#f0ede8] transition-colors duration-200 mb-10 group"
            >
              <span className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                <ArrowIcon />
              </span>
              Back to Operator Insights
            </Link>
          </FadeIn>

          {/* Article header */}
          <header className="max-w-prose mb-12">
            <FadeIn delay={0.1}>
              <span className="text-xs uppercase tracking-widest text-[#2dd4bf] mb-4 block">
                {post.category}
              </span>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#f0ede8] leading-[1.1] mb-4">
                {post.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex items-center gap-3 text-sm text-[#555]">
                <span>{post.author}</span>
                <span>·</span>
                <time dateTime={post.date}>
                  {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{post.readingTime} min read</span>
              </div>
            </FadeIn>
          </header>

          {/* Article body */}
          <FadeIn delay={0.25}>
            <div className="prose-kairos max-w-prose">
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ children, href, ...props }) => (
                    <a
                      href={href}
                      target={
                        href?.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        href?.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      {...props}
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {post.content}
              </Markdown>
            </div>
          </FadeIn>
        </div>
      </article>

      {/* End-of-article CTA */}
      <section className="border-t border-[#1f1f1f] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
                Ready to act
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug mb-4">
                Ready to build the foundation behind the growth story?
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-[#c0bdb8] text-base leading-relaxed mb-8">
                If any of this resonated with what you&apos;re seeing inside
                your own revenue operation, let&apos;s talk. We start every
                engagement with a focused discovery call &mdash; no pitch,
                just a conversation about where things are breaking down and
                whether we&apos;re the right partner to help fix it.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <TrackedLink
                href="/contact"
                ctaName="Schedule a Discovery Call"
                ctaLocation="article_end"
                className="group inline-flex items-center gap-2 bg-[#f0ede8] text-[#0a0a0a] text-sm font-semibold px-8 py-4 rounded-sm shadow-[0_1px_3px_rgba(240,237,232,0.08)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(240,237,232,0.15)] active:translate-y-0 active:shadow-[0_1px_3px_rgba(240,237,232,0.08)] transition-all duration-300 ease-out"
              >
                Schedule a Discovery Call
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </TrackedLink>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-[#1f1f1f] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <FadeIn>
              <h2 className="text-xl font-semibold text-[#f0ede8] mb-8">
                More in {post.category}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related, i) => (
                <FadeIn key={related.slug} delay={i * 0.1}>
                  <PostCard post={related} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
