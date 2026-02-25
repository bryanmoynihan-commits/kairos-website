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

const orbits = [
  { rx: 160, ry: 64, duration: 60 },
  { rx: 240, ry: 96, duration: 80 },
  { rx: 340, ry: 136, duration: 100 },
];

const nodes = [
  { cx: 560, cy: 400, r: 3, pulse: 3 },
  { cx: 400, cy: 336, r: 2, pulse: 3.5 },
  { cx: 260, cy: 400, r: 2.5, pulse: 4 },
  { cx: 400, cy: 264, r: 2, pulse: 4.5 },
  { cx: 680, cy: 400, r: 1.5, pulse: 5 },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion ? "visible" : "hidden";
  const animate = "visible";

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center border-b border-[#1f1f1f]">
      {/* Abstract orbital visual */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.svg
          viewBox="0 0 800 800"
          className="w-[700px] h-[700px] lg:w-[900px] lg:h-[900px]"
          initial={prefersReducedMotion ? { opacity: 0.07 } : { opacity: 0 }}
          animate={{ opacity: 0.07 }}
          transition={{ duration: 2, ease: easing }}
        >
          {/* Concentric orbital rings */}
          {orbits.map((orbit, i) => (
            <motion.ellipse
              key={orbit.rx}
              cx="400"
              cy="400"
              rx={orbit.rx}
              ry={orbit.ry}
              fill="none"
              stroke="#f0ede8"
              strokeWidth="0.5"
              initial={prefersReducedMotion ? {} : { rotate: 0 }}
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      duration: orbit.duration,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
              style={{ transformOrigin: "400px 400px" }}
            />
          ))}

          {/* Nodes on orbits */}
          {nodes.map((node, i) => (
            <motion.circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="#f0ede8"
              initial={prefersReducedMotion ? { opacity: 0.5 } : { opacity: 0 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 0.5 }
                  : { opacity: [0.3, 0.8, 0.3] }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      duration: node.pulse,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
          ))}

          {/* Central radial glow */}
          <circle cx="400" cy="400" r="60" fill="url(#centerGlow)" />
          <defs>
            <radialGradient id="centerGlow">
              <stop offset="0%" stopColor="#f0ede8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f0ede8" stopOpacity="0" />
            </radialGradient>
          </defs>
        </motion.svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full py-24 px-6">
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
          className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#f0ede8] leading-[1.1] tracking-tight max-w-3xl mb-8"
          variants={heroVariants}
          initial={initial}
          animate={animate}
          custom={prefersReducedMotion ? 0 : 0.15}
        >
          Scale faster.<br /><span className="sm:whitespace-nowrap">Without breaking your business.</span>
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
