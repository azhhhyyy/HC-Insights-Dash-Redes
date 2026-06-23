import { useState } from "react";
import { Page } from "../../components/layout/Page";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { Panel } from "../../components/dashboard/EmptyState";
import { AreaTrend } from "../../components/dashboard/charts";
import { DataTable, type Column } from "../../components/dashboard/DataTable";
import { IdCell } from "../../components/dashboard/cells";
import { ToggleTabs } from "../../components/dashboard/ToggleTabs";
import { baseChips } from "../../data/filters";
import { prescriptions, prescriptionTrend, type PrescriptionRow } from "../../data/datasets";

const columns: Column<PrescriptionRow>[] = [
  { key: "id", header: "Patient ID", cell: (r) => <IdCell id={r.id} /> },
  { key: "name", header: "Patient Name" },
  { key: "email", header: "Patient Email" },
  { key: "medication", header: "Medication Name" },
  { key: "type", header: "Medication Type" },
  { key: "created", header: "Medication Created Date Time" },
  { key: "employer", header: "Employer" },
  { key: "dpc", header: "DPC" },
  { key: "physician", header: "Physician" },
];

export default function PrescriptionOrders() {
  const [tab, setTab] = useState("overall");
  const rows = tab === "refills" ? prescriptions.filter((_, i) => i % 3 === 0) : prescriptions;

  return (
    <Page
      title="Prescription Orders"
      crumbs={[{ label: "Engagement and Utilization", to: "/engagement" }]}
      chips={baseChips}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <KpiCard
          title="Prescription Orders"
          subs={[{ value: "5417", label: "Overall" }, { value: "726", label: "Refills (13.4%)" }]}
          info="This is the count of all prescription orders. The refill count and percentage provide the count of refill prescription orders and the percentage (% of all overall prescription orders)."
        />
        <KpiCard 
          title="Prescription Orders - Breakdown" 
          value="100%" 
          caption="In-Office Dispensed" 
          info="This is the breakdown of prescription orders by types of prescription dispensed, i.e., “In-Office Dispensed”, “Retail”, and “Mail Order”, for the selected period."
        />
        <KpiCard title="Medication Reconciliation Gap" empty />
      </div>

      <Panel>
        <p className="mb-3 text-xs text-muted-foreground">
          Note: Dynamic date range on the x-axis in the graph.
        </p>
        <AreaTrend
          data={prescriptionTrend}
          series={[
            { key: "overall", name: "Overall", color: "var(--chart-1)" },
            { key: "refills", name: "Refills", color: "#16a34a" },
          ]}
          xLabel="Time Period (Yearly)"
          yLabel="Patient Count"
        />
      </Panel>

      <ToggleTabs
        value={tab}
        onChange={setTab}
        options={[
          { value: "overall", label: "Overall" },
          { value: "refills", label: "Refills" },
        ]}
      />
      <DataTable columns={columns} rows={rows} rowKey={(r, i) => r.id + i} />
    </Page>
  );
}
