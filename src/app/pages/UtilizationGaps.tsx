import { UserX, Info, MessageSquare } from "lucide-react";
import { Page } from "../components/layout/Page";
import { KpiCard } from "../components/dashboard/KpiCard";
import { DataTable, type Column } from "../components/dashboard/DataTable";
import { IdCell, BoolBadge } from "../components/dashboard/cells";
import { utilizationGapsChips } from "../data/filters";
import { utilizationGaps, type GapPatientRow } from "../data/datasets";
import { Tooltip, TooltipTrigger, TooltipContent } from "../components/ui/tooltip";

const DIAGNOSIS_MAP: Record<string, string> = {
  "E78.5": "Hyperlipidemia, unspecified",
  "I10": "Essential (primary) hypertension",
  "E11.9": "Type 2 diabetes mellitus without complications",
  "E78.2": "Mixed hyperlipidemia",
  "J45.909": "Unspecified asthma, uncomplicated",
  "M54.5": "Low back pain",
  "—": "No diagnosis provided"
};

const columns: Column<GapPatientRow>[] = [
  {
    key: "message",
    header: "Message",
    align: "center",
    cell: (r) => (
      <Tooltip>
        <TooltipTrigger className="cursor-pointer transition-transform hover:scale-110 active:scale-95">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-primary/20 hover:scale-110 active:scale-95">
            <MessageSquare className="size-4 transition-[opacity,filter,transform] duration-200" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Send message to Patient
        </TooltipContent>
      </Tooltip>
    ),
  },
  { key: "id", header: "Patient ID", cell: (r) => <IdCell id={r.id} /> },
  { key: "name", header: "Patient Name" },
  { key: "age", header: "Age" },
  { key: "phone", header: "Phone Number" },
  { 
    key: "condition", 
    header: (
      <div className="flex items-center gap-1.5">
        Medical Condition
        <Tooltip>
          <TooltipTrigger className="cursor-help">
            <Info className="size-3.5 text-slate-400 hover:text-primary transition-colors" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[250px]">
            Hover mouse over codes for descriptions.
          </TooltipContent>
        </Tooltip>
      </div>
    ),
    cell: (r) => (
      <Tooltip>
        <TooltipTrigger className="cursor-help underline decoration-dashed underline-offset-2">
          {r.condition}
        </TooltipTrigger>
        <TooltipContent>
          {DIAGNOSIS_MAP[r.condition] || "Unknown diagnosis code"}
        </TooltipContent>
      </Tooltip>
    )
  },
  {
    key: "spruce",
    header: "Spruce App",
    cell: (r) => <BoolBadge value={r.spruce} />,
  },
  { key: "lastEncounter", header: "Last Encounter Date Time" },
  { key: "lastMessage", header: "Last Message Date Time" },
  { key: "employer", header: "Employer" },
  { key: "dpc", header: "DPC" },
  { key: "physician", header: "Physician" },
];

export default function UtilizationGaps() {
  return (
    <Page title="Utilization Gaps" chips={utilizationGapsChips}>
      <div className="stagger-section mb-6">
        <KpiCard
          icon={UserX}
          className="max-w-sm"
          title="Patients with Utilization Gaps"
        value={(utilizationGaps.length * 25).toLocaleString()}
        caption="Patients meeting utilization gap criteria"
        info="This count represents patients meeting the selected utilization gap criteria. This dashboard is exclusive to network or DPC users and unavailable to employer organizations. Use it to improve employee engagement and utilization."
        />
      </div>
      <div className="stagger-section">
        <DataTable columns={columns} rows={utilizationGaps} rowKey={(r) => r.id} pageSize={10} />
      </div>
    </Page>
  );
}
