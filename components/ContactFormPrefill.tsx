"use client";

import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { AREAS, LEVELS, type LevelId } from "@/lib/scorecard/content";

// Prefills the message when a visitor arrives from their Scorecard result.
// Only known level and area ids are accepted, so the URL can't inject text.
export default function ContactFormPrefill() {
  const params = useSearchParams();
  let message = "";

  if (params.get("from") === "scorecard") {
    const level = LEVELS[params.get("level") as LevelId];
    const weakest = AREAS.find((a) => a.id === params.get("weakest"));
    const score = Number(params.get("score"));

    if (level && weakest && Number.isInteger(score) && score >= 0 && score <= 100) {
      message =
        `I took the AI Readiness Scorecard: ${level.name} (${score}/100). ` +
        `Our weakest area is ${weakest.name}. I'd like to talk about where to start.`;
    }
  }

  return <ContactForm initialMessage={message} />;
}
