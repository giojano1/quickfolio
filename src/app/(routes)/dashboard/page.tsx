"use client";

import { useCurrentUser } from "@/hooks/query/use-current-user";

export default function DashboardPage() {
  const { data: user } = useCurrentUser();
  if (!user) {
    return null;
  }
  return <div>{user.email}</div>;
}
