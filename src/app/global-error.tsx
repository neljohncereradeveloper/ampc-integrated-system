"use client";

/**
 * Global Error Page
 * Catches errors in the root layout
 */

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="mx-auto max-w-md text-center space-y-6 p-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Something went wrong!</h1>
              <p className="text-muted-foreground">
                A critical error occurred. Please refresh the page.
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
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
              >
                Try again
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
