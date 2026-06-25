import React from 'react';
import { ScrollArea } from "../ui/scroll-area";
import { AlertCircle, Lightbulb, TrendingUp, Search, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";

export function AiInsightsTab() {
  return (
    <ScrollArea className="flex-1 px-4 py-2">
      <div className="flex flex-col gap-4 pb-4">
        
        {/* Context-Aware Summary */}
        <Card className="shadow-none border-border/60 bg-gradient-to-br from-card to-muted/30">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Lightbulb className="size-4 text-amber-500" />
              Page Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-sm">
            <p className="text-muted-foreground mb-3 leading-relaxed">
              Based on the current view, you have <span className="font-semibold text-foreground">45 patients</span> pending HCC coding review. 
              <Badge variant="secondary" className="ml-1 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-transparent">12 dropping off</Badge>
            </p>
            <Button size="sm" variant="secondary" className="w-full text-xs font-medium shadow-sm">
              Review Top 12 Patients
            </Button>
          </CardContent>
        </Card>

        {/* Anomaly Detection */}
        <Card className="shadow-sm border-red-200 dark:border-red-900/40 bg-red-50/80 dark:bg-red-950/20">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center gap-2 font-bold text-red-800 dark:text-red-400">
              <AlertCircle className="size-4 text-red-600 dark:text-red-400 shrink-0" />
              Anomaly Alert
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-sm">
            <p className="text-red-900 dark:text-red-200 mb-3 leading-relaxed">
              <strong className="font-semibold text-red-950 dark:text-red-100">Spike Detected:</strong> 20% increase in After-Hours Encounters this week compared to last week.
            </p>
            <Button size="sm" variant="outline" className="w-full text-xs font-medium border-red-300 dark:border-red-800 bg-background hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-300 shadow-sm transition-colors cursor-pointer">
              <TrendingUp className="size-3.5 mr-1.5 shrink-0" />
              Analyze Root Cause
            </Button>
          </CardContent>
        </Card>

        {/* Suggested Actions */}
        <div className="space-y-3 mt-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Search className="size-3.5" />
            Discover
          </h3>
          <div className="space-y-1.5">
            <button className="w-full group flex items-center justify-between p-2.5 rounded-lg border border-transparent hover:border-border hover:bg-muted/50 transition-all text-sm">
              <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">View Utilization Gaps</span>
              <ArrowRight className="size-4 text-muted-foreground/50 group-hover:text-primary transition-colors translate-x-0 group-hover:translate-x-0.5" />
            </button>
            <button className="w-full group flex items-center justify-between p-2.5 rounded-lg border border-transparent hover:border-border hover:bg-muted/50 transition-all text-sm">
              <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">Show Monthly Cost Savings</span>
              <ArrowRight className="size-4 text-muted-foreground/50 group-hover:text-primary transition-colors translate-x-0 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

      </div>
    </ScrollArea>
  );
}
