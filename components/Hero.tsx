"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import ArrowIcon from "@/components/ArrowIcon";

const easing: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: easing },
  }),
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion ? "visible" : "hidden";
  const animate = "visible";

  return (
    <section className="min-h-[92vh] flex flex-col justify-center border-b border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto w-full py-24 px-6">
        <motion.p
          className="text-lg uppercase tracking-widest text-[#999] mb-10"
          variants={heroVariants}
          initial={initial}
          animate={animate}
          custom={0}
        >
          Kairos Performance
        </motion.p>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#f0ede8] leading-[1.1] tracking-tight max-w-3xl mb-8"
          variants={heroVariants}
          initial={initial}
          animate={animate}
          custom={prefersReducedMotion ? 0 : 0.15}
        >
          Scale faster.<br /><span className="lg:whitespace-nowrap">Without breaking your business.</span>
        </motion.h1>
        <motion.p
          className="text-[#c0bdb8] text-lg max-w-2xl leading-relaxed mb-12"
          variants={heroVariants}
          initial={initial}
          animate={animate}
          custom={prefersReducedMotion ? 0 : 0.3}
        >
          We partner with leadership teams to embed AI-native systems into
          core operations, unlocking growth through better execution — not
          bigger teams.
        </motion.p>
        <motion.div
          variants={heroVariants}
          initial={initial}
          animate={animate}
          custom={prefersReducedMotion ? 0 : 0.45}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#f0ede8] text-[#0a0a0a] text-sm font-semibold px-8 py-4 hover:bg-white transition-colors duration-200"
          >
            Start a conversation
            <ArrowIcon />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
