"use client";

import { useState, useCallback } from "react";
import ArrowIcon from "@/components/ArrowIcon";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormValues {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  company: string;
  companySize: string;
  source: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  title?: string;
  email?: string;
  company?: string;
  companySize?: string;
  message?: string;
}

const INITIAL_VALUES: FormValues = {
  firstName: "",
  lastName: "",
  title: "",
  email: "",
  company: "",
  companySize: "",
  source: "",
  message: "",
  honeypot: "",
};

const COMPANY_SIZES = [
  { label: "1–5 employees",     value: "1-5" },
  { label: "5–25 employees",    value: "5-25" },
  { label: "25–50 employees",   value: "25-50" },
  { label: "50–100 employees",  value: "50-100" },
  { label: "100–500 employees", value: "100-500" },
  { label: "500–1,000 employees", value: "500-1000" },
  { label: "1,000+ employees",  value: "1000+" },
];

const SOURCES = [
  { label: "LinkedIn",           value: "LinkedIn" },
  { label: "Referral",           value: "Referral" },
  { label: "Google",             value: "Google" },
  { label: "Podcast",            value: "Podcast" },
  { label: "Conference / Event", value: "Conference / Event" },
  { label: "Other",              value: "Other" },
];

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_RE = /^[a-zA-Z\s'\-.]+$/;
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 1000;

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

  if (!v.title.trim()) {
    e.title = "Job title is required.";
  } else if (v.title.trim().length < 2) {
    e.title = "Please enter your job title.";
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

  if (!v.companySize) {
    e.companySize = "Please select your company size.";
  }

  if (!v.message.trim()) {
    e.message = "Please tell us what you're looking to solve.";
  } else if (v.message.trim().length < MESSAGE_MIN) {
    e.message = `Please provide a bit more detail (${MESSAGE_MIN} characters minimum).`;
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

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        title: values.title,
        email: values.email,
        company: values.company,
        companySize: values.companySize,
        source: values.source,
        message: values.message,
        honeypot: values.honeypot,
        pageUri: typeof window !== "undefined" ? window.location.href : undefined,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormState("success");
        setValues(INITIAL_VALUES);
        setTouched({});
        setErrors({});
      } else {
        console.error("Contact submission error:", res.status);
        setFormState("error");
      }
    } catch (err) {
      console.error("Contact submission exception:", err);
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div role="status" className="border border-[#2a2a2a] bg-[#111] p-10 text-center">
        <p className="text-[#f0ede8] text-lg font-medium mb-2">Message received.</p>
        <p className="text-[#999] text-sm">
          We&apos;ll be in touch within one business day to schedule a discovery call.
        </p>
      </div>
    );
  }

  const msgLen = values.message.length;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot — hidden from real users */}
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

      {/* Row 1: First Name + Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className="text-xs uppercase tracking-widest text-[#999]">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
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
          <label htmlFor="lastName" className="text-xs uppercase tracking-widest text-[#999]">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
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

      {/* Row 2: Job Title + Work Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-xs uppercase tracking-widest text-[#999]">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            autoComplete="organization-title"
            placeholder="VP of Revenue"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${fieldBorder(!!touched.title, errors.title)}`}
          />
          {touched.title && errors.title && (
            <p role="alert" className="text-xs text-red-500 mt-0.5">{errors.title}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#999]">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
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
      </div>

      {/* Row 3: Company + Company Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className="text-xs uppercase tracking-widest text-[#999]">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            id="company"
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

        <div className="flex flex-col gap-1.5">
          <label htmlFor="companySize" className="text-xs uppercase tracking-widest text-[#999]">
            Company Size <span className="text-red-500">*</span>
          </label>
          <select
            id="companySize"
            name="companySize"
            required
            value={values.companySize}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${fieldBorder(!!touched.companySize, errors.companySize)} appearance-none cursor-pointer`}
          >
            <option value="" disabled>Select size</option>
            {COMPANY_SIZES.map((s) => (
              <option key={s.value} value={s.value} className="bg-[#111]">{s.label}</option>
            ))}
          </select>
          {touched.companySize && errors.companySize && (
            <p role="alert" className="text-xs text-red-500 mt-0.5">{errors.companySize}</p>
          )}
        </div>
      </div>

      {/* Row 4: How did you hear (half width) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="source" className="text-xs uppercase tracking-widest text-[#999]">
            How did you hear about us?
          </label>
          <select
            id="source"
            name="source"
            value={values.source}
            onChange={handleChange}
            className={`${inputBase} border-[#2a2a2a] focus:border-[#555] appearance-none cursor-pointer`}
          >
            <option value="" className="bg-[#111]">Select an option</option>
            {SOURCES.map((s) => (
              <option key={s.value} value={s.value} className="bg-[#111]">{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#999]">
            What are you looking to solve? <span className="text-red-500">*</span>
          </label>
          <span className={`text-xs tabular-nums ${msgLen > MESSAGE_MAX ? "text-red-500" : "text-[#555]"}`}>
            {msgLen}/{MESSAGE_MAX}
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={MESSAGE_MAX}
          placeholder="Describe where your business is today, what's creating friction, and what you're hoping to achieve..."
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${inputBase} ${fieldBorder(!!touched.message, errors.message)} resize-none`}
        />
        {touched.message && errors.message && (
          <p role="alert" className="text-xs text-red-500 mt-0.5">{errors.message}</p>
        )}
      </div>

      <p className="text-xs text-[#555]">
        <span className="text-red-500">*</span> Required fields
      </p>

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
        {formState === "submitting" ? "Sending..." : "Send Message"}
        {formState !== "submitting" && (
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        )}
      </button>
    </form>
  );
}
