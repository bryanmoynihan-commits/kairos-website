import type { Metadata } from "next";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import Footer from "@/components/Footer";
import Scorecard from "@/components/scorecard/Scorecard";

const CANONICAL = "https://kairosperformance.ai/resources/ai-readiness-scorecard";
const TITLE = "AI Readiness Scorecard";
const DESCRIPTION =
  "18 questions, about 5 minutes. Score your revenue foundation across the six areas that decide whether AI pays off or scales the mess.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | Kairos Performance`,
    description: DESCRIPTION,
    url: CANONICAL,
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: CANONICAL,
  },
};

export default function ScorecardPage() {
  return (
    <>
      <section className="pt-32 pb-24 min-h-[80vh]">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#999] hover:text-[#f0f0eb] transition-colors duration-200 mb-10 group"
          >
            <span className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
              <ArrowIcon />
            </span>
            Back to home
          </Link>
          <div className="max-w-3xl">
            <Scorecard />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
