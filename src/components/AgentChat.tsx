
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Send, Loader2, Target, Lightbulb, BarChart, Users } from "lucide-react";
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
      content: "Welcome to your marketing creative studio! I'm here with my team to help you develop compelling marketing campaigns. What kind of campaign are you looking to create today?",
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
            content: getMarketingAgentResponse(agent.id, inputValue),
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

  // Placeholder responses based on agent type for marketing assistance
  const getMarketingAgentResponse = (agentId: string, userInput: string) => {
    switch (agentId) {
      case "manager":
        return "I'll coordinate our team to create an integrated marketing campaign based on your requirements. What's your target audience and primary objective?";
      case "writer":
        return "I can draft compelling copy for this campaign. Would you prefer a casual, professional, or inspirational tone for the messaging?";
      case "editor":
        return "I'll review all written content to ensure it aligns with brand voice and marketing objectives while maintaining clarity and impact.";
      case "illustrator":
        return "I can create visuals that complement the messaging. What style of imagery would resonate best with your audience - modern, classic, abstract?";
      case "audio":
        return "For audio elements, I can suggest background music or voice-over styles that would enhance your message. Any preferences on tone or style?";
      case "video":
        return "I can help storyboard and produce video content that brings your marketing vision to life. What duration and format works best for your channels?";
      case "approver":
        return "I'll ensure all content meets brand guidelines and marketing objectives before finalizing. Let me know if you have specific compliance requirements.";
      default:
        return "I'm here to help with your marketing campaign. What specific aspects would you like assistance with?";
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
    <div className={cn(
      "flex flex-col h-full border border-primary/20 rounded-lg overflow-hidden bg-card shadow-lg", 
      className
    )}>
      <div className="px-6 py-4 border-b border-border/50 bg-secondary/30">
        <h2 className="font-semibold text-lg">Creative Marketing Studio</h2>
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Target className="h-3.5 w-3.5" /> Targeted Campaigns
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5" /> Creative Concepts
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <BarChart className="h-3.5 w-3.5" /> Performance Analytics
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" /> Audience Insights
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
                "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                "bg-primary text-primary-foreground"
              )}>
                {message.sender.avatar}
              </div>
            )}
            
            <div className={cn(
              "max-w-[80%] rounded-lg px-5 py-3",
              message.sender.id === "user" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground"
            )}>
              {message.sender.id !== "user" && (
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-semibold text-sm">{message.sender.name}</span>
                  <span className="text-xs text-muted-foreground/80 bg-secondary/80 px-2 py-0.5 rounded-full">{message.sender.role}</span>
                </div>
              )}
              <div className="text-sm">{message.content}</div>
            </div>
            
            {message.sender.id === "user" && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                {message.sender.avatar}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3 message-in">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
            <div className="bg-secondary text-secondary-foreground rounded-lg px-5 py-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-semibold text-sm">AI Team</span>
                <span className="text-xs text-muted-foreground/80 bg-secondary/80 px-2 py-0.5 rounded-full">thinking</span>
              </div>
              <div className="text-sm thinking">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="px-6 py-4 border-t border-border/50 bg-card">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Describe your marketing campaign needs..."
            className="flex-1 bg-secondary/30 rounded-full px-5 py-3 text-sm border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <button
            className={cn(
              "rounded-full p-3 transition-colors",
              inputValue.trim() 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-muted text-muted-foreground"
            )}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentChat;
