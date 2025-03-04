
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Message } from "./types";

interface MessageBubbleProps {
  message: Message;
  isLoading?: boolean;
}

export const MessageBubble = ({ message, isLoading }: MessageBubbleProps) => {
  const isUserMessage = message.sender.id === "user";

  return (
    <div 
      className={cn(
        "flex items-start gap-3 message-in",
        isUserMessage ? "justify-end" : "justify-start"
      )}
    >
      {!isUserMessage && (
        <div className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
          "bg-primary text-primary-foreground"
        )}>
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : message.sender.avatar}
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] rounded-lg px-5 py-3",
        isUserMessage 
          ? "bg-primary text-primary-foreground" 
          : "bg-secondary text-secondary-foreground"
      )}>
        {!isUserMessage && (
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-semibold text-sm">{message.sender.name}</span>
            <span className="text-xs text-muted-foreground/80 bg-secondary/80 px-2 py-0.5 rounded-full">
              {isLoading ? "thinking" : message.sender.role}
            </span>
          </div>
        )}
        <div className="text-sm">
          {isLoading ? (
            <div className="thinking">
              <span>.</span><span>.</span><span>.</span>
            </div>
          ) : message.content}
        </div>
      </div>
      
      {isUserMessage && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
          {message.sender.avatar}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
