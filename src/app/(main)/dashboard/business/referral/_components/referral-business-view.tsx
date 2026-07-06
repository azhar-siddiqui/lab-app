import { PageStatsRow } from "@/components/dashboard/page-stats-row";
import { DataTable } from "@/components/data-table/data-table";
import { formatINR } from "@/lib/format-inr";
import type { ReferralBusinessData } from "@/lib/lab-pages-data";
import { HandCoins, Stethoscope, Users } from "lucide-react";
import { referralBusinessColumns } from "./columns";

type ReferralBusinessViewProps = {
  data: ReferralBusinessData;
};

export function ReferralBusinessView({ data }: ReferralBusinessViewProps) {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <PageStatsRow
        stats={[
          {
            label: "Referred cases",
            value: String(data.totalCases),
            icon: Users,
          },
          {
            label: "Referral billing",
            value: formatINR(data.totalBilling),
            icon: HandCoins,
          },
          {
            label: "Commission payable",
            value: formatINR(data.totalCommission),
            icon: Stethoscope,
          },
        ]}
      />

      <DataTable
        data={data.rows}
        columns={referralBusinessColumns}
        searchKeys={["doctorName"]}
        searchPlaceholder="Search doctors..."
      />
    </div>
  );
}