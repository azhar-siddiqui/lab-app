import PageContainer from "@/components/layout/page-container";
import { ProfileSettingsPage } from "@/features/profile/form/profile-settings-form";

export default function ProfilePage() {
  return (
    <PageContainer
      pageTitle="Profile & Settings"
      pageDescription="Manage your account, lab preferences, and security settings."
    >
      <ProfileSettingsPage />
    </PageContainer>
  );
}
