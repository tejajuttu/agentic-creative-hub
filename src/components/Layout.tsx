
import React from "react";
import { cn } from "@/lib/utils";

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
            <div className="w-5 h-5 rounded-sm bg-background"></div>
          </div>
          <div>
            <h1 className="text-xl font-semibold">EY Creative Studio</h1>
            <p className="text-xs text-muted-foreground">AI-powered marketing solutions</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm px-3 py-1 rounded-full bg-primary text-primary-foreground font-medium">
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
