import { billingColumns } from "@/app/(main)/dashboard/_components/billing-columns";
import { PageStatsRow } from "@/components/dashboard/page-stats-row";
import { DataTable } from "@/components/data-table/data-table";
import { formatINR } from "@/lib/format-inr";
import type { DueReportsData } from "@/lib/lab-pages-data";
import { AlertCircle, Users, Wallet } from "lucide-react";

type DueReportsViewProps = {
  data: DueReportsData;
};

export function DueReportsView({ data }: DueReportsViewProps) {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <PageStatsRow
        stats={[
          {
            label: "Total outstanding",
            value: formatINR(data.totalOutstanding),
            icon: Wallet,
          },
          {
            label: "Cases with dues",
            value: String(data.patientsWithDues),
            icon: Users,
          },
          {
            label: "Largest due",
            value: formatINR(data.largestDue),
            icon: AlertCircle,
          },
        ]}
      />

      <DataTable
        data={data.dues}
        columns={billingColumns}
        searchKeys={["patientName", "doctorName", "testGroups"]}
        searchPlaceholder="Search outstanding cases..."
      />
    </div>
  );
}