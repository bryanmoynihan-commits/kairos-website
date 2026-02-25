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

// Neural mesh network data
const meshNodes: { x: number; y: number; r: number; hub?: boolean }[] = [
  // Hub nodes (larger, breathing animation)
  { x: 400, y: 400, r: 4, hub: true },
  { x: 280, y: 320, r: 3.5, hub: true },
  { x: 520, y: 340, r: 3.5, hub: true },
  { x: 340, y: 500, r: 3, hub: true },
  { x: 480, y: 480, r: 3, hub: true },
  // Regular nodes
  { x: 200, y: 400, r: 2 },
  { x: 160, y: 280, r: 1.5 },
  { x: 300, y: 220, r: 2 },
  { x: 440, y: 240, r: 1.5 },
  { x: 580, y: 260, r: 2 },
  { x: 640, y: 380, r: 1.5 },
  { x: 620, y: 480, r: 2 },
  { x: 540, y: 560, r: 1.5 },
  { x: 400, y: 580, r: 2 },
  { x: 260, y: 540, r: 1.5 },
  { x: 180, y: 480, r: 2 },
  { x: 220, y: 200, r: 1.5 },
  { x: 500, y: 180, r: 1.5 },
  { x: 660, y: 300, r: 1.5 },
  { x: 140, y: 360, r: 1.5 },
  { x: 360, y: 160, r: 1.5 },
  { x: 560, y: 160, r: 1.5 },
  { x: 700, y: 440, r: 1.5 },
  { x: 320, y: 620, r: 1.5 },
  { x: 600, y: 580, r: 1.5 },
];

// Connections between nodes (index pairs)
const meshEdges: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],     // Hub center to other hubs
  [1, 5], [1, 6], [1, 7],              // Hub 1 to nearby nodes
  [2, 9], [2, 10], [2, 8],             // Hub 2 to nearby nodes
  [3, 15], [3, 14], [3, 5],            // Hub 3 to nearby nodes
  [4, 11], [4, 12], [4, 13],           // Hub 4 to nearby nodes
  [1, 2], [2, 4], [3, 4], [1, 3],     // Hub-to-hub connections
  [6, 7], [7, 8], [8, 9], [9, 10],    // Outer ring top
  [10, 11], [11, 12], [12, 13],        // Outer ring right-bottom
  [13, 14], [14, 15], [15, 6],         // Outer ring bottom-left
  [16, 7], [17, 9], [18, 10],          // Extended nodes
  [19, 6], [20, 8], [21, 9],           // More extended
  [22, 11], [23, 14], [24, 12],        // Outer edges
];

// Traveling pulses — subset of edges with animation timing
const meshPulses = [
  { edge: 0, duration: 2.5, delay: 0 },
  { edge: 1, duration: 3, delay: 0.8 },
  { edge: 2, duration: 2.8, delay: 1.5 },
  { edge: 3, duration: 3.2, delay: 2.2 },
  { edge: 4, duration: 2.6, delay: 0.4 },
  { edge: 7, duration: 3, delay: 1.0 },
  { edge: 10, duration: 2.8, delay: 1.8 },
  { edge: 13, duration: 3.5, delay: 0.6 },
  { edge: 16, duration: 2.4, delay: 2.0 },
  { edge: 20, duration: 3, delay: 1.2 },
  { edge: 23, duration: 2.6, delay: 0.2 },
  { edge: 26, duration: 3.2, delay: 1.6 },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion ? "visible" : "hidden";
  const animate = "visible";

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center border-b border-[#1f1f1f]">
      {/* Neural mesh network visual */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.svg
          viewBox="0 0 800 800"
          className="w-[700px] h-[700px] lg:w-[900px] lg:h-[900px]"
          initial={prefersReducedMotion ? { opacity: 0.12 } : { opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 2, ease: easing }}
        >
          {/* Connection lines */}
          {meshEdges.map(([from, to], i) => (
            <line
              key={`edge-${i}`}
              x1={meshNodes[from].x}
              y1={meshNodes[from].y}
              x2={meshNodes[to].x}
              y2={meshNodes[to].y}
              stroke="#f0ede8"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}

          {/* Static regular nodes */}
          {meshNodes
            .filter((n) => !n.hub)
            .map((node, i) => (
              <circle
                key={`node-${i}`}
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="#f0ede8"
                opacity="0.4"
              />
            ))}

          {/* Breathing hub nodes */}
          {meshNodes
            .filter((n) => n.hub)
            .map((node, i) => (
              <motion.circle
                key={`hub-${i}`}
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="#f0ede8"
                initial={
                  prefersReducedMotion ? { opacity: 0.5 } : { opacity: 0.2 }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 0.5 }
                    : { opacity: [0.2, 0.6, 0.2] }
                }
                transition={
                  prefersReducedMotion
                    ? {}
                    : {
                        duration: 4 + i * 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              />
            ))}

          {/* Traveling pulses along connections */}
          {!prefersReducedMotion &&
            meshPulses.map((pulse, i) => {
              const [from, to] = meshEdges[pulse.edge];
              const n1 = meshNodes[from];
              const n2 = meshNodes[to];
              return (
                <motion.circle
                  key={`pulse-${i}`}
                  r={2}
                  fill="#f0ede8"
                  initial={{ cx: n1.x, cy: n1.y, opacity: 0 }}
                  animate={{
                    cx: [n1.x, n2.x, n1.x],
                    cy: [n1.y, n2.y, n1.y],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: pulse.duration,
                    repeat: Infinity,
                    delay: pulse.delay,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

          {/* Central glow */}
          <circle cx="400" cy="400" r="80" fill="url(#meshGlow)" />
          <defs>
            <radialGradient id="meshGlow">
              <stop offset="0%" stopColor="#f0ede8" stopOpacity="0.12" />
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
            className="group inline-flex items-center gap-2 bg-[#f0ede8] text-[#0a0a0a] text-sm font-semibold px-8 py-4 rounded-sm shadow-[0_1px_3px_rgba(240,237,232,0.08)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(240,237,232,0.15)] active:translate-y-0 active:shadow-[0_1px_3px_rgba(240,237,232,0.08)] transition-all duration-300 ease-out"
          >
            Start a conversation
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
