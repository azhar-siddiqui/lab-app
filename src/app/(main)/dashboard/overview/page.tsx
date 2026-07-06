import { DashboardOverview } from "@/app/(main)/dashboard/overview/_components/dashboard-overview";
import PageContainer from "@/components/layout/page-container";
import { getServerSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";
import { Suspense } from "react";
import { DashboardOverviewSkeleton } from "@/components/skeletons/page-skeletons";

export default async function OverViewPage() {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) unauthorized();

  return (
    <PageContainer>
      <Suspense fallback={<DashboardOverviewSkeleton />}>
        <DashboardOverview userName={user.name} />
      </Suspense>
    </PageContainer>
  );
}