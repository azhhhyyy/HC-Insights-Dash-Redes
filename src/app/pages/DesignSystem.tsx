import { useState, type ReactNode } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  Calendar,
  Check,
  ClipboardCheck,
  Copy,
  Download,
  Filter,
  HeartPulse,
  Megaphone,
  MessageSquare,
  Receipt,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { Page } from "../components/layout/Page";
import { Panel } from "../components/dashboard/EmptyState";
import { KpiCard } from "../components/dashboard/KpiCard";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

/* ------------------------------------------------------------------ */
/* Token data — mirrors src/styles/theme.css so the docs stay truthful */
/* ------------------------------------------------------------------ */

const BRAND_RAMP = [
  { name: "chart-1", hex: "#fb5b87" },
  { name: "primary / chart-2", hex: "#e32168" },
  { name: "chart-3", hex: "#ca0055" },
  { name: "chart-4", hex: "#ab0045" },
  { name: "chart-5", hex: "#890037" },
];

const NEUTRALS = [
  { name: "background", hex: "#ffffff" },
  { name: "muted", hex: "#f9fafb" },
  { name: "input", hex: "#e5e7eb" },
  { name: "border", hex: "#d4d4d8" },
  { name: "slate-400", hex: "#a1a1aa" },
  { name: "foreground", hex: "#382e2e" },
];

const SEMANTIC = [
  { name: "secondary", hex: "#fff0f4", fg: "#ca0055" },
  { name: "accent-foreground", hex: "#67022a", fg: "#ffffff" },
  { name: "success", hex: "#16a34a", fg: "#ffffff" },
  { name: "destructive", hex: "#ef4444", fg: "#ffffff" },
];

const TYPE_SCALE = [
  { label: "Display", size: "1.85rem / 38px", sample: "Aa", style: { fontSize: "1.85rem", lineHeight: 1.05 } },
  { label: "Heading", size: "1.4rem / 22px", sample: "Aa", style: { fontSize: "1.4rem", lineHeight: 1.2 } },
  { label: "Subtitle", size: "0.95rem / 15px", sample: "Aa", style: { fontSize: "0.95rem" } },
  { label: "Body", size: "1rem / 16px", sample: "Aa", style: { fontSize: "1rem" } },
  { label: "Caption", size: "0.6875rem / 11px", sample: "Aa", style: { fontSize: "0.6875rem" } },
];

const RADII = [
  { name: "sm", value: "calc(0.7rem - 4px)", px: "calc(0.7rem - 4px)" },
  { name: "md", value: "calc(0.7rem - 2px)", px: "calc(0.7rem - 2px)" },
  { name: "lg (base)", value: "0.7rem", px: "0.7rem" },
  { name: "xl", value: "calc(0.7rem + 4px)", px: "calc(0.7rem + 4px)" },
];

const SPACING = [1, 2, 3, 4, 6, 8].map((n) => ({ token: n, px: n * 4 }));

const SHADOWS = [
  { name: "xs", cls: "shadow-xs" },
  { name: "sm", cls: "shadow-sm" },
  { name: "md", cls: "shadow-md" },
  { name: "lg", cls: "shadow-lg" },
];

const ICONS = [
  BarChart3, Users, HeartPulse, Receipt, MessageSquare, Megaphone,
  ClipboardCheck, Search, Filter, Download, Bell, Calendar, Settings, Activity,
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Tile({
  title,
  span = "",
  children,
}: {
  title: string;
  span?: string;
  children: ReactNode;
}) {
  return (
    <Panel title={title} className={`h-full ${span}`}>
      {children}
    </Panel>
  );
}

function Swatch({ name, hex, fg }: { name: string; hex: string; fg?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="group flex flex-col overflow-hidden rounded-md border text-left transition-shadow hover:shadow-sm"
    >
      <span
        className="flex h-14 items-center justify-end px-2"
        style={{ backgroundColor: hex, color: fg ?? "transparent" }}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-3.5 opacity-0 group-hover:opacity-70" />}
      </span>
      <span className="flex flex-col bg-card px-2.5 py-1.5">
        <span className="truncate text-xs text-foreground">{name}</span>
        <span className="font-mono text-[11px] text-slate-400">{hex}</span>
      </span>
    </button>
  );
}

function LogoIcon() {
  return (
    <svg
      width="48"
      height="24"
      viewBox="0 0 48 24"
      fill="none"
      stroke="#e32168"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      <path d="M 7 6 L 2 12 L 7 18" />
      <path d="M 12 12 H 18 L 21 6 L 24 18 L 27 3 L 29 21 L 32 12 H 37" />
      <path d="M 41 6 L 46 12 L 41 18" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function DesignSystem() {
  return (
    <Page title="Design System" showGenerateReport={false} showIconActions={false} showFilters={false}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {/* Intro */}
        <Panel className="h-full lg:col-span-4">
          <div className="flex flex-col items-start gap-4">
            <LogoIcon />
            <div>
              <h2 className="text-foreground font-semibold" style={{ fontSize: "1.4rem", lineHeight: 1.2 }}>
                HealthCompiler Design System
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm text-slate-500 leading-relaxed">
                The foundations behind the ACME DPC analytics suite. Built for clarity,
                density, and restraint — color is used sparingly to direct attention,
                type and spacing carry the hierarchy.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Clarity first", "Information density", "Restrained color", "Accessible contrast"].map((p) => (
              <Badge key={p} variant="secondary" className="rounded-full px-2.5 py-0.5 border-transparent text-secondary-foreground font-normal">
                {p}
              </Badge>
            ))}
          </div>
        </Panel>

        {/* Typeface */}
        <Tile title="Typeface" span="lg:col-span-2">
          <div className="flex h-full flex-col justify-between py-1">
            <span className="text-foreground tracking-tight font-medium" style={{ fontSize: "3rem", lineHeight: 1 }}>
              AaBbCcDd1234
            </span>
            <div className="mt-4">
              <p className="text-foreground font-semibold" style={{ fontSize: "1.1rem" }}>Geist</p>
              <p className="text-xs text-slate-500">Primary · sans-serif</p>
            </div>
          </div>
        </Tile>

        {/* Brand colors */}
        <Tile title="Brand · Primary Ramp" span="lg:col-span-3">
          <div className="grid grid-cols-5 gap-3">
            {BRAND_RAMP.map((c) => (
              <Swatch key={c.name} name={c.name} hex={c.hex} fg="#ffffff" />
            ))}
          </div>
        </Tile>

        {/* Semantic */}
        <Tile title="Semantic" span="lg:col-span-3">
          <div className="grid grid-cols-4 gap-3">
            {SEMANTIC.map((c) => (
              <Swatch key={c.name} name={c.name} hex={c.hex} fg={c.fg} />
            ))}
          </div>
        </Tile>

        {/* Neutrals */}
        <Tile title="Neutrals" span="lg:col-span-3">
          <div className="grid grid-cols-6 gap-3">
            {NEUTRALS.map((c) => (
              <Swatch key={c.name} name={c.name} hex={c.hex} fg="#382e2e" />
            ))}
          </div>
        </Tile>

        {/* Type scale */}
        <Tile title="Type Scale" span="lg:col-span-3">
          <div className="flex flex-col divide-y divide-border">
            {TYPE_SCALE.map((t) => (
              <div key={t.label} className="flex items-baseline justify-between gap-4 py-2.5">
                <span className="truncate text-foreground" style={t.style}>
                  {t.sample} {t.label}
                </span>
                <span className="shrink-0 font-mono text-[11px] text-slate-400">{t.size}</span>
              </div>
            ))}
          </div>
        </Tile>

        {/* Corner radius */}
        <Tile title="Corner Radius" span="lg:col-span-2">
          <div className="flex items-end justify-between gap-3">
            {RADII.map((r) => (
              <div key={r.name} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="h-12 w-full border-2 border-primary bg-secondary"
                  style={{ borderRadius: r.value }}
                />
                <span className="text-center text-[11px] text-slate-500">{r.name}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">Base token <span className="font-mono">--radius: 0.7rem</span></p>
        </Tile>

        {/* Spacing */}
        <Tile title="Spacing" span="lg:col-span-2">
          <div className="space-y-3">
            {SPACING.map((s) => (
              <div key={s.token} className="flex items-center gap-3">
                <span className="w-4 shrink-0 text-left text-[11px] text-slate-400">{s.token}</span>
                <span className="h-3 rounded-full bg-primary" style={{ width: s.px }} />
                <span className="text-[11px] text-slate-400">{s.px}px</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">Base unit <span className="font-mono">4px</span></p>
        </Tile>

        {/* Elevation */}
        <Tile title="Elevation" span="lg:col-span-2">
          <div className="grid grid-cols-2 gap-3">
            {SHADOWS.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <div className={`grid h-14 w-full place-items-center rounded-md border bg-card ${s.cls}`}>
                  <span className="text-[11px] text-slate-400">{s.name}</span>
                </div>
              </div>
            ))}
          </div>
        </Tile>

        {/* Iconography */}
        <Tile title="Iconography" span="lg:col-span-3">
          <div className="flex flex-wrap gap-3">
            {ICONS.map((Icon, i) => (
              <span
                key={i}
                className="grid size-9 place-items-center rounded-md border bg-card text-slate-600"
              >
                <Icon className="size-[18px]" />
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">lucide-react · 18px · 1.5px stroke</p>
        </Tile>

        {/* Buttons */}
        <Tile title="Buttons" span="lg:col-span-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="secondary">Secondary</Button>
            <Button size="sm" variant="outline">Outline</Button>
            <Button size="sm" variant="ghost">Ghost</Button>
            <Button size="sm" variant="destructive">Destructive</Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge className="bg-[#16a34a] text-white border-transparent">NEW</Badge>
          </div>
        </Tile>

        {/* KPI card example */}
        <Tile title="Components · KPI Card" span="lg:col-span-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <KpiCard icon={Users} title="Total Active Patients" value="2,823" caption="As of end date" />
            <KpiCard
              icon={Receipt}
              title="Prescription Orders"
              subs={[{ value: "5,417", label: "Overall" }, { value: "726", label: "Refills" }]}
            />
          </div>
        </Tile>

        {/* Filter chip example */}
        <Tile title="Components · Filters" span="lg:col-span-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Filter className="size-3.5" /> Filters
            </span>
            <span className="h-4 w-px bg-border" />
            {[
              ["Start Date", "01-01-2023"],
              ["Employer", "All Sponsored"],
              ["Physician", "All Physicians"],
            ].map(([k, v]) => (
              <span key={k} className="flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-1 text-xs">
                <span className="text-slate-400">{k}</span>
                <span className="text-foreground">{v}</span>
              </span>
            ))}
          </div>
        </Tile>
      </div>
    </Page>
  );
}
