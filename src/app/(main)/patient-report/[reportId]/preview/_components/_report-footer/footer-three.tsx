import { ReactQRCode } from "@lglab/react-qr-code";

export function FooterThree() {
  return (
    <div className="mt-16 px-8 pb-8">
      <div className="border border-zinc-200 rounded-2xl p-6 bg-zinc-50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-semibold text-zinc-800">Dr. A. K. Roy, MD</p>
            <p className="text-sm text-zinc-600">Consultant Pathologist</p>
          </div>

          <div className="text-center">
            <p className="text-xs uppercase tracking-[1px] text-zinc-400">
              Medicare Pathology Lab
            </p>
            <p className="text-[10px] text-zinc-500 mt-1">
              Aurangabad • Maharashtra
            </p>
          </div>

          <div className="flex items-center gap-4">
            <ReactQRCode size={55} value="https://medicarelab.in" />
            <div className="text-xs">
              <p className="font-medium">Scan for Digital Report</p>
              <p className="text-zinc-500">+91 90117 68487</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-[10px] text-zinc-400 mt-6">
        This report is computer generated and does not require signature.
      </p>
    </div>
  );
}
