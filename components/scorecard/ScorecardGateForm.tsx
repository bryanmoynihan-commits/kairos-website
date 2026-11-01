"use client";

import { useState } from "react";
import ArrowIcon from "@/components/ArrowIcon";
import {
  getUTMParams,
  trackScorecardUnlockSubmit,
  trackScorecardUnlockSuccess,
} from "@/lib/analytics";
import { isPersonalEmail, WORK_EMAIL_MESSAGE } from "@/lib/email";
import type { Answers } from "@/lib/scorecard/scoring";

type FormState = "idle" | "submitting" | "error";

export interface ScorecardContact {
  firstName: string;
  lastName: string;
  company: string;
}

interface FormValues extends ScorecardContact {
  email: string;
}

type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Letters from any language (plus combining accents), spaces, apostrophes, hyphens, periods.
const NAME_RE = /^[\p{L}\p{M}\s'’\-.]+$/u;

function validateName(value: string, label: string): string | undefined {
  if (!value.trim()) return `${label} is required.`;
  if (!NAME_RE.test(value.trim())) return `${label} contains invalid characters.`;
  return undefined;
}

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {};
  const first = validateName(v.firstName, "First name");
  if (first) e.firstName = first;
  const last = validateName(v.lastName, "Last name");
  if (last) e.lastName = last;

  if (!v.email.trim()) {
    e.email = "Work email is required.";
  } else if (!EMAIL_RE.test(v.email.trim())) {
    e.email = "Please enter a valid email address.";
  } else if (isPersonalEmail(v.email)) {
    e.email = WORK_EMAIL_MESSAGE;
  }

  if (!v.company.trim()) {
    e.company = "Company name is required.";
  } else if (v.company.trim().length < 2) {
    e.company = "Please enter your company name.";
  }
  return e;
}

const inputBase =
  "bg-[#111] border text-[#f0f0eb] placeholder:text-[#555] px-4 py-3 text-base focus:outline-none transition-colors w-full";

function fieldBorder(touched: boolean, error?: string) {
  if (!touched) return "border-[#2a2a2a] focus:border-[#555]";
  if (error) return "border-red-500/50 focus:border-red-500/70";
  return "border-[#444] focus:border-[#666]";
}

const FIELDS: {
  name: FieldName;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
}[] = [
  { name: "firstName", label: "First name", type: "text", autoComplete: "given-name", placeholder: "Jane" },
  { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name", placeholder: "Smith" },
  { name: "email", label: "Work email", type: "email", autoComplete: "email", placeholder: "jane@company.com" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization", placeholder: "Acme Corp" },
];

interface Props {
  answers: Answers;
  profile: Record<string, string | undefined>;
  freeText: string;
  level: string;
  onUnlock: (contact: ScorecardContact) => void;
}

export default function ScorecardGateForm({
  answers,
  profile,
  freeText,
  level,
  onUnlock,
}: Props) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });
  const [walkthrough, setWalkthrough] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const errors = validate(values);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honeypot) return;

    setTouched({ firstName: true, lastName: true, email: true, company: true });
    if (Object.keys(errors).length > 0) return;

    setFormState("submitting");
    trackScorecardUnlockSubmit();

    try {
      const utm = getUTMParams();
      const res = await fetch("/api/resources/ai-readiness-scorecard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          answers,
          profile,
          freeText,
          walkthrough,
          honeypot,
          pageUri: window.location.href,
          utmSource: utm.utm_source,
          utmMedium: utm.utm_medium,
          utmCampaign: utm.utm_campaign,
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      trackScorecardUnlockSuccess(level);
      onUnlock({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        company: values.company.trim(),
      });
    } catch {
      setFormState("error");
    }
  }

  return (
    <div className="border border-[#2dd4bf]/30 bg-[#2dd4bf]/[0.04] rounded-sm p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-[#f0f0eb] mb-3">
        Get your full report
      </h2>
      <p className="text-base text-[#c0bdb8] leading-relaxed mb-6">
        Scores and readouts for all six areas, your top fixes, and the
        recommended way to start, plus a PDF you can share with your team.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FIELDS.map((f) => (
            <div key={f.name} className="flex flex-col gap-2">
              <label htmlFor={`scorecard-${f.name}`} className="text-sm text-[#c0bdb8]">
                {f.label} <span className="text-red-500">*</span>
              </label>
              <input
                id={`scorecard-${f.name}`}
                type={f.type}
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                value={values[f.name]}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, [f.name]: true }))}
                className={`${inputBase} ${fieldBorder(!!touched[f.name], errors[f.name])}`}
              />
              {touched[f.name] && errors[f.name] && (
                <p role="alert" className="text-sm text-red-400">{errors[f.name]}</p>
              )}
            </div>
          ))}
        </div>

        <label className="flex items-start gap-3 cursor-pointer text-base text-[#c0bdb8] leading-relaxed">
          <input
            type="checkbox"
            checked={walkthrough}
            onChange={(e) => setWalkthrough(e.target.checked)}
            className="mt-1.5 h-4 w-4 shrink-0 accent-[#2dd4bf] cursor-pointer"
          />
          <span>
            I&apos;d like a 15-minute walkthrough of my results.{" "}
            <span className="text-[#999]">(optional)</span>
          </span>
        </label>

        {formState === "error" && (
          <p role="alert" className="text-sm text-red-400">
            Something went wrong sending your details. Please try again.
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={formState === "submitting"}
            className="group inline-flex items-center gap-2 bg-[#f0f0eb] text-[#0e0d0d] text-sm font-semibold px-8 py-4 rounded-sm hover:bg-white hover:-translate-y-0.5 transition-all duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none"
          >
            {formState === "submitting" ? "Sending..." : "Show my full report"}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </button>
        </div>

        <p className="text-sm text-[#999]">
          Your answers stay with Kairos Performance. We never sell or share them.
        </p>
      </form>
    </div>
  );
}
