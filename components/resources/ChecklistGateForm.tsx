"use client";

import { useState, useCallback } from "react";
import ArrowIcon from "@/components/ArrowIcon";
import {
  getUTMParams,
  trackGatedArticleUnlockSubmit,
  trackGatedArticleUnlockSuccess,
} from "@/lib/analytics";

type FormState = "idle" | "submitting" | "error";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  honeypot: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
}

const INITIAL_VALUES: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  honeypot: "",
};

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_RE = /^[a-zA-Z\s'\-.]+$/;

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {};

  if (!v.firstName.trim()) {
    e.firstName = "First name is required.";
  } else if (v.firstName.trim().length < 2) {
    e.firstName = "Please enter your first name.";
  } else if (!NAME_RE.test(v.firstName.trim())) {
    e.firstName = "First name contains invalid characters.";
  }

  if (!v.lastName.trim()) {
    e.lastName = "Last name is required.";
  } else if (v.lastName.trim().length < 2) {
    e.lastName = "Please enter your last name.";
  } else if (!NAME_RE.test(v.lastName.trim())) {
    e.lastName = "Last name contains invalid characters.";
  }

  if (!v.email.trim()) {
    e.email = "Work email is required.";
  } else if (!EMAIL_RE.test(v.email.trim())) {
    e.email = "Please enter a valid email address.";
  }

  if (!v.company.trim()) {
    e.company = "Company name is required.";
  } else if (v.company.trim().length < 2) {
    e.company = "Please enter your company name.";
  }

  return e;
}

const inputBase =
  "bg-[#111] border text-[#f0ede8] placeholder:text-[#555] px-4 py-3 text-sm focus:outline-none transition-colors w-full";

function fieldBorder(touched: boolean, error?: string) {
  if (!touched) return "border-[#2a2a2a] focus:border-[#555]";
  if (error) return "border-red-500/50 focus:border-red-500/70";
  return "border-[#444] focus:border-[#666]";
}

interface Props {
  slug: string;
  headline: string;
  subhead: string;
  onUnlock: () => void;
}

export default function ChecklistGateForm({ slug, headline, subhead, onUnlock }: Props) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      if (touched[name as keyof FormValues]) {
        setErrors((prev) => ({
          ...prev,
          ...validate({ ...values, [name]: value }),
        }));
      }
    },
    [values, touched]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors(validate(values));
    },
    [values]
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (values.honeypot) return;

    const allTouched = Object.fromEntries(
      Object.keys(INITIAL_VALUES).map((k) => [k, true])
    ) as Partial<Record<keyof FormValues, boolean>>;
    setTouched(allTouched);

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setFormState("submitting");
    trackGatedArticleUnlockSubmit(slug);

    try {
      const utmParams = getUTMParams();
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        company: values.company,
        honeypot: values.honeypot,
        pageUri: typeof window !== "undefined" ? window.location.href : undefined,
        utmSource: utmParams.utm_source || "",
        utmMedium: utmParams.utm_medium || "",
        utmCampaign: utmParams.utm_campaign || "",
      };

      const res = await fetch("/api/resources/ai-readiness-checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        trackGatedArticleUnlockSuccess(slug);
        onUnlock();
      } else {
        console.error("Checklist submission error:", res.status);
        setFormState("error");
      }
    } catch (err) {
      console.error("Checklist submission exception:", err);
      setFormState("error");
    }
  }

  return (
    <div className="border border-[#2a2a2a] bg-[#111] p-8 sm:p-10">
      <p className="text-xs uppercase tracking-widest text-[#2dd4bf] mb-3">
        Continue reading
      </p>
      <h3 className="text-2xl sm:text-3xl font-semibold text-[#f0ede8] leading-tight mb-3">
        {headline}
      </h3>
      <p className="text-sm text-[#c0bdb8] mb-8 leading-relaxed">{subhead}</p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* Honeypot */}
        <input
          type="text"
          name="honeypot"
          value={values.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          aria-hidden="true"
          className="hidden"
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="gate-firstName" className="text-xs uppercase tracking-widest text-[#999]">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="gate-firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              placeholder="Jane"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${fieldBorder(!!touched.firstName, errors.firstName)}`}
            />
            {touched.firstName && errors.firstName && (
              <p role="alert" className="text-xs text-red-500 mt-0.5">{errors.firstName}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="gate-lastName" className="text-xs uppercase tracking-widest text-[#999]">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="gate-lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              placeholder="Smith"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${fieldBorder(!!touched.lastName, errors.lastName)}`}
            />
            {touched.lastName && errors.lastName && (
              <p role="alert" className="text-xs text-red-500 mt-0.5">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="gate-email" className="text-xs uppercase tracking-widest text-[#999]">
              Work Email <span className="text-red-500">*</span>
            </label>
            <input
              id="gate-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="jane@company.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${fieldBorder(!!touched.email, errors.email)}`}
            />
            {touched.email && errors.email && (
              <p role="alert" className="text-xs text-red-500 mt-0.5">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="gate-company" className="text-xs uppercase tracking-widest text-[#999]">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              id="gate-company"
              name="company"
              type="text"
              required
              autoComplete="organization"
              placeholder="Acme Corp"
              value={values.company}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${fieldBorder(!!touched.company, errors.company)}`}
            />
            {touched.company && errors.company && (
              <p role="alert" className="text-xs text-red-500 mt-0.5">{errors.company}</p>
            )}
          </div>
        </div>

        {formState === "error" && (
          <p role="alert" className="text-sm text-red-500">
            Something went wrong. Please try again or reach out directly.
          </p>
        )}

        <button
          type="submit"
          disabled={formState === "submitting"}
          className="group self-start inline-flex items-center gap-2 bg-[#f0ede8] text-[#0a0a0a] text-sm font-semibold px-8 py-3.5 rounded-sm shadow-[0_1px_3px_rgba(240,237,232,0.08)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(240,237,232,0.15)] active:translate-y-0 active:shadow-[0_1px_3px_rgba(240,237,232,0.08)] transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_1px_3px_rgba(240,237,232,0.08)]"
        >
          {formState === "submitting" ? "Unlocking..." : "Unlock the Checklist"}
          {formState !== "submitting" && (
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          )}
        </button>

        <p className="text-xs text-[#555]">
          <span className="text-red-500">*</span> Required fields. No spam — unsubscribe any time.
        </p>
      </form>
    </div>
  );
}
