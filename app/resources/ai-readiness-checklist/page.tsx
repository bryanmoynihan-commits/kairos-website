import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getResourceBySlug } from "@/lib/resources";
import FadeIn from "@/components/FadeIn";
import ArrowIcon from "@/components/ArrowIcon";
import ArticleTracker from "@/components/ArticleTracker";
import Footer from "@/components/Footer";
import TrackedLink from "@/components/TrackedLink";
import ChecklistGate from "@/components/resources/ChecklistGate";

const SLUG = "ai-readiness-checklist";
const CANONICAL = `https://kairosperformance.ai/resources/${SLUG}`;

export async function generateMetadata(): Promise<Metadata> {
  const resource = getResourceBySlug(SLUG);
  if (!resource) return {};

  return {
    title: resource.title,
    description: resource.excerpt,
    openGraph: {
      title: `${resource.title} | Kairos Performance`,
      description: resource.excerpt,
      url: CANONICAL,
      type: "article",
      publishedTime: new Date(resource.date).toISOString(),
      authors: [resource.author],
    },
    twitter: {
      card: "summary",
      title: resource.title,
      description: resource.excerpt,
    },
    alternates: {
      canonical: CANONICAL,
    },
  };
}

export default function ChecklistPage() {
  const resource = getResourceBySlug(SLUG);
  if (!resource) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.excerpt,
    datePublished: new Date(resource.date).toISOString(),
    author: {
      "@type": "Organization",
      name: resource.author,
      url: "https://kairosperformance.ai",
    },
    publisher: {
      "@type": "Organization",
      name: "Kairos Performance",
      url: "https://kairosperformance.ai",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": CANONICAL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ArticleTracker
        slug={resource.slug}
        category="Resource"
        readingTime={resource.readingTime}
      />

      <article className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back link */}
          <FadeIn>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#999] hover:text-[#f0ede8] transition-colors duration-200 mb-10 group"
            >
              <span className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                <ArrowIcon />
              </span>
              Back to home
            </Link>
          </FadeIn>

          {/* Article header */}
          <header className="max-w-prose mb-12">
            <FadeIn delay={0.1}>
              <span className="text-xs uppercase tracking-widest text-[#2dd4bf] mb-4 block">
                Resource · Checklist
              </span>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#f0ede8] leading-[1.1] mb-4">
                {resource.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex items-center gap-3 text-sm text-[#555]">
                <span>{resource.author}</span>
                <span>·</span>
                <time dateTime={resource.date}>
                  {new Date(resource.date + "T00:00:00").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{resource.readingTime} min read</span>
              </div>
            </FadeIn>
          </header>

          {/* Public body */}
          <FadeIn delay={0.25}>
            <div className="prose-kairos max-w-prose">
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ children, href, ...props }) => (
                    <a
                      href={href}
                      target={href?.startsWith("http") ? "_blank" : undefined}
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
                {resource.publicContent}
              </Markdown>
            </div>
          </FadeIn>

          {/* Gate / gated body */}
          <div className="mt-12">
            <ChecklistGate
              slug={resource.slug}
              gatedMarkdown={resource.gatedContent}
              formHeadline={resource.formHeadline}
              formSubhead={resource.formSubhead}
            />
          </div>
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
                ctaLocation="checklist_end"
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

      <Footer />
    </>
  );
}
