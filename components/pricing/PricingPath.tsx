import FadeIn from "@/components/FadeIn";
import { ClipboardIcon, CycleIcon, WrenchIcon, ZapIcon } from "./icons";

const steps = [
  {
    icon: <ZapIcon />,
    name: "Prove",
    price: "$2K–$30K",
    timeline: "1–6 weeks",
    body: "One automation sprint or pilot. Real output before any bigger commitment.",
    tag: "Where most clients start",
    href: "#prove",
  },
  {
    icon: <ClipboardIcon />,
    name: "Diagnose",
    price: "$15K–$30K",
    timeline: "3–5 weeks",
    body: "A fixed-fee assessment and a prioritized roadmap of what to fix first.",
    href: "#diagnose",
  },
  {
    icon: <WrenchIcon />,
    name: "Execute",
    price: "$10K–$75K",
    timeline: "2–10 weeks",
    body: "Scoped, fixed-fee builds for defined problems. No retainer required.",
    href: "#execute",
  },
  {
    icon: <CycleIcon />,
    name: "Partner",
    price: "$10K–$25K/mo",
    timeline: "3-month minimum",
    body: "An embedded team that owns your roadmap and drives it forward.",
    tag: "Where most clients end up",
    href: "#partner",
    highlight: true,
  },
];

export default function PricingPath() {
  return (
    <section className="border-b border-[#1f1f1f] pt-8 pb-20 [@media(max-height:780px)]:pt-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8 [@media(max-height:780px)]:mb-6">
          <FadeIn delay={0}>
            <p className="text-sm uppercase tracking-widest text-[#999] mb-4">
              Start small. Scale with confidence.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0f0eb] leading-snug">
              Four ways to start, sized to how sure you are
            </h2>
          </FadeIn>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <FadeIn key={step.name} delay={i * 0.08} className="h-full">
              <li className="h-full">
                <a
                  href={step.href}
                  className={`relative flex flex-col h-full p-6 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(240,237,232,0.04)] ${
                    step.highlight
                      ? "border-2 border-[#2dd4bf]/50 bg-[#2dd4bf]/[0.06] hover:border-[#2dd4bf]/80"
                      : "border border-[#1f1f1f] border-t-2 border-t-[#2dd4bf] hover:border-[#333] hover:border-t-[#2dd4bf] hover:bg-[#2d2a2b]/40"
                  }`}
                >
                  {step.tag && (
                    <span className="absolute -top-3 left-5 bg-[#0e0d0d] px-2 text-xs font-semibold uppercase tracking-wider text-[#2dd4bf]">
                      {step.tag}
                    </span>
                  )}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="flex items-center gap-2.5 text-lg font-semibold text-[#f0f0eb]">
                      <span className="text-[#2dd4bf]">{step.icon}</span>
                      {step.name}
                    </h3>
                    <span className="font-mono text-sm text-[#999]">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="text-2xl font-semibold text-[#2dd4bf] mb-1">
                    {step.price}
                  </p>
                  <p className="text-sm text-[#999] mb-3">{step.timeline}</p>
                  <p className="text-sm text-[#c0bdb8] leading-relaxed mb-3">
                    {step.body}
                  </p>
                  <span className="mt-auto text-sm text-[#999]">Details &darr;</span>
                </a>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
