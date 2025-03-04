
import React, { useState } from "react";
import Layout from "@/components/Layout";
import AgentSelector, { Agent } from "@/components/AgentSelector";
import AgentChat from "@/components/AgentChat";
import CreativeGallery, { CreativeAsset } from "@/components/CreativeGallery";

const Index = () => {
  const [activeAgents, setActiveAgents] = useState<Agent[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<CreativeAsset | null>(null);

  // Handle agent selection change
  const handleAgentsChange = (agents: Agent[]) => {
    setActiveAgents(agents.filter(agent => agent.active));
  };

  // Handle asset selection
  const handleAssetSelect = (asset: CreativeAsset) => {
    setSelectedAsset(asset);
  };

  return (
    <Layout>
      <div className="h-full flex flex-col lg:flex-row p-4 gap-4 overflow-hidden">
        <div className="lg:w-2/3 flex flex-col gap-4 h-full">
          <AgentChat 
            agents={activeAgents}
            className="flex-1 animate-scale-in"
          />
        </div>
        <div className="lg:w-1/3 flex flex-col gap-4 h-full">
          <AgentSelector 
            onAgentsChange={handleAgentsChange}
            className="animate-slide-in"
          />
          <CreativeGallery 
            onAssetSelect={handleAssetSelect}
            className="flex-1 animate-slide-in"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
