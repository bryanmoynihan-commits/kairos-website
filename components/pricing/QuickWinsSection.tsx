import FadeIn from "@/components/FadeIn";
import PricingCard from "./PricingCard";

const quickWins = [
  {
    title: "AI & Automation Discovery Sprint",
    price: "$2,000 \u2013 $5,000",
    timeline: "1\u20132 weeks",
    description:
      "A focused exploration of one high-impact automation opportunity in your revenue operation. We identify the problem, map the workflow, estimate ROI, and deliver a clear implementation roadmap \u2014 so you can move forward with confidence.",
    included: [
      "Kickoff session to identify highest-impact automation opportunity",
      "Current-state workflow mapping and friction analysis",
      "ROI estimate with conservative and optimistic projections",
      "Implementation roadmap with tool recommendations",
      "Executive summary brief (async or live walkthrough)",
    ],
    costsHigher: [
      "Workflow spans multiple systems or teams",
      "Requires data access setup or security review",
    ],
    costsLower: [
      "Single-system, well-understood workflow",
      "Internal champion with process documentation ready",
    ],
  },
  {
    title: "AI & Automation Pilot / Proof of Value",
    price: "$5,000 \u2013 $30,000",
    timeline: "2\u20136 weeks",
    description:
      "Build and deploy one automation in a controlled environment. You get a working prototype with real performance data \u2014 proof that the approach works before committing to a larger engagement.",
    included: [
      "Discovery and requirements scoping (or continuation from Discovery Sprint)",
      "Architecture design and tool selection",
      "Working prototype built and deployed in controlled environment",
      "Performance data collection and ROI measurement",
      "Go/no-go recommendation with scale-up roadmap",
      "30-day post-launch monitoring",
    ],
    costsHigher: [
      "Complex integration requirements or custom API work",
      "Multi-step orchestration with conditional logic",
      "Data cleanup required before automation is viable",
    ],
    costsLower: [
      "Continuation from a Discovery Sprint (context already established)",
      "Single-system integration with clean data",
      "Well-documented requirements and standard workflow",
    ],
  },
];

export default function QuickWinsSection() {
  return (
    <section id="quick-wins" className="border-b border-[#1f1f1f] py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <FadeIn delay={0}>
            <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
              Start here
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug mb-4">
              Quick wins
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[#c0bdb8] text-base leading-relaxed max-w-2xl">
              Low-commitment, high-signal. Prove the value of AI and
              automation in your operation before committing to a larger
              engagement.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickWins.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.12} className="h-full">
              <PricingCard {...card} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
