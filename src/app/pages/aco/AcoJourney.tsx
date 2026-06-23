import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Page } from "../../components/layout/Page";
import { acoChips } from "../../data/filters";

export default function AcoJourney() {
  const mockPatients = Array.from({ length: 12 }).map((_, i) => {
    const idNum = (i + 1).toString().padStart(4, "0");
    const mrnNum = (i + 1).toString().padStart(8, "0");
    return {
      id: `P${idNum}`,
      mrn: `MRN${mrnNum}`,
    };
  });

  return (
    <Page title="Patient-Centered Journey" crumbs={[{ label: "ACO Insights" }]} chips={acoChips}>
      <div className="space-y-6">
      
      <div className="flex items-center gap-3">
        <input 
          type="text" 
          placeholder="Enter Patient ID (e.g., P001)" 
          className="w-[280px] rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <Button className="gap-2">
          <Search className="size-4" />
          Search
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center py-6 text-sm text-muted-foreground">
        No patient selected or data available.
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-foreground">1000 Patient(s) Match Current Filters</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-3 max-h-[500px]">
          {mockPatients.map((p, i) => (
            <div 
              key={i} 
              className="rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors"
            >
              Patient ID: {p.id} (MRN: {p.mrn}) - Click to view timeline
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4 flex items-center justify-end gap-4 text-sm text-muted-foreground bg-muted/50">
          <span>Page 1 of 20</span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded px-2 py-1 text-muted-foreground cursor-not-allowed opacity-50">
              <ChevronLeft className="size-4" />
              Previous
            </button>
            <button className="flex items-center gap-1 rounded px-2 py-1 text-foreground hover:bg-accent transition-colors">
              Next
              <ChevronRight className="size-4" />
            </button>
      </div>
        </div>
      </div>
      </div>
    </Page>
  );
}
