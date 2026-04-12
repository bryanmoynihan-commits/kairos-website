"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChecklistGateForm from "./ChecklistGateForm";
import { trackGatedArticleView } from "@/lib/analytics";

const STORAGE_KEY = "kairos_checklist_unlocked";

interface Props {
  slug: string;
  gatedMarkdown: string;
  formHeadline: string;
  formSubhead: string;
}

const markdownComponents = {
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
};

export default function ChecklistGate({
  slug,
  gatedMarkdown,
  formHeadline,
  formSubhead,
}: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const viewFiredRef = useRef(false);

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      // localStorage can throw in private mode — leave as locked
    }
    setHydrated(true);

    if (!viewFiredRef.current) {
      trackGatedArticleView(slug);
      viewFiredRef.current = true;
    }
  }, [slug]);

  function handleUnlock() {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // best-effort; still reveal content in-session
    }
    setUnlocked(true);
  }

  // Skeleton during hydration so layout doesn't shift
  if (!hydrated) {
    return (
      <div
        aria-hidden="true"
        className="border border-[#2a2a2a] bg-[#111] p-8 sm:p-10 min-h-[460px]"
      />
    );
  }

  if (unlocked) {
    return (
      <div className="prose-kairos max-w-prose">
        <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {gatedMarkdown}
        </Markdown>
      </div>
    );
  }

  // Locked: form card + blurred preview below
  const previewText = gatedMarkdown.slice(0, 800);

  return (
    <div className="max-w-prose">
      <ChecklistGateForm
        slug={slug}
        headline={formHeadline}
        subhead={formSubhead}
        onUnlock={handleUnlock}
      />

      <div
        aria-hidden="true"
        className="relative mt-10 pointer-events-none select-none"
      >
        <div className="prose-kairos blur-md opacity-40 max-h-80 overflow-hidden">
          <Markdown remarkPlugins={[remarkGfm]}>{previewText}</Markdown>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
      </div>
    </div>
  );
}
