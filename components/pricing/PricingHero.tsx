import FadeIn from "@/components/FadeIn";

export default function PricingHero() {
  return (
    <section className="border-b border-[#1f1f1f] pt-10 pb-8 [@media(max-height:780px)]:py-6 lg:flex lg:flex-1 lg:flex-col lg:justify-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <FadeIn delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] [@media(max-height:780px)]:lg:text-5xl font-semibold text-[#f0f0eb] leading-[1.1] tracking-tight mb-5 [@media(max-height:780px)]:mb-3">
            Transparent pricing. No surprises.
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-[#c0bdb8] text-lg leading-relaxed mb-4">
            Every firm in our space makes you get on a call just to find out
            if you can afford them. We don&apos;t. Here&apos;s exactly what we
            charge, what you get, and what drives cost in either direction.
          </p>
          <p className="text-[#c0bdb8] text-base leading-relaxed">
            Fixed fees and monthly retainers, never hourly. What they buy: a
            revenue foundation your board can trust, operators freed from
            manual reconciliation, and AI that works because the data
            underneath it does.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
