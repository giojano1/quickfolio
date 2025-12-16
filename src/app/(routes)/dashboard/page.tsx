import Preview from "@/components/common/preview/preview";
import Profile from "@/components/common/profile/profile";

export default function DashboardPage() {
  return (
    <section className="w-full flex justify-between">
      <Profile />
      <Preview />
    </section>
  );
}
