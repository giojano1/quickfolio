"use client";

import { useRequiredUser } from "@/hooks/query/use-current-user";

export default function DashboardPage() {
  const user = useRequiredUser();
  return <div>{user.email}</div>;
}
