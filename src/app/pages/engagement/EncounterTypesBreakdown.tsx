import { useState } from "react";
import { Page } from "../../components/layout/Page";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { Panel } from "../../components/dashboard/EmptyState";
import { HorizontalBar } from "../../components/dashboard/charts";
import { DataTable, type Column } from "../../components/dashboard/DataTable";
import { IdCell } from "../../components/dashboard/cells";
import { baseChips } from "../../data/filters";
import { encounters, encounterTypeBreakdown, type EncounterRow } from "../../data/datasets";

const columns: Column<EncounterRow>[] = [
  { key: "id", header: "Patient ID", cell: (r) => <IdCell id={r.id} /> },
  { key: "name", header: "Patient Name" },
  { key: "encounterId", header: "Encounter ID", cell: (r) => <span className="font-mono text-xs text-slate-500">{r.encounterId}</span> },
  { key: "type", header: "Encounter Type" },
  { key: "date", header: "Encounter Date Time" },
  { key: "employer", header: "Employer" },
  { key: "dpc", header: "DPC" },
  { key: "physician", header: "Physician" },
];

const breakdownSubs = encounterTypeBreakdown.map((d) => ({
  value: `${d.value}%`,
  label: d.name,
  tooltip: `Count: ${d.count.toLocaleString()}`,
}));

export default function EncounterTypesBreakdown() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredRows = selectedType
    ? encounters.filter((r) => r.type.toLowerCase().includes(selectedType.toLowerCase()))
    : [];

  return (
    <Page
      title="Encounter Types - Breakdown"
      crumbs={[{ label: "Engagement and Utilization", to: "/engagement" }]}
      chips={baseChips}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <KpiCard
          title="Total # Encounters"
          value="7214"
          caption="Total encounters during selected timeframe."
          info="This is the total number of encounters that have occurred during the selected period for all employees on the plan, as of the latest date and time the dashboard was updated. This includes office visits, chat (conversations via the Spruce messaging application), and telehealth encounters."
        />
        <KpiCard
          title="Encounter Types - Breakdown"
          subs={breakdownSubs}
          info="This is the breakdown of encounters by type, including in-person, telehealth, and chat (conversations through the Spruce messaging application), for the selected period."
        />
      </div>

      <Panel>
        <HorizontalBar
          data={encounterTypeBreakdown}
          height={380}
          color="var(--chart-3)"
          xLabel="Percentage of Encounters"
          yLabel="Encounter Types"
          domain={[0, 100]}
          xTickFormatter={(v) => `${v}%`}
          valueFormatter={(v) => `${v}%`}
        />
      </Panel>

      <Panel>
        <DataTable
          columns={columns}
          rows={filteredRows}
          rowKey={(r, i) => r.id + i}
          emptyMessage="Click a bar or label to show or hide patient details."
        />
      </Panel>
    </Page>
  );
}
