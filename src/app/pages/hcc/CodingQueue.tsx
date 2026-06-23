import { useState } from "react";
import { ListTodo, ClipboardList, CheckCircle2, XCircle } from "lucide-react";
import { DataTable, type Column } from "../../components/dashboard/DataTable";
import { Page } from "../../components/layout/Page";
import { hccChips } from "../../data/filters";
import { PATIENT_DATA, PatientRow } from "../../data/patients";
import { PatientProfileSidebar } from "./PatientProfileSidebar";
import { Icd10Code } from "../../components/ui/icd10-code";

export default function HccCodingQueue() {
  const [patients, setPatients] = useState<PatientRow[]>(PATIENT_DATA);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const handleUpdateStatus = (id: string, newStatus: PatientRow["codingStatus"]) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, codingStatus: newStatus } : p));
  };

  const columns: Column<PatientRow>[] = [
    {
      key: "name",
      header: "Patient",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800">{row.name}</span>
          <span className="text-[13px] text-slate-400">{row.mrn}</span>
        </div>
      ),
    },
    {
      key: "encounter",
      header: "Encounter",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="text-slate-600">{row.encounterId}</span>
          <span className="text-[13px] text-slate-400">{row.encounterDate}</span>
        </div>
      ),
    },
    {
      key: "diagnosis",
      header: "Primary Diagnosis",
      cell: (row) => <span className="text-slate-600">{row.diagnosis}</span>,
    },
    {
      key: "suggestions",
      header: "AI Suggested HCCs",
      cell: (row) => (
        <div className="flex flex-wrap gap-1.5">
          {row.suggestions.length > 0 ? (
            row.suggestions.map((sug, i) => (
              <Icd10Code
                key={i} 
                code={sug.code}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200"
              >
                {sug.code} <span className="ml-1 opacity-70">({sug.score})</span>
              </Icd10Code>
            ))
          ) : (
            <span className="text-slate-400 text-xs italic">None</span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => {
        if (row.codingStatus === "Reviewed") {
          return (
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-700">
              Reviewed
            </span>
          );
        }
        if (row.codingStatus === "Flagged") {
          return (
            <span className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-medium text-white shadow-sm">
              Flagged
            </span>
          );
        }
        return (
          <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-white shadow-sm">
            AI Suggested
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      cell: (row) => (
        <div className="flex items-center justify-center gap-2.5">
          <div className="group relative flex justify-center">
            <button 
              onClick={() => setSelectedPatientId(row.id)}
              className="grid size-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <ClipboardList className="size-[18px]" />
            </button>
            <div className="pointer-events-none absolute bottom-full mb-1.5 z-50 flex flex-col items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="whitespace-nowrap rounded bg-slate-800 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
                Review Patient Chart / Edit Codes
              </span>
              <div className="h-0 w-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-slate-800" />
            </div>
          </div>

          <div className="group relative flex justify-center">
            <button 
              onClick={() => handleUpdateStatus(row.id, "Reviewed")}
              className={`grid size-8 place-items-center rounded-full transition-colors ${
                row.codingStatus === "Reviewed" ? "text-green-600 bg-green-100" : "text-green-500 hover:bg-green-50"
              }`}
            >
              <CheckCircle2 className="size-[18px]" />
            </button>
            <div className="pointer-events-none absolute bottom-full mb-1.5 z-50 flex flex-col items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="whitespace-nowrap rounded bg-slate-800 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
                Accept AI Suggestions
              </span>
              <div className="h-0 w-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-slate-800" />
            </div>
          </div>

          <div className="group relative flex justify-center">
            <button 
              onClick={() => handleUpdateStatus(row.id, "Flagged")}
              className={`grid size-8 place-items-center rounded-full transition-colors ${
                row.codingStatus === "Flagged" ? "text-red-600 bg-red-100" : "text-red-400 hover:bg-red-50"
              }`}
            >
              <XCircle className="size-[18px]" />
            </button>
            <div className="pointer-events-none absolute bottom-full mb-1.5 z-50 flex flex-col items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="whitespace-nowrap rounded bg-slate-800 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
                Flag for Deeper Review
              </span>
              <div className="h-0 w-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-slate-800" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Page title="HCC Coding Queue" crumbs={[{ label: "HCC Insights" }]} chips={hccChips}>
        <div className="space-y-4">
          <DataTable
            columns={columns}
            rows={patients}
            rowKey={(row) => row.id}
            pageSize={10}
          />
        </div>
      </Page>

      {/* Patient Details Sidebar */}
      <PatientProfileSidebar
        open={selectedPatientId !== null}
        onOpenChange={(open) => !open && setSelectedPatientId(null)}
        patient={patients.find((p) => p.id === selectedPatientId) || null}
      />
    </>
  );
}
