"use client";

import { ChevronRight, SunMoon, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible asChild className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Theme">
                <SunMoon className="mr-2 h-5 w-5" />
                <span>Theme</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>

                {/* Dark Theme Button */}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>

                {/* System Theme Button */}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
