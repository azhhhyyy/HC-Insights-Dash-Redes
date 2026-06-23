import { ReactNode } from "react";
import { Activity, Stethoscope, FileText, Lightbulb, User, X } from "lucide-react";
import { Sheet, SheetContent, SheetClose } from "../../components/ui/sheet";

type PatientProfileSidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: any | null;
};

export function PatientProfileSidebar({ open, onOpenChange, patient }: PatientProfileSidebarProps) {
  if (!patient) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-[450px] sm:max-w-[450px] p-0 overflow-y-auto bg-white">
        {/* Hide default close button using CSS or just rely on z-index covering it, but we'll add our own right in the flow */}
        <div className="sticky top-0 z-20 border-b bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <User className="size-5 text-primary" />
                <h2 className="text-lg font-semibold text-slate-800">Patient Profile: {patient.name}</h2>
              </div>
              <p className="text-[13px] text-slate-500">
                MRN: {patient.mrn} • Age: 74 • Gender: Male
              </p>
            </div>
            <SheetClose className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none">
              <X className="size-5 text-slate-500" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6">
          {/* General Information */}
          <div className="rounded-xl border bg-white p-4 shadow-xs">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Activity className="size-4 text-primary" />
              General Information
            </h3>
            <div className="grid grid-cols-[130px_1fr] gap-y-3 text-[13px]">
              <span className="text-slate-500">Risk Score</span>
              <div>
                <span className="inline-flex h-6 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  57
                </span>
              </div>

              <span className="text-slate-500">Ethnicity</span>
              <span className="font-medium text-slate-700">Caucasian</span>

              <span className="text-slate-500">Family History</span>
              <span className="font-medium text-slate-700">Significant family history of related conditions</span>

              <span className="text-slate-500">Lifestyle Factors</span>
              <span className="font-medium text-slate-700">Current Smoker, Sedentary</span>
            </div>
          </div>

          {/* Clinical Information */}
          <div className="rounded-xl border bg-white p-4 shadow-xs">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Stethoscope className="size-4 text-primary" />
              Clinical Information
            </h3>
            <div className="grid grid-cols-[130px_1fr] gap-y-3 text-[13px]">
              <span className="text-slate-500">Suspected HCC</span>
              <span className="font-medium text-slate-700">Chronic Kidney Disease Stage 3-4 / Consider Diabetes</span>

              <span className="text-slate-500">Classification</span>
              <div>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[13px] font-medium text-slate-600">
                  Proactive
                </span>
              </div>

              <span className="text-slate-500">Clinical Indicators</span>
              <span className="font-medium text-slate-700">Indicator A1, Indicator B1, Lab X1 Abnormal</span>

              <span className="text-slate-500">Comorbidities</span>
              <span className="font-medium text-slate-700">Chronic Condition 1, Past Illness 9, Syndrome 15, Chronic Kidney Disease Stage 3-4, Type 2 Diabetes Mellitus</span>

              <span className="text-slate-500">Medications</span>
              <span className="font-medium text-slate-700">Medication 1 IR, Drug Class A, ACE Inhibitor</span>
            </div>
          </div>

          {/* HCC Metrics & Status */}
          <div className="rounded-xl border bg-white p-4 shadow-xs">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <FileText className="size-4 text-primary" />
              HCC Metrics & Status
            </h3>
            <div className="grid grid-cols-[130px_1fr] gap-y-3 text-[13px]">
              <span className="text-slate-500">AWV Status</span>
              <div>
                <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-[13px] font-medium text-white">
                  Completed
                </span>
              </div>

              <span className="text-slate-500">Last AWV Date</span>
              <span className="font-medium text-slate-700">Sep 2, 2025</span>

              <span className="text-slate-500">Doc. Accuracy</span>
              <span className="font-medium text-slate-700">73%</span>

              <span className="text-slate-500">Risk Adj. Factor</span>
              <span className="font-medium text-slate-700">0.823</span>
            </div>
          </div>

          {/* AI Risk Explanation */}
          <div className="rounded-xl border bg-white p-4 shadow-xs">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Lightbulb className="size-4 text-primary" />
              AI Risk Explanation
            </h3>
            <div className="rounded-md border border-pink-100 bg-pink-50/50 p-3 text-[13px] text-pink-900/80">
              AI explanation feature is currently unavailable in this build.
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
