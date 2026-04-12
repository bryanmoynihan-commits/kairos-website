// Centralized analytics event tracking
// All GA4 custom events are defined here — no scattered gtag() calls

type GtagCommand = "event" | "set" | "config";

function gtag(command: GtagCommand, ...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(command, ...args);
  }
}

// --- CTA Click Tracking ---
export function trackCTAClick(ctaName: string, ctaLocation: string) {
  gtag("event", "cta_click", {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
}

// --- Contact Form Submission ---
export function trackFormSubmission(data: {
  companySize: string;
  source: string;
}) {
  gtag("event", "contact_form_submit", {
    company_size: data.companySize,
    lead_source: data.source,
  });
}

// --- Scroll Depth ---
export function trackScrollDepth(page: string, depth: number) {
  gtag("event", "scroll_depth", {
    page_path: page,
    depth_percent: depth,
  });
}

// --- Blog Article Engagement ---
export function trackArticleView(
  slug: string,
  category: string,
  readingTime: number,
) {
  gtag("event", "article_view", {
    article_slug: slug,
    article_category: category,
    reading_time: readingTime,
  });
}

// --- Gated Article (Lead Magnet) ---
export function trackGatedArticleView(slug: string) {
  gtag("event", "gated_article_view", {
    article_slug: slug,
  });
}

export function trackGatedArticleUnlockSubmit(slug: string) {
  gtag("event", "gated_article_unlock_submit", {
    article_slug: slug,
  });
}

export function trackGatedArticleUnlockSuccess(slug: string) {
  gtag("event", "gated_article_unlock_success", {
    article_slug: slug,
  });
}

// --- UTM Parameter Helpers ---
const UTM_STORAGE_KEY = "kairos_utm";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export function captureUTMParams() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const utmData: Record<string, string> = {};

  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) utmData[key] = val;
  }

  if (Object.keys(utmData).length > 0) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
    gtag("set", "user_properties", utmData);
  }
}

export function getUTMParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
