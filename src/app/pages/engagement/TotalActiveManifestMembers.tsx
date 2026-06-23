import { useState } from "react";
import { Page } from "../../components/layout/Page";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { Panel } from "../../components/dashboard/EmptyState";
import { DataTable, type Column } from "../../components/dashboard/DataTable";
import { IdCell } from "../../components/dashboard/cells";
import { FilterChip } from "../../components/dashboard/FilterBar";
import {
  activeManifestMembers,
  inactiveManifestMembers,
  type ManifestMemberRow,
} from "../../data/datasets";

const columns: Column<ManifestMemberRow>[] = [
  { key: "id", header: "Manifest Member ID", cell: (r) => <IdCell id={r.id} /> },
  { key: "name", header: "Member Name" },
  { key: "email", header: "Member Patient Email" },
  { key: "status", header: "Membership Status" },
  { key: "endDate", header: "Hint Membership End Date" },
  { key: "employer", header: "Employer" },
  { key: "dpc", header: "DPC" },
  { key: "physician", header: "Physician" },
];

export default function TotalActiveManifestMembers() {
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");

  const rows = activeTab === "active" ? activeManifestMembers : inactiveManifestMembers;

  return (
    <Page
      title="Total # Active Manifest Members"
      crumbs={[{ label: "Engagement and Utilization", to: "/engagement" }]}
      chips={[
        { id: "dpc", label: "DPC", value: "All DPCs" },
      ]}
    >
      <div className="flex flex-wrap items-stretch gap-4">
        {/* Main KPI */}
        <KpiCard
          className="min-w-[280px] max-w-xs flex-1"
          title="Total # Active Manifest Members"
          value="225"
          caption="Total active manifest members."
          info="All currently active manifest members on your plan"
        />

        {/* Filters/Tabs */}
        <div className="flex flex-1 flex-wrap gap-4">
          <KpiCard
            className={`min-w-[200px] flex-1 cursor-pointer transition-colors ${
              activeTab === "active" ? "border-primary bg-secondary/60" : "hover:bg-accent/40"
            }`}
            title="Active DPC Members"
            value="153"
            onClick={() => setActiveTab("active")}
            selected={activeTab === "active"}
          />
          <KpiCard
            className={`min-w-[200px] flex-1 cursor-pointer transition-colors ${
              activeTab === "inactive" ? "border-primary bg-secondary/60" : "hover:bg-accent/40"
            }`}
            title="Inactive DPC Members"
            value="72"
            onClick={() => setActiveTab("inactive")}
            selected={activeTab === "inactive"}
          />
        </div>
      </div>

      <Panel>
        <DataTable columns={columns} rows={rows} rowKey={(r, i) => r.id + i} />
      </Panel>
    </Page>
  );
}
