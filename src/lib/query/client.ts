import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 1 minute
        staleTime: 60 * 1000,
        // Cache garbage collection after 5 minutes
        gcTime: 5 * 60 * 1000,
        // Don't refetch on window focus
        refetchOnWindowFocus: false,
        // Refetch when reconnecting to network
        refetchOnReconnect: true,
        // Only retry failed requests once
        retry: 1,
      },
      mutations: {
        // Don't retry mutations by default
        retry: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  // Server-side: Always create a new client for each request
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  // Client-side: Create singleton instance
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}
