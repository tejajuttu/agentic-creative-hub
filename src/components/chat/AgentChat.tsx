
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Agent } from "../AgentSelector";
import { Message, MarketingAgentId } from "./types";
import { getMarketingAgentResponse } from "./agentResponses";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";

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
  const handleSendMessage = (inputValue: string) => {
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
            content: getMarketingAgentResponse(agent.id as MarketingAgentId, inputValue),
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

  return (
    <div className={cn(
      "flex flex-col h-full border border-primary/20 rounded-lg overflow-hidden bg-card shadow-lg", 
      className
    )}>
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3 message-in">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              <span className="animate-pulse">AI</span>
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
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        placeholder="Describe your marketing campaign needs..."
      />
    </div>
  );
};

export default AgentChat;
