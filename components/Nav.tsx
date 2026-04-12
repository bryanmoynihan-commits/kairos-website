"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import TrackedLink from "@/components/TrackedLink";

const navLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Operator Insights", href: "/operator-insights", matchPrefix: true },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#2a2a2a] bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
          : "border-b border-transparent bg-[#0a0a0a]/80 backdrop-blur-sm"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-[#2dd4bf] origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-[#f0ede8] font-semibold tracking-wide text-base uppercase"
        >
          Kairos Performance
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-base transition-colors duration-200 ${
                  ("matchPrefix" in link && link.matchPrefix ? pathname.startsWith(link.href) : pathname === link.href)
                    ? "text-[#f0ede8]"
                    : "text-[#b0b0b0] hover:text-[#f0ede8]"
                }`}
              >
                {link.label}
              </Link>
          ))}
          <TrackedLink
            href="/contact"
            ctaName="Schedule a Discovery Call"
            ctaLocation="nav"
            className="inline-flex items-center bg-[#f0ede8] text-[#0a0a0a] text-sm font-semibold px-5 py-2.5 rounded-sm shadow-[0_1px_3px_rgba(240,237,232,0.08)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(240,237,232,0.15)] active:translate-y-0 active:shadow-[0_1px_3px_rgba(240,237,232,0.08)] transition-all duration-300 ease-out"
          >
            Schedule a Discovery Call
          </TrackedLink>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#b0b0b0] hover:text-[#f0ede8] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t border-[#1f1f1f] bg-[#0a0a0a] px-6 py-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#b0b0b0] hover:text-[#f0ede8] transition-colors"
              >
                {link.label}
              </Link>
          ))}
          <TrackedLink
            href="/contact"
            ctaName="Schedule a Discovery Call"
            ctaLocation="nav_mobile"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center bg-[#f0ede8] text-[#0a0a0a] text-sm font-semibold px-5 py-3 rounded-sm transition-all duration-300 ease-out"
          >
            Schedule a Discovery Call
          </TrackedLink>
        </motion.div>
      )}
    </header>
  );
}
