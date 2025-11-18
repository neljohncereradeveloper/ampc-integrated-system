"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSystemModules({
  systemModules,
}: {
  systemModules: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>System Modules</SidebarGroupLabel>
      <SidebarMenu>
        {systemModules.map((systemModule) => (
          <SidebarMenuItem key={systemModule.name}>
            <SidebarMenuButton asChild>
              <a href={systemModule.url}>
                <systemModule.icon />
                <span>{systemModule.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
