"use client";

import { ReactNode, useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/AppSidebar";

interface AuthSidebarProps {
  children: ReactNode;
}

export function AuthSidebar({ children }: AuthSidebarProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status (client-side only)
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  if (!isAuthenticated) {
    // Show only the main content if not authenticated
    return <main>{children}</main>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main>{children}</main>
    </SidebarProvider>
  );
}
