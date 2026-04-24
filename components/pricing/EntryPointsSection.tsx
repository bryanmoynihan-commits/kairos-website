import FadeIn from "@/components/FadeIn";
import PricingCard from "./PricingCard";

const entryPoints = [
  {
    title: "AI Readiness Assessment & Roadmap",
    subtitle:
      "For leaders deploying AI across the business. We identify what's ready to automate, what needs fixing first, and in what order.",
    price: "$15,000 \u2013 $30,000",
    timeline: "3\u20135 weeks",
    included: [
      "Stakeholder discovery across GTM, ops, and leadership",
      "AI Readiness Score across 6 operational dimensions",
      "Prioritized automation opportunity map with ROI estimates",
      "Phased execution roadmap with recommended next steps",
      "Presentation and Q&A session with your leadership team",
    ],
    costsHigher: [
      "Number of stakeholders and functional areas in scope",
      "Complexity of existing tech stack",
      "Degree of data fragmentation",
    ],
    costsLower: [
      "Narrow, well-defined scope",
      "Strong internal documentation and data hygiene",
      "Single functional area focus",
    ],
  },
  {
    title: "RevOps Assessment & Roadmap",
    subtitle:
      "For leaders whose GTM motion isn't performing. We diagnose breakdowns across pipeline, handoffs, and tooling - and identify where automation accelerates the fix.",
    price: "$15,000 \u2013 $30,000",
    timeline: "3\u20135 weeks",
    included: [
      "Full GTM motion audit (pipeline, handoffs, reporting, tooling)",
      "Process gap analysis across sales, marketing, and CS",
      "AI readiness evaluation: where automation can replace manual work across your GTM motion",
      "Tech stack evaluation with automation opportunity mapping",
      "Pipeline stage criteria, conversion benchmarking, and modern data architecture assessment",
      "Prioritized RevOps roadmap with effort, impact, and automation-readiness scoring",
    ],
    costsHigher: [
      "Multiple GTM motions (PLG + sales-led simultaneously)",
      "Poor CRM hygiene requiring significant data archaeology",
      "Large stakeholder group across multiple geographies",
    ],
    costsLower: [
      "Single sales motion",
      "Existing documentation and clean CRM data",
      "Focused scope on one or two GTM functions",
    ],
  },
];

export default function EntryPointsSection() {
  return (
    <section id="diagnose" className="border-b border-[#1f1f1f] py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <FadeIn delay={0}>
            <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
              Assessments
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug mb-4">
              Diagnose
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[#c0bdb8] text-base leading-relaxed max-w-2xl">
              Deep-dive assessments with a clear deliverable. Fixed-fee,
              time-bounded, zero ambiguity.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entryPoints.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.12} className="h-full">
              <PricingCard {...card} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="mt-10 text-center text-sm text-[#c0bdb8]/70 leading-relaxed max-w-3xl mx-auto">
            Most engagements surface opportunities across both domains. We
            scope around your primary entry point and flag adjacent work as we
            go.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
