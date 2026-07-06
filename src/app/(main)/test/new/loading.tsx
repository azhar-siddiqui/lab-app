import PageContainer from "@/components/layout/page-container";
import { TestGroupFormSkeleton } from "@/components/skeletons/page-skeletons";

export default function NewTestLoading() {
  return (
    <PageContainer>
      <TestGroupFormSkeleton />
    </PageContainer>
  );
}