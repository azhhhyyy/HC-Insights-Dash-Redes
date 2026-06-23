import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { ChevronDown, HelpCircle, Search, PanelRight } from "lucide-react";
import { AppSidebar } from "./AppSidebar";
import { RightAiSidebar } from "../ai/RightAiSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  LayoutDashboard,
  BarChart,
  ClipboardCheck,
  Stethoscope,
  LineChart,
  Sparkles,
  Users,
  Target,
  LayoutGrid
} from "lucide-react";

const APPS_MENU = [
  { label: "Dashboards", icon: LayoutDashboard, to: "/engagement" },
  { label: "HCC Insights", icon: BarChart, to: "/hcc" },
  { label: "ACO Insights", icon: ClipboardCheck, to: "/aco" },
  { label: "Patient Outcomes", icon: Stethoscope, to: "/outcomes" },
  { label: "Mips Nexus", icon: LineChart },
  { label: "Ask AI", icon: Sparkles },
  { label: "Employer Insights", icon: Users },
  { label: "Outcome Predict AI", icon: Target },
];

function TopBar({
  isAiSidebarOpen,
  setIsAiSidebarOpen,
}: {
  isAiSidebarOpen: boolean;
  setIsAiSidebarOpen: (v: boolean) => void;
}) {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-card px-4">
      <SidebarTrigger className="text-slate-500" />
      <Separator orientation="vertical" className="!h-5" />

      {/* Search */}
      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search patients, claims, reports…"
          className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary/40"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Popover>
          <PopoverTrigger className="grid size-9 place-items-center rounded-md text-primary outline-none hover:bg-accent transition-colors">
            <LayoutGrid className="size-5" />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[320px] rounded-xl border bg-card p-4 shadow-lg" sideOffset={8}>
            <div className="grid grid-cols-2 gap-y-6 gap-x-2 py-2">
              {APPS_MENU.map((app) => {
                const isActive = app.to && pathname.startsWith(app.to);
                
                const inner = (
                  <>
                    <app.icon className="size-6 text-foreground transition-colors group-hover:text-primary" strokeWidth={1.5} />
                    <div className="relative">
                      <span className="text-[13px] font-medium text-foreground">{app.label}</span>
                      {isActive && (
                        <div className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-primary" />
                      )}
                    </div>
                  </>
                );

                const className = "group flex flex-col items-center justify-center gap-2 rounded-lg p-2 outline-none transition-colors hover:bg-accent/40";

                return app.to ? (
                  <Link key={app.label} to={app.to} className={className}>
                    {inner}
                  </Link>
                ) : (
                  <button key={app.label} className={className}>
                    {inner}
                  </button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>

        <Button
          variant="secondary"
          size="sm"
          className="h-9 gap-2 text-primary hover:bg-primary/10 px-3"
          onClick={() => setIsAiSidebarOpen(!isAiSidebarOpen)}
          title="Toggle AI Sidebar"
        >
          <Sparkles className="size-4" />
          <span className="font-medium">Ask AI</span>
        </Button>

        <Separator orientation="vertical" className="!h-6 mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm outline-none hover:bg-accent data-[state=open]:border-primary transition-colors">
            ACME Health <ChevronDown className="size-4 text-slate-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>ACME Health</DropdownMenuItem>
            <DropdownMenuItem>ACME Corp 1</DropdownMenuItem>
            <DropdownMenuItem>ACME Corp 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t bg-card px-6 py-4 text-xs text-slate-500">
      <div className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-full border text-[8px] font-semibold text-slate-400">
          SOC 2
        </span>
        <span className="grid size-9 place-items-center rounded-full border text-[8px] font-semibold text-slate-400">
          HIPAA
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span>©2025 Healthcompiler, Inc.</span>
        <span className="text-border">·</span>
        <a className="hover:text-primary" href="#">Privacy Policy</a>
        <span className="text-border">·</span>
        <a className="hover:text-primary" href="#">Terms of Service</a>
        <span className="text-border">·</span>
        <a className="hover:text-primary" href="#">Help</a>
      </div>
      <div className="flex items-center gap-1.5">
        <span>Powered by</span>
        <span className="text-primary" style={{ fontWeight: 600 }}>HealthCompiler</span>
      </div>
    </footer>
  );
}

export function AppShell() {
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-muted/40 flex-row p-0 overflow-hidden relative">
        <div className="flex-1 flex flex-col min-w-0 h-screen">
          <TopBar isAiSidebarOpen={isAiSidebarOpen} setIsAiSidebarOpen={setIsAiSidebarOpen} />
          <main className="flex-1 min-w-0 flex flex-col overflow-auto">
            <Outlet />
          </main>
          <Footer />
        </div>
        <RightAiSidebar isOpen={isAiSidebarOpen} setIsOpen={setIsAiSidebarOpen} />
      </SidebarInset>
    </SidebarProvider>
  );
}
