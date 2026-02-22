import { NextResponse } from "next/server";

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_RE = /^[a-zA-Z\s'\-.]+$/;
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 1000;

interface ContactPayload {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  company: string;
  companySize: string;
  source: string;
  message: string;
  honeypot?: string;
  pageUri?: string;
}

function validatePayload(data: ContactPayload): string | null {
  if (data.honeypot) return "Invalid submission.";

  const { firstName, lastName, title, email, company, companySize, message } = data;

  if (!firstName?.trim() || firstName.trim().length < 2 || !NAME_RE.test(firstName.trim()))
    return "Invalid first name.";
  if (!lastName?.trim() || lastName.trim().length < 2 || !NAME_RE.test(lastName.trim()))
    return "Invalid last name.";
  if (!title?.trim() || title.trim().length < 2)
    return "Invalid job title.";
  if (!email?.trim() || !EMAIL_RE.test(email.trim()))
    return "Invalid email address.";
  if (!company?.trim() || company.trim().length < 2)
    return "Invalid company name.";
  if (!companySize)
    return "Company size is required.";
  if (!message?.trim() || message.trim().length < MESSAGE_MIN || message.trim().length > MESSAGE_MAX)
    return `Message must be between ${MESSAGE_MIN} and ${MESSAGE_MAX} characters.`;

  return null;
}

export async function POST(request: Request) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID;

  if (!portalId || !formId) {
    console.error("Missing HUBSPOT_PORTAL_ID or HUBSPOT_FORM_ID env vars");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  let data: ContactPayload;
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
      { name: "jobtitle", value: data.title.trim() },
      { name: "0-2/name", value: data.company.trim() },
      { name: "numemployees", value: data.companySize },
      { name: "how_did_you_hear_about_us_", value: data.source || "" },
      { name: "what_are_you_looking_to_solve_", value: data.message.trim() },
    ],
    context: {
      pageUri: data.pageUri || "https://kairosperformance.ai/contact",
      pageName: "Contact",
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
