import { pick, rand, fullName, phone, email, EMPLOYERS, PHYSICIANS, patientId } from "./options";

export type PriorityLevel = "High" | "Medium" | "Low";

export type CohortType = 
  | "new-activation"
  | "engagement-gap"
  | "high-chronic-risk"
  | "utilization-leakage"
  | "low-response";

export type GapTier = "30-days" | "60-days" | "90-days";

export interface TouchpointEvent {
  id: string;
  date: string;
  type: "SMS" | "Email" | "Call" | "Appt";
  description: string;
  outcome?: string;
}

export interface ClaimEvent {
  id: string;
  date: string;
  provider: string;
  diagnosis: string;
  amount: string;
}

export interface EncounterEvent {
  id: string;
  date: string;
  type: string;
  provider: string;
  notes: string;
}

export interface ActionCentrePatientRow {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  priority: PriorityLevel;
  cohort: CohortType;
  gapTier?: GapTier;
  lastVisitDaysAgo: number | null;
  lastVisitText: string;
  lastOutreachText: string;
  lastOutreachDaysAgo: number | null;
  reason: string;
  suggestedAction: string;
  suggestedActionType: "email" | "sms" | "call" | "appt";
  contactPhone: string;
  contactEmail: string;
  employer: string;
  physician: string;
  engagementHistory: TouchpointEvent[];
  recentClaims: ClaimEvent[];
  recentEncounters: EncounterEvent[];
}

export interface CohortSummaryCard {
  id: CohortType | "all";
  title: string;
  count: number;
  wowChange: string;
  wowPositive: boolean;
  momChange: string;
  momPositive: boolean;
  description: string;
}

export const COHORT_SUMMARIES: CohortSummaryCard[] = [
  {
    id: "all",
    title: "Total Requiring Attention",
    count: 148,
    wowChange: "+12.4%",
    wowPositive: false, // More patients needing attention is an operational alert
    momChange: "-4.1%",
    momPositive: true,
    description: "Total unique DPC patients flagged across all actionable cohorts today.",
  },
  {
    id: "new-activation",
    title: "New Patient Activation",
    count: 28,
    wowChange: "-6.2%",
    wowPositive: true,
    momChange: "+14.0%",
    momPositive: false,
    description: "Recently enrolled members without a completed first DPC visit or onboarding.",
  },
  {
    id: "engagement-gap",
    title: "Engagement Gap",
    count: 54,
    wowChange: "+8.5%",
    wowPositive: false,
    momChange: "+18.2%",
    momPositive: false,
    description: "Patients with zero DPC encounters in the last 30, 60, or 90+ days.",
  },
  {
    id: "high-chronic-risk",
    title: "High Chronic Risk",
    count: 31,
    wowChange: "-3.1%",
    wowPositive: true,
    momChange: "-8.4%",
    momPositive: true,
    description: "Members with active chronic diagnoses missing routine preventive follow-up.",
  },
  {
    id: "utilization-leakage",
    title: "Utilization Leakage",
    count: 19,
    wowChange: "+15.0%",
    wowPositive: false,
    momChange: "+5.2%",
    momPositive: false,
    description: "Members with external urgent care or ER claims without prior DPC contact.",
  },
  {
    id: "low-response",
    title: "Low Response",
    count: 16,
    wowChange: "0.0%",
    wowPositive: true,
    momChange: "-11.5%",
    momPositive: true,
    description: "Patients with 3+ unreturned outreach attempts requiring channel escalation.",
  },
];

const REASONS_BY_COHORT: Record<CohortType, string[]> = {
  "new-activation": [
    "Enrolled 18 days ago • No completed DPC onboarding visit",
    "Enrolled 24 days ago • Welcome email sent, appointment not booked",
    "Enrolled 12 days ago • Initial health survey unsubmitted",
    "Enrolled 29 days ago • Missing initial baseline checkup",
  ],
  "engagement-gap": [
    "No DPC encounter in 94 days • History of hypertension",
    "No DPC encounter in 62 days • Missed annual wellness visit",
    "No DPC encounter in 112 days • High BMI baseline",
    "No DPC encounter in 38 days • Expired prescription refill check",
  ],
  "high-chronic-risk": [
    "Type 2 Diabetes (E11.9) • HbA1c lab due • Last visit 78 days ago",
    "Essential Hypertension (I10) • BP check overdue by 45 days",
    "Hyperlipidemia (E78.5) • Medication adherence check required",
    "Asthma (J45.909) • Seasonal pulmonary follow-up overdue",
  ],
  "utilization-leakage": [
    "External Urgent Care claim ($340) on 06/18 • Upper respiratory",
    "ER Outpatient claim ($1,450) on 06/12 • Back strain without DPC call",
    "Specialist self-referral claim ($280) • Dermatological consult",
    "External diagnostic lab claim ($195) • Uncoordinated bloodwork",
  ],
  "low-response": [
    "3 unreturned automated SMS reminders in June • Needs voice call",
    "4 unopened emails regarding scheduling • Switch to Spruce SMS",
    "No response to Care Coordinator voicemail left 10 days ago",
    "Failed appointment confirmation twice • Require alternate phone contact",
  ],
};

const ACTIONS_BY_COHORT: Record<CohortType, { text: string; type: "email" | "sms" | "call" | "appt" }[]> = {
  "new-activation": [
    { text: "Send Welcome SMS & Scheduling Link", type: "sms" },
    { text: "Call for Personal Onboarding Check-in", type: "call" },
    { text: "Schedule 30-min Intake Visit", type: "appt" },
    { text: "Email DPC Welcome Packet", type: "email" },
  ],
  "engagement-gap": [
    { text: "Send 60-Day Check-in SMS", type: "sms" },
    { text: "Schedule Wellness Follow-up", type: "appt" },
    { text: "Call for Preventive Screening Check", type: "call" },
    { text: "Email Personalized Health Check Reminder", type: "email" },
  ],
  "high-chronic-risk": [
    { text: "Care Coordinator Priority Call", type: "call" },
    { text: "Schedule Chronic Disease Review Appt", type: "appt" },
    { text: "Send Lab Requisition & SMS Reminder", type: "sms" },
  ],
  "utilization-leakage": [
    { text: "Call Patient — Educate on 24/7 DPC Access", type: "call" },
    { text: "Schedule Post-Urgent Care Follow-up", type: "appt" },
    { text: "Send DPC Urgent Care Avoidance Guide", type: "email" },
  ],
  "low-response": [
    { text: "Call Secondary Emergency Phone Number", type: "call" },
    { text: "Switch to Spruce Direct Secure Message", type: "sms" },
    { text: "Flag for Front Desk In-Person Notification", type: "call" },
  ],
};

// Generate deterministic list of 148 patients
export const ACTION_CENTRE_PATIENTS: ActionCentrePatientRow[] = Array.from({ length: 148 }, (_, idx) => {
  const name = fullName();
  let cohort: CohortType;
  if (idx < 28) cohort = "new-activation";
  else if (idx < 82) cohort = "engagement-gap";
  else if (idx < 113) cohort = "high-chronic-risk";
  else if (idx < 132) cohort = "utilization-leakage";
  else cohort = "low-response";

  let priority: PriorityLevel = "Medium";
  if (cohort === "high-chronic-risk" || cohort === "utilization-leakage") {
    priority = rand() > 0.3 ? "High" : "Medium";
  } else if (cohort === "engagement-gap") {
    priority = rand() > 0.6 ? "High" : rand() > 0.4 ? "Medium" : "Low";
  } else {
    priority = rand() > 0.5 ? "Medium" : "Low";
  }

  let gapTier: GapTier | undefined;
  let lastVisitDaysAgo: number | null = null;
  if (cohort === "new-activation") {
    lastVisitDaysAgo = null;
  } else if (cohort === "engagement-gap") {
    const days = Math.floor(rand() * 90) + 32;
    lastVisitDaysAgo = days;
    if (days >= 90) gapTier = "90-days";
    else if (days >= 60) gapTier = "60-days";
    else gapTier = "30-days";
  } else {
    lastVisitDaysAgo = Math.floor(rand() * 80) + 15;
  }

  const lastVisitText = lastVisitDaysAgo === null ? "Never (New)" : `${lastVisitDaysAgo} days ago`;

  const outreachDays = Math.floor(rand() * 25) + 2;
  const outreachTypes = ["SMS sent", "Email sent", "Spruce msg", "Voicemail left"];
  const lastOutreachText = `${pick(outreachTypes)} (${outreachDays}d ago)`;

  const actionObj = pick(ACTIONS_BY_COHORT[cohort]);

  return {
    id: patientId(),
    name,
    age: Math.floor(rand() * 50) + 22,
    gender: rand() > 0.5 ? "F" : "M",
    priority,
    cohort,
    gapTier,
    lastVisitDaysAgo,
    lastVisitText,
    lastOutreachText,
    lastOutreachDaysAgo: outreachDays,
    reason: pick(REASONS_BY_COHORT[cohort]),
    suggestedAction: actionObj.text,
    suggestedActionType: actionObj.type,
    contactPhone: phone(),
    contactEmail: email(name),
    employer: pick(EMPLOYERS),
    physician: pick(PHYSICIANS),
    engagementHistory: [
      {
        id: "ev-1",
        date: `${outreachDays} days ago`,
        type: actionObj.type === "sms" ? "SMS" : actionObj.type === "email" ? "Email" : "Call",
        description: `Automated outreach check regarding ${cohort.replace("-", " ")} status.`,
        outcome: rand() > 0.5 ? "Delivered — No reply yet" : "Voicemail left",
      },
      {
        id: "ev-2",
        date: `${outreachDays + 14} days ago`,
        type: "Email",
        description: "Monthly practice health newsletter & scheduler invitation.",
        outcome: "Opened",
      },
    ],
    recentClaims: cohort === "utilization-leakage" ? [
      {
        id: "cl-1",
        date: "06/18/2026",
        provider: "CityHealth Urgent Care Center",
        diagnosis: "Acute sinusitis / Upper respiratory infection",
        amount: "$340.00",
      },
      {
        id: "cl-2",
        date: "02/11/2026",
        provider: "Metro Diagnostic Lab",
        diagnosis: "Routine lipid panel & metabolic workup",
        amount: "$185.00",
      }
    ] : [
      {
        id: "cl-def",
        date: "04/05/2026",
        provider: "Quest Diagnostics External",
        diagnosis: "Routine blood draw",
        amount: "$92.00",
      }
    ],
    recentEncounters: lastVisitDaysAgo ? [
      {
        id: "enc-1",
        date: `${lastVisitDaysAgo} days ago`,
        type: "Office Visit",
        provider: pick(PHYSICIANS),
        notes: "Routine follow-up check. Patient reported feeling well overall. Advised lifestyle modifications.",
      }
    ] : [],
  };
});
