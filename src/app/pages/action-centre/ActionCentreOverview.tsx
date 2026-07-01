import React, { useState, useMemo } from "react";
import {
  Activity,
  UserPlus,
  Clock,
  HeartPulse,
  AlertTriangle,
  MessageSquareOff,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldAlert,
  Send,
  UserCheck,
  Building2,
  Stethoscope,
  ExternalLink,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { Page } from "../../components/layout/Page";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "../../components/ui/sheet";
import { IdCell } from "../../components/dashboard/cells";
import {
  ACTION_CENTRE_PATIENTS,
  COHORT_SUMMARIES,
  type ActionCentrePatientRow,
  type CohortType,
  type GapTier,
} from "../../data/actionCentreData";
import { cn } from "../../components/ui/utils";

export default function ActionCentreOverview() {
  const [activeCohort, setActiveCohort] = useState<CohortType | "all">("all");
  const [activeGapTier, setActiveGapTier] = useState<GapTier | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("highest-risk");
  const [selectedPatient, setSelectedPatient] = useState<ActionCentrePatientRow | null>(null);
  const [completedPatientIds, setCompletedPatientIds] = useState<Set<string>>(new Set());

  // Filter patients
  const filteredPatients = useMemo(() => {
    let list = [...ACTION_CENTRE_PATIENTS];

    // Exclude completed/handled patients from immediate active list if needed or mark them
    if (activeCohort !== "all") {
      list = list.filter((p) => p.cohort === activeCohort);
    }

    if (activeCohort === "engagement-gap" && activeGapTier !== "all") {
      list = list.filter((p) => p.gapTier === activeGapTier);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.reason.toLowerCase().includes(q) ||
          p.employer.toLowerCase().includes(q) ||
          p.physician.toLowerCase().includes(q)
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === "highest-risk") {
        const pOrder: Record<string, number> = { High: 3, Medium: 2, Low: 1 };
        if (pOrder[b.priority] !== pOrder[a.priority]) {
          return pOrder[b.priority] - pOrder[a.priority];
        }
        return (b.lastVisitDaysAgo || 999) - (a.lastVisitDaysAgo || 999);
      }
      if (sortBy === "longest-inactive") {
        return (b.lastVisitDaysAgo || 999) - (a.lastVisitDaysAgo || 999);
      }
      if (sortBy === "last-visit") {
        return (a.lastVisitDaysAgo || 0) - (b.lastVisitDaysAgo || 0);
      }
      if (sortBy === "newest") {
        return (a.lastVisitDaysAgo === null ? 0 : 1) - (b.lastVisitDaysAgo === null ? 0 : 1);
      }
      return 0;
    });

    return list;
  }, [activeCohort, activeGapTier, searchQuery, sortBy]);

  const handleTriggerAction = (patient: ActionCentrePatientRow, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    toast.success(`Action initiated for ${patient.name}`, {
      description: `${patient.suggestedAction} has been queued or logged successfully.`,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo action"),
      },
    });
    setCompletedPatientIds((prev) => new Set(prev).add(patient.id));
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return (
          <Badge className="bg-rose-500/15 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-500/30 font-semibold px-2.5 py-0.5">
            High Priority
          </Badge>
        );
      case "Medium":
        return (
          <Badge className="bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-500/30 font-medium px-2.5 py-0.5">
            Medium Priority
          </Badge>
        );
      default:
        return (
          <Badge className="bg-sky-500/15 text-sky-700 dark:bg-sky-500/20 dark:text-sky-400 border border-sky-500/30 font-medium px-2.5 py-0.5">
            Low Priority
          </Badge>
        );
    }
  };

  const getCohortIconBox = (id: string) => {
    switch (id) {
      case "new-activation":
        return (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <UserPlus className="size-4" />
          </div>
        );
      case "engagement-gap":
        return (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
            <Clock className="size-4" />
          </div>
        );
      case "high-chronic-risk":
        return (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
            <HeartPulse className="size-4" />
          </div>
        );
      case "utilization-leakage":
        return (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
            <AlertTriangle className="size-4" />
          </div>
        );
      case "low-response":
        return (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400">
            <MessageSquareOff className="size-4" />
          </div>
        );
      default:
        return (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Activity className="size-4" />
          </div>
        );
    }
  };

  return (
    <Page
      title="Action Centre"
      subtitle="Phase 1: Operational Visibility — Replace passive reporting with daily actionable patient work queues."
      leading={
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-inner">
          <Activity className="size-5" />
        </div>
      }
    >
      {/* 1. Engagement Overview Cards */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-200 uppercase">
            Operational Summary Cards
          </h2>
          <span className="text-xs text-muted-foreground">
            Click any card to switch patient queue view
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {COHORT_SUMMARIES.map((card) => {
            const isSelected = activeCohort === card.id;
            return (
              <Card
                key={card.id}
                onClick={() => {
                  setActiveCohort(card.id as any);
                  if (card.id !== "engagement-gap") setActiveGapTier("all");
                }}
                className={cn(
                  "cursor-pointer rounded-2xl border transition-[box-shadow,transform,background-color,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] relative overflow-hidden flex flex-col justify-between active:scale-[0.98]",
                  isSelected
                    ? "border-transparent ring-2 ring-primary/40 bg-primary/[0.03] shadow-md"
                    : "border-transparent bg-card shadow-sm hover:shadow-md hover:bg-accent/30"
                )}
              >
                <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">
                      {card.title}
                    </span>
                    {getCohortIconBox(card.id)}
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold tracking-tight tabular-nums text-foreground">
                      {card.count}
                    </span>
                    <span className="text-[11px] text-muted-foreground">patients</span>
                  </div>

                  {/* WoW and MoM Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-border/50 text-[11px]">
                    <div
                      className={cn(
                        "flex items-center gap-0.5 rounded px-1.5 py-0.5 font-medium",
                        card.wowPositive
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          : "bg-rose-500/10 text-rose-700 dark:text-rose-400"
                      )}
                      title="Week over Week Change"
                    >
                      {card.wowPositive ? (
                        <ArrowDownRight className="size-3" />
                      ) : (
                        <ArrowUpRight className="size-3" />
                      )}
                      <span>{card.wowChange} WoW</span>
                    </div>

                  </div>

                  <div className="pt-2 text-xs font-semibold text-primary group-hover:underline">
                    <span>View Details</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 2. Actionable Patient Cohorts Work Queue Controls */}
      <Card className="rounded-2xl border border-transparent bg-card shadow-sm transition-[box-shadow] duration-200 hover:shadow-md mb-6 overflow-hidden">
        <div className="p-4 border-b border-border/50 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <span>Patient Work Queue</span>
              <Badge variant="secondary" className="font-mono text-xs">
                {filteredPatients.length} Active
              </Badge>
            </h3>
            <p className="text-xs text-muted-foreground">
              Rule-based cohorts surfacing members requiring timely DPC intervention.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search patient, condition, employer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 text-xs"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] h-9 text-xs">
                <SlidersHorizontal className="size-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="Sort queue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highest-risk">Sort: Highest Priority</SelectItem>
                <SelectItem value="longest-inactive">Sort: Longest Inactive</SelectItem>
                <SelectItem value="last-visit">Sort: Recent Visit First</SelectItem>
                <SelectItem value="newest">Sort: Newest Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cohort Tabs Bar */}
        <div className="px-4 pt-3 border-b border-border/50 overflow-x-auto">
          <div className="pb-3">
            <div className="inline-flex flex-wrap items-center gap-1 rounded-md border bg-card p-1 shadow-2xs">
              <button
                onClick={() => {
                  setActiveCohort("all");
                  setActiveGapTier("all");
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors",
                  activeCohort === "all"
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <span>All Requiring Attention</span>
                <span className={cn("px-1.5 py-0.5 rounded-full text-[10px] tabular-nums font-semibold", activeCohort === "all" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground")}>
                  148
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveCohort("new-activation");
                  setActiveGapTier("all");
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors",
                  activeCohort === "new-activation"
                    ? "bg-emerald-600 dark:bg-emerald-500 text-white font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <UserPlus className={cn("size-3.5", activeCohort === "new-activation" ? "text-white" : "text-emerald-500/80")} />
                <span>New Activation</span>
                <span className={cn("px-1.5 py-0.5 rounded-full text-[10px] tabular-nums font-semibold", activeCohort === "new-activation" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground")}>
                  28
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveCohort("engagement-gap");
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors",
                  activeCohort === "engagement-gap"
                    ? "bg-amber-600 dark:bg-amber-500 text-white font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Clock className={cn("size-3.5", activeCohort === "engagement-gap" ? "text-white" : "text-amber-500/80")} />
                <span>Engagement Gap</span>
                <span className={cn("px-1.5 py-0.5 rounded-full text-[10px] tabular-nums font-semibold", activeCohort === "engagement-gap" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground")}>
                  54
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveCohort("high-chronic-risk");
                  setActiveGapTier("all");
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors",
                  activeCohort === "high-chronic-risk"
                    ? "bg-rose-600 dark:bg-rose-500 text-white font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <HeartPulse className={cn("size-3.5", activeCohort === "high-chronic-risk" ? "text-white" : "text-rose-500/80")} />
                <span>High Chronic Risk</span>
                <span className={cn("px-1.5 py-0.5 rounded-full text-[10px] tabular-nums font-semibold", activeCohort === "high-chronic-risk" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground")}>
                  31
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveCohort("utilization-leakage");
                  setActiveGapTier("all");
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors",
                  activeCohort === "utilization-leakage"
                    ? "bg-purple-600 dark:bg-purple-500 text-white font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <AlertTriangle className={cn("size-3.5", activeCohort === "utilization-leakage" ? "text-white" : "text-purple-500/80")} />
                <span>Utilization Leakage</span>
                <span className={cn("px-1.5 py-0.5 rounded-full text-[10px] tabular-nums font-semibold", activeCohort === "utilization-leakage" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground")}>
                  19
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveCohort("low-response");
                  setActiveGapTier("all");
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors",
                  activeCohort === "low-response"
                    ? "bg-sky-600 dark:bg-sky-500 text-white font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <MessageSquareOff className={cn("size-3.5", activeCohort === "low-response" ? "text-white" : "text-sky-500/80")} />
                <span>Low Response</span>
                <span className={cn("px-1.5 py-0.5 rounded-full text-[10px] tabular-nums font-semibold", activeCohort === "low-response" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground")}>
                  16
                </span>
              </button>
            </div>
          </div>

          {/* Sub-filters for Engagement Gap */}
          {activeCohort === "engagement-gap" && (
            <div className="flex items-center gap-2 pb-3 pt-1 border-t border-border/40 text-xs">
              <span className="text-muted-foreground font-medium flex items-center gap-1">
                <Filter className="size-3" /> Duration Sub-filter:
              </span>
              <button
                onClick={() => setActiveGapTier("all")}
                className={cn(
                  "px-2.5 py-1 rounded-md transition-colors font-medium",
                  activeGapTier === "all"
                    ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40"
                    : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                All Gaps
              </button>
              <button
                onClick={() => setActiveGapTier("30-days")}
                className={cn(
                  "px-2.5 py-1 rounded-md transition-colors font-medium",
                  activeGapTier === "30-days"
                    ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40"
                    : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                30+ Days No Visit
              </button>
              <button
                onClick={() => setActiveGapTier("60-days")}
                className={cn(
                  "px-2.5 py-1 rounded-md transition-colors font-medium",
                  activeGapTier === "60-days"
                    ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40"
                    : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                60+ Days No Visit
              </button>
              <button
                onClick={() => setActiveGapTier("90-days")}
                className={cn(
                  "px-2.5 py-1 rounded-md transition-colors font-medium",
                  activeGapTier === "90-days"
                    ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40"
                    : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                90+ Days Critical Gap
              </button>
            </div>
          )}
        </div>

        {/* 3. Patient Lists Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-slate-50/70 dark:bg-slate-900/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="py-3 px-4">Patient Member</th>
                <th className="py-3 px-4">Priority Level</th>
                <th className="py-3 px-4">Reason for Inclusion</th>
                <th className="py-3 px-4">Last Visit</th>
                <th className="py-3 px-4">Last Outreach</th>
                <th className="py-3 px-4 text-right">Suggested Next Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    <CheckCircle2 className="size-8 mx-auto text-emerald-500 mb-2 opacity-80" />
                    <p className="font-semibold text-slate-700 dark:text-slate-300">
                      No patients pending in this queue!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      All engagement opportunities for this criteria have been handled or none match search.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => {
                  const isDone = completedPatientIds.has(patient.id);
                  return (
                    <tr
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className={cn(
                        "cursor-pointer transition-colors hover:bg-primary/[0.04] group",
                        isDone && "opacity-60 bg-slate-50/50 dark:bg-slate-900/30"
                      )}
                    >
                      <td className="py-3.5 px-4 font-medium text-foreground">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0 text-slate-700 dark:text-slate-300">
                            {patient.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                              <span>{patient.name}</span>
                              {isDone && (
                                <Badge className="bg-emerald-500/15 text-emerald-600 border-none text-[10px] px-1.5 py-0">
                                  Actioned
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              <IdCell id={patient.id} /> • {patient.age} Yrs ({patient.gender})
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getPriorityBadge(patient.priority)}
                      </td>

                      <td className="py-3.5 px-4 max-w-md">
                        <div className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug">
                          {patient.reason}
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                          <span>🏢 {patient.employer}</span>
                          <span>👨‍⚕️ {patient.physician}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-700 dark:text-slate-300 font-medium">
                        {patient.lastVisitText}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-xs text-muted-foreground">
                        {patient.lastOutreachText}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 hidden xl:inline">
                            {patient.suggestedAction}
                          </span>
                          <Button
                            size="sm"
                            variant={isDone ? "outline" : "default"}
                            className={cn(
                              "h-8 text-xs font-semibold gap-1.5 shadow-sm",
                              !isDone && "bg-primary hover:bg-primary/90"
                            )}
                            onClick={(e) => handleTriggerAction(patient, e)}
                          >
                            {patient.suggestedActionType === "sms" && <MessageSquare className="size-3.5" />}
                            {patient.suggestedActionType === "email" && <Mail className="size-3.5" />}
                            {patient.suggestedActionType === "call" && <Phone className="size-3.5" />}
                            {patient.suggestedActionType === "appt" && <Calendar className="size-3.5" />}
                            <span>{isDone ? "Re-send Action" : "Execute Action"}</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 4. Basic Patient Detail Drawer (Drill-down) */}
      <Sheet open={Boolean(selectedPatient)} onOpenChange={(open) => !open && setSelectedPatient(null)}>
        <SheetContent className="sm:max-w-xl w-full p-0 flex flex-col overflow-hidden bg-background">
          {selectedPatient && (
            <>
              <SheetHeader className="p-6 border-b border-border bg-slate-50/80 dark:bg-slate-900/50 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <SheetTitle className="text-xl font-bold">
                        {selectedPatient.name}
                      </SheetTitle>
                      {getPriorityBadge(selectedPatient.priority)}
                    </div>
                    <SheetDescription className="text-xs flex items-center gap-2 text-muted-foreground">
                      <span>ID: {selectedPatient.id}</span>
                      <span>•</span>
                      <span>{selectedPatient.age} Yrs ({selectedPatient.gender})</span>
                    </SheetDescription>
                  </div>
                </div>

                {/* Demographics Strip */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-border/60">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Phone className="size-3.5 text-muted-foreground" />
                    <span className="font-medium">{selectedPatient.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Mail className="size-3.5 text-muted-foreground" />
                    <span className="font-medium truncate">{selectedPatient.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Building2 className="size-3.5 text-muted-foreground" />
                    <span className="font-medium truncate">{selectedPatient.employer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Stethoscope className="size-3.5 text-muted-foreground" />
                    <span className="font-medium truncate">{selectedPatient.physician}</span>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Recommended Action Box */}
                <Card className="rounded-xl border border-transparent ring-1 ring-primary/25 bg-primary/[0.04] p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-primary text-sm">
                      <AlertCircle className="size-4" />
                      <span>Recommended Operational Action</span>
                    </div>
                    <Badge variant="outline" className="bg-white/80 dark:bg-black/50 text-xs">
                      Phase 1 Rule
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {selectedPatient.suggestedAction}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Flag Reason:</strong> {selectedPatient.reason}
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <Button
                      size="sm"
                      className="h-8 font-semibold w-full shadow"
                      onClick={() => handleTriggerAction(selectedPatient)}
                    >
                      <Send className="size-3.5 mr-2" /> Execute Action & Log Outreach
                    </Button>
                  </div>
                </Card>

                {/* Tabs for Drawer Details */}
                <Tabs defaultValue="history" className="w-full">
                  <TabsList className="grid grid-cols-3 w-full bg-slate-100 dark:bg-slate-800">
                    <TabsTrigger value="history" className="text-xs">
                      Engagement History
                    </TabsTrigger>
                    <TabsTrigger value="encounters" className="text-xs">
                      Recent Visits ({selectedPatient.recentEncounters.length})
                    </TabsTrigger>
                    <TabsTrigger value="claims" className="text-xs">
                      External Claims ({selectedPatient.recentClaims.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="history" className="pt-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Past Outreach & Touchpoints
                    </h4>
                    {selectedPatient.engagementHistory.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic">No prior touchpoints logged.</p>
                    ) : (
                      <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                        {selectedPatient.engagementHistory.map((ev) => (
                          <div key={ev.id} className="flex items-start gap-3 relative pl-1">
                            <div className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 z-10 text-[10px] font-bold">
                              {ev.type[0]}
                            </div>
                            <div className="flex-1 bg-slate-50/70 dark:bg-slate-900/50 p-3 rounded-xl border border-transparent shadow-sm text-xs space-y-1">
                              <div className="flex items-center justify-between font-semibold">
                                <span>{ev.type} Outreach</span>
                                <span className="text-muted-foreground font-normal">{ev.date}</span>
                              </div>
                              <p className="text-slate-700 dark:text-slate-300">{ev.description}</p>
                              {ev.outcome && (
                                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                                  Outcome: {ev.outcome}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="encounters" className="pt-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Completed DPC Appointments
                    </h4>
                    {selectedPatient.recentEncounters.length === 0 ? (
                      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <AlertTriangle className="size-4" /> No Completed DPC Visits
                        </div>
                        <p>This patient has not completed a primary care visit since enrollment.</p>
                      </div>
                    ) : (
                      selectedPatient.recentEncounters.map((enc) => (
                        <div key={enc.id} className="p-3 rounded-xl border border-transparent bg-card shadow-sm text-xs space-y-1.5">
                          <div className="flex items-center justify-between font-bold text-foreground">
                            <span>{enc.type}</span>
                            <span className="text-muted-foreground font-normal">{enc.date}</span>
                          </div>
                          <div className="text-[11px] text-muted-foreground">Provider: {enc.provider}</div>
                          <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2 rounded">
                            {enc.notes}
                          </p>
                        </div>
                      ))
                    )}
                  </TabsContent>

                  <TabsContent value="claims" className="pt-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      External Utilization & Leakage Claims
                    </h4>
                    {selectedPatient.recentClaims.map((cl) => (
                      <div key={cl.id} className="p-3 rounded-lg border border-purple-500/30 bg-purple-500/[0.04] text-xs space-y-1.5">
                        <div className="flex items-center justify-between font-bold text-purple-900 dark:text-purple-300">
                          <span className="flex items-center gap-1.5">
                            <ShieldAlert className="size-3.5 text-purple-600" /> {cl.provider}
                          </span>
                          <span className="font-mono text-purple-700 dark:text-purple-400 font-bold">{cl.amount}</span>
                        </div>
                        <div className="text-slate-700 dark:text-slate-300 font-medium">
                          Diagnosis: {cl.diagnosis}
                        </div>
                        <div className="text-[11px] text-muted-foreground">Claim Date: {cl.date}</div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>

              <SheetFooter className="p-4 border-t border-border bg-slate-50/50 dark:bg-slate-900/50 flex flex-row justify-between items-center">
                <Button variant="outline" size="sm" onClick={() => setSelectedPatient(null)}>
                  Close Drawer
                </Button>
                <Button size="sm" onClick={() => handleTriggerAction(selectedPatient)}>
                  <CheckCircle2 className="size-3.5 mr-1.5" /> Mark Action Handled
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </Page>
  );
}
