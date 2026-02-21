import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
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
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      <div className="border-t border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-[#666]">
            &copy; {new Date().getFullYear()} Kairos Performance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
