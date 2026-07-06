import { DateToolbar } from "@/components/dashboard/date-toolbar";
import { type DailyBusinessData, toDateKey } from "@/lib/daily-business";
import { DailyBusinessStats } from "./daily-business-stats";
import { DailyCasesList } from "./daily-cases-list";
import { DailySummaryPanel } from "./daily-summary-panel";

type DailyBusinessViewProps = {
  data: DailyBusinessData;
};

export function DailyBusinessView({ data }: DailyBusinessViewProps) {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <DateToolbar
        dateKey={data.dateKey}
        label="Reporting date"
        todayKey={toDateKey(new Date())}
      />

      <DailyBusinessStats
        totalCases={data.totalCases}
        grossBilling={data.grossBilling}
        totalDiscount={data.totalDiscount}
        netBilling={data.netBilling}
        totalReceived={data.totalReceived}
        totalDue={data.totalDue}
      />

      <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 md:gap-6">
        <DailyCasesList cases={data.cases} />
        <div className="md:col-span-1">
          <DailySummaryPanel
            totalCases={data.totalCases}
            grossBilling={data.grossBilling}
            totalDiscount={data.totalDiscount}
            netBilling={data.netBilling}
            totalReceived={data.totalReceived}
            totalDue={data.totalDue}
          />
        </div>
      </div>
    </div>
  );
}