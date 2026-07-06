import PageContainer from "@/components/layout/page-container";
import { NotificationsSkeleton } from "./_components/notifications-skeleton";

export default function NotificationsLoading() {
  return (
    <PageContainer
      pageTitle="Notifications"
      pageDescription="Stay on top of pending reports, collections, and daily lab reminders."
    >
      <NotificationsSkeleton />
    </PageContainer>
  );
}