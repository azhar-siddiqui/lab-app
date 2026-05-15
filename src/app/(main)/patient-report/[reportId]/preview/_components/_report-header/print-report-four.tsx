import { formatDateTime } from "@/lib/fomat-price";
import { ReactQRCode } from "@lglab/react-qr-code";
import { Mail, Phone, ShieldCheck } from "lucide-react";

export default function PrintReportFour() {
  const labId = "LAB-2026-98765";
  const websiteUrl = `www.google.com`;
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 font-sans text-zinc-900 print:p-6 print:text-black overflow-hidden relative">
      {/* Top Thin Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-blue-700 via-emerald-600 to-blue-700" />

      <div className="flex justify-between items-start border-b border-zinc-200 pb-6">
        {/* Left: Branding */}
        <div className="flex gap-6 items-start">
          {/* Logo with subtle ring */}
          <div className="relative shrink-0">
            <div className="h-20 w-20 bg-linear-to-br from-blue-700 to-blue-900 rounded-2xl flex items-center justify-center text-white font-black text-5xl shadow-lg ring-8 ring-blue-100 print:ring-4 print:ring-blue-200">
              M
            </div>
            <div className="absolute -bottom-1 -right-1 h-7 w-7 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xs font-bold ring-4 ring-white">
              ✓
            </div>
          </div>

          <div className="pt-1">
            <h1 className="text-3xl font-black tracking-tighter text-blue-950 leading-none print:text-2xl">
              MEDICARE
              <br />
              PATHOLOGY LAB
            </h1>
            <p className="text-emerald-700 font-semibold tracking-widest text-sm mt-2">
              ESTD 2012 • AURANGABAD
            </p>

            <div className="mt-4 text-sm text-zinc-600 leading-tight print:text-black">
              <p>
                Kabir Nagar, Behind Central Bank Of India, Phulambri, Aurangabad
                - 431111
              </p>
              <div className="flex gap-5 mt-2 text-xs">
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> +91 90117 68487
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> medicarelab@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Accreditation + QR */}
        <div className="flex flex-col items-end gap-4">
          <div className="flex items-center gap-3">
            {/* NABL Badge - More Premium */}
            <div className="bg-linear-to-br from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md print:shadow-none print:border print:border-emerald-700">
              <ShieldCheck className="h-4 w-4" />
              NABL ACCREDITED
            </div>

            <div className="text-right text-[10px] font-mono leading-tight text-zinc-500">
              MC-99482
              <br />
              ISO 9001:2018
            </div>
          </div>

          {/* QR Code with Label */}
          <div className="text-center">
            <div className="p-2 bg-white border border-zinc-200 rounded-2xl shadow-sm print:border-zinc-300">
              <ReactQRCode
                size={72}
                value={websiteUrl}
                finderPatternInnerSettings={{ style: "rounded" }}
                finderPatternOuterSettings={{ style: "rounded" }}
              />
            </div>
            <p className="text-[10px] text-zinc-400 mt-1 font-medium tracking-wider">
              SCAN FOR DIGITAL REPORT
            </p>
          </div>
        </div>
      </div>

      {/* Patient & Report Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-sm">
        {/* Patient Details */}
        <div className="md:col-span-8">
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <span className="block text-[10px] font-bold tracking-[0.5px] text-zinc-400 uppercase mb-1">
                Patient Name
              </span>
              <p className="text-2xl font-semibold text-zinc-900">
                Mr. John Doe
              </p>
            </div>

            <div>
              <span className="block text-[10px] font-bold tracking-[0.5px] text-zinc-400 uppercase mb-1">
                Patient ID
              </span>
              <p className="font-mono text-xl font-bold text-blue-700">
                MED-88432
              </p>
            </div>

            <div>
              <span className="block text-[10px] font-bold tracking-[0.5px] text-zinc-400 uppercase mb-1">
                Age / Gender
              </span>
              <p className="font-semibold text-lg">45 Years • Male</p>
            </div>

            <div>
              <span className="block text-[10px] font-bold tracking-[0.5px] text-zinc-400 uppercase mb-1">
                Referred By
              </span>
              <p className="font-semibold text-zinc-800">Dr. A. K. Roy, MD</p>
            </div>
          </div>
        </div>

        {/* Report Metadata */}
        <div className="md:col-span-4 border-l border-zinc-200 pl-8 md:border-l">
          <div className="space-y-5">
            <div>
              <span className="block text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-1">
                Accession No.
              </span>
              <p className="font-mono text-3xl font-black tracking-widest text-zinc-900">
                {labId}
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Collected On</span>
                <span className="font-semibold text-right">
                  14 May 2026, 09:30 AM
                </span>
              </div>
              <div className="flex justify-between border-t border-dashed pt-3">
                <span className="text-zinc-500">Reported On</span>
                <span className="font-semibold text-right">
                  {formatDateTime(new Date())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Laboratory Report Title Bar - Unique Design */}
      <div className="mt-10 -mx-8 px-8 py-4 bg-linear-to-r from-zinc-900 to-blue-950 text-white flex items-center justify-between print:from-black print:to-zinc-900">
        <div className="uppercase tracking-[3px] text-sm font-bold">
          Laboratory Report
        </div>
        <div className="text-xs opacity-70 font-mono">
          CONFIDENTIAL • FOR PHYSICIAN USE ONLY
        </div>
      </div>
    </div>
  );
}
