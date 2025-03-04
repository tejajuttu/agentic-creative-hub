
import React from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col bg-background">
      <header className="h-14 border-b border-border/40 px-4 flex items-center justify-between bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
            <div className="w-4 h-4 rounded-sm bg-primary"></div>
          </div>
          <h1 className="text-lg font-medium">Agentic Creator</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
            Marketing Suite
          </div>
        </div>
      </header>

      <main className={cn("flex-1 overflow-hidden", className)}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
