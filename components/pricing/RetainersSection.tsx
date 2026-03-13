import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { CheckIcon } from "./icons";

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
      "Companies ready to move from diagnosis to active execution across RevOps and AI \u2014 with a single partner who owns the integrated roadmap and drives it forward.",
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

export default function RetainersSection() {
  return (
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

        {/* Value bridge callout for Build tier */}
        <FadeIn delay={0.3}>
          <div className="mt-10 bg-white/[0.03] border border-white/10 rounded-lg p-6">
            <p className="text-sm text-[#2dd4bf] uppercase tracking-wider mb-2">
              Why a single partner matters
            </p>
            <p className="text-[#f0ede8]/70 text-sm leading-relaxed">
              Separate RevOps ($10K/mo) and AI advisory ($10K/mo) retainers
              cost more, require two vendor relationships, and lose the
              integration benefit. Our Build and Transform tiers deliver both
              from one team that understands how your revenue operations and
              AI strategy connect &mdash; at a lower total cost with
              compounding context.
            </p>
          </div>
        </FadeIn>

        {/* Flexible scope callout */}
        <FadeIn delay={0.35}>
          <div className="mt-6 bg-white/[0.03] border border-white/10 rounded-lg p-6">
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
  );
}
