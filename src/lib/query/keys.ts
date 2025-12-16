export const queryKeys = {
  user: {
    all: ["user"] as const,
    me: () => [...queryKeys.user.all, "me"] as const,
    byId: (id: string) => [...queryKeys.user.all, "detail", id] as const,
    bySlug: (slug: string) => [...queryKeys.user.all, "slug", slug] as const,
  },

  auth: {
    all: ["auth"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
  },
} as const;

export type QueryKeys = typeof queryKeys;
