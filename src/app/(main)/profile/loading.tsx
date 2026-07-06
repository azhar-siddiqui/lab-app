import PageContainer from "@/components/layout/page-container";
import { FormPageSkeleton } from "@/components/skeletons/page-skeletons";

export default function ProfileLoading() {
  return (
    <PageContainer>
      <FormPageSkeleton fields={6} />
    </PageContainer>
  );
}