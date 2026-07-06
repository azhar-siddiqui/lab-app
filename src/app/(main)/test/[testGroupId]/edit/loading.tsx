import PageContainer from "@/components/layout/page-container";
import { FormPageSkeleton } from "@/components/skeletons/page-skeletons";

export default function EditTestLoading() {
  return (
    <PageContainer>
      <FormPageSkeleton fields={8} />
    </PageContainer>
  );
}