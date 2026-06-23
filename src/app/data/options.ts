/** Shared option lists + lightweight deterministic data generators. */

export const EMPLOYERS = [
  "HC Clinic - Retail",
  "CedarBridge Manufacturing",
  "BlueSky Enterprises",
  "Maple Valley Financial",
  "Horizon Wellness Group",
  "Apex Solutions Corp",
  "ACME CORP 1",
  "ACME CORP 2",
  "GreenSprout Energy",
  "Healthcompiler",
];

export const DPCS = ["HC Clinic", "CedarBridge DPC", "BlueSky DPC", "Apex DPC"];

export const PHYSICIANS = [
  "Sam Wills",
  "Wanda Ritter",
  "Marlou Trenklay",
  "Jennifer Hernandez",
  "No Physician Assigned",
];

export const MEDICAL_CONDITIONS = [
  "E78.5",
  "I10",
  "E11.9",
  "E78.2",
  "J45.909",
  "M54.5",
  "—",
];

export const FIRST_NAMES = [
  "Robyn", "Kristen", "Heather", "Andrea", "Kathy", "Michelle", "Angela",
  "Courtney", "Penny", "Sue", "Justin", "Jorge", "Barbara", "Tamara",
  "Natalie", "Donna", "Laura", "Patricia", "Linda", "Jessica", "Joseph",
  "Christopher", "Kenneth", "Rachel", "Irwin", "Emily", "Susan", "Jacqueline",
];

export const LAST_NAMES = [
  "Williams", "Aleo", "Young", "Anderson", "Jacobs", "Morris", "Wallace",
  "Saunders", "Hobbs", "Weaver", "Doe", "Hernandez", "Banker", "Howell",
  "Mathis", "Walton", "Liens", "Owyang", "Davis", "Clark", "Cole",
  "Nelson", "Harris", "Sanders", "Schuster", "Wells", "Logan", "Jennings",
];

let _seed = 1337;
/** Deterministic pseudo-random so data is stable across renders. */
export function rand(): number {
  _seed = (_seed * 1103515245 + 12345) & 0x7fffffff;
  return _seed / 0x7fffffff;
}

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

export function patientId(): string {
  const hex = "0123456789abcdef";
  let out = "";
  for (let i = 0; i < 24; i++) out += hex[Math.floor(rand() * 16)];
  return out;
}

export function fullName(): string {
  return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
}

export function email(name: string): string {
  const [f, l] = name.toLowerCase().split(" ");
  return `${f}.${l}@example.com`;
}

export function phone(): string {
  const n = () => Math.floor(rand() * 900 + 100);
  return `${n()}${Math.floor(rand() * 9)}-${n()}-${n()}${Math.floor(rand() * 9)}`;
}

export function dateTime(): string {
  const m = String(Math.floor(rand() * 12) + 1).padStart(2, "0");
  const d = String(Math.floor(rand() * 28) + 1).padStart(2, "0");
  const h = String(Math.floor(rand() * 12) + 1).padStart(2, "0");
  const min = String(Math.floor(rand() * 60)).padStart(2, "0");
  return `03-${d}-2026 ${h}:${min}:00 PDT`;
}
