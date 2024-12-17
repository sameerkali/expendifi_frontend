"use client";

import * as React from "react";
import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./ModeToggle";

// This is sample data.
const data = {
  user: {
    name: "Sameer",
    email: "sameer@expendifi.com",
    avatar:
      "https://imgs.search.brave.com/kLhykwbCzeXBxBGhochlvebODA0OfQ48j1gwfi_waLo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzg4LzQ4/LzJhLzg4NDgyYThm/YjgzY2EwNmRmZmRi/ODA0ODc1YmVhMjhk/LmpwZw",
  },
  navMain: [
    {
      title: "Dash Board",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Earnings",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
        {
          title: "Performance",
          url: "#",
        },
      ],
    },
    {
      title: "Advertisement",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Create New",
          url: "#",
        },
        {
          title: "Manage",
          url: "#",
        },
      ],
    },
    {
      title: "Help & Support",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "FAQ",
          url: "#",
        },

        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Contact Admin",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Change Theme",
          url: "#",
        },
        {
          title: "Delete Your Account",
          url: "#",
        },
        {
          title: "Reset Settings",
          url: "#",
        },
        {
          title: "Privacy Policy",
          url: "#",
        },
        {
          title: "Upgrade Your Account",
          url: "#",
        },
        {
          title: "Reffer",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <ModeToggle />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
