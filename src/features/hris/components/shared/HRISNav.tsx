"use client";

/**
 * HRIS Navigation Component
 * Navigation sidebar for HRIS section
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: "/hris", label: "Overview" },
  { href: "/hris/attendance", label: "Attendance" },
  { href: "/hris/payroll", label: "Payroll" },
];

export function HRISNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 p-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block px-4 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

