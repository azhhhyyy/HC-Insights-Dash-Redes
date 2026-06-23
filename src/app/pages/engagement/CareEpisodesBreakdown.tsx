import { Page } from "../../components/layout/Page";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { Panel } from "../../components/dashboard/EmptyState";
import { HorizontalBar } from "../../components/dashboard/charts";
import { DataTable, type Column } from "../../components/dashboard/DataTable";
import { IdCell } from "../../components/dashboard/cells";
import { baseChips } from "../../data/filters";
import { careEpisodeBreakdown, careEpisodeRows, type CareEpisodeRow } from "../../data/datasets";

const columns: Column<CareEpisodeRow>[] = [
  { key: "id", header: "Patient ID", cell: (r) => <IdCell id={r.id} /> },
  { key: "name", header: "Patient Name" },
  { key: "encounterId", header: "Encounter ID", cell: (r) => <span className="font-mono text-xs text-slate-500">{r.encounterId}</span> },
  { key: "cptCode", header: "CPT Code", cell: (r) => <span className="font-mono text-xs">{r.cptCode}</span> },
  { key: "date", header: "Encounter Date Time" },
  { key: "employer", header: "Employer" },
  { key: "dpc", header: "DPC" },
  { key: "physician", header: "Physician" },
];

const breakdownSubs = careEpisodeBreakdown.map((d) => ({
  value: `${d.value}%`,
  label: d.name,
  tooltip: `Count: ${d.count.toLocaleString()}`,
}));

export default function CareEpisodesBreakdown() {
  return (
    <Page
      title="Care Episodes – Breakdown"
      crumbs={[{ label: "Engagement and Utilization", to: "/engagement" }]}
      chips={baseChips}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[auto_1fr]">
        <KpiCard
          title="Total # Care Episodes"
          value="39903"
          caption="Total recorded care episodes."
        />
        <KpiCard
          title="Care Episodes - Breakdown"
          subs={breakdownSubs}
          info="This is the breakdown of encounters by the type of care provided, examples include Med Management, Blood Work, etc."
        />
      </div>

      <Panel>
        <HorizontalBar
          data={careEpisodeBreakdown}
          height={520}
          color="#3b82f6"
          xLabel="Percentage of Episodes"
          yLabel="Care Episodes"
          domain={[0, 100]}
          xTickFormatter={(v) => `${v}%`}
          valueFormatter={(v) => `${v}%`}
        />
      </Panel>

      <Panel>
        <DataTable
          columns={columns}
          rows={[]}
          rowKey={(r, i) => r.id + i}
          emptyMessage="Click a bar or label to show or hide patient details."
        />
      </Panel>
    </Page>
  );
}
