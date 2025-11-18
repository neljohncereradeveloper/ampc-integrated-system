"use client";

import * as React from "react";
import { Briefcase, Users } from "lucide-react";

import { NavSystemModules } from "@/components/nav-system-modules";
import { NavUser } from "@/components/nav-user";
import { SidebarTitle } from "@/components/sidebar-title";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { PAGE_URL } from "@/lib/constants";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  systemModules: [
    {
      name: "HRIS",
      url: PAGE_URL.hris.payroll,
      icon: Briefcase,
    },
    {
      name: "MIS",
      url: "#",
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTitle />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavSystemModules systemModules={data.systemModules} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
