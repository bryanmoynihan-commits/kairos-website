import FadeIn from "@/components/FadeIn";
import { ClipboardIcon, CycleIcon, WrenchIcon, ZapIcon } from "./icons";

const engagementTypes = [
  {
    icon: <ZapIcon />,
    title: "Quick Start",
    body: "Low-commitment entry point. A focused sprint or pilot to prove value on one automation opportunity \u2014 before a larger engagement.",
    href: "#quick-wins",
  },
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

export default function EngagementTypes() {
  return (
    <section className="border-b border-[#1f1f1f] py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <FadeIn delay={0}>
            <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
              Engagement models
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug">
              How we engage
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engagementTypes.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1} className="h-full">
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
  );
}
