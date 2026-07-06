import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/skeletons/page-skeletons";

export default function TestPackagesLoading() {
  return (
    <PageContainer
      pageTitle="Test Packages"
      pageDescription="Browse and manage test group packages used in patient registration."
    >
      <DataTableSkeleton rows={8} columns={5} />
    </PageContainer>
  );
}