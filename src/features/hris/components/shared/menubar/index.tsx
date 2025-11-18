"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { PAGE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

export function CHrisMenubar() {
  const router = useRouter();

  const navigateToModule = (module: string) => {
    router.push(module);
  };
  return (
    <Menubar className="rounded-none">
      <MenubarMenu>
        <MenubarTrigger>Module</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() => navigateToModule(PAGE_URL.hris.attendance)}
          >
            Attendance
          </MenubarItem>
          <MenubarItem onClick={() => navigateToModule(PAGE_URL.hris.payroll)}>
            Payroll
          </MenubarItem>
          {/* <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem> */}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
