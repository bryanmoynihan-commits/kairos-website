"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ArrowIcon from "@/components/ArrowIcon";
import TrackedLink from "@/components/TrackedLink";
import {
  AREAS,
  FREE_TEXT_PROMPT,
  LEVELS,
  NO_FIXES_MESSAGE,
  PROFILE_QUESTIONS,
  QUESTIONS,
  type ProfileQuestion,
} from "@/lib/scorecard/content";
import { bandFor, scoreScorecard, type Answers } from "@/lib/scorecard/scoring";
import {
  trackCTAClick,
  trackScorecardComplete,
  trackScorecardStart,
} from "@/lib/analytics";
import ScorecardGateForm, { type ScorecardContact } from "./ScorecardGateForm";

type Step = "intro" | "questions" | "profile" | "result";
type Profile = Partial<Record<ProfileQuestion["id"], string>>;

interface SavedState {
  step: Step;
  index: number;
  answers: Answers;
  profile: Profile;
  freeText: string;
  unlocked: boolean;
  contact?: ScorecardContact;
}

const STORAGE_KEY = "kairos_scorecard_v1";
// Long enough to see the check mark land before the question slides away.
const ADVANCE_DELAY_MS = 380;
const easing: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// Progress is per-viewer convenience only; every access is guarded because
// storage can be blocked (private mode, disabled site data).
function loadSaved(): SavedState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedState) : null;
  } catch {
    return null;
  }
}

function save(state: SavedState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore: progress just won't persist.
  }
}

function clearSaved() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}

const primaryButton =
  "group inline-flex items-center gap-2 bg-[#f0f0eb] text-[#0e0d0d] text-sm font-semibold px-8 py-4 rounded-sm shadow-[0_1px_3px_rgba(240,237,232,0.08)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(240,237,232,0.15)] active:translate-y-0 transition-all duration-300 ease-out disabled:opacity-40 disabled:pointer-events-none";

const textLink =
  "text-sm font-medium text-[#c0bdb8] hover:text-[#f0f0eb] underline underline-offset-[6px] decoration-[#2a2a2a] hover:decoration-[#555] transition-colors duration-300";

const selectBase =
  "bg-[#111] border border-[#2a2a2a] focus:border-[#555] px-4 py-3 text-base focus:outline-none transition-colors w-full appearance-none cursor-pointer";

const areaName = (id: string) => AREAS.find((a) => a.id === id)?.name ?? id;

export default function Scorecard() {
  const [step, setStep] = useState<Step>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [profile, setProfile] = useState<Profile>({});
  const [freeText, setFreeText] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [contact, setContact] = useState<ScorecardContact | null>(null);
  const [pdfState, setPdfState] = useState<"idle" | "working" | "error">("idle");
  const [profileError, setProfileError] = useState("");
  const [advancing, setAdvancing] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const reduceMotion = useReducedMotion();

  function persist(next: Partial<SavedState>) {
    save({ step, index, answers, profile, freeText, unlocked, contact: contact ?? undefined, ...next });
  }

  function start() {
    const saved = loadSaved();
    if (saved && saved.step !== "intro") {
      setAnswers(saved.answers ?? {});
      setProfile(saved.profile ?? {});
      setFreeText(saved.freeText ?? "");
      setUnlocked(!!saved.unlocked);
      setContact(saved.contact ?? null);
      setIndex(Math.min(saved.index ?? 0, QUESTIONS.length - 1));
      setStep(saved.step);
      return;
    }
    trackScorecardStart();
    setStep("questions");
    persist({ step: "questions" });
  }

  function choose(points: number) {
    if (advancing) return;
    const q = QUESTIONS[index];
    const nextAnswers = { ...answers, [q.id]: points };
    setAnswers(nextAnswers);
    setAdvancing(true);

    // Brief pause so the selection registers before the next question.
    window.setTimeout(() => {
      setAdvancing(false);
      setDirection(1);
      if (index < QUESTIONS.length - 1) {
        setIndex(index + 1);
        persist({ answers: nextAnswers, index: index + 1, step: "questions" });
      } else {
        setStep("profile");
        persist({ answers: nextAnswers, step: "profile" });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, ADVANCE_DELAY_MS);
  }

  function back() {
    if (step === "profile") {
      setStep("questions");
      setIndex(QUESTIONS.length - 1);
      return;
    }
    if (index > 0) {
      setDirection(-1);
      setIndex(index - 1);
    }
  }

  function submitProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const missing = PROFILE_QUESTIONS.find((pq) => pq.required && !profile[pq.id]);
    if (missing) {
      setProfileError(
        `Please select your ${missing.label.toLowerCase().replace(/^your /, "")}.`
      );
      return;
    }
    setProfileError("");
    const result = scoreScorecard(answers);
    trackScorecardComplete(LEVELS[result.level].name, result.overall);
    setStep("result");
    persist({ step: "result" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function retake() {
    clearSaved();
    setAnswers({});
    setProfile({});
    setFreeText("");
    setUnlocked(false);
    setContact(null);
    setIndex(0);
    setStep("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleUnlock(details: ScorecardContact) {
    setUnlocked(true);
    setContact(details);
    persist({ unlocked: true, contact: details });
  }

  // Built on click, in the browser, from the answers already on screen. The PDF
  // library loads only now, so it adds nothing to the page's initial download.
  async function downloadPdf() {
    setPdfState("working");
    try {
      const [{ pdf }, pdfModule] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./ScorecardPdf"),
      ]);
      const origin = window.location.origin;
      pdfModule.registerPdfFonts(origin);
      const ScorecardPdf = pdfModule.default;
      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const blob = await pdf(
        <ScorecardPdf
          result={scoreScorecard(answers)}
          answers={answers}
          firstName={contact?.firstName ?? ""}
          lastName={contact?.lastName ?? ""}
          company={contact?.company ?? ""}
          origin={origin}
          date={date}
        />
      ).toBlob();

      const slug = (contact?.company ?? "results")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Kairos-AI-Readiness-Scorecard-${slug || "results"}.pdf`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      trackCTAClick("Download PDF report", "scorecard_result");
      setPdfState("idle");
    } catch {
      setPdfState("error");
    }
  }

  // --- Intro ---------------------------------------------------------------
  if (step === "intro") {
    return (
      <div>
        <p className="text-sm uppercase tracking-widest text-[#2dd4bf] mb-4">
          AI Readiness Scorecard
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-[#f0f0eb] leading-[1.1] tracking-tight mb-6">
          How ready is your revenue foundation for AI?
        </h1>
        <p className="text-[#c0bdb8] text-lg leading-relaxed mb-4">
          18 questions across the six areas that decide whether AI pays off or
          scales the mess. About 5 minutes. Honest answers get you a useful
          score.
        </p>
        <p className="text-[#999] text-base leading-relaxed mb-10">
          Not sure about an answer? Pick the closest one. Not knowing is usually
          a finding in itself.
        </p>
        <button type="button" onClick={start} className={primaryButton}>
          Start the Scorecard
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </button>

        <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AREAS.map((area, i) => (
            <li
              key={area.id}
              className="flex items-center gap-3 h-14 border border-[#1f1f1f] rounded-sm px-4 text-base text-[#c0bdb8] whitespace-nowrap"
            >
              <span className="font-mono text-sm text-[#2dd4bf]">0{i + 1}</span>
              {area.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // --- Questions -----------------------------------------------------------
  if (step === "questions") {
    const q = QUESTIONS[index];
    const areaIndex = AREAS.findIndex((a) => a.id === q.area);
    const answeredCount = Object.keys(answers).length;
    const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

    return (
      <div>
        <div className="mb-10">
          <div className="flex items-baseline justify-between gap-4 mb-3 text-sm">
            <span className="text-[#c0bdb8]">
              Area {areaIndex + 1} of {AREAS.length}:{" "}
              <span className="text-[#f0f0eb] font-medium">{areaName(q.area)}</span>
            </span>
            <motion.span
              key={index}
              className="tabular-nums shrink-0"
              initial={{ color: "#2dd4bf" }}
              animate={{ color: "#999999" }}
              transition={{ duration: 0.9, ease: easing }}
            >
              {index + 1} / {QUESTIONS.length}
            </motion.span>
          </div>
          <div
            className="h-1.5 w-full bg-[#1f1f1f] rounded-full overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={QUESTIONS.length}
            aria-valuenow={answeredCount}
            aria-label="Scorecard progress"
          >
            <div
              className="h-full bg-[#2dd4bf] transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.fieldset
          key={q.id}
          custom={direction}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: reduceMotion ? 0 : 32 * d }),
            center: { opacity: 1, x: 0 },
            exit: (d: number) => ({ opacity: 0, x: reduceMotion ? 0 : -32 * d }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: easing }}
        >
          <legend className="text-2xl sm:text-3xl font-semibold text-[#f0f0eb] leading-snug mb-8 text-balance">
            {q.prompt}
          </legend>
          <div className="flex flex-col gap-3">
            {q.options.map((option, points) => {
              const selected = answers[q.id] === points;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => choose(points)}
                  aria-pressed={selected}
                  className={`flex items-center justify-between gap-4 text-left w-full px-5 py-4 rounded-sm border text-base leading-relaxed transition-all duration-200 ${
                    selected
                      ? "border-[#2dd4bf] bg-[#2dd4bf]/10 text-[#f0f0eb]"
                      : "border-[#2a2a2a] text-[#c0bdb8] hover:border-[#555] hover:bg-[#2d2a2b]/40 hover:text-[#f0f0eb]"
                  }`}
                >
                  <span>{option}</span>
                  <span
                    aria-hidden="true"
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                      selected
                        ? "bg-[#2dd4bf] text-[#0e0d0d] scale-100 opacity-100"
                        : "scale-50 opacity-0"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6.5l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.fieldset>
        </AnimatePresence>

        <div className="mt-8 h-10">
          {index > 0 && (
            <button type="button" onClick={back} className={textLink}>
              Back
            </button>
          )}
        </div>
      </div>
    );
  }

  // --- Profile -------------------------------------------------------------
  if (step === "profile") {
    return (
      <form onSubmit={submitProfile} noValidate>
        <p className="text-sm uppercase tracking-widest text-[#2dd4bf] mb-4">
          Last step
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#f0f0eb] leading-snug mb-8">
          A few details so your result reflects companies like yours.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {PROFILE_QUESTIONS.map((pq) => (
            <div key={pq.id} className="flex flex-col gap-2">
              <label htmlFor={`profile-${pq.id}`} className="text-sm text-[#c0bdb8]">
                {pq.label}
                {pq.required ? (
                  <span className="text-red-500"> *</span>
                ) : (
                  <span className="text-[#999]"> (optional)</span>
                )}
              </label>
              <select
                id={`profile-${pq.id}`}
                value={profile[pq.id] ?? ""}
                onChange={(e) => setProfile({ ...profile, [pq.id]: e.target.value })}
                className={`${selectBase} ${profile[pq.id] ? "text-[#f0f0eb]" : "text-[#999]"}`}
              >
                <option value="" disabled={pq.required} className="bg-[#111]">
                  Select one
                </option>
                {pq.options.map((o) => (
                  <option key={o.value} value={o.value} className="bg-[#111] text-[#f0f0eb]">
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <label htmlFor="profile-free-text" className="text-sm text-[#c0bdb8]">
            {FREE_TEXT_PROMPT} <span className="text-[#999]">(optional)</span>
          </label>
          <textarea
            id="profile-free-text"
            rows={3}
            maxLength={1000}
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            className="bg-[#111] border border-[#2a2a2a] focus:border-[#555] text-[#f0f0eb] px-4 py-3 text-base focus:outline-none transition-colors w-full resize-none"
          />
        </div>

        {profileError && (
          <p role="alert" className="text-sm text-red-400 mb-4">
            {profileError}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-6">
          <button type="submit" className={primaryButton}>
            See my score
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </button>
          <button type="button" onClick={back} className={textLink}>
            Back
          </button>
        </div>
      </form>
    );
  }

  // --- Result --------------------------------------------------------------
  const result = scoreScorecard(answers);
  const level = LEVELS[result.level];
  const weakestArea = AREAS.reduce((low, a) =>
    result.areas[a.id] < result.areas[low.id] ? a : low
  );
  const fixQuestions = result.fixes
    .map((id) => QUESTIONS.find((q) => q.id === id))
    .filter((q): q is (typeof QUESTIONS)[number] => !!q);
  const contactHref = `/contact?from=scorecard&level=${result.level}&score=${result.overall}&weakest=${weakestArea.id}`;

  return (
    <div>
      {/* Free headline result */}
      <p className="text-sm uppercase tracking-widest text-[#2dd4bf] mb-4">
        Your AI Readiness Score
      </p>
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-6xl sm:text-7xl font-semibold text-[#f0f0eb] tabular-nums leading-none">
          {result.overall}
        </span>
        <span className="text-xl text-[#999]">/ 100</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-semibold text-[#2dd4bf] leading-snug mb-4">
        {level.name}
      </h1>
      <p className="text-[#c0bdb8] text-lg leading-relaxed mb-4">{level.headline}</p>
      {result.cap && (
        <p className="text-[#c0bdb8] text-base leading-relaxed border-l-2 border-[#2dd4bf] pl-4 mb-4">
          Your overall score is {result.overall}, but your{" "}
          {areaName(result.cap.area)} score of {result.cap.score} holds your
          level back. Everything else you build sits on top of it.
        </p>
      )}

      {!unlocked ? (
        <div className="mt-12">
          <ScorecardGateForm
            answers={answers}
            profile={profile}
            freeText={freeText}
            level={level.name}
            onUnlock={handleUnlock}
          />
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={downloadPdf}
              disabled={pdfState === "working"}
              className="group inline-flex items-center justify-center gap-2 border border-[#2dd4bf] text-[#f0f0eb] text-sm font-semibold px-6 py-3 rounded-sm hover:bg-[#2dd4bf]/10 transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {pdfState === "working" ? "Preparing PDF..." : "Download PDF report"}
            </button>
            <span className="text-sm text-[#999]">
              {pdfState === "error"
                ? "The PDF didn't generate. Please try again."
                : "A one-page summary to share with your team."}
            </span>
          </div>
          {/* Area scores */}
          <section>
            <h2 className="text-2xl font-semibold text-[#f0f0eb] mb-6">
              Your six areas
            </h2>
            <ul className="space-y-6">
              {AREAS.map((area) => {
                const score = result.areas[area.id];
                return (
                  <li key={area.id}>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <span className="text-base font-medium text-[#f0f0eb]">
                        {area.name}
                      </span>
                      <span className="text-base text-[#c0bdb8] tabular-nums shrink-0">
                        {score}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1f1f1f] rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-[#2dd4bf]"
                        style={{ width: `${Math.max(score, 2)}%` }}
                      />
                    </div>
                    <p className="text-base text-[#c0bdb8] leading-relaxed">
                      {area.readouts[bandFor(score)]}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Top fixes */}
          <section>
            <h2 className="text-2xl font-semibold text-[#f0f0eb] mb-6">
              {fixQuestions.length > 0 ? "Fix these first" : "Your next step"}
            </h2>
            {fixQuestions.length > 0 ? (
              <ol className="space-y-4">
                {fixQuestions.map((q, i) => (
                  <li key={q.id} className="flex gap-4">
                    <span className="font-mono text-sm text-[#2dd4bf] shrink-0 leading-relaxed pt-0.5">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-sm uppercase tracking-widest text-[#999] mb-1">
                        {areaName(q.area)}
                      </p>
                      <p className="text-base text-[#f0f0eb] leading-relaxed">{q.fix}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-base text-[#c0bdb8] leading-relaxed">{NO_FIXES_MESSAGE}</p>
            )}
          </section>

          {/* Recommended way in */}
          <section className="border border-[#2dd4bf]/30 bg-[#2dd4bf]/[0.04] rounded-sm p-8">
            <p className="text-sm uppercase tracking-widest text-[#2dd4bf] mb-3">
              Recommended way in
            </p>
            <p className="text-lg text-[#f0f0eb] leading-relaxed mb-8">{level.wayIn}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
              <TrackedLink
                href={contactHref}
                ctaName="Book an Intro Call"
                ctaLocation="scorecard_result"
                className={primaryButton}
              >
                Book an Intro Call
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </TrackedLink>
              <TrackedLink
                href="/pricing"
                ctaName="See pricing"
                ctaLocation="scorecard_result"
                className={textLink}
              >
                See pricing
              </TrackedLink>
            </div>
          </section>
        </div>
      )}

      <div className="mt-12">
        <button type="button" onClick={retake} className={textLink}>
          Retake the Scorecard
        </button>
      </div>
    </div>
  );
}
