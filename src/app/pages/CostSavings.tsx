import { Page } from "../components/layout/Page";
import { Info } from "lucide-react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, Sector } from "recharts";
import { useState } from "react";
import { ChartTooltip } from "../components/dashboard/ChartTooltip";

const overviewData = [
  { name: "Total Value", value: 1652117 },
  { name: "Employer Investment", value: 75000 },
  { name: "Total Savings", value: 1577117 },
];

const barColors = [
  "#3b82f6",  // blue — Total Value
  "#f5a623",  // orange — Employer Investment
  "#22c55e",  // green — Total Savings
];

const PIE_COLORS = [
  "#e91e8c", // hot pink — Covered Visit
  "#22a952", // green — Covered Procedures
  "#f5a623", // orange — Low Cost Labs
  "#e91e63", // rose — Free Rx
  "#d32f2f", // red — Medication Management
  "#f97316", // tangerine — Quality Measures
  "#7c3aed", // violet — Messaging
  "#0ea5e9", // sky blue — Spruce Conversation
  "#475569", // slate — Encounter
  "#4ade80", // light green — Covered Labs
  "#2563eb", // blue — Low Cost Procedures
];

const rawPieData = [
  { name: "Covered Visit", value: 721400 },
  { name: "Covered Procedures", value: 377094 },
  { name: "Low Cost Labs", value: 253250 },
  { name: "Free Rx", value: 130009 },
  { name: "Medication Management", value: 108900 },
  { name: "Quality Measures / Screening (Custom)", value: 54250 },
  { name: "Messaging", value: 4490 },
  { name: "Spruce Conversation", value: 1280 },
  { name: "Encounter", value: 694 },
  { name: "Covered Labs", value: 500 },
  { name: "Low Cost Procedures", value: 250 },
];

/* Enforce a minimum 2% visual slice so tiny items stay visible */
const total = rawPieData.reduce((s, d) => s + d.value, 0);
const MIN_PCT = 0.02;
const pieData = rawPieData.map((d, i) => {
  const pct = d.value / total;
  return {
    ...d,
    displayValue: pct < MIN_PCT ? total * MIN_PCT : d.value,
    color: PIE_COLORS[i],
  };
});

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ transition: "all 200ms cubic-bezier(0.22, 1, 0.36, 1)" }}
      />
    </g>
  );
};



export default function CostSavings() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  const costSavingsChips = [
    { label: "Start Date", value: "01-01-2023", options: [] },
    { label: "End Date", value: "06-18-2026", options: [] },
    { label: "Employer", value: "All Sponsored Patients", options: ["All Sponsored Patients"] },
    { label: "Division", value: "All Divisions", options: ["All Divisions"] },
    { label: "DPC", value: "All DPCs", options: ["All DPCs"] },
    { label: "Physician", value: "All Physicians", options: ["All Physicians"] },
  ];

  return (
    <Page title="Cost Savings" chips={costSavingsChips}>
      {/* Top Grid Area */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3 stagger-section">
        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Total Savings KPI */}
          <div className="flex flex-col rounded-2xl border border-transparent bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Total Savings</span>
              <Info className="size-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-3xl font-bold tracking-tight text-emerald-600 mb-1 tabular-nums">
                $1,577,117
              </div>
              <p className="text-xs text-muted-foreground">
                Difference between value and investment.
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="flex flex-col rounded-2xl border border-transparent bg-card p-5 shadow-sm">
            <ul className="space-y-2 text-xs text-foreground list-disc pl-4">
              <li>Savings are based on encounter counts, CPT codes, and fee-for-service rates from DPC locations.</li>
              <li>Procedure pricing uses Healthcare Bluebook or CMS fee schedules.</li>
              <li>Fallback CPT: Defaults to 99215 (In-person) or 99443 (telemed/chat) if code is unavailable.</li>
              <li>Employer Investment = Monthly rate x active adult/dependent members at month-end.</li>
              <li>Total Savings = Total Value - Employer Investment.</li>
            </ul>
          </div>
        </div>

        {/* Right Column (Overview Chart) */}
        <div className="flex flex-col rounded-2xl border border-transparent bg-card p-6 shadow-sm lg:col-span-2 min-h-[350px]">
          <h3 className="mb-6 text-sm font-medium text-foreground">Overview</h3>
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overviewData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={60}>
                <CartesianGrid vertical={false} horizontal={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'var(--foreground)' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} 
                  tickFormatter={(val) => `$${val.toLocaleString()}`}
                  domain={[0, 1800000]}
                  ticks={[0, 450000, 900000, 1350000, 1800000]}
                />
                <RechartsTooltip 
                  content={<ChartTooltip valueFormatter={(v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)} />}
                  cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={800} animationEasing="ease-out">
                  {overviewData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Section (Pie Chart Breakdown) */}
      <div className="mb-6 flex flex-col rounded-2xl border border-transparent bg-card p-6 shadow-sm min-h-[400px] stagger-section">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground">Total Value - Breakdown (Service Types)</h3>
          <p className="text-xs text-muted-foreground mt-1">Note: Hover service types to highlight, click legends for patient details.</p>
        </div>
        
        <div className="flex flex-1 flex-col md:flex-row items-center gap-8">
          {/* Legend */}
          <div className="flex-1 space-y-2">
            {pieData.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1"
                style={{ opacity: activeIndex === undefined || activeIndex === index ? 1 : 0.4 }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
              >
                <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}: {formatCurrency(item.value)}
              </div>
            ))}
          </div>

          {/* Pie Chart */}
          <div className="flex-1 w-full h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={120}
                  dataKey="displayValue"
                  stroke="var(--background)"
                  strokeWidth={2}
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(undefined)}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  content={<ChartTooltip valueFormatter={(v) => formatCurrency(v)} />}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section (Data Table) */}
      <div className="rounded-2xl border border-transparent bg-card shadow-sm overflow-hidden flex flex-col min-h-[200px] stagger-section">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="px-4 py-3">Patient ID</th>
                <th className="px-4 py-3">Patient Name</th>
                <th className="px-4 py-3">Patient Email</th>
                <th className="px-4 py-3">CPT Code : # of Visits</th>
                <th className="px-4 py-3">Employer</th>
                <th className="px-4 py-3">DPC</th>
                <th className="px-4 py-3">Physician</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty state matches the mockup */}
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground text-xs">
                  Click a service to show or hide patient details
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
