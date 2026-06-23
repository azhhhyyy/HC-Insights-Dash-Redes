import { Page } from "../../components/layout/Page";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { Panel } from "../../components/dashboard/EmptyState";
import { HorizontalBar } from "../../components/dashboard/charts";
import { baseChips } from "../../data/filters";
import { messageTypeBreakdown } from "../../data/datasets";

const breakdownSubs = messageTypeBreakdown.map((d) => ({
  value: `${d.value}%`,
  label: d.name,
  tooltip: `Count: ${d.count.toLocaleString()}`,
}));

export default function MessageTypesBreakdown() {
  return (
    <Page
      title="Message Types - Breakdown"
      crumbs={[{ label: "Engagement and Utilization", to: "/engagement" }]}
      chips={[...baseChips, { id: "sender", label: "Sender", value: "All Senders" }]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[auto_1fr]">
        <KpiCard
          className="min-w-[240px]"
          title="Total # Messages"
          value="446"
          caption="Total messages during selected timeframe."
        />
        <KpiCard
          className="bg-secondary/40"
          title="Message Types - Breakdown"
          subs={breakdownSubs}
          selected
          info="This is the breakdown of messages across different types, such as chat, call, and email, for the selected period."
        />
      </div>

      <Panel>
        <HorizontalBar
          data={messageTypeBreakdown}
          height={280}
          color="#3b82f6"
          xLabel="Percentage of Messages"
          yLabel="Message Types"
          domain={[0, 100]}
          xTickFormatter={(v) => `${v}%`}
          valueFormatter={(v) => `${v}%`}
        />
      </Panel>
    </Page>
  );
}
