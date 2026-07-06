import { getLabActivities } from "@/actions/business/get-lab-activities";
import { ActivitiesView } from "@/app/(main)/dashboard/business/activities/_components/activities-view";
import PageContainer from "@/components/layout/page-container";
import { Suspense } from "react";
import { ActivitiesSkeleton } from "./_components/activities-skeleton";

export default function ActivitiesPage() {
  return (
    <PageContainer
      pageTitle="Activities"
      pageDescription="Recent lab activity across cases, reports, and expenses."
    >
      <Suspense fallback={<ActivitiesSkeleton />}>
        <ActivitiesSection />
      </Suspense>
    </PageContainer>
  );
}

async function ActivitiesSection() {
  const activities = await getLabActivities();
  return <ActivitiesView activities={activities} />;
}