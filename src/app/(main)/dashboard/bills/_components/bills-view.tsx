import { billingColumns } from "@/app/(main)/dashboard/_components/billing-columns";
import { PageStatsRow } from "@/components/dashboard/page-stats-row";
import { DataTable } from "@/components/data-table/data-table";
import { formatINR } from "@/lib/format-inr";
import type { BillsData } from "@/lib/lab-pages-data";
import { IndianRupee, Receipt, Wallet } from "lucide-react";

type BillsViewProps = {
  data: BillsData;
};

export function BillsView({ data }: BillsViewProps) {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <PageStatsRow
        stats={[
          {
            label: "Total billed",
            value: formatINR(data.totalBilled),
            icon: Receipt,
          },
          {
            label: "Total collected",
            value: formatINR(data.totalReceived),
            icon: IndianRupee,
          },
          {
            label: "Outstanding",
            value: formatINR(data.totalOutstanding),
            icon: Wallet,
          },
        ]}
      />

      <DataTable
        data={data.bills}
        columns={billingColumns}
        searchKeys={["patientName", "doctorName", "testGroups"]}
        searchPlaceholder="Search patient, doctor, or tests..."
      />
    </div>
  );
}