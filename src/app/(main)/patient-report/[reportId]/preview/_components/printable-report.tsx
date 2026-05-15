import { GetPatientReportByIdType } from "@/actions/patient-report/get-patient-report";
import { PrintHeaderOne } from "./_report-header/print-header-one";
import { Report } from "./_report/report";

interface PrintableReportProps {
  report: GetPatientReportByIdType;
}
export default function PrintableReport({
  report,
}: Readonly<PrintableReportProps>) {
  const testGroup = report.testGroups[0];
  return (
    <div className="gap-4 flex">
      <div className="lg:sticky lg:top-20 h-[calc(100vh-100px)] order-1 col-span-4 border w-full">
        List her
      </div>
      <div className="order-2 col-span-8 w-full max-w-[210mm]">
        <div className="border h-[297mm] w-[210mm] ms-auto bg-white shadow-lg">
          <PrintHeaderOne pataient={report.patient} doctor={report.doctor} />
          <Report testGroupItem={testGroup} />
        </div>
      </div>
    </div>
  );
}

/* 
  <div className="grid gap-4 grid-cols-1 lg:grid-cols-12">
      <div className="lg:sticky lg:top-20 h-[calc(100vh-100px)] order-1 col-span-4 border">
        List her
      </div>
      <div className="order-2 col-span-8 ">
        <div className="border h-[297mm] w-[210mm] ms-auto bg-white shadow-lg">
          <PrintHeaderOne pataient={report.patient} doctor={report.doctor} />
          <Report />
        </div>
      </div>
    </div>
*/
