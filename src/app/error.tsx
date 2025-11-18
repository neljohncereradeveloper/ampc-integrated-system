"use client";

/**
 * Root Error Page
 * Error boundary for handling errors in the application
 */

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto max-w-md text-center space-y-6 p-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Something went wrong!</h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Please try again.
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
            {error.digest && (
              <p className="text-xs text-muted-foreground mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
