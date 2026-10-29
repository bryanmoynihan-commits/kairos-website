import FadeIn from "@/components/FadeIn";
import TrackedLink from "@/components/TrackedLink";
import ArrowIcon from "@/components/ArrowIcon";

export default function PricingCTA() {
  return (
    <section className="py-24 bg-white/[0.03] border-t border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn delay={0}>
          <div className="mb-14 border border-[#2dd4bf]/30 bg-[#2dd4bf]/[0.04] rounded-sm p-8">
            <p className="text-sm uppercase tracking-widest text-[#2dd4bf] mb-3">
              Our guarantee
            </p>
            <p className="text-xl font-semibold text-[#f0f0eb] leading-snug mb-3">
              If we can&apos;t build it and prove its impact, we don&apos;t
              recommend it.
            </p>
            <p className="text-base text-[#c0bdb8] leading-relaxed">
              Every engagement starts with an agreed scope and definition of
              done. If something we deliver doesn&apos;t meet it, we fix it at
              no additional fee. We build to be effective, not to be needed.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0f0eb] leading-snug mb-4">
            Let&apos;s talk about where things are breaking down.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-[#c0bdb8] text-base leading-relaxed mb-4">
            Whether you need a quick discovery sprint, a focused assessment,
            a scoped project, or an ongoing partnership, the
            conversation starts the same way.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-[#c0bdb8] text-sm leading-relaxed mb-10">
            We connect you with a principal, not an SDR. If
            there&apos;s not a fit, we&apos;ll tell you directly.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <TrackedLink
            href="/contact"
            ctaName="Book an Intro Call"
            ctaLocation="pricing_cta"
            className="group inline-flex items-center justify-center gap-2 bg-[#f0f0eb] text-[#0e0d0d] text-sm font-semibold px-8 py-4 rounded-sm shadow-[0_1px_3px_rgba(240,237,232,0.08)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(240,237,232,0.15)] active:translate-y-0 active:shadow-[0_1px_3px_rgba(240,237,232,0.08)] transition-all duration-300 ease-out"
          >
            Book an Intro Call
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </TrackedLink>
        </FadeIn>
      </div>
    </section>
  );
}
