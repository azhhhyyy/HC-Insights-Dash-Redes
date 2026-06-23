import { useState } from "react";
import { Page } from "../../components/layout/Page";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { Panel } from "../../components/dashboard/EmptyState";
import { AreaTrend } from "../../components/dashboard/charts";
import { ToggleTabs } from "../../components/dashboard/ToggleTabs";
import { DataTable, type Column } from "../../components/dashboard/DataTable";
import { IdCell } from "../../components/dashboard/cells";
import { baseChips } from "../../data/filters";
import {
  patientTouchRatioTrend,
  patientsWithEncounter,
  patientsWithoutEncounter,
  type PatientTouchRow,
} from "../../data/datasets";

const columns: Column<PatientTouchRow>[] = [
  { key: "id", header: "Patient ID", cell: (r) => <IdCell id={r.id} /> },
  { key: "name", header: "Patient Name" },
  { key: "age", header: "Age" },
  { key: "date", header: "Encounter Date Time" },
  { key: "employer", header: "Employer" },
  { key: "dpc", header: "DPC" },
  { key: "physician", header: "Physician" },
];

const noteLines = [
  "Date Range < 15 Days: Daily data, each day as a unit.",
  "Date Range 15-90 Days: Weekly data, each point as the week's total from its first day.",
  "Date Range 91-548 Days (~1.5 Years): Monthly data, each month as a single point.",
  "Date Range > 548 Days (~1.5 Years): Yearly data, each year as a single point.",
];

export default function PatientTouchRatio() {
  const [tab, setTab] = useState("with");

  const rows = tab === "with" ? patientsWithEncounter : patientsWithoutEncounter;

  return (
    <Page
      title="Patient Touch Ratio"
      crumbs={[{ label: "Engagement and Utilization", to: "/engagement" }]}
      chips={baseChips}
    >
      <KpiCard
        className="max-w-xs"
        title="Patient Touch Ratio"
        value="99.2%"
        caption="Percent of active patients with encounters."
        info="This ratio, expressed as a percentage, represents the proportion of active patients who have had any type of encounter during the selected period."
      />

      <Panel>
        <p className="mb-2 text-xs text-muted-foreground">
          Note: Dynamic date range on the x-axis in the graph.
        </p>
        <ul className="mb-3 space-y-0.5 text-xs text-muted-foreground">
          {noteLines.map((l) => (
            <li key={l}>• {l}</li>
          ))}
        </ul>
        <AreaTrend
          data={patientTouchRatioTrend}
          series={[{ key: "value", name: "Patient Touch Ratio", color: "var(--chart-2)" }]}
          xLabel="Time Period (Yearly)"
          yLabel="Percent of Patients"
          domain={[0, 100]}
          yTickFormatter={(v) => `${v}%`}
        />
      </Panel>

      <ToggleTabs
        value={tab}
        onChange={setTab}
        options={[
          { label: "Patients with Encounter (2801)", value: "with" },
          { label: "Patients without Encounter (22)", value: "without" },
        ]}
      />

      <Panel>
        <DataTable columns={columns} rows={rows} rowKey={(r, i) => r.id + i} />
      </Panel>
    </Page>
  );
}
