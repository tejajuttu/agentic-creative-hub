
export interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  timestamp: Date;
  isLoading?: boolean;
}

export type MarketingAgentId = 
  | "manager" 
  | "writer" 
  | "editor" 
  | "illustrator" 
  | "audio" 
  | "video" 
  | "approver" 
  | "system";
