"use client";

import { UserResponse } from "@/types/user.types";
import { queryKeys } from "@/lib/query/keys";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export function useCurrentUser(): UseQueryResult<UserResponse, Error> {
  return useQuery<UserResponse, Error>({
    queryKey: queryKeys.user.me(),
    queryFn: () => {
      throw new Error("User data should be prefetched on server");
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
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
