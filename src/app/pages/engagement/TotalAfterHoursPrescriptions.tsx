import { useState } from "react";
import { Page } from "../../components/layout/Page";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { Panel } from "../../components/dashboard/EmptyState";
import { ToggleTabs } from "../../components/dashboard/ToggleTabs";
import { DataTable, type Column } from "../../components/dashboard/DataTable";
import { IdCell } from "../../components/dashboard/cells";
import { baseChips } from "../../data/filters";
import {
  afterHoursPrescriptionsOverall,
  afterHoursPrescriptionsRefills,
  type PrescriptionRow,
} from "../../data/datasets";

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

export default function TotalAfterHoursPrescriptions() {
  const [tab, setTab] = useState("overall");

  const rows = tab === "overall" ? afterHoursPrescriptionsOverall : afterHoursPrescriptionsRefills;

  return (
    <Page
      title="Total # After Hours Prescriptions"
      crumbs={[{ label: "Engagement and Utilization", to: "/engagement" }]}
      chips={baseChips}
    >
      <KpiCard
        className="max-w-xs"
        title="Total # After Hours Prescriptions"
        subs={[
          { value: "5382", label: "Overall" },
          { value: "719 (13.4%)", label: "Refills" },
        ]}
        info="This is the count of all after-hours prescription orders. The refills count and percentage provide the refill prescription order count and the percentage (% of all the after-hours prescription orders). All orders made after 5 PM and before 8 AM (Local Practice Timezone) on weekdays, and anytime during weekends or standard federal holidays, are considered after hours."
      />

      <ToggleTabs
        value={tab}
        onChange={setTab}
        options={[
          { label: "Overall", value: "overall" },
          { label: "Refills", value: "refills" },
        ]}
      />

      <Panel>
        <DataTable columns={columns} rows={rows} rowKey={(r, i) => r.id + i} />
      </Panel>
    </Page>
  );
}
