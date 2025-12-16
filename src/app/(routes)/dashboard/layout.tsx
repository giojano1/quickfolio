import Header from "@/components/common/layout/header/header";
import { getQueryClient } from "@/lib/query/client";
import { queryKeys } from "@/lib/query/keys";
import { getUserServer } from "@/server/user/get-user";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

// Force dynamic rendering for this route since it uses authentication
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create a new QueryClient instance for this server request
  const queryClient = getQueryClient();

  // Prefetch user data on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.user.me(),
    queryFn: getUserServer,
  });

  // Dehydrate the cache state to send to the client
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <main className="flex flex-col h-svh">
        <Header />
        <div className="flex-1 flex h-full min-h-0 overflow-y-auto">
          {children}
        </div>
      </main>
    </HydrationBoundary>
  );
}
