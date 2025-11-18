import { CHrisMenubar } from "@/features/hris/components/shared/menubar";
import React from "react";

export default function HrisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CHrisMenubar />
      {children}
    </>
  );
}
