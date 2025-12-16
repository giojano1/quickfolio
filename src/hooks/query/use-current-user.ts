"use client";

import { UserResponse } from "@/types/user.types";
import { queryKeys } from "@/lib/query/keys";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export function useCurrentUser(): UseQueryResult<UserResponse, Error> {
  return useQuery<UserResponse, Error>({
    queryKey: queryKeys.user.me(),
    queryFn: async () => {
      const response = await fetch("/api/user/me");

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch user data");
      }

      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => {
      return Math.min(1000 * 2 ** attemptIndex, 30000);
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}

export function useRequiredUser(): UserResponse {
  const { data, error, isLoading } = useCurrentUser();

  if (error) {
    throw error;
  }

  if (isLoading || !data) {
    // Suspend for React Suspense
    throw new Promise(() => {});
  }

  return data;
}

export function useCurrentUserId(): string | undefined {
  const { data } = useCurrentUser();
  return data?.id;
}

export function useCurrentUserEmail(): string | null | undefined {
  const { data } = useCurrentUser();
  return data?.email;
}

export function useCurrentUserName(): string | null | undefined {
  const { data } = useCurrentUser();
  return data?.name;
}

export function useIsUserLoaded(): boolean {
  const { data, isLoading } = useCurrentUser();
  return !isLoading && !!data;
}
