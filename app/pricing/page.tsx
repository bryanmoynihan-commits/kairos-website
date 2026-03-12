import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ArrowIcon from "@/components/ArrowIcon";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for AI-native GTM and RevOps consulting. Assessments, project work, and ongoing retainers — no surprises.",
  openGraph: {
    title: "Pricing | Kairos Performance",
    description:
      "Transparent pricing for AI-native GTM and RevOps consulting. Assessments, project work, and ongoing retainers — no surprises.",
  },
};

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function ClipboardIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="3" width="12" height="15" rx="1.5" />
      <path d="M7 3V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M7 10h6M7 13h4" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12.5 2.5a5 5 0 0 0-4.7 6.7L2.5 14.5l3 3 5.3-5.3A5 5 0 0 0 12.5 2.5z" />
      <path d="M14 6l3-3" />
    </svg>
  );
}

function CycleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 10A7 7 0 0 1 5.3 15.5" />
      <path d="M3 10A7 7 0 0 1 14.7 4.5" />
      <path d="M14.7 1.5v3h3" />
      <path d="M5.3 18.5v-3h-3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 mt-0.5"
    >
      <path d="M2 7.5l3.5 3.5L12 3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const engagementTypes = [
  {
    icon: <ClipboardIcon />,
    title: "Entry Point",
    body: "Start with a time-bounded assessment. We diagnose your operation, score your AI readiness, and deliver a prioritized roadmap \u2014 then give you a clear path to execution.",
    href: "#entry-points",
  },
  {
    icon: <CycleIcon />,
    title: "Ongoing Retainer",
    body: "Fractional partnership for ongoing execution. We function as an embedded operator \u2014 building, managing, and evolving your revenue and AI operations month over month.",
    href: "#ongoing-retainers",
  },
  {
    icon: <WrenchIcon />,
    title: "Project-Based",
    body: "Scoped, fixed-fee work for defined problems. Automation builds, RevOps architecture, GTM system design. No retainer required to start here.",
    href: "#project-based",
  },
];

const entryPoints = [
  {
    title: "AI Readiness Assessment & Roadmap",
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
    price: "$15,000 \u2013 $30,000",
    timeline: "3\u20135 weeks",
    included: [
      "Full GTM motion audit (pipeline, handoffs, reporting, tooling)",
      "Process gap analysis across sales, marketing, and CS",
      "Tech stack evaluation and optimization recommendations",
      "Pipeline stage criteria and conversion benchmarking",
      "Prioritized RevOps roadmap with effort and impact scoring",
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

const projects = [
  {
    title: "AI Automation Build",
    price: "$25,000 \u2013 $75,000",
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
      "A structured audit of your revenue technology stack \u2014 what you have, what you\u2019re paying for, what\u2019s redundant, what\u2019s missing, and a clear consolidation and optimization roadmap.",
    included: [
      "Full inventory and cost analysis of current tech stack",
      "Utilization and ROI assessment by tool",
      "Consolidation and gap analysis",
      "Recommended future-state architecture",
      "Vendor negotiation guidance and transition plan",
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

const retainerTiers = [
  {
    name: "Stabilize",
    price: "$10,000",
    commitment: "3-month minimum",
    bestFor:
      "Companies with a single defined problem area \u2014 one GTM function that needs structure, one automation initiative that needs ownership.",
    included: [
      "One defined functional area (RevOps or AI Ops)",
      "Monthly deliverable set agreed at engagement start",
      "Bi-weekly working sessions",
      "Async Slack access between sessions",
      "Monthly progress report",
      "QBR at 90 days",
    ],
    highlighted: false,
  },
  {
    name: "Build",
    price: "$17,500",
    commitment: "3-month minimum",
    bestFor:
      "Companies ready to move from diagnosis to active execution across multiple areas \u2014 with a partner who owns the roadmap and drives it forward.",
    included: [
      "Two functional areas or broader scope within one",
      "Active roadmap management and prioritization",
      "Weekly working sessions",
      "Async Slack access",
      "Monthly ROI reporting",
      "QBR at 90 days with upsell/scope review",
      "New automation scoping included (builds priced separately)",
    ],
    highlighted: true,
  },
  {
    name: "Transform",
    price: "$25,000",
    commitment: "3-month minimum",
    bestFor:
      "PE-backed operators or complex organizations where both RevOps and AI Ops require active, senior-level ownership \u2014 with executive-level involvement and full strategic alignment.",
    included: [
      "Full coverage across RevOps and AI Ops",
      "Executive-level strategic involvement",
      "Weekly sessions plus on-demand access",
      "Full async Slack access",
      "Monthly board-ready ROI reporting",
      "Quarterly business reviews with PE/board presentation support",
      "Priority access for new automation builds",
      "Dedicated capacity guarantee",
    ],
    highlighted: false,
  },
];

const investmentFactors = [
  {
    title: "Organizational Complexity",
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
    title: "Tech Stack Maturity",
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
    title: "Scope of Functional Coverage",
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
    title: "Engagement Depth",
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

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  return (
    <>
      {/* -------- HERO -------- */}
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

      {/* -------- HOW WE ENGAGE -------- */}
      <section className="border-b border-[#1f1f1f] py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <FadeIn delay={0}>
              <p className="text-base uppercase tracking-widest text-[#999] mb-4">
                Engagement models
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug">
                How We Engage
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagementTypes.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.12} className="h-full">
                <a
                  href={item.href}
                  className="flex flex-col h-full p-8 border border-[#1f1f1f] rounded-sm space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#333] hover:bg-[#111111]/40 hover:shadow-[0_0_30px_rgba(240,237,232,0.04)] cursor-pointer"
                >
                  <div className="text-[#2dd4bf]">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-[#f0ede8]">
                    {item.title}
                  </h3>
                  <p className="text-[#c0bdb8] text-sm leading-relaxed">
                    {item.body}
                  </p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* -------- ENTRY POINTS -------- */}
      <section id="entry-points" className="border-b border-[#1f1f1f] py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <FadeIn delay={0}>
              <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
                Start here
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug mb-4">
                Entry Points
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-[#c0bdb8] text-base leading-relaxed max-w-2xl">
                The fastest way to start. Fixed-fee, time-bounded, zero
                ambiguity.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entryPoints.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.12} className="h-full">
                <div className="flex flex-col h-full p-8 border border-[#1f1f1f] border-t-2 border-t-[#2dd4bf] rounded-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#333] hover:border-t-[#2dd4bf] hover:bg-[#111111]/40 hover:shadow-[0_0_30px_rgba(240,237,232,0.04)]">
                  <h3 className="text-lg font-semibold text-[#f0ede8] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-2xl sm:text-3xl font-semibold text-[#2dd4bf] mb-1">
                    {card.price}
                  </p>
                  <p className="text-sm text-[#999] mb-6">{card.timeline}</p>

                  {/* Included */}
                  <p className="text-xs uppercase tracking-widest text-[#999] mb-3">
                    What&apos;s included
                  </p>
                  <ul className="space-y-2 mb-6">
                    {card.included.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-[#c0bdb8] leading-relaxed"
                      >
                        <span className="text-[#2dd4bf]">
                          <CheckIcon />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-[#1f1f1f] pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Higher */}
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[#999] mb-3 flex items-center gap-1.5">
                          <span className="text-[#f0ede8]/40">&uarr;</span>
                          Drives cost higher
                        </p>
                        <ul className="space-y-2">
                          {card.costsHigher.map((item) => (
                            <li
                              key={item}
                              className="text-sm text-[#c0bdb8]/70 leading-relaxed"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Lower */}
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[#999] mb-3 flex items-center gap-1.5">
                          <span className="text-[#f0ede8]/40">&darr;</span>
                          Drives cost lower
                        </p>
                        <ul className="space-y-2">
                          {card.costsLower.map((item) => (
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
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* -------- ONGOING RETAINERS -------- */}
      <section id="ongoing-retainers" className="border-b border-[#1f1f1f] py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <FadeIn delay={0}>
              <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
                Fractional partnership
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug mb-4">
                Ongoing Retainers
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-[#c0bdb8] text-base leading-relaxed max-w-2xl mb-4">
                Fractional partnership priced by scope and depth of engagement
                &mdash; not by hours.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[#c0bdb8] text-sm leading-relaxed max-w-3xl">
                We don&apos;t price by the hour. Each tier is defined by
                functional coverage and deliverable commitment &mdash; the right
                tier is determined by the scope of what you need us to own.
                Every engagement at every tier includes AI-assisted delivery.
                That&apos;s not a premium add-on. It&apos;s how we work.
              </p>
            </FadeIn>
          </div>

          {/* Why we lead with retainers callout */}
          <FadeIn delay={0.25}>
            <div className="mb-12 bg-white/[0.03] border border-white/10 rounded-lg p-6">
              <p className="text-sm text-[#2dd4bf] uppercase tracking-wider mb-2">
                Why we lead with retainers
              </p>
              <p className="text-[#f0ede8]/70 text-sm leading-relaxed mb-3">
                On nine out of ten engagements, something changes halfway
                through &mdash; a new priority surfaces, a system behaves
                differently than expected, or the team realizes the real problem
                is adjacent to the original brief. With a retainer, we adapt in
                real time. No re-scoping, no re-documenting, no pause while a
                new SOW gets approved.
              </p>
              <p className="text-[#f0ede8]/70 text-sm leading-relaxed mb-3">
                That structure also changes incentives. Project-based work
                rewards delivering exactly what was specified &mdash; retainers
                reward building things that actually work, because we&apos;re
                still here next month when they need to hold up.
              </p>
              <p className="text-[#f0ede8]/70 text-sm leading-relaxed">
                And the longer we work together, the more productive we become.
                By month three, we have deep context on your business, your
                systems, and your team. Projects reset that institutional
                knowledge every time. Retainers compound it.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {retainerTiers.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 0.12} className="h-full">
                <div
                  className={`relative flex flex-col h-full p-8 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(240,237,232,0.04)] ${
                    tier.highlighted
                      ? "border-2 border-[#2dd4bf]/30 bg-[#111111]/40 hover:border-[#2dd4bf]/50"
                      : "border border-[#1f1f1f] hover:border-[#333] hover:bg-[#111111]/40"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="absolute -top-3 left-8 inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-[#2dd4bf]/10 text-[#2dd4bf] rounded-sm">
                      Most Common
                    </span>
                  )}

                  <p className="text-xs uppercase tracking-widest text-[#2dd4bf] mb-3">
                    {tier.name}
                  </p>
                  <p className="text-3xl font-semibold text-[#f0ede8] mb-1">
                    {tier.price}
                    <span className="text-sm font-normal text-[#999]">
                      {" "}
                      / month
                    </span>
                  </p>
                  <p className="text-xs text-[#666] mb-6">{tier.commitment}</p>

                  <p className="text-sm text-[#c0bdb8]/60 italic leading-relaxed mb-6">
                    {tier.bestFor}
                  </p>

                  <div className="border-t border-[#1f1f1f] pt-6 mt-auto">
                    <ul className="space-y-2">
                      {tier.included.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-[#c0bdb8] leading-relaxed"
                        >
                          <span className="text-[#2dd4bf]">
                            <CheckIcon />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Flexible scope callout */}
          <FadeIn delay={0.3}>
            <div className="mt-10 bg-white/[0.03] border border-white/10 rounded-lg p-6">
              <p className="text-sm text-[#2dd4bf] uppercase tracking-wider mb-2">
                Flexible scope
              </p>
              <p className="text-[#f0ede8]/70 text-sm leading-relaxed mb-3">
                These tiers represent our standard engagements &mdash; not a
                ceiling or a floor. If your organization requires broader
                coverage than Transform &mdash; portfolio-wide operations,
                multi-entity coordination, or dedicated senior capacity &mdash;
                we build custom partnerships scoped to match.
              </p>
              <p className="text-[#f0ede8]/70 text-sm leading-relaxed">
                On the other end, if you have a single, well-defined need that
                doesn&apos;t warrant a full retainer, we&apos;re open to shorter
                commitments with narrower scope and lower investment.{" "}
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

      {/* -------- PROJECT-BASED WORK -------- */}
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
                <div className="flex flex-col h-full p-8 border border-[#1f1f1f] border-t-2 border-t-[#2dd4bf] rounded-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#333] hover:border-t-[#2dd4bf] hover:bg-[#111111]/40 hover:shadow-[0_0_30px_rgba(240,237,232,0.04)]">
                  <h3 className="text-lg font-semibold text-[#f0ede8] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-2xl sm:text-3xl font-semibold text-[#2dd4bf] mb-1">
                    {card.price}
                  </p>
                  <p className="text-sm text-[#999] mb-4">{card.timeline}</p>
                  <p className="text-sm text-[#c0bdb8]/70 leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* Included */}
                  <p className="text-xs uppercase tracking-widest text-[#999] mb-3">
                    What&apos;s included
                  </p>
                  <ul className="space-y-2 mb-6">
                    {card.included.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-[#c0bdb8] leading-relaxed"
                      >
                        <span className="text-[#2dd4bf]">
                          <CheckIcon />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-[#1f1f1f] pt-6 mt-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Higher */}
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[#999] mb-3 flex items-center gap-1.5">
                          <span className="text-[#f0ede8]/40">&uarr;</span>
                          Drives cost higher
                        </p>
                        <ul className="space-y-2">
                          {card.costsHigher.map((item) => (
                            <li
                              key={item}
                              className="text-sm text-[#c0bdb8]/70 leading-relaxed"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Lower */}
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[#999] mb-3 flex items-center gap-1.5">
                          <span className="text-[#f0ede8]/40">&darr;</span>
                          Drives cost lower
                        </p>
                        <ul className="space-y-2">
                          {card.costsLower.map((item) => (
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
                </div>
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

      {/* -------- WHAT DETERMINES YOUR INVESTMENT -------- */}
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
                What Determines Your Investment
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

      {/* -------- BOTTOM CTA -------- */}
      <section className="py-24 bg-white/[0.03] border-t border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <FadeIn delay={0}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug mb-4">
              Ready to see if we&apos;re the right fit?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[#c0bdb8] text-base leading-relaxed max-w-xl mx-auto mb-4">
              Whether you need a focused assessment, a scoped project, or an
              ongoing partnership &mdash; and whether the scope is standard or
              custom &mdash; the conversation starts the same way.
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

      <Footer />
    </>
  );
}
