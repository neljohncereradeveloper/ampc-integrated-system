"use client";

/**
 * HRIS Error Page
 * Error boundary for HRIS section
 */

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HRISError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("HRIS error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="mx-auto max-w-md text-center space-y-6 p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">HRIS Error</h1>
          <p className="text-muted-foreground">
            An error occurred in the HRIS module. Please try again.
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-left">
            <p className="text-sm font-semibold text-destructive mb-2">
              Error Details (Development Only):
            </p>
            <p className="text-xs font-mono text-destructive/80 break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/hris">Back to HRIS</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

