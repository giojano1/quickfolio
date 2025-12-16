"use client";

import Preview from "@/components/common/preview/preview";
import Profile from "@/components/common/profile/profile";
import { useRequiredUser } from "@/hooks/query/use-current-user";

export default function DashboardPage() {
  const user = useRequiredUser();
  return (
    <section className="w-full flex justify-between">
      <Profile />
      <Preview />
    </section>
  );
}
