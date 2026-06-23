import { Page } from "../../components/layout/Page";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { Panel } from "../../components/dashboard/EmptyState";
import { AreaTrend } from "../../components/dashboard/charts";
import { baseChips } from "../../data/filters";
import { activePatientsTrend } from "../../data/datasets";

const noteLines = [
  "Date Range < 15 Days: Daily data, each day as a unit.",
  "Date Range 15-90 Days: Weekly data, each point as the week's total from its first day.",
  "Date Range 91-548 Days (~1.5 Years): Monthly data, each month as a single point.",
  "Date Range > 548 Days (~1.5 Years): Yearly data, each year as a single point.",
];

export default function ActivePatients() {
  return (
    <Page
      title="Active Patients (As of End Date)"
      crumbs={[{ label: "Engagement and Utilization", to: "/engagement" }]}
      chips={baseChips}
    >
      <KpiCard
        className="max-w-xs"
        title="Active Patients (As of End Date)"
        value="2823"
        caption="Total Active Patients as of End Date."
        info="This is the count of active patients who are Active on a Direct Primary Care plan, as of the Selected End Date."
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
          data={activePatientsTrend}
          series={[{ key: "value", name: "Active Patients (As of End Date)", color: "#16a34a" }]}
          xLabel="Time Period (Yearly)"
          yLabel="Active Patients (As of End Date)"
        />
      </Panel>
    </Page>
  );
}
