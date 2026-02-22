"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "none";
}

const easing: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const initial = {
    opacity: 0,
    y: direction === "up" ? 24 : 0,
    x: direction === "left" ? -16 : 0,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.6, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}
