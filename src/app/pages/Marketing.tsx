import { Search, Mail, LineChart, Globe } from "lucide-react";
import { Page } from "../components/layout/Page";
import { KpiCard } from "../components/dashboard/KpiCard";
import { Panel } from "../components/dashboard/EmptyState";
import { Sparkline } from "../components/dashboard/charts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { seoKeywords } from "../data/datasets";

export default function Marketing() {
  return (
    <Page title="Marketing" chips={[]} showGenerateReport={false}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-section mb-6">
        <KpiCard icon={Search} title="SEO Performance" value="29" caption="Total Keywords" />
        <KpiCard
          icon={Mail}
          title="Email Campaign Overview"
          subs={[
            { value: "20240", label: "Emails Sent" },
            { value: "18894", label: "Delivered" },
            { value: "7957", label: "Opens" },
            { value: "929", label: "Clicks" },
            { value: "112", label: "Replies" },
          ]}
        />
        <KpiCard
          icon={LineChart}
          title="Google Analytics - Summary"
          subs={[
            { value: "148", label: "Visitors" },
            { value: "133", label: "New Visitors" },
            { value: "165.4", label: "Avg. Engagement Time" },
          ]}
        />
        <KpiCard
          icon={Globe}
          title="Google Search Console"
          subs={[
            { value: "5676", label: "Impressions" },
            { value: "56", label: "Clicks" },
          ]}
        />
      </div>

      <div className="stagger-section">
        <Panel title="SEO Performance">
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/60 hover:bg-muted/60">
                <TableHead rowSpan={2} className="align-bottom text-xs text-muted-foreground">Keyword</TableHead>
                <TableHead rowSpan={2} className="align-bottom text-xs text-muted-foreground">Monthly Search Volume</TableHead>
                <TableHead colSpan={3} className="border-l text-center text-xs text-muted-foreground">Google Rank</TableHead>
                <TableHead rowSpan={2} className="border-l align-bottom text-xs text-muted-foreground">Rank Analysis</TableHead>
              </TableRow>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="border-l text-center text-xs text-muted-foreground">April</TableHead>
                <TableHead className="text-center text-xs text-muted-foreground">May</TableHead>
                <TableHead className="text-center text-xs text-muted-foreground">June</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seoKeywords.map((r) => (
                <TableRow key={r.keyword} className="transition-[background-color,transform] duration-150 ease-out hover:bg-secondary/40">
                  <TableCell className={r.highlight ? "text-sm text-primary" : "text-sm"}>{r.keyword}</TableCell>
                  <TableCell className="text-sm text-muted-foreground tabular-nums">{r.volume}</TableCell>
                  <TableCell className="border-l text-center text-sm tabular-nums">{r.april}</TableCell>
                  <TableCell className="text-center text-sm tabular-nums">{r.may}</TableCell>
                  <TableCell className="text-center text-sm tabular-nums">{r.june}</TableCell>
                  <TableCell className="border-l">
                    <Sparkline data={r.trend} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-1 pt-3 text-xs text-muted-foreground">
          <span>Showing 1 to 10 of 29 entries</span>
        </div>
        </Panel>
      </div>
    </Page>
  );
}
