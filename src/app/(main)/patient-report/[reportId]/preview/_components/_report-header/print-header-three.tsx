import { formatDateTime } from "@/lib/fomat-price";
import { ReactQRCode } from "@lglab/react-qr-code";
import { Activity, Mail, Phone, ShieldCheck, User } from "lucide-react";

export function PrintHeaderThree() {
  const labId = "LAB-2026-98765";
  const websiteUrl = `www.google.com`;
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 font-sans text-zinc-900 print:p-0 print:text-black">
      {/* 1. Main Branding Header */}
      <div className="flex justify-between items-center border-b-4 border-blue-700 pb-4">
        <div className="flex gap-5 items-center">
          {/* Logo */}
          <div className="h-16 w-16 bg-blue-700 rounded-xl flex items-center justify-center text-white font-black text-4xl shrink-0 print:h-14 print:w-14">
            M
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-blue-900 sm:text-3xl print:text-2xl uppercase">
              Medicare Pathology Lab
            </h1>
            <div className="text-[11px] text-zinc-600 leading-tight mt-1 print:text-black">
              <p className="font-medium">
                Kabir Nagar, Behind Central Bank Of India, Phulambri, Aurangabad
                - 431111
              </p>
              <div className="flex gap-4 mt-1">
                <span className="flex items-center gap-1 font-semibold">
                  <Phone className="h-3 w-3" /> +91 9011768487
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  <Mail className="h-3 w-3" /> medicarelab@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditations & QR */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:flex flex-col items-end">
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

      {/* 2. Patient & Sample Demographics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm border-b-2 border-zinc-100 pb-6 print:grid-cols-3 print:border-zinc-200">
        {/* Patient Identity */}
        <div className="md:col-span-2 grid grid-cols-2 gap-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Patient Name
            </span>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600 print:hidden" />
              <span className="text-lg font-bold text-zinc-900 leading-none">
                Mr. John Doe
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Patient ID (UHID)
            </span>
            <span className="font-mono font-bold text-blue-700 text-base leading-none print:text-black">
              MED-88432
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Age / Gender
            </span>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-zinc-400 print:hidden" />
              <span className="font-semibold text-zinc-800">
                45 Years / Male
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Referred By
            </span>
            <span className="font-bold italic text-zinc-800">
              Dr. A. K. Roy, MD
            </span>
          </div>
        </div>

        {/* Lab Metadata Section */}
        <div className="border-t pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-6 border-zinc-200 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block mb-1">
              Accession No
            </span>
            <span className="font-black text-xl tracking-widest text-zinc-900">
              {labId}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] border-b border-dotted border-zinc-200 pb-1">
              <span className="text-zinc-500 font-medium">Collected:</span>
              <span className="font-bold text-zinc-900">
                14-May-2026 09:30 AM
              </span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-500 font-medium">Reported:</span>
              <span className="font-bold text-zinc-900">
                {formatDateTime(new Date())}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Subtle accent for the start of the report body */}
      <div className="w-full flex justify-center -mt-0.5">
        <div className="px-4 py-1 bg-blue-700 text-white text-[10px] font-bold rounded-b-md uppercase tracking-[0.2em] print:bg-black">
          Laboratory Report
        </div>
      </div>
    </div>
  );
}
