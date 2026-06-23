import { DataTable, type Column } from "../../components/dashboard/DataTable";
import { Page } from "../../components/layout/Page";
import { acoChips } from "../../data/filters";

type GapRow = {
  id: string;
  patientId: string;
  gapType: string;
  dueDate: string;
  outreachStatus: "Attempted Outreach" | "Scheduled" | "Closed - Unresolved" | "Resolved" | "Open";
  resolutionDate: string;
  notes: string;
};

const mockGaps: GapRow[] = [
  { id: "1", patientId: "P0002", gapType: "Influenza Immunization - No record of flu shot in period", dueDate: "Jul 31, 2026", outreachStatus: "Attempted Outreach", resolutionDate: "N/A", notes: "Provider: NPI1000000015" },
  { id: "2", patientId: "P0004", gapType: "Influenza Immunization - No record of flu shot in period", dueDate: "Jul 31, 2026", outreachStatus: "Scheduled", resolutionDate: "N/A", notes: "Provider: NPI1000000007" },
  { id: "3", patientId: "P0005", gapType: "Influenza Immunization - No record of flu shot in period", dueDate: "Jul 31, 2026", outreachStatus: "Closed - Unresolved", resolutionDate: "N/A", notes: "Provider: NPI1000000029" },
  { id: "4", patientId: "P0006", gapType: "Influenza Immunization - No record of flu shot in period", dueDate: "Jul 31, 2026", outreachStatus: "Resolved", resolutionDate: "May 26, 2026", notes: "Provider: NPI1000000029" },
  { id: "5", patientId: "P0011", gapType: "Influenza Immunization - No record of flu shot in period", dueDate: "Jul 31, 2026", outreachStatus: "Closed - Unresolved", resolutionDate: "N/A", notes: "Provider: NPI1000000020" },
  { id: "6", patientId: "P0014", gapType: "Influenza Immunization - No record of flu shot in period", dueDate: "Jul 31, 2026", outreachStatus: "Attempted Outreach", resolutionDate: "N/A", notes: "Provider: NPI1000000007" },
  { id: "7", patientId: "P0018", gapType: "Influenza Immunization - No record of flu shot in period", dueDate: "Jul 31, 2026", outreachStatus: "Open", resolutionDate: "N/A", notes: "Provider: NPI1000000016" },
  { id: "8", patientId: "P0021", gapType: "Influenza Immunization - No record of flu shot in period", dueDate: "Jul 31, 2026", outreachStatus: "Scheduled", resolutionDate: "N/A", notes: "Provider: NPI1000000013" },
  { id: "9", patientId: "P0023", gapType: "Influenza Immunization - No record of flu shot in period", dueDate: "Jul 31, 2026", outreachStatus: "Attempted Outreach", resolutionDate: "N/A", notes: "Provider: NPI1000000037" },
  { id: "10", patientId: "P0028", gapType: "Influenza Immunization - No record of flu shot in period", dueDate: "Jul 31, 2026", outreachStatus: "Resolved", resolutionDate: "May 23, 2026", notes: "Provider: NPI1000000012" },
];

const columns: Column<GapRow>[] = [
  {
    key: "patientId",
    header: "Patient ID",
    cell: (row) => <span className="text-foreground font-medium">{row.patientId}</span>,
  },
  {
    key: "gapType",
    header: "Gap Type",
    cell: (row) => <span className="text-muted-foreground">{row.gapType}</span>,
  },
  {
    key: "dueDate",
    header: "Due Date",
    cell: (row) => <span className="text-muted-foreground">{row.dueDate}</span>,
  },
  {
    key: "outreachStatus",
    header: "Outreach Status",
    cell: (row) => {
      if (row.outreachStatus === "Resolved") {
        return <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-sm">Resolved</span>;
      }
      if (row.outreachStatus === "Open") {
        return <span className="inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">Open</span>;
      }
      return <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-foreground">{row.outreachStatus}</span>;
    },
  },
  {
    key: "resolutionDate",
    header: "Resolution Date",
    cell: (row) => <span className="text-muted-foreground">{row.resolutionDate}</span>,
  },
  {
    key: "notes",
    header: "Notes",
    cell: (row) => <span className="text-muted-foreground">{row.notes}</span>,
  },
];

export default function AcoGapsTracker() {
  return (
    <Page title="Gaps in Care Tracker" crumbs={[{ label: "ACO Insights" }]} chips={acoChips}>
      <div className="space-y-6">
      
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">Gaps in Care Tracker</h3>
        </div>
        
        <div className="p-2">
          <DataTable
            columns={columns}
            rows={mockGaps}
            rowKey={(row) => row.id}
            pageSize={10}
          />
        </div>
      </div>
        </div>
    </Page>
  );
}
