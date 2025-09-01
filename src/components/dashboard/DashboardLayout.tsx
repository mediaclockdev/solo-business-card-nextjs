
'use client';

import { useState, ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex relative">
      {/* Mobile overlay when sidebar is open */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      
      <div className={cn(
        "flex-1 transition-all duration-300 w-full",
        collapsed ? "md:ml-20" : "md:ml-64",
        "ml-0" // No margin on mobile
      )}>
        <Navbar 
          collapsed={collapsed} 
          setMobileOpen={setMobileOpen}
        />
        <main className="p-4 md:p-6 mt-[80px] animate-enter">
          {children}
        </main>
      </div>
    </div>
  );
}
