import PageContainer from "@/components/layout/page-container";
import { FormPageSkeleton } from "@/components/skeletons/page-skeletons";

export default function EditPatientLoading() {
  return (
    <PageContainer>
      <FormPageSkeleton fields={10} />
    </PageContainer>
  );
}