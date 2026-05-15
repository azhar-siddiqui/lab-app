import { formatDateTime } from "@/lib/fomat-price";
import { ReactQRCode } from "@lglab/react-qr-code";
import { Globe, Phone, ShieldCheck } from "lucide-react";

export function PrintHeaderTwo() {
  const labId = "LAB-2026-98765";
  const websiteUrl = `www.google.com`;
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 font-sans text-zinc-900 print:p-0 print:text-black">
      {/* 1. Main Lab Branding Header */}
      <div className="flex justify-between items-center border-b border-blue-700 pb-4">
        <div className="flex gap-4 items-center">
          <div className="h-16 w-16 bg-linear-to-r from-zinc-900 to-blue-950 rounded-xl flex items-center justify-center text-white font-black text-4xl shrink-0 print:h-14 print:w-14 print:rounded-lg">
            M
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-blue-950 sm:text-3xl print:text-2xl uppercase">
              Medicare Pathology Lab
            </h1>
            <div className="text-[11px] text-zinc-600 leading-tight mt-1 print:text-black">
              <p>
                Kabir Nagar, Behind Central Bank Of India, Phulambri, Aurangabad
                - 431111
              </p>
              <div className="flex gap-3 mt-0.5">
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" /> +91 9011768487
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" /> medicarelab.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right flex flex-col items-end">
            <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-bold print:border print:border-emerald-600 print:text-emerald-700 print:bg-transparent">
              <ShieldCheck className="h-3 w-3" />
              <span>NABL ACCREDITED</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono mt-1 font-semibold">
              MC-99482 / ISO 9001:2018
            </span>
          </div>

          <div className="p-1 border-2 border-zinc-100 rounded-lg print:border-zinc-300">
            <ReactQRCode
              size={64}
              value={websiteUrl}
              finderPatternInnerSettings={{ style: "rounded-sm" }}
              finderPatternOuterSettings={{ style: "rounded-sm" }}
            />
          </div>
        </div>
      </div>

      {/* 2. Patient & Sample Demographics Grid */}
      <div className="mt-6 grid grid-cols-3 gap-y-4 gap-x-8 text-sm relative">
        {/* Patient Core */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Patient Name
            </span>
            <span className="text-lg font-bold text-zinc-900 leading-tight">
              Mr. John Doe
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Patient ID / UHID
            </span>
            <span className="font-mono font-bold text-blue-700 print:text-black">
              MED-88432
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Age / Gender
            </span>
            <span className="font-semibold">45 Years / Male</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Referred By
            </span>
            <span className="font-semibold italic text-zinc-800">
              Dr. A. K. Roy, MD
            </span>
          </div>
        </div>

        {/* Lab Metadata */}
        <div className="col-span-1 border-l pl-6 border-zinc-200 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
              Accession No
            </span>
            <span className="font-black text-lg tracking-widest">{labId}</span>
          </div>
          <div className="space-y-1 mt-2">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-500">Registered:</span>
              <span className="font-medium text-right">14-May-26 09:30</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-500">Reported:</span>
              <span className="font-medium text-right">
                {formatDateTime(new Date())}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Subtle Divider */}
      <div className="w-full h-px bg-blue-700 mt-6 opacity-20"></div>
    </div>
  );
}
