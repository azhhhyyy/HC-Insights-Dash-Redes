import React from 'react';
import { Sparkles, X, ChevronLeft, MessageSquare, Lightbulb, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { AiChatInterface } from "./AiChatInterface";
import { AiInsightsTab } from "./AiInsightsTab";
import { AiActionsTab } from "./AiActionsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "../ui/utils";

export function RightAiSidebar({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean; 
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div 
      className={cn(
        "h-full bg-card flex flex-col shrink-0 transition-[width] duration-200 ease-linear overflow-hidden hidden xl:flex",
        isOpen ? "w-[340px] border-l" : "w-0 border-l-0"
      )}
    >
      <div className="w-[340px] flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <Sparkles className="size-5" />
            <span>HealthCompiler AI</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="size-8">
            <X className="size-4" />
          </Button>
        </div>

        {/* Tabs Container */}
        <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b">
            <TabsList className="w-full grid grid-cols-3 bg-card border rounded-lg p-1 h-10 shadow-sm">
              <TabsTrigger 
                value="chat" 
                className="text-[13px] h-full rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none text-muted-foreground hover:text-foreground transition-all"
              >
                <MessageSquare className="size-4 mr-1.5" />
                Chat
              </TabsTrigger>
              <TabsTrigger 
                value="insights" 
                className="text-[13px] h-full rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none text-muted-foreground hover:text-foreground transition-all"
              >
                <Lightbulb className="size-4 mr-1.5" />
                Insights
              </TabsTrigger>
              <TabsTrigger 
                value="actions" 
                className="text-[13px] h-full rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none text-muted-foreground hover:text-foreground transition-all"
              >
                <Zap className="size-4 mr-1.5" />
                Actions
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chat" className="flex-1 mt-0 overflow-hidden outline-none flex flex-col h-full data-[state=inactive]:hidden">
            {/* Context Banner inside Chat */}
            <div className="bg-primary/5 p-3 text-xs text-primary border-b shrink-0">
              <span className="font-medium">Context:</span> Ready to analyze data across Dashboards, HCC, ACO, and Outcomes.
            </div>
            <div className="flex-1 overflow-hidden">
              <AiChatInterface />
            </div>
          </TabsContent>

          <TabsContent value="insights" className="flex-1 mt-0 overflow-hidden outline-none flex flex-col h-full data-[state=inactive]:hidden">
            <AiInsightsTab />
          </TabsContent>

          <TabsContent value="actions" className="flex-1 mt-0 overflow-hidden outline-none flex flex-col h-full data-[state=inactive]:hidden">
            <AiActionsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
