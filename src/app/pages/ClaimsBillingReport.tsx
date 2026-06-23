import { Page } from "../components/layout/Page";
import { DataTable, type Column } from "../components/dashboard/DataTable";
import { IdCell } from "../components/dashboard/cells";
import { claimsChips } from "../data/filters";
import { claimsBilling, type BillingRow } from "../data/datasets";

const columns: Column<BillingRow>[] = [
  { key: "id", header: "Patient ID", cell: (r) => <IdCell id={r.id} /> },
  { key: "name", header: "Patient Name" },
  { key: "cpt", header: "CPT Code", cell: (r) => <span className="font-mono text-xs">{r.cpt}</span> },
  { key: "description", header: "CPT Code Description" },
  { key: "dateOfService", header: "Date of Service" },
  { key: "rate", header: "Rate Charged", align: "right" },
];

export default function ClaimsBillingReport() {
  const chips = claimsChips.filter((c) => c.label !== "Division");
  return (
    <Page title="Claims Billing Report" chips={chips}>
      <DataTable columns={columns} rows={claimsBilling} rowKey={(r, i) => r.id + i} />
    </Page>
  );
}
