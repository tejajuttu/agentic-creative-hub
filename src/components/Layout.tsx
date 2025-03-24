
import React from "react";
import { cn } from "@/lib/utils";
import { UserRound, Brain } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col bg-background">
      <header className="h-16 border-b border-border/40 px-6 flex items-center justify-between bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Agentic AI Studio</h1>
            <p className="text-xs text-muted-foreground">AI-powered research & creative solutions</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm px-3 py-1 rounded-full bg-primary text-primary-foreground font-medium">
            AI Assistant
          </div>
        </div>
      </header>

      <main className={cn("flex-1 overflow-hidden", className)}>
        {children}
      </main>
      
      <footer className="py-2 px-6 border-t border-border/40 bg-background/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <span>© 2023 EY Creative Studio</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <UserRound className="h-3 w-3" /> Built by:
            </span>
            <div className="flex -space-x-1">
              {["Ayesha", "Elizabeth", "Teja", "Shakshi", "Dhiraj"].map((name, index) => (
                <div 
                  key={name}
                  className="h-5 w-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-medium text-primary"
                  title={name}
                >
                  {name[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
