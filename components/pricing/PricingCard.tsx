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
    <div className="flex flex-col h-full p-8 border border-[#1f1f1f] border-t-2 border-t-[#2dd4bf] rounded-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#333] hover:border-t-[#2dd4bf] hover:bg-[#111111]/40 hover:shadow-[0_0_30px_rgba(240,237,232,0.04)]">
      <h3 className={`text-lg font-semibold text-[#f0ede8] ${subtitle || description ? "mb-2" : "mb-3"}`}>
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm italic text-[#c0bdb8]/70 leading-relaxed mb-3">
          {subtitle}
        </p>
      )}
      <p className="text-2xl sm:text-3xl font-semibold text-[#2dd4bf] mb-1">
        {price}
      </p>
      <p className={`text-sm text-[#999] ${description ? "mb-4" : "mb-6"}`}>{timeline}</p>

      {description && (
        <p className="text-sm text-[#c0bdb8]/70 leading-relaxed mb-6">
          {description}
        </p>
      )}

      {/* Included */}
      <p className="text-xs uppercase tracking-widest text-[#999] mb-3">
        What&apos;s included
      </p>
      <ul className="space-y-2 mb-6">
        {included.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm text-[#c0bdb8] leading-relaxed"
          >
            <span className="text-[#2dd4bf]">
              <CheckIcon />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="border-t border-[#1f1f1f] pt-6 mt-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Higher */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#999] mb-3 flex items-center gap-1.5">
              <span className="text-[#f0ede8]/40">&uarr;</span>
              Drives cost higher
            </p>
            <ul className="space-y-2">
              {costsHigher.map((item) => (
                <li
                  key={item}
                  className="text-sm text-[#c0bdb8]/70 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Lower */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#999] mb-3 flex items-center gap-1.5">
              <span className="text-[#f0ede8]/40">&darr;</span>
              Drives cost lower
            </p>
            <ul className="space-y-2">
              {costsLower.map((item) => (
                <li
                  key={item}
                  className="text-sm text-[#c0bdb8]/70 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
