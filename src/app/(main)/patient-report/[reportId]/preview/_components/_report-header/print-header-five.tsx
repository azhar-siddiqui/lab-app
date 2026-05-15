import { formatDateTime } from "@/lib/fomat-price";
import { ReactQRCode } from "@lglab/react-qr-code";
import {
  CheckCircle2,
  Dna,
  Fingerprint,
  PhoneCall,
  Stethoscope,
  User,
} from "lucide-react";

export default function PrintHeaderFive() {
  const websiteUrl = `www.google.com`;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-8 font-sans text-slate-900 print:p-0">
      {/* --- TOP BRANDING LAYER --- */}
      <div className="relative flex justify-between items-end pb-8">
        {/* Decorative Background Element (Visible on screen, subtle on print) */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10" />

        <div className="flex gap-6 items-center">
          {/* Modern Circular Logo with DNA Glow */}
          <div className="relative h-20 w-20 flex items-center justify-center bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg shadow-blue-200 print:shadow-none">
            <Dna className="h-10 w-10 text-white" />
            <div
              className="absolute -bottom-1 -right-1 h-6 w-6 bg-emerald-500 border-4 border-white rounded-full"
              title="Verified Lab"
            />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 leading-none">
              MEDICARE<span className="text-blue-600">LAB</span>
            </h1>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
              Advanced Diagnostics & Research
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="h-3 w-3 text-blue-500" /> +91 90117 68487
              </span>
              <span className="h-1 w-1 bg-slate-300 rounded-full" />
              <span>ISO 9001:2018 Certified</span>
            </div>
          </div>
        </div>

        {/* Dynamic Status & QR Area */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:block text-right">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black tracking-wide border border-blue-100 uppercase mb-2">
              <CheckCircle2 className="h-3 w-3" />
              Final Report
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              Verified by Digital Signature
            </p>
          </div>

          <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 print:bg-transparent">
            <ReactQRCode size={55} value={websiteUrl} />
          </div>
        </div>
      </div>

      {/* --- PATIENT DASHBOARD LAYER --- */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/50 p-1 print:bg-transparent print:border-slate-300">
        {/* This creates the "Dashboard" look */}
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-white rounded-[20px] shadow-sm print:divide-slate-300 print:shadow-none">
          {/* Box 1: Primary ID */}
          <div className="p-5 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">
              Patient Name
            </span>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-slate-300" />
              <span className="text-lg font-extrabold text-slate-800">
                Mr. John Doe
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium mt-1">
              45Y / Male
            </span>
          </div>

          {/* Box 2: Identifiers */}
          <div className="p-5 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Digital ID
            </span>
            <div className="flex items-center gap-2 text-slate-700">
              <Fingerprint className="h-4 w-4" />
              <span className="font-mono font-bold">MED-99482</span>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded mt-2 w-fit font-bold">
              UHID Verified
            </span>
          </div>

          {/* Box 3: Referral */}
          <div className="p-5 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Referred By
            </span>
            <div className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-slate-300" />
              <span className="font-bold text-slate-700">Dr. A. K. Roy</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium uppercase mt-1">
              M.D. Pathology
            </span>
          </div>

          {/* Box 4: Timing */}
          <div className="p-5 bg-slate-900 text-white md:rounded-r-[20px] flex flex-col justify-center print:bg-transparent print:text-black">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Report Timeline
            </span>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px]">
                <span className="opacity-60">Registered:</span>
                <span className="font-bold">14-May-26</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="opacity-60">Released:</span>
                <span className="font-bold">{formatDateTime(new Date())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider with Label */}
      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-100" />
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
          Test Analysis
        </span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>
    </div>
  );
}
