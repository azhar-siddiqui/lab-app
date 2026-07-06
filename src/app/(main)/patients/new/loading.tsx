import PageContainer from "@/components/layout/page-container";
import { PatientRegistrationSkeleton } from "@/components/skeletons/page-skeletons";

export default function NewPatientLoading() {
  return (
    <PageContainer>
      <PatientRegistrationSkeleton />
    </PageContainer>
  );
}