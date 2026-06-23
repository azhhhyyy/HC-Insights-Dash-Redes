import { Page } from "../../components/layout/Page";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { Panel } from "../../components/dashboard/EmptyState";
import { DataTable, type Column } from "../../components/dashboard/DataTable";
import { IdCell } from "../../components/dashboard/cells";
import { baseChips } from "../../data/filters";
import { afterHoursMessages } from "../../data/datasets";

type MessageRow = typeof afterHoursMessages[0];

const columns: Column<MessageRow>[] = [
  { key: "id", header: "Patient ID", cell: (r) => <IdCell id={r.id} /> },
  { key: "name", header: "Patient Name" },
  { key: "messageType", header: "Message Type" },
  { key: "date", header: "Recieved Date Time" },
  { key: "employer", header: "Employer" },
  { key: "dpc", header: "DPC" },
  { key: "physician", header: "Physician" },
];

export default function TotalAfterHoursMessages() {
  return (
    <Page
      title="Total # After Hours Messages"
      crumbs={[{ label: "Engagement and Utilization", to: "/engagement" }]}
      chips={[...baseChips, { id: "sender", label: "Sender", value: "All Senders" }]}
    >
      <KpiCard
        className="max-w-xs"
        title="Total # After Hours Messages"
        value="369"
        caption="Total messages after hours and weekends."
        info="This is the count of all messages sent after 5 PM and before 8 AM (Local Practice Timezone) on weekdays, as well as anytime during weekends."
      />

      <Panel>
        <DataTable columns={columns} rows={afterHoursMessages} rowKey={(r, i) => r.id + i} />
      </Panel>
    </Page>
  );
}
