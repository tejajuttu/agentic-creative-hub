
import React, { useState } from "react";
import Layout from "@/components/Layout";
import AgentSelector, { Agent } from "@/components/AgentSelector";
import AgentChat from "@/components/AgentChat";
import CreativeGallery, { CreativeAsset } from "@/components/CreativeGallery";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

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
      <div className="h-full flex flex-col p-4 gap-4 overflow-hidden">
        <div className="h-full flex flex-col lg:flex-row gap-4">
          {/* Main chat section - takes most of the screen */}
          <div className="lg:w-3/4 flex flex-col h-full">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Unleash Your Brand's Potential</h2>
              <p className="text-muted-foreground">Collaborate with our AI creative team to craft compelling marketing campaigns</p>
            </div>
            <AgentChat 
              agents={activeAgents}
              className="flex-1 animate-scale-in shadow-lg"
            />
          </div>
          
          {/* Right sidebar for agent selection and assets */}
          <div className="lg:w-1/4 flex flex-col gap-4 h-full">
            {/* Agent selector at the top */}
            <AgentSelector 
              onAgentsChange={handleAgentsChange}
              className="animate-slide-in"
            />
            
            {/* Creative assets in a dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full flex items-center gap-2 bg-secondary/50 border-primary/20 hover:bg-secondary">
                  <Palette className="h-4 w-4 text-primary" />
                  <span>View Creative Assets</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[80vw] max-h-[80vh] flex flex-col">
                <CreativeGallery 
                  onAssetSelect={handleAssetSelect}
                  className="h-[70vh] animate-slide-in"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
