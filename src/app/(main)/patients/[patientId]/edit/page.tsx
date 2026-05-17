import { GetDoctor } from "@/actions/doctors/get-doctors";
import { GetPatientById } from "@/actions/patient/get-patient-by-id";
import { GetTestGroup } from "@/actions/test-group/get-test-group";
import PageContainer from "@/components/layout/page-container";
import { PatientRegistrationForm } from "../../new/_components/patient-registration-form";

interface EditPatientPageProps {
  params: Promise<{ patientId: string }>;
}

export default async function EditPatientPage({
  params,
}: Readonly<EditPatientPageProps>) {
  const { patientId } = await params;
  const [patient, doctors, testGroups] = await Promise.all([
    GetPatientById(patientId),
    GetDoctor(),
    GetTestGroup(),
  ]);

  return (
    <PageContainer>
      <PatientRegistrationForm
        doctors={doctors}
        testGroups={testGroups}
        patient={patient}
        mode="edit"
      />
    </PageContainer>
  );
}
