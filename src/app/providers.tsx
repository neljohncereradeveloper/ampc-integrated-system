"use client";

import { QueryProvider } from "@/lib/providers/query-provider";
import { ReactNode } from "react";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      {/* <AuthProvider> */}
      {children}
      <Toaster richColors position="top-right" />
      {/* </AuthProvider> */}
    </QueryProvider>
  );
}
