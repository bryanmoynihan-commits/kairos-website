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

const SLUG = "ai-readiness-checklist";

const markdownComponents = {
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
};
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
      authors: ["Kairos Performance"],
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
    author: {
      "@type": "Organization",
      name: "Kairos Performance",
      url: "https://kairosperformance.ai",
    },
    publisher: {
      "@type": "Organization",
      name: "Kairos Performance",
      url: "https://kairosperformance.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://kairosperformance.ai/logo-kairos.png",
      },
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

      <article className="pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back link */}
          <FadeIn>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#999] hover:text-[#f0f0eb] transition-colors duration-200 mb-8 group"
            >
              <span className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                <ArrowIcon />
              </span>
              Back to home
            </Link>
          </FadeIn>

          {/* Article header */}
          <header className="max-w-3xl mb-6">
            <FadeIn delay={0.1}>
              <span className="text-sm uppercase tracking-widest text-[#2dd4bf] mb-4 block">
                Resource · Checklist
              </span>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#f0f0eb] leading-[1.1] mb-4">
                {resource.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-sm text-[#999]">
                A Kairos Performance operator resource.
              </p>
            </FadeIn>
          </header>

          {/* Intro */}
          <FadeIn delay={0.25}>
            <div className="prose-kairos max-w-prose">
              <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {resource.intro}
              </Markdown>
            </div>
          </FadeIn>

          {/* The foundations: summary always visible, detail on demand. Rendered
              on the server, so the full text stays readable to search engines
              and AI assistants while collapsed. */}
          <FadeIn delay={0.3}>
            <p className="text-sm text-[#999] mt-4 mb-3">
              Open any foundation for the detail and the questions to ask yourself.
            </p>
            <ol className="border-t border-[#1f1f1f]">
              {resource.items.map((item) => (
                <li key={item.number} className="border-b border-[#1f1f1f]">
                  <details className="group/item">
                    <summary className="flex items-start gap-5 cursor-pointer list-none py-5 [&::-webkit-details-marker]:hidden">
                      <span className="font-mono text-sm text-[#2dd4bf] pt-1.5 shrink-0">
                        0{item.number}
                      </span>
                      <span className="flex-1">
                        <span className="block text-xl sm:text-2xl font-semibold text-[#f0f0eb] mb-2">
                          {item.title}
                        </span>
                        <span className="block text-base text-[#c0bdb8] leading-relaxed">
                          {item.summary}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-[#2dd4bf] text-2xl leading-none pt-1 transition-transform duration-300 group-open/item:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="prose-kairos max-w-prose pb-8 sm:pl-10">
                      <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {item.body}
                      </Markdown>
                    </div>
                  </details>
                </li>
              ))}
            </ol>
          </FadeIn>

          {/* What to do with this */}
          <FadeIn delay={0.1}>
            <div className="prose-kairos max-w-prose mt-12">
              <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {resource.outro}
              </Markdown>
            </div>
          </FadeIn>

          {/* Next rung on the ladder: the scored version of this checklist */}
          <FadeIn delay={0.1}>
            <div className="mt-10 max-w-prose border border-[#2dd4bf]/30 bg-[#2dd4bf]/[0.04] rounded-sm p-6 sm:p-8">
              <p className="text-sm uppercase tracking-widest text-[#2dd4bf] mb-3">
                Get your score
              </p>
              <h2 className="text-2xl font-semibold text-[#f0f0eb] mb-3">
                See where you stand on all six
              </h2>
              <p className="text-base text-[#c0bdb8] leading-relaxed mb-6">
                The AI Readiness Scorecard turns this checklist into a score: 18
                questions, about five minutes, with your top fixes and a report
                you can share with your team.
              </p>
              <TrackedLink
                href="/resources/ai-readiness-scorecard"
                ctaName="AI Readiness Scorecard"
                ctaLocation="checklist_scorecard"
                className="group inline-flex items-center gap-2 bg-[#f0f0eb] text-[#0e0d0d] text-sm font-semibold px-8 py-4 rounded-sm hover:bg-white hover:-translate-y-0.5 transition-all duration-300 ease-out"
              >
                Get your AI Readiness Score
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </TrackedLink>
            </div>
          </FadeIn>
        </div>
      </article>

      {/* End-of-article CTA */}
      <section className="border-t border-[#1f1f1f] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="text-sm uppercase tracking-widest text-[#999] mb-4">
                Ready to act
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0f0eb] leading-snug mb-4">
                Let&apos;s talk about where things are breaking down.
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-[#c0bdb8] text-base leading-relaxed mb-8">
                If any of this resonated with what you&apos;re seeing inside
                your own revenue operations, start with a 30-minute Intro Call.
                No pitch: you leave with an outline of the fix, whether or not
                we&apos;re the right partner to help build it.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <TrackedLink
                href="/contact"
                ctaName="Book an Intro Call"
                ctaLocation="checklist_end"
                className="group inline-flex items-center gap-2 bg-[#f0f0eb] text-[#0e0d0d] text-sm font-semibold px-8 py-4 rounded-sm shadow-[0_1px_3px_rgba(240,237,232,0.08)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(240,237,232,0.15)] active:translate-y-0 active:shadow-[0_1px_3px_rgba(240,237,232,0.08)] transition-all duration-300 ease-out"
              >
                Book an Intro Call
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
