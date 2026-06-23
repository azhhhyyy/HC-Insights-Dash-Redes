import { useMemo, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "../ui/utils";

export type Column<T> = {
  key: string;
  header: ReactNode;
  /** Optional grouped sub-columns rendered as a second header row. */
  cell?: (row: T) => ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
};

type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  pageSize?: number;
  rowKey: (row: T, index: number) => string;
  emptyMessage?: string;
  dense?: boolean;
};

export function DataTable<T>({
  columns,
  rows,
  pageSize: initialPageSize = 10,
  rowKey,
  emptyMessage = "No records found",
  dense = false,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * pageSize;
  const visible = useMemo(
    () => rows.slice(start, start + pageSize),
    [rows, start, pageSize],
  );

  const pageButtons = useMemo(() => {
    const out: number[] = [];
    const from = Math.max(1, current - 2);
    const to = Math.min(totalPages, from + 4);
    for (let p = from; p <= to; p++) out.push(p);
    return out;
  }, [current, totalPages]);

  const alignClass = (a?: string) =>
    a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left";

  return (
    <div className="overflow-hidden rounded-xl border border-transparent bg-card shadow-sm flex flex-col w-full min-w-0 h-full flex-1">
      <div className="overflow-auto w-full min-w-0 flex-1 flex flex-col">
        <Table className="flex-1">
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="border-b bg-muted hover:bg-muted">
              {columns.map((c) => (
                <TableHead
                  key={c.key}
                  className={cn(
                    "h-11 whitespace-nowrap bg-muted text-sm font-medium tracking-wide text-slate-500 uppercase",
                    alignClass(c.align),
                    c.className,
                  )}
                >
                  {c.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-12 text-center text-slate-400">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              visible.map((row, i) => (
                <TableRow
                  key={rowKey(row, start + i)}
                  className="border-b border-border/60 transition-[background-color,transform] duration-150 ease-out hover:bg-secondary/40"
                >
                  {columns.map((c) => (
                    <TableCell
                      key={c.key}
                      className={cn(
                        dense ? "py-2" : "py-3",
                        "text-[15px] text-foreground",
                        alignClass(c.align),
                        c.className,
                      )}
                    >
                      {c.cell ? c.cell(row) : (row as Record<string, ReactNode>)[c.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
            {visible.length > 0 && visible.length < pageSize && (
              <>
                <TableRow className="border-b border-border/60">
                  <TableCell
                    colSpan={columns.length}
                    className={cn(dense ? "py-2" : "py-3", "text-center text-muted-foreground text-sm")}
                  >
                    End of entries
                  </TableCell>
                </TableRow>
                {Array.from({ length: pageSize - visible.length - 1 }).map((_, i) => (
                  <TableRow key={`empty-${i}`} className="border-b border-border/60">
                    <TableCell
                      colSpan={columns.length}
                      className={cn(dense ? "py-2" : "py-3", "text-[15px]")}
                    >
                      &nbsp;
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer / pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 px-4 py-2.5 text-sm text-slate-500">
        <span>
          Showing <span className="text-foreground tabular-nums">{rows.length === 0 ? 0 : start + 1}</span> to{" "}
          <span className="text-foreground tabular-nums">{Math.min(start + pageSize, rows.length)}</span> of{" "}
          <span className="text-foreground tabular-nums">{rows.length}</span> entries
        </span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              className="grid size-7 place-items-center rounded border bg-background transition-[background-color,opacity] duration-150 disabled:opacity-40"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
            >
              <ChevronLeft className="size-3.5" />
            </button>
            {pageButtons.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "grid size-7 place-items-center rounded border text-sm",
                  p === current
                    ? "border-primary bg-secondary text-primary"
                    : "bg-background hover:bg-accent",
                )}
              >
                {p}
              </button>
            ))}
            {totalPages > pageButtons[pageButtons.length - 1] && (
              <>
                <span className="px-1">…</span>
                <button
                  onClick={() => setPage(totalPages)}
                  className="grid h-7 min-w-7 place-items-center rounded border bg-background px-1 text-xs hover:bg-accent"
                >
                  {totalPages}
                </button>
              </>
            )}
            <button
              className="grid size-7 place-items-center rounded border bg-background transition-[background-color,opacity] duration-150 disabled:opacity-40"
              disabled={current === totalPages}
              onClick={() => setPage(current + 1)}
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span>Records per page</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => {
                setPageSize(Number(v));
                setPage(1);
              }}
            >
              <SelectTrigger className="h-7 w-16 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 25, 50, 100].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
