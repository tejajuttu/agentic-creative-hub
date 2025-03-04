
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

// Initial agents setup with travel agents
const defaultAgents: Agent[] = [
  {
    id: "planner",
    name: "Travel Planner",
    role: "Planner",
    avatar: "P",
    description: "Plans comprehensive travel itineraries",
    active: true,
  },
  {
    id: "critic",
    name: "Travel Critic",
    role: "Critic",
    avatar: "C",
    description: "Reviews and critiques travel plans",
    active: true,
  },
  {
    id: "researcher",
    name: "Local Expert",
    role: "Expert",
    avatar: "E",
    description: "Provides local insights and recommendations",
    active: true,
  },
  {
    id: "documenter",
    name: "Documentation",
    role: "Docs",
    avatar: "D",
    description: "Creates travel documentation and guides",
    active: true,
  },
  {
    id: "budget",
    name: "Budget Analyst",
    role: "Budget",
    avatar: "B",
    description: "Optimizes travel costs and budgeting",
    active: false,
  },
];

interface AgentSelectorProps {
  onAgentsChange?: (agents: Agent[]) => void;
  className?: string;
}

export const AgentSelector = ({ onAgentsChange, className }: AgentSelectorProps) => {
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);
  const [isExpanded, setIsExpanded] = useState(true);

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
    <div className={cn(
      "flex flex-col rounded-lg border border-primary/20 overflow-hidden bg-card shadow-lg", 
      className
    )}>
      <div 
        className="p-3 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors bg-secondary/30"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <span className="font-medium">Travel AI Team</span>
          <div className="rounded-full bg-primary text-primary-foreground text-xs py-0.5 px-2 font-medium">
            {activeCount} active
          </div>
        </div>
        <div className="text-muted-foreground text-sm">
          {isExpanded ? "Hide" : "Show"}
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-2 py-1 animate-fade-in max-h-[300px] overflow-y-auto">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-colors my-1 cursor-pointer"
              onClick={() => toggleAgent(agent.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                  agent.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {agent.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium">{agent.name}</div>
                  <div className="text-xs text-muted-foreground">{agent.description}</div>
                </div>
              </div>
              
              <div className={cn(
                "w-5 h-5 rounded-sm flex items-center justify-center transition-colors",
                agent.active ? "bg-primary text-primary-foreground" : "border border-muted-foreground/30"
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
