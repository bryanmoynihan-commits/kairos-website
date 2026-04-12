import { NextResponse } from "next/server";

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_RE = /^[a-zA-Z\s'\-.]+$/;

const CONTENT_SOURCE = "ai_readiness_checklist";

interface ChecklistPayload {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  honeypot?: string;
  pageUri?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

function validatePayload(data: ChecklistPayload): string | null {
  if (data.honeypot) return "Invalid submission.";

  const { firstName, lastName, email, company } = data;

  if (!firstName?.trim() || firstName.trim().length < 2 || !NAME_RE.test(firstName.trim()))
    return "Invalid first name.";
  if (!lastName?.trim() || lastName.trim().length < 2 || !NAME_RE.test(lastName.trim()))
    return "Invalid last name.";
  if (!email?.trim() || !EMAIL_RE.test(email.trim()))
    return "Invalid email address.";
  if (!company?.trim() || company.trim().length < 2)
    return "Invalid company name.";

  return null;
}

export async function POST(request: Request) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_CHECKLIST_FORM_ID;

  if (!portalId || !formId) {
    console.error("Missing HUBSPOT_PORTAL_ID or HUBSPOT_CHECKLIST_FORM_ID env vars");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  let data: ChecklistPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validatePayload(data);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const hubspotPayload = {
    fields: [
      { name: "firstname", value: data.firstName.trim() },
      { name: "lastname", value: data.lastName.trim() },
      { name: "email", value: data.email.trim() },
      { name: "company", value: data.company.trim() },
      { name: "0-2/name", value: data.company.trim() },
      { name: "content_source", value: CONTENT_SOURCE },
      { name: "utm_source", value: data.utmSource || "" },
      { name: "utm_medium", value: data.utmMedium || "" },
      { name: "utm_campaign", value: data.utmCampaign || "" },
    ],
    context: {
      pageUri: data.pageUri || "https://kairosperformance.ai/resources/ai-readiness-checklist",
      pageName: "AI Readiness Checklist",
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
