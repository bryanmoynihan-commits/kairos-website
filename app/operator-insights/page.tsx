import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import FadeIn from "@/components/FadeIn";
import CategoryFilter from "@/components/blog/CategoryFilter";
import Footer from "@/components/Footer";
import TrackedLink from "@/components/TrackedLink";
import ArrowIcon from "@/components/ArrowIcon";

export const metadata: Metadata = {
  title: "Operator Insights",
  description:
    "Perspectives on revenue operating systems, AI-native operations, and scaling revenue — from the operators who build them.",
  openGraph: {
    title: "Operator Insights | Kairos Performance",
    description:
      "Perspectives on revenue operating systems, AI-native operations, and scaling revenue — from the operators who build them.",
    url: "https://kairosperformance.ai/operator-insights",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Operator Insights | Kairos Performance",
    description:
      "Perspectives on revenue operating systems, AI-native operations, and scaling revenue.",
  },
  alternates: {
    canonical: "https://kairosperformance.ai/operator-insights",
  },
};

export default function OperatorInsightsPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
              Operator Insights
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#f0ede8] leading-[1.1] mb-4">
              Perspectives from inside the revenue engine&nbsp;—&nbsp;not the sidelines.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-[#c0bdb8] text-base sm:text-lg leading-relaxed max-w-4xl mb-16">
              How operators, not observers, think about RevOps, AI, and building
              systems that scale.
            </p>
          </FadeIn>

          <CategoryFilter posts={posts} />
        </div>
      </section>

      {/* Bottom CTA */}
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
                If these perspectives match what you&apos;re seeing inside
                your own revenue operations, let&apos;s talk revenue
                operations.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <TrackedLink
                href="/contact"
                ctaName="Schedule a Discovery Call"
                ctaLocation="operator_insights_end"
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
