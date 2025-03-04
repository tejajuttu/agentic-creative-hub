
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Users } from "lucide-react";

// Define the agent types and their roles
export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  description: string;
  active: boolean;
}

// Initial agents setup
const defaultAgents: Agent[] = [
  {
    id: "writer",
    name: "Copywriter",
    role: "Writer",
    avatar: "W",
    description: "Creates compelling marketing copy and scripts",
    active: true,
  },
  {
    id: "illustrator",
    name: "Illustrator",
    role: "Designer",
    avatar: "I",
    description: "Generates images and visual assets",
    active: true,
  },
  {
    id: "audio",
    name: "Audio Producer",
    role: "Audio",
    avatar: "A",
    description: "Creates background music and sound effects",
    active: true,
  },
  {
    id: "movie",
    name: "Video Editor",
    role: "Editor",
    avatar: "V",
    description: "Composes final video from assets",
    active: true,
  },
  {
    id: "strategist",
    name: "Strategist",
    role: "Strategy",
    avatar: "S",
    description: "Plans marketing strategy and approach",
    active: false,
  },
];

interface AgentSelectorProps {
  onAgentsChange?: (agents: Agent[]) => void;
  className?: string;
}

export const AgentSelector = ({ onAgentsChange, className }: AgentSelectorProps) => {
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle agent activity
  const toggleAgent = (id: string) => {
    const updatedAgents = agents.map(agent =>
      agent.id === id ? { ...agent, active: !agent.active } : agent
    );
    setAgents(updatedAgents);
    
    if (onAgentsChange) {
      onAgentsChange(updatedAgents);
    }
  };

  // Get the count of active agents
  const activeCount = agents.filter(agent => agent.active).length;

  return (
    <div className={cn("flex flex-col rounded-lg border border-border/50 overflow-hidden bg-card shadow-subtle", className)}>
      <div 
        className="p-3 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">AI Team Members</span>
          <div className="rounded-full bg-primary/10 text-primary text-xs py-0.5 px-2">
            {activeCount} active
          </div>
        </div>
        <div className="text-muted-foreground text-sm">
          {isExpanded ? "Hide" : "Show"}
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-2 py-1 animate-fade-in">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-colors my-1 cursor-pointer"
              onClick={() => toggleAgent(agent.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                  agent.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {agent.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium">{agent.name}</div>
                  <div className="text-xs text-muted-foreground">{agent.description}</div>
                </div>
              </div>
              
              <div className={cn(
                "w-4 h-4 rounded flex items-center justify-center transition-colors",
                agent.active ? "bg-primary text-white" : "border border-muted-foreground/30"
              )}>
                {agent.active && <Check className="h-3 w-3" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentSelector;
