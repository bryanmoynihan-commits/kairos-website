import FadeIn from "@/components/FadeIn";

const credits = [
  {
    label: "Your Sprint fee",
    body: "Credited in full toward whatever comes next: an Assessment, a build, or a retainer.",
  },
  {
    label: "Your Assessment fee",
    body: "$5,000 credited toward your first three months of retainer.",
  },
  {
    label: "Your roadmap",
    body: "Becomes the scope for any build, so there's no second discovery phase.",
  },
];

const example = [
  { label: "Discovery Sprint", list: "$2,000", credit: null },
  { label: "AI Readiness Assessment", list: "$15,000", credit: "−$2,000" },
  { label: "Stabilize retainer, months 1–3", list: "$30,000", credit: "−$5,000" },
];

export default function CreditsForward() {
  return (
    <section className="border-b border-[#1f1f1f] py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <FadeIn delay={0}>
            <p className="text-sm uppercase tracking-widest text-[#999] mb-4">
              Every dollar moves forward
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0f0eb] leading-snug mb-4">
              Nothing you spend figuring it out is wasted.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[#c0bdb8] text-base leading-relaxed mb-8">
              The Sprint and the Assessment exist to tell you what to do next.
              When you act on what they find within 30 days, what you paid
              carries forward.
            </p>
          </FadeIn>
          <dl className="space-y-5">
            {credits.map((c, i) => (
              <FadeIn key={c.label} delay={0.2 + i * 0.08}>
                <div className="border-l-2 border-[#2dd4bf] pl-5">
                  <dt className="text-base font-semibold text-[#f0f0eb] mb-1">
                    {c.label}
                  </dt>
                  <dd className="text-base text-[#c0bdb8] leading-relaxed">
                    {c.body}
                  </dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>

        <FadeIn delay={0.2}>
          <div className="border border-[#2dd4bf]/30 rounded-sm p-8 bg-[#2dd4bf]/[0.04]">
            <p className="text-sm uppercase tracking-widest text-[#999] mb-5">
              Example: Sprint, Assessment, then a retainer
            </p>
            <ul className="space-y-4 mb-5">
              {example.map((row) => (
                <li key={row.label} className="text-base">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[#c0bdb8]">{row.label}</span>
                    <span className="tabular-nums text-[#f0f0eb]">{row.list}</span>
                  </div>
                  {row.credit && (
                    <div className="flex items-baseline justify-between gap-4 text-sm mt-1">
                      <span className="text-[#999]">Credit carried forward</span>
                      <span className="tabular-nums text-[#2dd4bf]">{row.credit}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex items-baseline justify-between gap-4 border-t border-[#333] pt-4 mb-2 text-base">
              <span className="text-[#c0bdb8]">Published prices</span>
              <span className="tabular-nums text-[#c0bdb8]">$47,000</span>
            </div>
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <span className="text-lg text-[#f0f0eb] font-semibold">
                What you pay
              </span>
              <span className="tabular-nums text-4xl font-semibold text-[#2dd4bf]">
                $40,000
              </span>
            </div>
            <p className="text-sm text-[#c0bdb8] leading-relaxed">
              The $7,000 difference is your own spend, put back to work.
              Credits apply when the next engagement starts within 30 days.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
