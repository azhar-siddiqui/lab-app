import PageContainer from "@/components/layout/page-container";
import { PatientsPageSkeleton } from "@/components/skeletons/page-skeletons";

export default function PatientsLoading() {
  return (
    <PageContainer>
      <PatientsPageSkeleton />
    </PageContainer>
  );
}