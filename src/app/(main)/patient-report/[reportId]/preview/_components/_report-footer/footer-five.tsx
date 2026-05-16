import { ReactQRCode } from "@lglab/react-qr-code";

export function FooterFive() {
  return (
    <div className="py-4 px-6 border-t ">
      <div className="flex justify-between items-end">
        <div>
          <p className="font-semibold">Dr. A. K. Roy, MD</p>
          <p className="text-sm text-zinc-600">Consultant Pathologist</p>
          <p className="text-xs text-zinc-500 mt-4">Reg. No: MMC-45678</p>
        </div>

        <div className="text-center">
          <p className="uppercase text-xs tracking-widest text-zinc-400">
            Thank You
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            For Choosing Medicare Pathology Lab
          </p>
        </div>

        <div className="text-right">
          <ReactQRCode size={60} value="https://medicarelab.in" />
          <p className="text-[10px] text-zinc-400 mt-2">Digital Report</p>
        </div>
      </div>

      <div className="text-center text-[10px] text-zinc-400 mt-2">
        Confidential • For Professional Use Only • Not to be reproduced
      </div>
    </div>
  );
}
