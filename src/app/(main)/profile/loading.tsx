import PageContainer from "@/components/layout/page-container";
import { ProfileSettingsSkeleton } from "@/components/skeletons/page-skeletons";

export default function ProfileLoading() {
  return (
    <PageContainer
      pageTitle="Profile & Settings"
      pageDescription="Manage your account, lab preferences, and security settings."
    >
      <ProfileSettingsSkeleton />
    </PageContainer>
  );
}