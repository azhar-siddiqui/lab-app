import PageContainer from "@/components/layout/page-container";
import { TablePageSkeleton } from "@/components/skeletons/page-skeletons";

export default function PatientsLoading() {
  return (
    <PageContainer>
      <TablePageSkeleton rows={8} columns={7} />
    </PageContainer>
  );
}