import { Page } from "../../components/layout/Page";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { Panel } from "../../components/dashboard/EmptyState";
import { AreaTrend } from "../../components/dashboard/charts";
import { baseChips } from "../../data/filters";
import { totalActivePatientsTrend } from "../../data/datasets";

const noteLines = [
  "Date Range < 15 Days: Daily data, each day as a unit.",
  "Date Range 15-90 Days: Weekly data, each point as the week's total from its first day.",
  "Date Range 91-548 Days (~1.5 Years): Monthly data, each month as a single point.",
  "Date Range > 548 Days (~1.5 Years): Yearly data, each year as a single point.",
];

export default function TotalActivePatients() {
  return (
    <Page
      title="Total Active Patients (Selected Duration)"
      crumbs={[{ label: "Engagement and Utilization", to: "/engagement" }]}
      chips={baseChips}
    >
      <KpiCard
        className="max-w-xs"
        title="Total Active Patients (Selected Duration)"
        value="2823"
        caption="Total signed-up active patients."
        info="This is the cumulative count of active patients who have signed up for the Direct Primary Care plan, between the selected Start and End dates."
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
          data={totalActivePatientsTrend}
          series={[{ key: "value", name: "Total Active Patients (Selected Duration)", color: "var(--chart-1)" }]}
          xLabel="Time Period (Yearly)"
          yLabel="Total Active Patients (Selected Duration)"
        />
      </Panel>
    </Page>
  );
}
