import { getNotifications } from "@/actions/notifications/get-notifications";
import { NotificationsView } from "@/app/(main)/notifications/_components/notifications-view";
import PageContainer from "@/components/layout/page-container";
import { Suspense } from "react";
import { NotificationsSkeleton } from "./_components/notifications-skeleton";

export default function NotificationsPage() {
  return (
    <PageContainer
      pageTitle="Notifications"
      pageDescription="Stay on top of pending reports, collections, and daily lab reminders."
    >
      <Suspense fallback={<NotificationsSkeleton />}>
        <NotificationsSection />
      </Suspense>
    </PageContainer>
  );
}

async function NotificationsSection() {
  const notifications = await getNotifications();
  return <NotificationsView notifications={notifications} />;
}