import { DoctorForm } from "@/app/(main)/patients/new/_components/doctor-form";
import { PageStatsRow } from "@/components/dashboard/page-stats-row";
import { DataTable } from "@/components/data-table/data-table";
import type { ReferralDoctorsData } from "@/lib/lab-pages-data";
import { Percent, Stethoscope, Users } from "lucide-react";
import { referralDoctorColumns } from "./columns";

type ReferralDoctorsViewProps = {
  data: ReferralDoctorsData;
};

export function ReferralDoctorsView({ data }: ReferralDoctorsViewProps) {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <PageStatsRow
        stats={[
            {
              label: "Total doctors",
              value: String(data.totalDoctors),
              icon: Users,
            },
            {
              label: "Average commission",
              value: `${data.averageCommission}%`,
              icon: Percent,
            },
            {
              label: "Active referrals",
              value: String(
                data.doctors.filter((doctor) => doctor.totalCases > 0).length,
              ),
              icon: Stethoscope,
            },
        ]}
      />

      <div className="flex items-center justify-end">
        <DoctorForm />
      </div>

      <DataTable
        data={data.doctors}
        columns={referralDoctorColumns}
        searchKeys={["name", "email", "specialization", "contactNumber"]}
        searchPlaceholder="Search doctors..."
        dateFilterKey="createdAt"
      />
    </div>
  );
}