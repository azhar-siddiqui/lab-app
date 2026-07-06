import { GetDoctor } from "@/actions/doctors/get-doctors";
import { GetTestGroup } from "@/actions/test-group/get-test-group";
import PageContainer from "@/components/layout/page-container";
import { PatientRegistrationForm } from "./_components/patient-registration-form";

export default async function PatientRegistrationPage() {
  const [doctors, testGroups] = await Promise.all([
    GetDoctor(),
    GetTestGroup(),
  ]);

  return (
    <PageContainer>
      <PatientRegistrationForm doctors={doctors} testGroups={testGroups} />
    </PageContainer>
  );
}