import { ReactQRCode } from "@lglab/react-qr-code";
import Image from "next/image";

interface FooterOneProps {
  index: number;
  length: number;
}

export function FooterOne({ index, length }: Readonly<FooterOneProps>) {
  const websiteUrl = `https://medicare-lab-app.vercel.app/`;
  return (
    <div className="px-8 pb-2">
      <div className="flex flex-row justify-between items-start gap-8">
        {/* Left - Doctor Signature */}
        <div className="flex-1">
          <div className="border border-dashed border-zinc-400 w-60 h-14 rounded flex items-end justify-center mb-2">
            <div className="flex flex-col justify-center items-center">
              <Image
                src="/Sign.png"
                className="w-20 h-auto"
                width={80}
                height={80}
                alt="Sign"
              />
              <p className="text-xs text-zinc-400 mb-1">Signature</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-zinc-800 text-sm">
              {/* Dr. A. K. Roy, MD */}
            </p>
            <p className="text-xs text-zinc-600">Consultant Pathologist</p>
          </div>
        </div>

        {/* Center - Lab Info & Disclaimer */}
        <div className="flex-1 text-center">
          <div className="flex justify-center mb-3">
            <div className="h-px w-56 bg-linear-to-r from-transparent via-zinc-400 to-transparent" />
          </div>

          <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
            MEDICARE PATHOLOGY LAB
          </p>
          <p className="text-[10px] text-zinc-500 mt-1 leading-tight">
            Kabir Nagar, Behind Central Bank Of India,
            <br />
            Phulambri, Aurangabad - 431111
          </p>
          <div className="text-[10px] text-zinc-500 space-y-0.5 mt-2">
            <p>+91 90117 68487</p>
            <p>medicarepathlogylab@gmail.com</p>
          </div>
        </div>

        {/* Right - QR + Contact */}
        <div className="flex-1 flex flex-col items-end text-right">
          <div className="flex flex-col items-center gap-1 bg-white  p-1.5 border border-dashed border-zinc-400 rounded print-rounded">
            <div className="w-14 h-14">
              <ReactQRCode
                size={58}
                value={websiteUrl}
                finderPatternInnerSettings={{
                  style: "rounded-sm",
                }}
                finderPatternOuterSettings={{
                  style: "rounded-sm",
                }}
              />
            </div>
            <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider">
              Scan for Report
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center mt-2">
        <div className="flex items-center justify-center gap-6 text-[10px] text-zinc-400 print:text-zinc-500">
          <p>Reg. No: MMC-45678</p>
          <p>•</p>
          <p>CONFIDENTIAL MEDICAL REPORT</p>
          <p>•</p>
          <p>Not to be reproduced without permission</p>
          <p>•</p>
          <p>
            Page {index} of {length}
          </p>
        </div>
      </div>
    </div>
  );
}
