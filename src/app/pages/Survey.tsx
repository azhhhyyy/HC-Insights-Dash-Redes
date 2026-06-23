import { useState } from "react";
import { Star, Smile, Send, TriangleAlert } from "lucide-react";
import { Page } from "../components/layout/Page";
import { KpiCard } from "../components/dashboard/KpiCard";
import { Panel } from "../components/dashboard/EmptyState";
import { ToggleTabs, TextTabs } from "../components/dashboard/ToggleTabs";
import { VerticalBar, LineTrend } from "../components/dashboard/charts";
import { DataTable, type Column } from "../components/dashboard/DataTable";
import { IdCell } from "../components/dashboard/cells";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { surveyChips } from "../data/filters";
import {
  csatDistribution,
  csatTrend,
  surveyRecent,
  surveySent,
  surveyTopEmployers,
  surveyTopPhysicians,
  type SurveyEncounterRow,
} from "../data/datasets";

const TABS = [
  { value: "recent", label: "Recent Encounters" },
  { value: "sent", label: "Survey Sent" },
  { value: "completed", label: "Completed Surveys" },
  { value: "dashboard", label: "Survey Dashboard" },
];

const recentColumns: Column<SurveyEncounterRow>[] = [
  { key: "id", header: "Patient ID", cell: (r) => <IdCell id={r.id} /> },
  { key: "name", header: "Patient Name" },
  { key: "email", header: "Patient Email" },
  { key: "lastResult", header: "Last CSAT Result" },
  { key: "lastEncounter", header: "Last Encounter" },
  { key: "employer", header: "Employer" },
  { key: "dpc", header: "DPC" },
  { key: "physician", header: "Physician" },
];

function MiniTable({
  firstHeader,
  rows,
}: {
  firstHeader: string;
  rows: { label: string; responses: number; avg: string; satisfied: string; low: string }[];
}) {
  const color = (v: string) => {
    const n = parseFloat(v);
    if (Number.isNaN(n)) return "";
    if (n >= 5) return "text-green-600";
    if (n >= 3) return "text-amber-500";
    return "text-destructive";
  };
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/60 hover:bg-muted/60">
            <TableHead className="text-xs text-muted-foreground">{firstHeader}</TableHead>
            <TableHead className="text-xs text-muted-foreground">Responses</TableHead>
            <TableHead className="text-xs text-muted-foreground">Avg Rating</TableHead>
            <TableHead className="text-xs text-muted-foreground">Satisfied</TableHead>
            <TableHead className="text-xs text-muted-foreground">Low CSAT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.label}>
              <TableCell className="text-sm">{r.label}</TableCell>
              <TableCell className="text-sm">{r.responses}</TableCell>
              <TableCell className={`text-sm ${color(r.avg)}`}>{r.avg}</TableCell>
              <TableCell className="text-sm text-green-600">{r.satisfied}</TableCell>
              <TableCell className="text-sm text-destructive">{r.low}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function Survey() {
  const [type, setType] = useState("csat");
  const [tab, setTab] = useState("dashboard");

  return (
    <Page
      title="Survey Type"
      chips={surveyChips}
      showGenerateReport={false}
      leading={
        <ToggleTabs
          value={type}
          onChange={setType}
          withCheck
          options={[
            { value: "csat", label: "CSAT" },
            { value: "nps", label: "NPS" },
          ]}
        />
      }
    >
      <TextTabs value={tab} onChange={setTab} options={TABS} />

      {tab === "recent" && (
        <DataTable columns={recentColumns} rows={surveyRecent} rowKey={(r) => r.id} />
      )}

      {tab === "sent" && (
        <DataTable
          columns={[
            { key: "id", header: "Patient ID", cell: (r) => <IdCell id={r.id} /> },
            { key: "name", header: "Patient Name" },
            { key: "email", header: "Patient Email" },
            { key: "surveySent", header: "Survey Sent Date Time" },
            { key: "employer", header: "Employer" },
            { key: "dpc", header: "DPC" },
            { key: "physician", header: "Physician" },
          ]}
          rows={surveySent}
          rowKey={(r) => r.id}
        />
      )}

      {tab === "completed" && (
        <DataTable
          columns={recentColumns}
          rows={surveyRecent.filter((_, i) => i % 4 === 0)}
          rowKey={(r) => r.id}
        />
      )}

      {tab === "dashboard" && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard icon={Star} title="Average CSAT Score" value="4.17" caption="out of 5" />
            <KpiCard
              icon={Smile}
              title="% of Satisfied Patients"
              value={<span className="text-green-600">50%</span>}
              caption="3 of 6 responses"
            />
            <KpiCard
              icon={Send}
              title="Response Rate"
              value={<span className="text-amber-500">0.22%</span>}
              caption="6 of 2731 sent"
            />
            <KpiCard icon={TriangleAlert} title="Needs Improvement" value="2" caption="Rating ≤ 2" />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Panel title="CSAT Distribution">
              <VerticalBar data={csatDistribution} xLabel="Rating" yLabel="Count" />
            </Panel>
            <Panel title="CSAT Score Trend">
              <LineTrend data={csatTrend} color="var(--chart-1)" xLabel="Week" yLabel="Average CSAT" />
            </Panel>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-sm text-foreground">Top Physicians</h3>
              <MiniTable
                firstHeader="Physician"
                rows={surveyTopPhysicians.map((p) => ({
                  label: p.physician,
                  responses: p.responses,
                  avg: p.avg,
                  satisfied: p.satisfied,
                  low: p.low,
                }))}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm text-foreground">Top Employers</h3>
              <MiniTable
                firstHeader="Employer"
                rows={surveyTopEmployers.map((p) => ({
                  label: p.employer,
                  responses: p.responses,
                  avg: p.avg,
                  satisfied: p.satisfied,
                  low: p.low,
                }))}
              />
            </div>
          </div>
        </>
      )}
    </Page>
  );
}
