
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Image, Music, Video, FileText } from "lucide-react";

// Define the creative asset types
export type AssetType = "image" | "audio" | "video" | "text";

export interface CreativeAsset {
  id: string;
  type: AssetType;
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
  createdAt: Date;
  createdBy: string;
}

// Placeholder assets for demonstration
const placeholderAssets: CreativeAsset[] = [
  {
    id: "img-1",
    type: "image",
    url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdCUyMGFkdmVydGlzZW1lbnR8ZW58MHx8MHx8fDA%3D",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdCUyMGFkdmVydGlzZW1lbnR8ZW58MHx8MHx8fDA%3D",
    title: "Product Visualization",
    description: "Clean product visualization for the marketing campaign",
    createdAt: new Date(),
    createdBy: "Illustrator",
  },
  {
    id: "audio-1",
    type: "audio",
    url: "#",
    title: "Background Music",
    description: "Upbeat background music for the advertisement",
    createdAt: new Date(),
    createdBy: "Audio Producer",
  },
  {
    id: "text-1",
    type: "text",
    url: "#",
    title: "Marketing Copy",
    description: "Compelling marketing copy that highlights the product benefits",
    createdAt: new Date(),
    createdBy: "Copywriter",
  },
];

interface CreativeGalleryProps {
  assets?: CreativeAsset[];
  className?: string;
  onAssetSelect?: (asset: CreativeAsset) => void;
}

export const CreativeGallery = ({
  assets = placeholderAssets,
  className,
  onAssetSelect,
}: CreativeGalleryProps) => {
  const [selectedAsset, setSelectedAsset] = useState<CreativeAsset | null>(null);
  const [assetFilter, setAssetFilter] = useState<AssetType | "all">("all");

  // Filter assets by type
  const filteredAssets = assetFilter === "all" 
    ? assets 
    : assets.filter(asset => asset.type === assetFilter);

  // Handle asset selection
  const handleAssetClick = (asset: CreativeAsset) => {
    setSelectedAsset(asset);
    if (onAssetSelect) {
      onAssetSelect(asset);
    }
  };

  // Get icon for asset type
  const getAssetIcon = (type: AssetType) => {
    switch (type) {
      case "image":
        return <Image className="h-4 w-4" />;
      case "audio":
        return <Music className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "text":
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn("flex flex-col rounded-lg border border-border/50 overflow-hidden bg-card shadow-subtle", className)}>
      <div className="px-4 py-3 border-b border-border/50 bg-muted/30">
        <h2 className="font-medium">Created Assets</h2>
      </div>
      
      <div className="p-3 border-b border-border/50 bg-muted/10">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <button
            onClick={() => setAssetFilter("all")}
            className={cn(
              "px-3 py-1 text-xs rounded-full transition-colors",
              assetFilter === "all" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            All
          </button>
          <button
            onClick={() => setAssetFilter("image")}
            className={cn(
              "px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1",
              assetFilter === "image" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <Image className="h-3 w-3" /> Images
          </button>
          <button
            onClick={() => setAssetFilter("audio")}
            className={cn(
              "px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1",
              assetFilter === "audio" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <Music className="h-3 w-3" /> Audio
          </button>
          <button
            onClick={() => setAssetFilter("video")}
            className={cn(
              "px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1",
              assetFilter === "video" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <Video className="h-3 w-3" /> Videos
          </button>
          <button
            onClick={() => setAssetFilter("text")}
            className={cn(
              "px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1",
              assetFilter === "text" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <FileText className="h-3 w-3" /> Text
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        {filteredAssets.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>No assets available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className={cn(
                  "rounded-lg border border-border/50 overflow-hidden cursor-pointer transition-all hover:shadow-elevated",
                  selectedAsset?.id === asset.id ? "ring-2 ring-primary" : ""
                )}
                onClick={() => handleAssetClick(asset)}
              >
                {asset.type === "image" && asset.thumbnail ? (
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img 
                      src={asset.thumbnail} 
                      alt={asset.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ) : (
                  <div className="aspect-video flex items-center justify-center bg-muted/50">
                    {getAssetIcon(asset.type)}
                  </div>
                )}
                
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-sm">{asset.title}</h3>
                    <div className="text-xs text-muted-foreground">
                      {new Date(asset.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{asset.description}</p>
                  <div className="mt-2 flex items-center">
                    <div className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {asset.createdBy}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeGallery;
