import { useState } from "react";
import { Page } from "../../components/layout/Page";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { Panel } from "../../components/dashboard/EmptyState";
import { AreaTrend } from "../../components/dashboard/charts";
import { DataTable, type Column } from "../../components/dashboard/DataTable";
import { IdCell } from "../../components/dashboard/cells";
import { ToggleTabs } from "../../components/dashboard/ToggleTabs";
import { baseChips } from "../../data/filters";
import { digitalEngagement, digitalEngagementTrend } from "../../data/datasets";

type Row = (typeof digitalEngagement)[number];

const columns: Column<Row>[] = [
  { key: "id", header: "Patient ID", cell: (r) => <IdCell id={r.id} /> },
  { key: "name", header: "Patient Name" },
  { key: "messageType", header: "Message Type" },
  { key: "date", header: "Last Message Date Time" },
  { key: "employer", header: "Employer" },
  { key: "dpc", header: "DPC" },
  { key: "physician", header: "Physician" },
];

const noteLines = [
  "Date Range = 31 Days: Daily data, each day as a unit.",
  "Date Range 31-90 Days: Weekly data, each point as the week's total from its first day.",
  "Date Range 91-548 Days (1-1.5 Years): Monthly data, each month as a single point.",
  "Date Range > 548 Days (>1.5 Years): Yearly data, each year as a single point.",
];

export default function DigitalEngagement() {
  const [tab, setTab] = useState("overall");
  const rows = tab === "afterhours" ? digitalEngagement.filter((_, i) => i % 2 === 0) : digitalEngagement;

  return (
    <Page
      title="Digital Engagement"
      crumbs={[{ label: "Engagement and Utilization", to: "/engagement" }]}
      chips={baseChips}
    >
      <KpiCard
        className="max-w-xs"
        title="Digital Engagement"
        subs={[{ value: "65", label: "Overall" }, { value: "65", label: "AfterHours (100%)" }]}
        info="This is the count of all active adult patients who have communicated with the practice via digital channels (email, secure message, SMS). The 'Overall' count provide the total digital communications, while 'Afterhours' count and percentage includes only those patients who communicated outside regular business hours."
      />

      <Panel>
        <ul className="mb-3 space-y-0.5 text-xs text-muted-foreground">
          {noteLines.map((l) => (
            <li key={l}>• {l}</li>
          ))}
        </ul>
        <AreaTrend
          data={digitalEngagementTrend}
          series={[{ key: "value", name: "Digital Engagement", color: "#16a34a" }]}
          xLabel="Time Period (Yearly)"
          yLabel="Patient Count"
        />
      </Panel>

      <ToggleTabs
        value={tab}
        onChange={setTab}
        options={[
          { value: "overall", label: "Overall (692)" },
          { value: "afterhours", label: "AfterHours (692)" },
        ]}
      />
      <DataTable columns={columns} rows={rows} rowKey={(r, i) => r.id + i} />
    </Page>
  );
}
