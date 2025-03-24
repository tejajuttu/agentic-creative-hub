
import React from "react";
import { Brain, ChartBar, PenTool, Sparkles } from "lucide-react";

export const ChatHeader = () => {
  return (
    <div className="px-6 py-4 border-b border-border/50 bg-secondary/30">
      <h2 className="font-semibold text-lg">Agentic AI Studio</h2>
      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <ChartBar className="h-3.5 w-3.5" /> Research Insights
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <PenTool className="h-3.5 w-3.5" /> Creative Content
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Brain className="h-3.5 w-3.5" /> AI Powered
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" /> Automated Workflow
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
