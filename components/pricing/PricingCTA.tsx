import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ArrowIcon from "@/components/ArrowIcon";

export default function PricingCTA() {
  return (
    <section className="py-24 bg-white/[0.03] border-t border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <FadeIn delay={0}>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug mb-4">
            Ready to see if we&apos;re the right fit?
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-[#c0bdb8] text-base leading-relaxed max-w-xl mx-auto mb-4">
            Whether you need a quick discovery sprint, a focused assessment,
            a scoped project, or an ongoing partnership &mdash; the
            conversation starts the same way.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-[#c0bdb8]/70 text-sm leading-relaxed max-w-lg mx-auto mb-10">
            We connect you with a principal &mdash; not an SDR. If
            there&apos;s not a fit, we&apos;ll tell you directly.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-[#f0ede8] text-[#0a0a0a] text-sm font-semibold px-8 py-4 rounded-sm shadow-[0_1px_3px_rgba(240,237,232,0.08)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(240,237,232,0.15)] active:translate-y-0 active:shadow-[0_1px_3px_rgba(240,237,232,0.08)] transition-all duration-300 ease-out"
            >
              Schedule a Conversation
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center text-sm font-semibold text-[#f0ede8] px-8 py-4 rounded-sm border border-[#333] hover:border-[#f0ede8] transition-all duration-300"
            >
              View Our Services
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
