"use client";

import Link from "next/link";
import { trackCTAClick } from "@/lib/analytics";
import type { ComponentProps } from "react";

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  ctaName: string;
  ctaLocation: string;
}

export default function TrackedLink({
  ctaName,
  ctaLocation,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackCTAClick(ctaName, ctaLocation);
        onClick?.(e);
      }}
    />
  );
}
