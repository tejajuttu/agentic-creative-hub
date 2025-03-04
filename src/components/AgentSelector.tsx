
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Users, Briefcase, Pen, Image, Headphones, Video, FileCheck } from "lucide-react";

// Define the agent types and their roles
export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  description: string;
  active: boolean;
  removable: boolean;
}

// Initial agents setup with marketing agents
const defaultAgents: Agent[] = [
  {
    id: "manager",
    name: "Campaign Manager",
    role: "Manager",
    avatar: "M",
    description: "Oversees strategy and coordinates team efforts",
    active: true,
    removable: false,
  },
  {
    id: "writer",
    name: "Copywriter",
    role: "Writer",
    avatar: "W",
    description: "Creates compelling marketing copy and messaging",
    active: true,
    removable: true,
  },
  {
    id: "editor",
    name: "Content Editor",
    role: "Editor",
    avatar: "E",
    description: "Refines and polishes written content",
    active: true,
    removable: true,
  },
  {
    id: "illustrator",
    name: "Visual Designer",
    role: "Illustrator",
    avatar: "I",
    description: "Creates engaging visual assets and graphics",
    active: true,
    removable: true,
  },
  {
    id: "audio",
    name: "Audio Producer",
    role: "Audio",
    avatar: "A",
    description: "Crafts sound effects and audio elements",
    active: false,
    removable: true,
  },
  {
    id: "video",
    name: "Video Director",
    role: "Video",
    avatar: "V",
    description: "Produces and edits video content",
    active: false,
    removable: true,
  },
  {
    id: "approver",
    name: "Brand Guardian",
    role: "Approver",
    avatar: "G",
    description: "Ensures content meets brand guidelines",
    active: false,
    removable: true,
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
    const agentToToggle = agents.find(agent => agent.id === id);
    
    // Prevent toggling the manager if it's not removable
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

  // Get the count of active agents
  const activeCount = agents.filter(agent => agent.active).length;

  // Get icon for agent role
  const getAgentIcon = (id: string) => {
    switch (id) {
      case "manager":
        return <Briefcase className="h-3.5 w-3.5 text-primary" />;
      case "writer":
        return <Pen className="h-3.5 w-3.5 text-primary" />;
      case "editor":
        return <FileCheck className="h-3.5 w-3.5 text-primary" />;
      case "illustrator":
        return <Image className="h-3.5 w-3.5 text-primary" />;
      case "audio":
        return <Headphones className="h-3.5 w-3.5 text-primary" />;
      case "video":
        return <Video className="h-3.5 w-3.5 text-primary" />;
      case "approver":
        return <Check className="h-3.5 w-3.5 text-primary" />;
      default:
        return null;
    }
  };

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
          <span className="font-medium">Marketing AI Team</span>
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
