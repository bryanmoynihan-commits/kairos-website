import FadeIn from "@/components/FadeIn";

const steps = [
  {
    label: "Discovery Sprint",
    price: "$2K\u2013$5K",
    timeline: "1\u20132 weeks",
    href: "#prove",
  },
  {
    label: "AI Pilot",
    price: "$5K\u2013$30K",
    timeline: "2\u20136 weeks",
    href: "#prove",
  },
  {
    label: "Assessment",
    price: "$15K\u2013$30K",
    timeline: "3\u20135 weeks",
    href: "#diagnose",
  },
  {
    label: "Retainer",
    price: "from $10K/mo",
    timeline: "Ongoing",
    href: "#partner",
  },
];

function ArrowRight() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-[#2dd4bf] shrink-0"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-[#2dd4bf] shrink-0"
    >
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export default function EngagementLadder() {
  return (
    <section className="border-b border-[#1f1f1f] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 text-center">
          <FadeIn delay={0}>
            <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
              Your path forward
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug mb-4">
              Start small. Scale with confidence.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[#c0bdb8] text-base leading-relaxed max-w-2xl mx-auto">
              Most clients start with a Discovery Sprint or Pilot &mdash; then
              expand as results prove out. No pressure to commit to a large
              engagement upfront.
            </p>
          </FadeIn>
        </div>

        {/* Desktop: horizontal */}
        <FadeIn delay={0.2}>
          <div className="hidden md:flex items-center justify-center gap-4">
            {steps.map((step, i) => (
              <div key={step.label} className="contents">
                <a
                  href={step.href}
                  className="flex flex-col items-center text-center p-6 border border-[#1f1f1f] rounded-sm w-48 transition-all duration-300 hover:-translate-y-1 hover:border-[#333] hover:bg-[#111111]/40 hover:shadow-[0_0_30px_rgba(240,237,232,0.04)] cursor-pointer"
                >
                  <p className="text-sm font-semibold text-[#f0ede8] mb-2">
                    {step.label}
                  </p>
                  <p className="text-lg font-semibold text-[#2dd4bf] mb-1">
                    {step.price}
                  </p>
                  <p className="text-xs text-[#999]">{step.timeline}</p>
                </a>
                {i < steps.length - 1 && <ArrowRight />}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Mobile: vertical */}
        <FadeIn delay={0.2}>
          <div className="flex md:hidden flex-col items-center gap-3">
            {steps.map((step, i) => (
              <div key={step.label} className="contents">
                <a
                  href={step.href}
                  className="flex flex-col items-center text-center p-6 border border-[#1f1f1f] rounded-sm w-full max-w-sm transition-all duration-300 hover:border-[#333] hover:bg-[#111111]/40 cursor-pointer"
                >
                  <p className="text-sm font-semibold text-[#f0ede8] mb-2">
                    {step.label}
                  </p>
                  <p className="text-lg font-semibold text-[#2dd4bf] mb-1">
                    {step.price}
                  </p>
                  <p className="text-xs text-[#999]">{step.timeline}</p>
                </a>
                {i < steps.length - 1 && <ArrowDown />}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
