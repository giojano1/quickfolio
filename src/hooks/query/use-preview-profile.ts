"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { queryKeys } from "@/lib/query/keys";
import { UserResponse } from "@/types/user.types";
import { ProfileFormData } from "@/schemas/profile.schema";

export function usePreviewProfile() {
  const queryClient = useQueryClient();

  const updatePreview = useCallback(
    (formData: ProfileFormData) => {
      const currentUser = queryClient.getQueryData<UserResponse>(
        queryKeys.user.me()
      );

      if (!currentUser) return;

      queryClient.setQueryData<UserResponse>(queryKeys.user.me(), {
        ...currentUser,
        fullName: formData.fullName,
        title: formData.title,
        bio: formData.bio || null,
        location: formData.location || null,
        website: formData.website || null,
      });
    },
    [queryClient]
  );

  const resetPreview = useCallback(() => {
    // Invalidate to refetch from server (rollback preview)
    queryClient.invalidateQueries({ queryKey: queryKeys.user.me() });
  }, [queryClient]);

  return { updatePreview, resetPreview };
}
