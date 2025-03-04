
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

export const ChatInput = ({ onSendMessage, placeholder = "Type your message..." }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="px-6 py-4 border-t border-border/50 bg-card">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder={placeholder}
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
  );
};

export default ChatInput;
