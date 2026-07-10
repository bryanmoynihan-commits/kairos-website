export default function ContactFooter() {
  return (
    <footer className="border-t border-[#1f1f1f] bg-[#0e0d0d]">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-[#c0bdb8] text-base leading-relaxed mb-2">
            Prefer email? Shoot us a note.
          </p>
          <a
            href="mailto:hello@kairosperformance.ai"
            className="text-[#f0f0eb] text-base hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-[#3a3a3a] hover:decoration-[#f0f0eb]"
          >
            hello@kairosperformance.ai
          </a>
        </div>
      </div>

      <div className="border-t border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-icon.svg"
            alt="Kairos Performance"
            className="h-7 w-auto select-none"
          />
          <p className="text-xs text-[#666]">
            &copy; {new Date().getFullYear()} Kairos Performance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
