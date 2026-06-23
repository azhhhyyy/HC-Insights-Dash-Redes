import { Page } from "../../components/layout/Page";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { Panel } from "../../components/dashboard/EmptyState";
import { AreaTrend } from "../../components/dashboard/charts";
import { baseChips } from "../../data/filters";
import { totalMessagesTrend } from "../../data/datasets";

const noteLines = [
  "Date Range < 15 Days: Daily data, each day as a unit.",
  "Date Range 15-90 Days: Weekly data, each point as the week's total from its first day.",
  "Date Range 91-548 Days (~1.5 Years): Monthly data, each month as a single point.",
  "Date Range > 548 Days (~1.5 Years): Yearly data, each year as a single point.",
];

export default function TotalMessages() {
  return (
    <Page
      title="Total # Messages"
      crumbs={[{ label: "Engagement and Utilization", to: "/engagement" }]}
      chips={[...baseChips, { id: "sender", label: "Sender", value: "All Senders" }]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[auto_1fr]">
        <KpiCard
          className="min-w-[240px]"
          title="Total # Messages"
          value="446"
          caption="Total messages during selected timeframe."
          selected
          info="This is the total number of phone calls, chats, texts, and messages exchanged during the selected period with all employees on the plan, through the communication system. It includes messages from both the patient and the doctor/doctor's team, covering all conversations."
        />
        <KpiCard
          title="Message Types - Breakdown"
          subs={[{ value: "100%", label: "Chat" }]}
          info="This is the breakdown of messages across different types, such as chat, call, and email, for the selected period."
        />
      </div>

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
          data={totalMessagesTrend}
          series={[{ key: "value", name: "Total Messages", color: "var(--chart-2)" }]}
          xLabel="Time Period (Yearly)"
          yLabel="Total Messages"
          height={380}
        />
      </Panel>
    </Page>
  );
}
