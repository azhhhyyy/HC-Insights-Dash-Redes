import {
  DPCS,
  EMPLOYERS,
  MEDICAL_CONDITIONS,
  PHYSICIANS,
  dateTime,
  email,
  fullName,
  patientId,
  phone,
  pick,
  rand,
} from "./options";

/* ---------- Utilization Gaps ---------- */
export type GapPatientRow = {
  id: string;
  name: string;
  age: string;
  phone: string;
  condition: string;
  spruce: string;
  lastEncounter: string;
  lastMessage: string;
  employer: string;
  dpc: string;
  physician: string;
};

export const utilizationGaps = Array.from({ length: 96 }, () => {
  const name = fullName();
  return {
    id: patientId(),
    name,
    age: `${Math.floor(rand() * 60 + 20)} Yrs`,
    phone: phone(),
    condition: pick(MEDICAL_CONDITIONS),
    spruce: rand() > 0.5 ? "Yes" : "No",
    lastEncounter: rand() > 0.3 ? dateTime() : "—",
    lastMessage: rand() > 0.5 ? dateTime() : "—",
    employer: pick(EMPLOYERS),
    dpc: pick(DPCS),
    physician: pick(PHYSICIANS),
  };
});

/* ---------- Encounters ---------- */
export type EncounterRow = {
  id: string;
  name: string;
  encounterId: string;
  type: string;
  date: string;
  employer: string;
  dpc: string;
  physician: string;
};

const ENCOUNTER_TYPES = [
  "Office Visit",
  "Consultation",
  "Discharge Summary",
  "Procedure Note",
  "Telemedicine",
  "Other",
];

export const encounters = Array.from({ length: 124 }, () => ({
  id: patientId(),
  name: fullName(),
  encounterId: patientId().slice(0, 18),
  type: pick(ENCOUNTER_TYPES),
  date: dateTime(),
  employer: pick(EMPLOYERS),
  dpc: pick(DPCS),
  physician: pick(PHYSICIANS),
}));

/* ---------- Encounter Types Breakdown ---------- */
export const encounterTypeBreakdown = [
  { name: "In-Person", value: 53.2, count: 3841 },
  { name: "Virtual", value: 17.6, count: 1270 },
  { name: "Telehealth", value: 15, count: 1082 },
  { name: "Documentation", value: 6.8, count: 491 },
  { name: "After Hours", value: 6.5, count: 469 },
  { name: "Chat", value: 0.9, count: 65 },
];

/* ---------- After Hours Encounters ---------- */
const AFTER_HOURS_TYPES = ["Office Visit", "Telehealth", "Consultation", "Procedure Note"];

export const afterHoursEncounters: EncounterRow[] = Array.from({ length: 200 }, () => ({
  id: patientId(),
  name: fullName(),
  encounterId: patientId().slice(0, 18),
  type: pick(AFTER_HOURS_TYPES),
  date: dateTime(),
  employer: pick(EMPLOYERS),
  dpc: pick(DPCS),
  physician: pick(PHYSICIANS),
}));

/* ---------- Care Episodes Breakdown ---------- */
export const careEpisodeBreakdown = [
  { name: "Preventive Visit", value: 12.87, count: 5135 },
  { name: "Misc / Other", value: 12.86, count: 5131 },
  { name: "Advance Care Planning", value: 12.84, count: 5124 },
  { name: "Blood Pressure Screening", value: 12.83, count: 5120 },
  { name: "Office Visit - Established Patient", value: 9.97, count: 3978 },
  { name: "Lab / Blood Work", value: 9.69, count: 3867 },
  { name: "Behavioral / Smoking Cessation Counseling", value: 9.63, count: 3843 },
  { name: "Office Visit - New Patient", value: 9.63, count: 3843 },
  { name: "Telehealth / Online Consultation", value: 6.45, count: 2574 },
  { name: "Care Management / Transitional Care", value: 3.21, count: 1281 },
];

export type CareEpisodeRow = {
  id: string;
  name: string;
  encounterId: string;
  cptCode: string;
  date: string;
  employer: string;
  dpc: string;
  physician: string;
};

const CPT_EPISODE = ["99213", "99214", "99215", "99395", "99397", "99173", "99444"];

export const careEpisodeRows = Array.from({ length: 96 }, () => ({
  id: patientId(),
  name: fullName(),
  encounterId: patientId().slice(0, 18),
  cptCode: pick(CPT_EPISODE),
  date: dateTime(),
  employer: pick(EMPLOYERS),
  dpc: pick(DPCS),
  physician: pick(PHYSICIANS),
}));

/* ---------- Prescriptions ---------- */
export type PrescriptionRow = {
  id: string;
  name: string;
  email: string;
  medication: string;
  type: string;
  created: string;
  employer: string;
  dpc: string;
  physician: string;
};

const MEDICATIONS = ["Lisinopril", "Tylenol", "Amoxicillin", "Metformin", "Atorvastatin", "—"];

export const prescriptions = Array.from({ length: 88 }, () => {
  const name = fullName();
  return {
    id: patientId(),
    name,
    email: email(name),
    medication: pick(MEDICATIONS),
    type: rand() > 0.5 ? "Amoxicillin" : "—",
    created: dateTime().replace("PDT", "PST"),
    employer: pick(EMPLOYERS),
    dpc: pick(DPCS),
    physician: pick(PHYSICIANS),
  };
});

/* ---------- After Hours Prescriptions ---------- */
export const afterHoursPrescriptionsOverall: PrescriptionRow[] = Array.from({ length: 5382 }, () => {
  const name = fullName();
  return {
    id: patientId(),
    name,
    email: email(name),
    medication: pick(MEDICATIONS),
    type: "---",
    created: dateTime().replace("PDT", "PST"),
    employer: pick(EMPLOYERS),
    dpc: pick(DPCS),
    physician: pick(PHYSICIANS),
  };
});

export const afterHoursPrescriptionsRefills: PrescriptionRow[] = Array.from({ length: 719 }, () => {
  const name = fullName();
  return {
    id: patientId(),
    name,
    email: email(name),
    medication: pick(MEDICATIONS),
    type: "Refill",
    created: dateTime().replace("PDT", "PST"),
    employer: pick(EMPLOYERS),
    dpc: pick(DPCS),
    physician: pick(PHYSICIANS),
  };
});

/* ---------- Digital Engagement ---------- */
export const digitalEngagement = Array.from({ length: 64 }, () => {
  const name = fullName();
  return {
    id: patientId(),
    name,
    messageType: "Spruce Message",
    date: dateTime(),
    employer: pick(EMPLOYERS),
    dpc: pick(DPCS),
    physician: pick(PHYSICIANS),
  };
});

export const afterHoursMessages = Array.from({ length: 369 }, () => {
  const name = fullName();
  return {
    id: patientId(),
    name,
    messageType: "Secure",
    date: dateTime().replace("PDT", "PST"),
    employer: pick(EMPLOYERS),
    dpc: pick(DPCS),
    physician: pick(PHYSICIANS),
  };
});

/* ---------- Trend series (years) ---------- */
export const encounterTrend = [
  { name: "2022", value: 800 },
  { name: "2023", value: 2400 },
  { name: "2024", value: 5200 },
  { name: "2025", value: 5800 },
  { name: "2026", value: 3600 },
];

export const activePatientsTrend = [
  { name: "2023", value: 20 },
  { name: "2024", value: 320 },
  { name: "2025", value: 1800 },
  { name: "2026", value: 2823 },
];

export const totalActivePatientsTrend = [
  { name: "2023", value: 2780 },
  { name: "2024", value: 2850 },
  { name: "2025", value: 2810 },
  { name: "2026", value: 2823 },
];

export const totalMessagesTrend = [
  { name: "2023", value: 0 },
  { name: "2024", value: 5 },
  { name: "2025", value: 400 },
  { name: "2026", value: 40 },
];

/* ---------- Message Types Breakdown ---------- */
export const messageTypeBreakdown = [
  { name: "Chat", value: 100, count: 446 },
];

/* ---------- Patient Touch Ratio ---------- */
export const patientTouchRatioTrend = [
  { name: "2023", value: 1.5 },
  { name: "2024", value: 8 },
  { name: "2025", value: 65 },
  { name: "2026", value: 99.2 },
];

export type PatientTouchRow = {
  id: string;
  name: string;
  age: string;
  date: string;
  employer: string;
  dpc: string;
  physician: string;
};

const randAge = () => `${Math.floor(Math.random() * (85 - 5 + 1)) + 5} Yrs`;

export const patientsWithEncounter: PatientTouchRow[] = Array.from({ length: 2801 }, () => ({
  id: patientId(),
  name: fullName(),
  age: randAge(),
  date: dateTime(),
  employer: pick(EMPLOYERS),
  dpc: pick(DPCS),
  physician: pick(PHYSICIANS),
}));

export const patientsWithoutEncounter: PatientTouchRow[] = Array.from({ length: 22 }, () => ({
  id: patientId(),
  name: fullName(),
  age: randAge(),
  date: "---",
  employer: pick(EMPLOYERS),
  dpc: pick(DPCS),
  physician: pick(PHYSICIANS),
}));

/* ---------- Manifest Members ---------- */
export type ManifestMemberRow = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  endDate: string;
  employer: string;
  dpc: string;
  physician: string;
};

const RAND_END_DATES = [
  "---",
  "---",
  "---",
  "03-23-2027 00:51:41 PDT",
  "03-23-2027 00:52:06 PDT",
];

export const activeManifestMembers: ManifestMemberRow[] = Array.from({ length: 153 }, () => {
  const n = fullName();
  const e = n.toLowerCase().replace(" ", "_") + Math.floor(Math.random() * 100) + "@patient.com";
  return {
    id: patientId(),
    name: n,
    email: e,
    status: "Active",
    endDate: pick(RAND_END_DATES),
    employer: pick(EMPLOYERS),
    dpc: "HC Clinic",
    physician: "---",
  };
});

export const inactiveManifestMembers: ManifestMemberRow[] = Array.from({ length: 72 }, () => {
  const n = fullName();
  const e = n.toLowerCase().replace(" ", "_") + Math.floor(Math.random() * 100) + "@patient.com";
  return {
    id: patientId(),
    name: n,
    email: e,
    status: "Inactive",
    endDate: pick(RAND_END_DATES),
    employer: pick(EMPLOYERS),
    dpc: "HC Clinic",
    physician: "---",
  };
});

export const prescriptionTrend = [
  { name: "2022", overall: 400, refills: 120 },
  { name: "2023", overall: 1200, refills: 360 },
  { name: "2024", overall: 2800, refills: 720 },
  { name: "2025", overall: 4800, refills: 980 },
  { name: "2026", overall: 5470, refills: 726 },
];

export const digitalEngagementTrend = [
  { name: "2022", value: 8 },
  { name: "2023", value: 28 },
  { name: "2024", value: 52 },
  { name: "2025", value: 44 },
  { name: "2026", value: 18 },
];

/* ---------- Chronic Risk ---------- */
export const topChronicConditions = [
  { name: "I10", value: 30.6 },
  { name: "E78.5", value: 24.8 },
  { name: "E11.9", value: 9.4 },
  { name: "J45.909", value: 4.5 },
  { name: "E66.9", value: 3.1 },
];

export const chronicDistribution = [
  { name: "No Comorbidity", value: 28.6 },
  { name: "Comorbidity", value: 24.4 },
  { name: "Low Multimorbidity", value: 4.1 },
  { name: "High Multimorbidity", value: 1.7 },
];

export const chronicConditionPatients = Array.from({ length: 58 }, () => ({
  id: patientId(),
  name: fullName(),
  condition: "I10",
  employer: pick(EMPLOYERS),
  dpc: pick(DPCS),
  physician: pick(PHYSICIANS),
}));

/* ---------- Claims Billing ---------- */
export type BillingRow = {
  id: string;
  name: string;
  cpt: string;
  description: string;
  dateOfService: string;
  rate: string;
};

const CPT = [
  { code: "99215", desc: "High complexity office visit" },
  { code: "3074F", desc: "No description available" },
  { code: "G9622", desc: "No description available" },
  { code: "99395", desc: "Well preventive medicine visit, age 18 - 39" },
  { code: "G8400", desc: "No description available" },
  { code: "G444", desc: "Preventive counseling" },
  { code: "99173", desc: "Low moderate complexity office visit" },
  { code: "99444", desc: "Online digital evaluation and management service" },
  { code: "99397", desc: "Well preventive medicine visit, age 65 and over" },
  { code: "T59P", desc: "No description available" },
];

export const claimsBilling = Array.from({ length: 110 }, () => {
  const c = pick(CPT);
  return {
    id: patientId(),
    name: pick(["Marlou Trenklay", "Jennifer Hernandez", "Sam Wills"]),
    cpt: c.code,
    description: c.desc,
    dateOfService: "2024-12-28",
    rate: rand() > 0.2 ? `$ ${(rand() * 250 + 50).toFixed(2)}` : "—",
  };
});

/* ---------- Survey ---------- */
export type SurveyEncounterRow = {
  id: string;
  name: string;
  email: string;
  lastResult: string;
  lastEncounter: string;
  employer: string;
  dpc: string;
  physician: string;
};

export const surveyRecent = Array.from({ length: 132 }, () => {
  const name = fullName();
  return {
    id: patientId(),
    name,
    email: email(name),
    lastResult: "—",
    lastEncounter: "03-24-2026 03:03:57 PDT",
    employer: pick(EMPLOYERS),
    dpc: pick(DPCS),
    physician: pick(PHYSICIANS),
  };
});

export const surveySent = Array.from({ length: 96 }, () => {
  const name = fullName();
  return {
    id: patientId(),
    name,
    email: email(name),
    lastResult: "—",
    surveySent: "03-24-2026 03:03:57 PDT",
    lastEncounter: "03-24-2026 03:03:57 PDT",
    employer: pick(EMPLOYERS),
    dpc: pick(DPCS),
    physician: pick(PHYSICIANS),
  };
});

export const csatDistribution = [
  { name: "1", value: 1, color: "var(--destructive)" },
  { name: "2", value: 1, color: "var(--destructive)" },
  { name: "3", value: 1, color: "#f59e0b" },
  { name: "5", value: 2, color: "#16a34a" },
  { name: "9", value: 1, color: "#9ca3af" },
];

export const csatTrend = [
  { name: "Dec 8", value: 7 },
  { name: "Dec 11", value: 4 },
  { name: "Dec 15", value: 2 },
  { name: "Jan 5", value: 2.4 },
  { name: "Feb 2", value: 3 },
];

export const surveyTopPhysicians = [
  { physician: "Sam Wills", responses: 3, avg: "5.0", satisfied: "2", low: "1" },
  { physician: "No Physician Assigned", responses: 2, avg: "4.0", satisfied: "1", low: "—" },
  { physician: "Wanda Ritter", responses: 1, avg: "2.0", satisfied: "—", low: "1" },
];

export const surveyTopEmployers = [
  { employer: "HC Clinic - Retail", responses: 1, avg: "5.0", satisfied: "1", low: "—" },
  { employer: "Healthcompiler", responses: 1, avg: "9.0", satisfied: "1", low: "—" },
  { employer: "ACME CORP 1", responses: 1, avg: "1.0", satisfied: "—", low: "1" },
  { employer: "Maple Valley Financial", responses: 1, avg: "2.0", satisfied: "—", low: "1" },
  { employer: "CedarBridge Manufacturing", responses: 1, avg: "3.0", satisfied: "—", low: "—" },
  { employer: "ACME CORP 2", responses: 1, avg: "5.0", satisfied: "1", low: "—" },
];

/* ---------- Marketing / SEO ---------- */
export type SeoRow = {
  keyword: string;
  volume: string;
  april: string;
  may: string;
  june: string;
  trend: number[];
  highlight?: boolean;
};

export const seoKeywords: SeoRow[] = [
  { keyword: "William Burkhart", volume: "NA", april: "101", may: "1", june: "1", trend: [101, 40, 5, 1, 1] },
  { keyword: "Tennessee Direct Primary Care", volume: "NA", april: "101", may: "101", june: "59", trend: [101, 101, 90, 70, 59], highlight: true },
  { keyword: "Primary Care Physicians Knoxville Tn", volume: "NA", april: "101", may: "101", june: "101", trend: [101, 101, 101, 101, 101] },
  { keyword: "Primary Care Physicians In Lenoir City Tn", volume: "NA", april: "101", may: "101", june: "80", trend: [101, 101, 95, 88, 80] },
  { keyword: "Primary Care Physician Knoxville Tn", volume: "NA", april: "101", may: "101", june: "101", trend: [101, 101, 101, 101, 101] },
  { keyword: "Primary Care Lenoir City Tn", volume: "NA", april: "101", may: "101", june: "55", trend: [101, 101, 80, 65, 55] },
  { keyword: "Primary Care Knoxville Tn", volume: "NA", april: "101", may: "101", june: "101", trend: [101, 101, 101, 101, 101] },
  { keyword: "Primary Care Doctors Lenoir City, TN", volume: "NA", april: "101", may: "46", june: "22", trend: [101, 70, 46, 30, 22] },
  { keyword: "Primary Care Doctors Lenoir City Tn", volume: "NA", april: "101", may: "101", june: "101", trend: [101, 101, 101, 101, 101] },
  { keyword: "Primary Care Doctors Knoxville TN", volume: "NA", april: "101", may: "34", june: "21", trend: [101, 60, 34, 26, 21] },
  { keyword: "Direct Primary Care Knoxville", volume: "NA", april: "88", may: "44", june: "30", trend: [88, 60, 44, 36, 30] },
  { keyword: "DPC Knoxville Tennessee", volume: "NA", april: "70", may: "55", june: "40", trend: [70, 62, 55, 48, 40] },
];

/* ---------- Coordinated Care ---------- */
export const coordinatedCareCategories = [
  { name: "Procedures", value: 92 },
  { name: "Imaging", value: 6 },
  { name: "Labs", value: 2 },
];

export const procedureSubCategories = [
  { name: "Primary Care/Internal Medicine", value: 3482.38, color: "var(--chart-2)" },
  { name: "Primary Care", value: 3205.2, color: "#16a34a" },
  { name: "Gastroenterology", value: 1834.18, color: "#f59e0b" },
  { name: "Physical Therapy", value: 517.5, color: "#3b82f6" },
  { name: "Mental Health/Psychiatry", value: 480, color: "var(--destructive)" },
];

export const claimsCategoryCount = [
  { name: "Professional Fee", value: 420 },
  { name: "Institutional", value: 180 },
  { name: "Pharmacy", value: 60 },
];

export const serviceTypeCount = [
  { name: "Imaging", value: 90 },
  { name: "Surgical", value: 40 },
];

export const claimsCategoryAmount = [
  { name: "Professional Fee", value: 32960.93 },
  { name: "Institutional", value: 8345.72 },
  { name: "Pharmacy", value: 0 },
];

export const serviceTypeAmount = [
  { name: "Imaging", value: 2086.67 },
  { name: "Surgical", value: 6873.91 },
];

/* ---------- Claims Costs (Claims Utilization) ---------- */
export const claimsCostPmpm = [
  { name: "Jan", DPC: 42, "Non DPC": 78 },
  { name: "Feb", DPC: 38, "Non DPC": 82 },
  { name: "Mar", DPC: 45, "Non DPC": 75 },
  { name: "Apr", DPC: 40, "Non DPC": 88 },
  { name: "May", DPC: 48, "Non DPC": 80 },
  { name: "Jun", DPC: 44, "Non DPC": 92 },
];
