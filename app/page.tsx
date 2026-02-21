"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[92vh] flex flex-col justify-center border-b border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto w-full py-24 px-6">
          <motion.p
            className="text-lg uppercase tracking-widest text-[#999] mb-10"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Kairos Performance
          </motion.p>
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#f0ede8] leading-[1.1] tracking-tight max-w-3xl mb-8"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            custom={0.15}
          >
            Scale faster.<br /><span className="whitespace-nowrap">Without breaking your business.</span>
          </motion.h1>
          <motion.p
            className="text-[#c0bdb8] text-lg max-w-2xl leading-relaxed mb-12"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            We partner with leadership teams to embed AI-native systems into
            core operations, unlocking growth through better execution — not
            bigger teams.
          </motion.p>
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            custom={0.45}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#f0ede8] text-[#0a0a0a] text-sm font-semibold px-8 py-4 hover:bg-white transition-colors duration-200"
            >
              Start a conversation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Tagline */}
      <section className="border-b border-[#1f1f1f] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn delay={0}>
            <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
              How we think about growth
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-3xl sm:text-4xl font-medium text-[#f0ede8] max-w-2xl leading-snug">
              Growth scales when execution scales.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* About Us */}
      <section className="border-b border-[#1f1f1f] py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <FadeIn delay={0}>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
                About us
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug">
                Who we are
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-5 text-[#c0bdb8] text-base leading-relaxed">
              <p>
                We are operators who have lived through growth and built the
                systems that support it. We&apos;ve seen where systems break, where
                complexity compounds, and where execution fails.
              </p>
              <p>
                Our work is shaped by that experience — focused on building
                operating systems that remove manual friction and hold up as
                businesses scale.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What We Do */}
      <section className="border-b border-[#1f1f1f] py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <FadeIn delay={0}>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
                How we work
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug">
                What we do
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-5 text-[#c0bdb8] text-base leading-relaxed">
              <p>
                We partner with leadership teams to modernize the operating
                systems that drive growth. That means identifying where execution
                slows as complexity increases, then embedding AI-native systems
                that remove manual friction and improve decision speed.
              </p>
              <p>
                Our work is hands-on and focused on what actually runs the
                business — revenue operations, core workflows, and the processes
                teams rely on every day. We design systems that scale cleanly,
                create leverage, and support growth without disruption.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-[#1f1f1f] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <FadeIn delay={0}>
              <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
                Working together
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0ede8] leading-snug max-w-sm">
                How it works
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 divide-[#1f1f1f]">
            {[
              {
                step: "01",
                title: "Discovery",
                body: "We start with a focused conversation to understand how your business operates today and where growth is causing friction — slow decisions, manual work, or systems that no longer scale.",
              },
              {
                step: "02",
                title: "Clear path forward",
                body: "We identify a small number of high-impact opportunities and define a clear plan. We work directly within your tools and workflows — no slide decks of recommendations thrown over the fence.",
              },
              {
                step: "03",
                title: "Implementation",
                body: "We move into hands-on implementation to embed automation and AI systems that improve execution, increase capacity, and scale over time. Measurable progress early, then building from there.",
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.12}>
                <div className="md:px-10 py-10 first:pl-0 last:pr-0 space-y-4">
                  <p className="text-xs text-[#666] font-mono">{item.step}</p>
                  <h3 className="text-lg font-semibold text-[#f0ede8]">
                    {item.title}
                  </h3>
                  <p className="text-[#c0bdb8] text-sm leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-16">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#f0ede8] text-[#0a0a0a] text-sm font-semibold px-8 py-4 hover:bg-white transition-colors duration-200"
              >
                Schedule Discovery Call
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
