"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/lib/query/keys";
import { updateProfileServer } from "@/server/user/update-profile";
import { UpdateProfilePayload, UserResponse } from "@/types/user.types";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => updateProfileServer(data),

    // OPTIMISTIC UPDATE: Update UI immediately before server responds
    onMutate: async (newData: UpdateProfilePayload) => {
      // Cancel any outgoing refetches (prevents race conditions)
      await queryClient.cancelQueries({ queryKey: queryKeys.user.me() });

      // Snapshot the previous value for rollback
      const previousUser = queryClient.getQueryData<UserResponse>(
        queryKeys.user.me()
      );

      // Optimistically update the cache
      if (previousUser) {
        queryClient.setQueryData<UserResponse>(queryKeys.user.me(), {
          ...previousUser,
          fullName: newData.fullName,
          title: newData.title,
          bio: newData.bio || null,
          location: newData.location || null,
          website: newData.website || null,
          updatedAt: new Date(),
        });
      }

      // Return context with snapshot for rollback
      return { previousUser };
    },

    // ON SUCCESS: Show success toast
    onSuccess: () => {
      toast.success("Profile updated successfully", {
        description: "Your personal details have been saved.",
      });
    },

    // ON ERROR: Rollback to previous state and show error toast
    onError: (error, _variables, context) => {
      // Rollback to previous value
      if (context?.previousUser) {
        queryClient.setQueryData(
          queryKeys.user.me(),
          context.previousUser
        );
      }

      // Show error toast
      const errorMessage = error instanceof Error
        ? error.message
        : "Failed to update profile";

      toast.error("Failed to update profile", {
        description: errorMessage,
      });
    },

    // ALWAYS: Ensure we refetch on settle to sync with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me() });
    },
  });
}
