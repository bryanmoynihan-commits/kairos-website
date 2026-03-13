import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PricingCard from "./PricingCard";

const projects = [
  {
    title: "AI Automation Build",
    price: "$15,000 \u2013 $75,000",
    timeline: "4\u201310 weeks",
    description:
      "Design and implementation of a specific automation or AI workflow \u2014 lead routing, pipeline automation, data enrichment, reporting infrastructure, or a custom AI agent embedded into your operations.",
    included: [
      "Discovery and requirements scoping session",
      "Architecture design and tool selection",
      "Build, test, and deployment into your live environment",
      "Documentation and internal handoff training",
      "30-day post-launch support window",
    ],
    costsHigher: [
      "Multiple integrated systems requiring custom API work",
      "Complex conditional logic or multi-step orchestration",
      "Data remediation required before automation is viable",
    ],
    costsLower: [
      "Well-documented requirements and clean source data",
      "Single system integration",
      "Standardized workflow with limited edge cases",
    ],
  },
  {
    title: "RevOps Architecture & Implementation",
    price: "$25,000 \u2013 $60,000",
    timeline: "4\u20138 weeks",
    description:
      "A full rebuild or structured optimization of your revenue operations infrastructure \u2014 pipeline stages, handoff criteria, CRM architecture, reporting framework, and process documentation.",
    included: [
      "Current state audit of GTM systems and processes",
      "CRM architecture redesign (HubSpot or Salesforce)",
      "Pipeline stage criteria and handoff SLAs",
      "Reporting and attribution framework",
      "Team enablement and documentation",
    ],
    costsHigher: [
      "Multiple CRM or MAP platforms requiring reconciliation",
      "Large sales team requiring change management and enablement",
      "Significant data cleanup required",
    ],
    costsLower: [
      "Single platform, limited integrations",
      "Small GTM team with strong internal champion",
      "Existing documentation as a starting point",
    ],
  },
  {
    title: "GTM Tech Stack Evaluation & Optimization",
    price: "$15,000 \u2013 $35,000",
    timeline: "3\u20135 weeks",
    description:
      "A structured audit of your revenue technology stack \u2014 what you have, what you\u2019re paying for, what\u2019s redundant, what\u2019s missing, and a clear consolidation and optimization roadmap. Includes evaluation through an AI and automation lens to identify where your stack can work harder with less manual effort.",
    included: [
      "Full inventory and cost analysis of current tech stack",
      "Utilization and ROI assessment by tool",
      "Consolidation and gap analysis with AI/automation opportunity overlay",
      "Recommended future-state architecture with integration roadmap",
      "Vendor negotiation guidance and contract timing strategy",
      "Transition plan with risk mitigation and rollback criteria",
    ],
    costsHigher: [
      "Large, fragmented stack with 20+ tools",
      "Multiple teams with different tool sets requiring alignment",
      "Significant contract complexity or renewal timing constraints",
    ],
    costsLower: [
      "Smaller stack with clear documentation",
      "Single team or GTM motion",
      "Tools already on modern platforms with good reporting",
    ],
  },
  {
    title: "Capacity Plan & Pipeline Council Design",
    price: "$10,000 \u2013 $25,000",
    timeline: "2\u20134 weeks",
    description:
      "Build the revenue planning infrastructure your leadership team is missing \u2014 a working capacity model, pipeline council cadence, and the reporting framework to run it.",
    included: [
      "Bottom-up capacity model (rep productivity, ramp, attrition)",
      "Pipeline council design: cadence, agenda, roles, escalation path",
      "Forecast methodology and confidence scoring framework",
      "CRM reporting to support the council in real time",
      "Enablement session with sales and RevOps leadership",
    ],
    costsHigher: [
      "Complex multi-segment or multi-geo sales motion",
      "Absence of baseline CRM data requiring model assumptions",
      "Multiple stakeholders requiring alignment across functions",
    ],
    costsLower: [
      "Single-segment business with clean pipeline data",
      "Existing forecast process needing refinement, not a full build",
      "Small leadership team with fast decision-making",
    ],
  },
];

export default function ProjectsSection() {
  return (
    <section id="project-based" className="border-b border-[#1f1f1f] py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <FadeIn delay={0}>
            <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
              Fixed-fee engagements
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug mb-4">
              Project-Based Work
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[#c0bdb8] text-base leading-relaxed max-w-2xl mb-4">
              Scoped, fixed-fee engagements for defined problems. No retainer
              required.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[#c0bdb8] text-sm leading-relaxed max-w-3xl">
              Some of the highest-value work we do is project-based. These are
              clearly scoped engagements with defined deliverables, fixed fees,
              and a target timeline. Every project includes a clear handoff:
              working systems, documentation, and a recommended next step.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.1} className="h-full">
              <PricingCard {...card} />
            </FadeIn>
          ))}
        </div>

        {/* Callout */}
        <FadeIn delay={0.3}>
          <div className="mt-10 bg-white/[0.03] border border-white/10 rounded-lg p-6">
            <p className="text-sm text-[#2dd4bf] uppercase tracking-wider mb-2">
              Don&apos;t see your use case?
            </p>
            <p className="text-[#f0ede8]/70 text-sm leading-relaxed">
              These represent common project types, not an exhaustive list. If
              you have a defined problem and want a fixed-fee engagement around
              it, we&apos;re likely able to scope it.{" "}
              <Link
                href="/contact"
                className="text-[#f0ede8] underline underline-offset-4 decoration-[#333] hover:decoration-[#f0ede8] transition-colors"
              >
                Start a conversation
              </Link>
              .
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
