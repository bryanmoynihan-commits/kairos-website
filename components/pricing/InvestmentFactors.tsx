import FadeIn from "@/components/FadeIn";

const investmentFactors = [
  {
    title: "Organizational complexity",
    higher: [
      "Multiple business units, geographies, or GTM motions running simultaneously",
      "Large stakeholder counts",
      "Cross-functional change management requirements",
    ],
    lower: [
      "Single-team focus, one GTM motion",
      "Internal champion with authority to move fast",
    ],
  },
  {
    title: "Tech stack maturity",
    higher: [
      "Legacy systems, significant data debt, no API connectivity",
      "Poor CRM hygiene requiring remediation before automation is viable",
    ],
    lower: [
      "Modern cloud stack, clean CRM data, existing API access",
      "Automation can start immediately",
    ],
  },
  {
    title: "Scope of functional coverage",
    higher: [
      "Simultaneous RevOps and AI Ops work",
      "Active builds and strategic roadmap management in parallel",
    ],
    lower: [
      "One function, well-defined problem",
      "Narrow deliverable set",
    ],
  },
  {
    title: "Engagement depth",
    higher: [
      "Executive-level involvement, board-ready reporting",
      "PE or investor communication support, on-demand access",
    ],
    lower: [
      "Operational-level work, defined cadence",
      "Async-first communication",
    ],
  },
];

export default function InvestmentFactors() {
  return (
    <section className="border-b border-[#1f1f1f] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <FadeIn delay={0}>
            <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
              Cost factors
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug mb-4">
              What determines your investment
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[#c0bdb8] text-base leading-relaxed max-w-3xl">
              Price in consulting is driven by scope, complexity, and the
              strategic depth of involvement. Here&apos;s a plain-English
              breakdown of what pushes engagements in either direction &mdash;
              so you can estimate fit before you ever talk to us.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investmentFactors.map((factor, i) => (
            <FadeIn key={factor.title} delay={i * 0.1} className="h-full">
              <div className="flex flex-col h-full p-8 border border-[#1f1f1f] rounded-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#333] hover:bg-[#111111]/40 hover:shadow-[0_0_30px_rgba(240,237,232,0.04)]">
                <h3 className="text-lg font-semibold text-[#f0ede8] mb-5">
                  {factor.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#999] mb-3 flex items-center gap-1.5">
                      <span className="text-[#f0ede8]/40">&uarr;</span>
                      Higher investment
                    </p>
                    <ul className="space-y-2">
                      {factor.higher.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-[#c0bdb8]/70 leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#999] mb-3 flex items-center gap-1.5">
                      <span className="text-[#f0ede8]/40">&darr;</span>
                      Lower investment
                    </p>
                    <ul className="space-y-2">
                      {factor.lower.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-[#c0bdb8]/70 leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
