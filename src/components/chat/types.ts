
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
  | "industry"
  | "regulations"
  | "competitor"
  | "consumer"
  | "strategy"
  | "writer"
  | "editor"
  | "illustrator"
  | "voice"
  | "animator"
  | "system";
