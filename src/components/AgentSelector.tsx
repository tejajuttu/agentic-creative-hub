
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Brain, Search, PenTool, Image, Headphones, Video, FileCheck, ChartBar, Book, Users, Eye, LineChart } from "lucide-react";
import { Button } from "./ui/button";

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  description: string;
  active: boolean;
  removable: boolean;
  team: "research" | "creative";
}

const defaultAgents: Agent[] = [
  // Research Team
  {
    id: "industry",
    name: "Industry Analyst",
    role: "Researcher",
    avatar: "I",
    description: "Analyzes market trends and industry developments",
    active: true,
    removable: true,
    team: "research"
  },
  {
    id: "regulations",
    name: "Compliance Expert",
    role: "Researcher",
    avatar: "R",
    description: "Monitors regulatory changes and compliance",
    active: true,
    removable: true,
    team: "research"
  },
  {
    id: "competitor",
    name: "Competition Scout",
    role: "Researcher",
    avatar: "C",
    description: "Tracks competitor strategies and movements",
    active: true,
    removable: true,
    team: "research"
  },
  {
    id: "consumer",
    name: "Consumer Insights",
    role: "Researcher",
    avatar: "B",
    description: "Studies consumer behavior patterns",
    active: true,
    removable: true,
    team: "research"
  },
  {
    id: "strategy",
    name: "Strategy Advisor",
    role: "Recommender",
    avatar: "S",
    description: "Recommends marketing strategies",
    active: true,
    removable: false,
    team: "research"
  },
  // Creative Team
  {
    id: "writer",
    name: "Script Wizard",
    role: "Writer",
    avatar: "W",
    description: "Creates engaging scripts and copy",
    active: true,
    removable: true,
    team: "creative"
  },
  {
    id: "editor",
    name: "Content Polisher",
    role: "Editor",
    avatar: "E",
    description: "Refines and enhances content",
    active: true,
    removable: true,
    team: "creative"
  },
  {
    id: "illustrator",
    name: "DALL·E Artist",
    role: "Illustrator",
    avatar: "D",
    description: "Generates stunning visuals with DALL·E 3",
    active: true,
    removable: true,
    team: "creative"
  },
  {
    id: "voice",
    name: "Voice Crafter",
    role: "Audio",
    avatar: "V",
    description: "Creates voice content with ElevenLabs",
    active: true,
    removable: true,
    team: "creative"
  },
  {
    id: "animator",
    name: "Motion Master",
    role: "Animator",
    avatar: "A",
    description: "Brings content to life with animation",
    active: true,
    removable: true,
    team: "creative"
  }
];

interface AgentSelectorProps {
  onAgentsChange?: (agents: Agent[]) => void;
  className?: string;
}

export const AgentSelector = ({ onAgentsChange, className }: AgentSelectorProps) => {
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTeam, setActiveTeam] = useState<"research" | "creative">("creative");

  const toggleAgent = (id: string) => {
    const agentToToggle = agents.find(agent => agent.id === id);
    
    if (agentToToggle && !agentToToggle.removable && agentToToggle.active) {
      return;
    }
    
    const updatedAgents = agents.map(agent =>
      agent.id === id ? { ...agent, active: !agent.active } : agent
    );
    setAgents(updatedAgents);
    
    if (onAgentsChange) {
      onAgentsChange(updatedAgents);
    }
  };

  const activeAgents = agents.filter(agent => agent.active && agent.team === activeTeam);

  const getAgentIcon = (role: string) => {
    switch (role) {
      case "Researcher":
        return <Search className="h-3.5 w-3.5 text-primary" />;
      case "Writer":
        return <PenTool className="h-3.5 w-3.5 text-primary" />;
      case "Editor":
        return <FileCheck className="h-3.5 w-3.5 text-primary" />;
      case "Illustrator":
        return <Image className="h-3.5 w-3.5 text-primary" />;
      case "Audio":
        return <Headphones className="h-3.5 w-3.5 text-primary" />;
      case "Animator":
        return <Video className="h-3.5 w-3.5 text-primary" />;
      default:
        return <Brain className="h-3.5 w-3.5 text-primary" />;
    }
  };

  return (
    <div className={cn(
      "flex flex-col rounded-lg border border-primary/20 overflow-hidden bg-card shadow-lg", 
      className
    )}>
      <div className="p-3 flex flex-col gap-3 bg-secondary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-medium">AI Team Selection</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            {isExpanded ? "Hide" : "Show"}
          </button>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={activeTeam === "research" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTeam("research")}
            className="flex-1"
          >
            <ChartBar className="h-4 w-4 mr-2" />
            Research
          </Button>
          <Button
            variant={activeTeam === "creative" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTeam("creative")}
            className="flex-1"
          >
            <PenTool className="h-4 w-4 mr-2" />
            Creative
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-2 py-1 animate-fade-in max-h-[300px] overflow-y-auto">
          {agents
            .filter(agent => agent.team === activeTeam)
            .map((agent) => (
              <div
                key={agent.id}
                className={cn(
                  "flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-colors my-1 cursor-pointer",
                  !agent.removable && agent.active && "opacity-90 cursor-not-allowed"
                )}
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
                  agent.active ? "bg-primary text-primary-foreground" : "border border-muted-foreground/30",
                  !agent.removable && agent.active && "opacity-90"
                )}>
                  {agent.active && <FileCheck className="h-3 w-3" />}
                </div>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentSelector;
