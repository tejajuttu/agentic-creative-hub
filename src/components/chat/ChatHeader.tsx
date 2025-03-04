
import React from "react";
import { Target, Lightbulb, BarChart, Users } from "lucide-react";

export const ChatHeader = () => {
  return (
    <div className="px-6 py-4 border-b border-border/50 bg-secondary/30">
      <h2 className="font-semibold text-lg">Creative Marketing Studio</h2>
      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Target className="h-3.5 w-3.5" /> Targeted Campaigns
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Lightbulb className="h-3.5 w-3.5" /> Creative Concepts
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <BarChart className="h-3.5 w-3.5" /> Performance Analytics
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" /> Audience Insights
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
