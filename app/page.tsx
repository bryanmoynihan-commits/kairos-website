import type { Metadata } from "next";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Hero from "@/components/Hero";
import TrackedLink from "@/components/TrackedLink";
import ArrowIcon from "@/components/ArrowIcon";

export const metadata: Metadata = {
  title: "Kairos Performance — AI-Native Revenue Operating Systems",
  openGraph: {
    title: "Kairos Performance — AI-Native Revenue Operating Systems",
    url: "https://kairosperformance.ai",
  },
};

const ctaButtonClass =
  "group inline-flex items-center gap-2 bg-[#f0ede8] text-[#0a0a0a] text-sm font-semibold px-8 py-4 rounded-sm shadow-[0_1px_3px_rgba(240,237,232,0.08)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(240,237,232,0.15)] active:translate-y-0 active:shadow-[0_1px_3px_rgba(240,237,232,0.08)] transition-all duration-300 ease-out";

function CTAButton({ location }: { location: string }) {
  return (
    <TrackedLink
      href="/contact"
      ctaName="Schedule a Discovery Call"
      ctaLocation={location}
      className={ctaButtonClass}
    >
      Schedule a Discovery Call
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        <ArrowIcon />
      </span>
    </TrackedLink>
  );
}

const stakes = [
  "You automate on top of a broken foundation and amplify the mess.",
  "Your best operators burn out fighting fires a properly designed system would prevent.",
  "Every month on a broken foundation, the data debt grows and the cleanup gets more expensive.",
  "A competitor with cleaner operations and better data moves faster and takes the position you should have owned.",
];

const stats = [
  { value: "$12M → $25M+", label: "ARR growth" },
  { value: "−30% → +17%", label: "EBITDA margin" },
  { value: "+40%", label: "CRM data accuracy" },
  { value: "−45%", label: "Information-seeking time" },
];

const planSteps = [
  {
    step: "01",
    title: "Book a Discovery Call",
    body: "Tell us where things are breaking down — data, process, tooling, team alignment. We listen first.",
  },
  {
    step: "02",
    title: "Get your AI Readiness Assessment",
    body: "A prioritized roadmap of your data, process, and tooling gaps — so you know what to fix first and in what order.",
  },
  {
    step: "03",
    title: "Build your Revenue Operating System",
    body: "We execute alongside your team — and your team owns everything we build.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Stakes — what happens if nothing changes */}
      <section className="border-b border-[#1f1f1f] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn delay={0}>
            <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
              What happens if nothing changes
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug max-w-2xl mb-4">
              The cost of scaling on a broken foundation
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[#c0bdb8] text-base leading-relaxed max-w-2xl mb-12">
              The risks of standing still while your competitors don&apos;t.
            </p>
          </FadeIn>

          <ul className="space-y-4 max-w-3xl mb-12">
            {stakes.map((item, i) => (
              <FadeIn key={i} delay={0.2 + i * 0.08}>
                <li className="flex gap-4 text-[#c0bdb8] text-base leading-relaxed">
                  <span className="text-[#2dd4bf] font-mono text-xs mt-1.5 shrink-0">
                    ▲
                  </span>
                  <span>{item}</span>
                </li>
              </FadeIn>
            ))}
          </ul>

          <FadeIn delay={0.1}>
            <CTAButton location="stakes" />
          </FadeIn>
        </div>
      </section>

      {/* Success — what it looks like when it works */}
      <section className="border-b border-[#1f1f1f] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn delay={0}>
            <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
              What it looks like when it works
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug max-w-2xl mb-4">
              The operating system behind the growth story
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[#c0bdb8] text-base leading-relaxed max-w-2xl mb-8">
              When the foundation is right and AI is doing the heavy lifting,
              the results follow.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[#c0bdb8] text-base leading-relaxed max-w-3xl mb-12">
              The board trusts your forecast. Your team runs strategy instead
              of manual reconciliation. Your growth plan finally has the
              infrastructure underneath it to match your ambition — and
              you&apos;re the operator who built it.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <CTAButton location="success" />
          </FadeIn>
        </div>
      </section>

      {/* Empathy & Authority — why Kairos */}
      <section className="border-b border-[#1f1f1f] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-16">
            <FadeIn delay={0}>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
                  Why Kairos
                </p>
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug mb-4">
                  <span className="block">We didn&apos;t study these problems.</span>
                  <span className="block">We lived them.</span>
                </h2>
                <p className="text-[#c0bdb8] text-base leading-relaxed">
                  Our founders built and fixed the same systems we now help you
                  build.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-5 text-[#c0bdb8] text-base leading-relaxed">
                <p>
                  We&apos;ve lived inside companies where the growth plan was
                  solid but the data, tools, and processes underneath it
                  couldn&apos;t keep up. We know what it feels like to make
                  decisions you&apos;re not confident in because the foundation
                  wasn&apos;t built to support what comes next.
                </p>
                <p>
                  Our founders built revenue operations and led AI
                  transformation inside a PE-backed business, growing it from
                  $12M to $25M+ in ARR, improving profit margins from −30% to
                  +17%, and deploying numerous production AI systems.
                  We&apos;ve done the work we&apos;re asking you to trust us
                  with.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div className="p-6 border border-[#1f1f1f] rounded-sm transition-all duration-300 hover:border-[#333] hover:bg-[#111111]/40">
                  <p className="text-xl lg:text-2xl font-semibold text-[#f0ede8] mb-2 leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[#999]">
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-8">
              <CTAButton location="empathy_authority" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Plan — how it works */}
      <section className="border-b border-[#1f1f1f] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <FadeIn delay={0}>
              <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
                How it works
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug max-w-2xl">
                A simple path from chaos to clarity
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planSteps.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.12} className="h-full">
                <div className="h-full p-8 border border-[#1f1f1f] rounded-sm flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#333] hover:bg-[#111111]/40 hover:shadow-[0_0_30px_rgba(240,237,232,0.04)]">
                  <p className="text-xs text-[#2dd4bf] font-mono">{item.step}</p>
                  <h3 className="text-lg font-semibold text-[#f0ede8]">
                    {item.title}
                  </h3>
                  <p className="text-[#c0bdb8] text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-16">
              <CTAButton location="plan" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Explanatory Paragraph — what we actually do */}
      <section className="border-b border-[#1f1f1f] py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <FadeIn delay={0}>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
                What we actually do
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug">
                <span className="block">AI-native revenue operations.</span>
                <span className="block">Built right, owned by you.</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-6 text-[#c0bdb8] text-base leading-relaxed">
              <p>
                We partner with mid-market B2B leadership teams to diagnose and
                fix the foundational gaps in their revenue operations — data,
                definitions, process, and tooling. We start with an AI
                Readiness Assessment, build a prioritized roadmap, and execute
                alongside your team.
              </p>
              <p>
                AI and automation aren&apos;t an afterthought — we build them
                into the foundation as we fix it, creating an AI-native
                operating system that turns clean data and process into a
                scalable growth engine. Everything we build, your team owns.
              </p>
              <div className="pt-4">
                <CTAButton location="explanatory" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
