// AI Readiness Scorecard content. Source of truth: the Google Doc
// "AI Readiness Scorecard - Content (Final)". Change copy there first, then here.

export type AreaId =
  | "dataIntegrity"
  | "processDocumentation"
  | "systemsArchitecture"
  | "teamAlignment"
  | "measurementFramework"
  | "aiAdoption";

export type Band = "low" | "mid" | "high";

export type LevelId = "foundation" | "targeted" | "scale";

export interface Question {
  id: string;
  area: AreaId;
  prompt: string;
  /** Worst to best; worth 0, 1, 2, 3 points in order. */
  options: [string, string, string, string];
  fix: string;
}

export interface Area {
  id: AreaId;
  name: string;
  /** Data Integrity and Systems Architecture cap the overall level. */
  foundation: boolean;
  readouts: Record<Band, string>;
}

export const AREAS: Area[] = [
  {
    id: "dataIntegrity",
    name: "Data Integrity",
    foundation: true,
    readouts: {
      low: "Your data can't be trusted without manual checks, so AI would scale every error in it.",
      mid: "Your data mostly holds up, but it depends on people catching problems by hand.",
      high: "Your data is owned and governed, which makes it a real asset for AI.",
    },
  },
  {
    id: "processDocumentation",
    name: "Process Documentation",
    foundation: false,
    readouts: {
      low: "Your processes live in people's heads, and you can't automate what isn't written down.",
      mid: "Your core processes are written down, but gaps and drift will limit what you can automate.",
      high: "Your processes are documented and current, ready to become automations and AI assistants.",
    },
  },
  {
    id: "systemsArchitecture",
    name: "Systems Architecture",
    foundation: true,
    readouts: {
      low: "Your stack was accumulated, not designed, and it will fight every automation you build.",
      mid: "Your core systems connect, but sync gaps and unclear ownership will slow you down.",
      high: "Your stack works as one system with a clear source of truth.",
    },
  },
  {
    id: "teamAlignment",
    name: "Team Alignment",
    foundation: false,
    readouts: {
      low: "Your teams work from different definitions, and AI would surface that disagreement faster.",
      mid: "Your teams mostly agree, but handoffs and exceptions still lose information.",
      high: "Your teams share definitions and clean handoffs, so automation has clear rules to follow.",
    },
  },
  {
    id: "measurementFramework",
    name: "Measurement Framework",
    foundation: false,
    readouts: {
      low: "Without targets built from real conversion data, AI would measure the wrong things more efficiently.",
      mid: "You track the right numbers, but not consistently enough to prove ROI.",
      high: "You measure what drives outcomes, with baselines that will prove AI's return.",
    },
  },
  {
    id: "aiAdoption",
    name: "AI Adoption Readiness",
    foundation: false,
    readouts: {
      low: "Your team isn't set up to adopt AI yet, so even good tools would go unused.",
      mid: "Pockets of your team use AI, but without an owner and a plan it won't spread.",
      high: "Your leadership and team are ready to adopt AI across the business.",
    },
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    area: "dataIntegrity",
    prompt: "When leadership needs pipeline numbers for a board or leadership meeting, what happens?",
    options: [
      "Someone rebuilds them in a spreadsheet because the CRM can't be trusted",
      "Someone pulls them from the CRM, then spends hours checking and correcting them",
      "Someone pulls them from the CRM and spot-checks a few deals",
      "Leadership pulls them straight from the CRM and acts on them as-is",
    ],
    fix: "Fix your forecast fields at the source: validation rules when data is entered, automation or AI to fill in what it can, and one person accountable for the rest.",
  },
  {
    id: "q2",
    area: "dataIntegrity",
    prompt: "Who owns CRM data quality?",
    options: [
      "Nobody, so cleanup happens in a panic before big meetings",
      "Whoever happens to notice a problem",
      "A named owner, but reviews are irregular",
      "A named owner, with scheduled reviews and alerts for critical gaps",
    ],
    fix: "Name an owner, then let a dashboard or automated alerts flag blank, conflicting, and stale records, so problems surface before the meeting instead of during it.",
  },
  {
    id: "q3",
    area: "dataIntegrity",
    prompt: "How do critical fields (stage, amount, close date, source) get filled in?",
    options: [
      "It depends on reps remembering, and many are blank or stale",
      "They're required on paper, but enforcement is loose",
      "Most are enforced when a deal changes stage",
      "All are filled automatically or enforced at every stage, with a written definition for each",
    ],
    fix: "Enforce critical fields at each stage change, and put a short definition on every field inside the CRM, where both reps and AI tools read it.",
  },
  {
    id: "q4",
    area: "processDocumentation",
    prompt: "If your best rep left tomorrow, could someone else follow their process from lead to close?",
    options: [
      "No, it lives in their head",
      "Partly, by piecing it together from notes and Slack",
      "Mostly, since the core steps are written down",
      "Yes, it's documented well enough for a new hire on day one",
    ],
    fix: "Document your lead-to-close process with the person who runs it best, before you automate any part of it.",
  },
  {
    id: "q5",
    area: "processDocumentation",
    prompt: "How consistently do people run the same process (routing, handoffs, renewals)?",
    options: [
      "Everyone does it their own way",
      "Similar in spirit, different in practice",
      "Consistently, for most core processes",
      "The same way every time, because our systems guide or enforce each step",
    ],
    fix: "Pick your most-repeated workflow and agree on one way to run it. Automating inconsistency just makes it permanent.",
  },
  {
    id: "q6",
    area: "processDocumentation",
    prompt: "How current is your process documentation?",
    options: [
      "There isn't any",
      "It's more than a year old",
      "It was updated within the last year",
      "It's updated whenever a process changes",
    ],
    fix: "Give documentation an owner and update it when processes change. Current documentation is also what AI assistants learn from.",
  },
  {
    id: "q7",
    area: "systemsArchitecture",
    prompt: "For accounts, deals, and customers, is there one source of truth?",
    options: [
      "No, several systems each claim to be it",
      "Officially yes, but teams work from their own copies",
      "Yes for most records, with a few gray areas",
      "Yes, and every team knows which system owns what",
    ],
    fix: "Decide which system owns each core record and write it down. Every integration decision follows from that.",
  },
  {
    id: "q8",
    area: "systemsArchitecture",
    prompt: "How does data move between your CRM, marketing, customer success, and billing systems?",
    options: [
      "Mostly by people copying and pasting",
      "Some integrations, plus manual workarounds and spreadsheet (CSV) imports",
      "Integrated, but some fields break or don't sync",
      "Integrated, mapped, and checked within the last year",
    ],
    fix: "Map how data actually flows between your systems, then replace the manual steps that feed your forecast first.",
  },
  {
    id: "q9",
    area: "systemsArchitecture",
    prompt: "How did your tech stack come together?",
    options: [
      "Each team bought its own tools, and some overlap",
      "Mostly accumulated, with a few deliberate choices",
      "Mostly designed, with owners for the major systems",
      "Designed as one system, with one owner for the whole stack",
    ],
    fix: "Give one person ownership of the whole stack and cut the tools that overlap.",
  },
  {
    id: "q10",
    area: "teamAlignment",
    prompt: "Do marketing, sales, and customer success share written definitions for lead, pipeline, and customer stages?",
    options: [
      "No, each team uses its own",
      "Definitions exist, but people read them differently",
      "Yes, written down and mostly followed",
      "Yes, and the CRM enforces each stage's entry and exit criteria",
    ],
    fix: "Get marketing, sales, and customer success to agree on stage definitions with clear entry and exit criteria, then build them into the CRM.",
  },
  {
    id: "q11",
    area: "teamAlignment",
    prompt: "When a deal moves from sales to onboarding, what happens?",
    options: [
      "The customer gets asked the same questions again",
      "It's handed off over a call or Slack, and details get lost",
      "A standard handoff covers most of what's needed",
      "The receiving team gets everything it needs, automatically",
    ],
    fix: "Define what onboarding needs from every closed deal, capture it before the deal can close, and have the CRM pass it to onboarding automatically.",
  },
  {
    id: "q12",
    area: "teamAlignment",
    prompt: "How aligned are sales and finance on deal structure and discounting?",
    options: [
      "It's a regular source of conflict",
      "We work it out deal by deal",
      "Rules exist, with frequent exceptions",
      "Clear rules and approval paths that everyone follows",
    ],
    fix: "Write down who can approve what and what can't be sold. Most sales and finance conflict comes from missing rules, not bad intent.",
  },
  {
    id: "q13",
    area: "measurementFramework",
    prompt: "Can you work backward from your bookings target to the pipeline and meetings you need at each stage?",
    options: [
      "No, targets are set without that math",
      "Roughly, using rules of thumb",
      "Yes, using our real conversion rates, updated now and then",
      "Yes, and we track weekly pacing against it",
    ],
    fix: "Build your bookings target backward from real conversion rates, then track weekly pacing against it.",
  },
  {
    id: "q14",
    area: "measurementFramework",
    prompt: "Ask five people on your revenue team for the three most important metrics. What would you hear?",
    options: [
      "Five different answers",
      "Some overlap",
      "Mostly the same answer",
      "The same three, every time",
    ],
    fix: "Pick the three to five numbers that drive your outcomes and make them the ones reviewed every week.",
  },
  {
    id: "q15",
    area: "measurementFramework",
    prompt: "Do you measure efficiency (revenue per employee, cost per opportunity, CAC payback) as well as growth?",
    options: [
      "No, we track top-line growth only",
      "Now and then, for board decks",
      "Yes, some, reviewed quarterly",
      "Yes, they drive decisions, with baselines to prove ROI",
    ],
    fix: "Set baselines for your efficiency metrics now. Without them, you can't prove what any AI investment returns.",
  },
  {
    id: "q16",
    area: "aiAdoption",
    prompt: "How is your team using AI today?",
    options: [
      "Barely, or it's been discouraged",
      "Individuals experiment on their own",
      "Some teams use approved tools for real work",
      "It's part of how work gets done, with guidelines and shared tools",
    ],
    fix: "Approve a small set of AI tools, write simple usage guidelines, and give people time to use them on real work.",
  },
  {
    id: "q17",
    area: "aiAdoption",
    prompt: "Who owns AI at the leadership level?",
    options: [
      "Nobody yet",
      "Leadership is interested, but there's no owner or budget",
      "An owner with a budget, but priorities are still forming",
      "An executive sponsor with a budget, priorities, and success measures",
    ],
    fix: "Name an executive sponsor for AI with a budget and two or three measurable priorities.",
  },
  {
    id: "q18",
    area: "aiAdoption",
    prompt: "When you roll out a new tool or process, what usually happens?",
    options: [
      "Adoption fades within a few months",
      "Some people adopt it, and most go back to old habits",
      "Most people adopt it, with training and reminders",
      "We plan the change, train people, and measure adoption",
    ],
    fix: "Plan adoption like a project: training, a champion in each team, and an adoption measure you review.",
  },
];

export interface Level {
  id: LevelId;
  name: string;
  headline: string;
  wayIn: string;
}

export const LEVELS: Record<LevelId, Level> = {
  foundation: {
    id: "foundation",
    name: "Foundation first",
    headline:
      "Your foundation isn't ready for AI yet. Automating now would scale the problems you already have.",
    wayIn:
      "Start with the foundation. An AI Readiness Assessment (Diagnose) maps what to fix and in what order, or a Stabilize retainer (Partner) fixes it alongside your team.",
  },
  targeted: {
    id: "targeted",
    name: "Ready for targeted automation",
    headline:
      "Parts of your foundation can carry AI today. Start where it's strongest and fix the weak spots as you go.",
    wayIn:
      "Prove it on one workflow. A Discovery Sprint or pilot (Prove) in your strongest area shows real output before a bigger commitment.",
  },
  scale: {
    id: "scale",
    name: "Ready to scale AI",
    headline:
      "Your foundation is ready. The question now is how fast you can put AI to work.",
    wayIn:
      "Build at scale. Scoped automation builds (Execute) or a Build or Transform retainer (Partner) roll AI out across the business.",
  },
};

export const NO_FIXES_MESSAGE =
  "No urgent gaps. Your next step is putting AI to work, not fixing the foundation.";

export interface ProfileQuestion {
  id: "role" | "companySize" | "crm" | "industry" | "ownership";
  label: string;
  required: boolean;
  options: { label: string; value: string }[];
}

const asOptions = (labels: string[]) =>
  labels.map((label) => ({ label, value: label }));

export const PROFILE_QUESTIONS: ProfileQuestion[] = [
  {
    id: "role",
    label: "Your role",
    required: true,
    options: asOptions([
      "CEO or founder",
      "Sales or revenue leader (CRO, VP Sales)",
      "Finance leader (CFO, VP Finance)",
      "Revenue operations or operations leader",
      "Marketing leader",
      "Customer success leader",
      "Investor or board member (PE or VC)",
      "Other",
    ]),
  },
  {
    id: "companySize",
    label: "Company size",
    required: true,
    // Same values as the contact form, which map to HubSpot's numemployees.
    options: [
      { label: "1–5 employees", value: "1-5" },
      { label: "6–25 employees", value: "5-25" },
      { label: "26–50 employees", value: "25-50" },
      { label: "51–100 employees", value: "50-100" },
      { label: "101–500 employees", value: "100-500" },
      { label: "501–1,000 employees", value: "500-1000" },
      { label: "1,000+ employees", value: "1000+" },
    ],
  },
  {
    id: "crm",
    label: "Primary CRM",
    required: false,
    options: asOptions(["HubSpot", "Salesforce", "Another CRM", "No CRM yet"]),
  },
  {
    id: "industry",
    label: "Industry",
    required: false,
    options: asOptions([
      "Software or SaaS (any market, including healthcare IT)",
      "Healthcare services (providers, revenue cycle, and similar)",
      "Professional services (consulting, legal, accounting, agencies)",
      "Staffing and workforce services",
      "Financial services and insurance",
      "Manufacturing and distribution",
      "Logistics and transportation",
      "Other",
    ]),
  },
  {
    id: "ownership",
    label: "Ownership",
    required: false,
    options: asOptions([
      "Private equity backed",
      "Venture backed",
      "Founder or family owned",
      "Public",
      "Other",
    ]),
  },
];

export const FREE_TEXT_PROMPT =
  "What's the biggest thing breaking in your revenue operations right now?";
