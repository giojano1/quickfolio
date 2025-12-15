"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_ROUTES } from "@/constants/routes";
import { logger } from "@/lib/logger";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log error to console
    logger.error("Dashboard error boundary caught error", error, {
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });

    // Check if it's an authentication error
    const isAuthError =
      error.message.includes("Unauthorized") ||
      error.message.includes("No active session") ||
      error.message.includes("not authenticated");

    if (isAuthError) {
      // Redirect to login after a brief delay to show the error
      const timer = setTimeout(() => {
        router.push(APP_ROUTES.LOGIN);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error, router]);

  // Check if it's an auth error for conditional rendering
  const isAuthError =
    error.message.includes("Unauthorized") ||
    error.message.includes("No active session") ||
    error.message.includes("not authenticated");

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="space-y-4">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6 text-destructive"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
          </div>

          {/* Error Title */}
          <div className="text-center">
            <h2 className="text-xl font-semibold">
              {isAuthError ? "Authentication Required" : "Something went wrong"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isAuthError
                ? "Your session has expired. Redirecting to login..."
                : "We encountered an error loading your dashboard. Please try again."}
            </p>
          </div>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-md bg-muted p-3">
              <p className="text-xs font-mono text-muted-foreground break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {!isAuthError && (
            <div className="flex flex-col gap-2">
              <Button onClick={reset} className="w-full">
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(APP_ROUTES.HOME)}
                className="w-full"
              >
                Go Home
              </Button>
            </div>
          )}

          {isAuthError && (
            <Button
              onClick={() => router.push(APP_ROUTES.LOGIN)}
              className="w-full"
            >
              Go to Login
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
