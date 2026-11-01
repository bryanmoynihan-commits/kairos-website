import { NextResponse } from "next/server";
import { isPersonalEmail, WORK_EMAIL_MESSAGE } from "@/lib/email";
import {
  AREAS,
  LEVELS,
  PROFILE_QUESTIONS,
  QUESTIONS,
  type ProfileQuestion,
} from "@/lib/scorecard/content";
import { scoreScorecard, type Answers } from "@/lib/scorecard/scoring";

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Letters from any language (plus combining accents), spaces, apostrophes, hyphens, periods.
const NAME_RE = /^[\p{L}\p{M}\s'’\-.]+$/u;
const FREE_TEXT_MAX = 1000;
const CONTENT_SOURCE = "ai_readiness_scorecard";

// HubSpot contact property for each area score. These custom properties (and
// the ones below) must exist on the HubSpot form behind HUBSPOT_SCORECARD_FORM_ID.
const AREA_PROPERTIES: Record<string, string> = {
  dataIntegrity: "scorecard_data_integrity",
  processDocumentation: "scorecard_process_documentation",
  systemsArchitecture: "scorecard_systems_architecture",
  teamAlignment: "scorecard_team_alignment",
  measurementFramework: "scorecard_measurement_framework",
  aiAdoption: "scorecard_ai_adoption",
};

interface ScorecardPayload {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  answers: Answers;
  profile: Partial<Record<ProfileQuestion["id"], string>>;
  freeText?: string;
  walkthrough?: boolean;
  honeypot?: string;
  pageUri?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

const isOptionalString = (v: unknown) => v === undefined || typeof v === "string";

function validatePayload(data: ScorecardPayload): string | null {
  // The body is untrusted JSON: check shapes before calling string methods, so a
  // malformed request gets a 400 instead of crashing the route.
  if (!data || typeof data !== "object" || Array.isArray(data)) return "Invalid request body.";
  for (const key of ["firstName", "lastName", "email", "company"] as const) {
    if (typeof data[key] !== "string") return "Invalid submission.";
  }
  for (const key of ["freeText", "honeypot", "pageUri", "utmSource", "utmMedium", "utmCampaign"] as const) {
    if (!isOptionalString(data[key])) return "Invalid submission.";
  }
  if (data.walkthrough !== undefined && typeof data.walkthrough !== "boolean")
    return "Invalid submission.";
  if (!data.profile || typeof data.profile !== "object" || Array.isArray(data.profile))
    return "Invalid submission.";

  if (data.honeypot) return "Invalid submission.";

  const { firstName, lastName, email, company, answers, profile } = data;

  if (!firstName?.trim() || !NAME_RE.test(firstName.trim()))
    return "Invalid first name.";
  if (!lastName?.trim() || !NAME_RE.test(lastName.trim()))
    return "Invalid last name.";
  if (!email?.trim() || !EMAIL_RE.test(email.trim()))
    return "Invalid email address.";
  if (isPersonalEmail(email))
    return WORK_EMAIL_MESSAGE;
  if (!company?.trim() || company.trim().length < 2)
    return "Invalid company name.";

  if (!answers || typeof answers !== "object") return "Missing answers.";
  for (const q of QUESTIONS) {
    const points = answers[q.id];
    if (!Number.isInteger(points) || points < 0 || points > 3)
      return "Incomplete answers.";
  }

  for (const pq of PROFILE_QUESTIONS) {
    const value = profile?.[pq.id];
    const field = pq.label.toLowerCase().replace(/^your /, "");
    if (!value) {
      if (pq.required) return `Missing ${field}.`;
      continue;
    }
    if (!pq.options.some((o) => o.value === value)) return `Invalid ${field}.`;
  }

  if (data.freeText && data.freeText.length > FREE_TEXT_MAX)
    return "Answer is too long.";

  return null;
}

export async function POST(request: Request) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_SCORECARD_FORM_ID;

  if (!portalId || !formId) {
    console.error("Missing HUBSPOT_PORTAL_ID or HUBSPOT_SCORECARD_FORM_ID env vars");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  let data: ScorecardPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validatePayload(data);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  // Score on the server from the raw answers; never trust client-side scores.
  const result = scoreScorecard(data.answers);
  const profile = data.profile;

  const hubspotPayload = {
    fields: [
      { name: "firstname", value: data.firstName.trim() },
      { name: "lastname", value: data.lastName.trim() },
      { name: "email", value: data.email.trim() },
      { name: "company", value: data.company.trim() },
      { name: "0-2/name", value: data.company.trim() },
      { name: "numemployees", value: profile.companySize ?? "" },
      { name: "content_source", value: CONTENT_SOURCE },
      { name: "scorecard_overall_score", value: String(result.overall) },
      { name: "scorecard_level", value: LEVELS[result.level].name },
      ...AREAS.map((a) => ({
        name: AREA_PROPERTIES[a.id],
        value: String(result.areas[a.id]),
      })),
      { name: "scorecard_role", value: profile.role ?? "" },
      { name: "scorecard_crm", value: profile.crm ?? "" },
      { name: "scorecard_industry", value: profile.industry ?? "" },
      { name: "scorecard_ownership", value: profile.ownership ?? "" },
      { name: "scorecard_biggest_problem", value: data.freeText?.trim() ?? "" },
      { name: "scorecard_walkthrough_requested", value: data.walkthrough === true ? "true" : "false" },
      { name: "utm_source", value: data.utmSource || "" },
      { name: "utm_medium", value: data.utmMedium || "" },
      { name: "utm_campaign", value: data.utmCampaign || "" },
    ],
    context: {
      pageUri:
        data.pageUri || "https://kairosperformance.ai/resources/ai-readiness-scorecard",
      pageName: "AI Readiness Scorecard",
    },
  };

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hubspotPayload),
      }
    );

    if (res.ok) {
      return NextResponse.json({ success: true });
    }

    const errBody = await res.json().catch(() => ({}));
    console.error("HubSpot error:", res.status, JSON.stringify(errBody, null, 2));
    return NextResponse.json({ error: "Submission failed." }, { status: 502 });
  } catch (err) {
    console.error("HubSpot request failed:", err);
    return NextResponse.json({ error: "Submission failed." }, { status: 502 });
  }
}
