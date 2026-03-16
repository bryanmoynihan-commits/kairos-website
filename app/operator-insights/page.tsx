import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import FadeIn from "@/components/FadeIn";
import CategoryFilter from "@/components/blog/CategoryFilter";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Operator Insights",
  description:
    "Perspectives on RevOps, AI-native operations, and scaling revenue systems — from the people who build them.",
  openGraph: {
    title: "Operator Insights | Kairos Performance",
    description:
      "Perspectives on RevOps, AI-native operations, and scaling revenue systems — from the people who build them.",
    url: "https://kairosperformance.ai/operator-insights",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Operator Insights | Kairos Performance",
    description:
      "Perspectives on RevOps, AI-native operations, and scaling revenue systems.",
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#f0ede8] leading-[1.1] mb-4">
              Perspectives from inside the revenue engine&nbsp;—
              <br className="hidden sm:block" />
              not the sidelines.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-[#c0bdb8] text-base sm:text-lg leading-relaxed max-w-2xl mb-16">
              How operators, not observers, think about RevOps, AI, and building
              systems that actually scale.
            </p>
          </FadeIn>

          <CategoryFilter posts={posts} />
        </div>
      </section>
      <Footer />
    </>
  );
}
