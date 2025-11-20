import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CHrisMenubar } from "@/features/hris/components/shared/menubar";
import { APP_NAME } from "@/lib/constants";
import React from "react";

export default function HrisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">{APP_NAME}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                  {/* <BreadcrumbItem>
                  <BreadcrumbPage>
                    {APP_NAME} - {HRIS_LABELS.MODULE_NAME}
                  </BreadcrumbPage>
                </BreadcrumbItem> */}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {/* <Separator /> */}
          <div className="flex w-full flex-col gap-4 p-4 md:p-6">
            <CHrisMenubar />
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
