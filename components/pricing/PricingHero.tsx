import FadeIn from "@/components/FadeIn";

export default function PricingHero() {
  return (
    <section className="border-b border-[#1f1f1f] py-14">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <FadeIn delay={0}>
          <p className="text-base uppercase tracking-widest text-[#999] mb-4">
            Pricing
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#f0ede8] leading-[1.1] tracking-tight mb-6">
            Transparent Pricing. No Surprises.
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-[#c0bdb8] text-lg max-w-5xl mx-auto leading-relaxed">
            Every firm in our space makes you get on a call just to find out
            if you can afford them. We don&apos;t.
            <br />
            Here&apos;s exactly what we charge, what you get, and what drives
            cost in either direction.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
