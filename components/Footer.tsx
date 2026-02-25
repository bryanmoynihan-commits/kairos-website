import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden">
      {/* Atmospheric glow at top edge */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(240,237,232,0.06) 0%, rgba(240,237,232,0.02) 40%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#999] mb-3">
            Kairos Performance
          </p>
          <p className="text-[#f0ede8] text-lg font-medium max-w-xs leading-snug">
            Does this resonate?
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-[#f0ede8] text-[#0a0a0a] text-sm font-semibold px-6 py-3 hover:bg-white transition-colors duration-200"
        >
          Let&apos;s Connect
          <ArrowIcon />
        </Link>
      </div>

      <div className="relative border-t border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-[#666]">
            &copy; {new Date().getFullYear()} Kairos Performance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
