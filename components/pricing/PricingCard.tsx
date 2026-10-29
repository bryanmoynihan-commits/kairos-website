import { CheckIcon } from "./icons";

interface PricingCardProps {
  title: string;
  subtitle?: string;
  price: string;
  timeline: string;
  description?: string;
  included: string[];
  costsHigher: string[];
  costsLower: string[];
}

export default function PricingCard({
  title,
  subtitle,
  price,
  timeline,
  description,
  included,
  costsHigher,
  costsLower,
}: PricingCardProps) {
  return (
    <div className="flex flex-col h-full p-8 border border-[#1f1f1f] border-t-2 border-t-[#2dd4bf] rounded-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#333] hover:border-t-[#2dd4bf] hover:bg-[#2d2a2b]/40 hover:shadow-[0_0_30px_rgba(240,237,232,0.04)]">
      <h3 className={`text-lg font-semibold text-[#f0f0eb] ${subtitle || description ? "mb-2" : "mb-3"}`}>
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm italic text-[#c0bdb8] leading-relaxed mb-3">
          {subtitle}
        </p>
      )}
      <p className="text-2xl sm:text-3xl font-semibold text-[#2dd4bf] mb-1">
        {price}
      </p>
      <p className={`text-sm text-[#999] ${description ? "mb-4" : "mb-6"}`}>{timeline}</p>

      {description && (
        <p className="text-sm text-[#c0bdb8] leading-relaxed mb-6">
          {description}
        </p>
      )}

      {/* The summary bleeds into the card padding so everything below the
          divider line toggles the panel, not just the label. */}
      <details className="group/details mt-auto -mx-8 -mb-8">
        <summary className="block cursor-pointer list-none px-8 pb-8 group-open/details:pb-0 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-2 text-sm font-medium text-[#f0f0eb] border-t border-[#1f1f1f] pt-5">
            What&apos;s included and what drives cost
            <span className="text-[#2dd4bf] transition-transform duration-300 group-open/details:rotate-45 text-lg leading-none">+</span>
          </span>
        </summary>
        <div className="px-8 pb-8 pt-5">
      {/* Included */}
      <p className="text-sm uppercase tracking-widest text-[#999] mb-3">
        What&apos;s included
      </p>
      <ul className="space-y-2 mb-6">
        {included.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm text-[#c0bdb8] leading-relaxed"
          >
            <span className="flex h-[1lh] shrink-0 items-center text-[#2dd4bf]">
              <CheckIcon />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="border-t border-[#1f1f1f] pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Higher */}
          <div>
            <p className="text-sm uppercase tracking-widest text-[#999] mb-3 flex items-center gap-1.5">
              <span className="text-[#f0f0eb]/40">&uarr;</span>
              Drives cost higher
            </p>
            <ul className="space-y-2">
              {costsHigher.map((item) => (
                <li
                  key={item}
                  className="text-sm text-[#c0bdb8] leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Lower */}
          <div>
            <p className="text-sm uppercase tracking-widest text-[#999] mb-3 flex items-center gap-1.5">
              <span className="text-[#f0f0eb]/40">&darr;</span>
              Drives cost lower
            </p>
            <ul className="space-y-2">
              {costsLower.map((item) => (
                <li
                  key={item}
                  className="text-sm text-[#c0bdb8] leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
        </div>
      </details>
    </div>
  );
}
