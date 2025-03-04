
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Send, Loader2 } from "lucide-react";
import { Agent } from "./AgentSelector";

interface Message {
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

interface AgentChatProps {
  agents: Agent[];
  className?: string;
  onSendMessage?: (message: string) => void;
}

export const AgentChat = ({ agents, className, onSendMessage }: AgentChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your marketing team. What kind of advertisement would you like us to create today?",
      sender: {
        id: "system",
        name: "Marketing Team",
        avatar: "M",
        role: "Assistant",
      },
      timestamp: new Date(),
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: {
        id: "user",
        name: "You",
        avatar: "U",
        role: "User",
      },
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate loading state
    setIsLoading(true);
    
    // Add thinking messages for each active agent
    setTimeout(() => {
      setIsLoading(false);
      
      // Get active agents
      const activeAgents = agents.filter(agent => agent.active);
      
      // Simulate responses from active agents
      activeAgents.forEach((agent, index) => {
        setTimeout(() => {
          const agentResponse: Message = {
            id: `${Date.now()}-${agent.id}`,
            content: getAgentResponse(agent.id, inputValue),
            sender: {
              id: agent.id,
              name: agent.name,
              avatar: agent.avatar,
              role: agent.role,
            },
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, agentResponse]);
        }, (index + 1) * 1000); // Stagger the responses
      });
    }, 1500);
    
    if (onSendMessage) {
      onSendMessage(inputValue);
    }
  };

  // Placeholder responses based on agent type
  const getAgentResponse = (agentId: string, userInput: string) => {
    switch (agentId) {
      case "writer":
        return "I'll craft compelling copy for this advertisement that resonates with your target audience.";
      case "illustrator":
        return "I'll generate visuals that align with the marketing message and brand aesthetic.";
      case "audio":
        return "I can create a soundtrack that enhances the emotional impact of your advertisement.";
      case "movie":
        return "I'll compile all assets into a cohesive video advertisement optimized for engagement.";
      case "strategist":
        return "Based on market analysis, I recommend focusing on these key value propositions in your campaign.";
      default:
        return "I'm here to help with your marketing needs.";
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn("flex flex-col h-full border border-border/50 rounded-lg overflow-hidden bg-card shadow-subtle", className)}>
      <div className="px-4 py-3 border-b border-border/50 bg-muted/30">
        <h2 className="font-medium">Chat with Your Marketing Team</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={cn(
              "flex items-start gap-3 message-in",
              message.sender.id === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.sender.id !== "user" && (
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                "bg-primary/10 text-primary"
              )}>
                {message.sender.avatar}
              </div>
            )}
            
            <div className={cn(
              "max-w-[80%] rounded-lg px-4 py-2",
              message.sender.id === "user" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground"
            )}>
              {message.sender.id !== "user" && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-xs">{message.sender.name}</span>
                  <span className="text-xs text-muted-foreground/70">{message.sender.role}</span>
                </div>
              )}
              <div className="text-sm">{message.content}</div>
            </div>
            
            {message.sender.id === "user" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                {message.sender.avatar}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3 message-in">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
            <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-xs">AI Team</span>
                <span className="text-xs text-muted-foreground/70">thinking</span>
              </div>
              <div className="text-sm thinking">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="px-4 py-3 border-t border-border/50">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-background rounded-md px-3 py-2 text-sm border border-input focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <button
            className={cn(
              "rounded-md p-2 transition-colors",
              inputValue.trim() 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-muted text-muted-foreground"
            )}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentChat;
