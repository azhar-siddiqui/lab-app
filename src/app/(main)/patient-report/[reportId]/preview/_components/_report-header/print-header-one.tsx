"use client";
import {
  DoctorType,
  PatientType,
} from "@/actions/patient-report/get-patient-report";
import { formatDateTime } from "@/lib/fomat-price";
import { ReactQRCode } from "@lglab/react-qr-code";
import { Activity, Calendar, Clipboard, ShieldCheck, User } from "lucide-react";

interface PrintHeaderOneProps {
  pataient: PatientType;
  doctor: DoctorType;
}

export function PrintHeaderOne({
  pataient,
  doctor,
}: Readonly<PrintHeaderOneProps>) {
  const labId = "LAB-2026-98765";
  const websiteUrl = `www.google.com`;
  return (
    <div className="w-full mx-auto bg-white p-4 font-sans text-zinc-900 print:p-0">
      {/* 1. Main Lab Branding Header */}
      <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
        {/* Left Side: Lab Identity */}
        <div className="flex gap-4 items-center">
          {/* Logo Placeholder */}
          <div className="h-16 w-16 bg-linear-to-r from-zinc-900 to-blue-950 rounded-lg flex items-center justify-center text-white font-extrabold text-3xl shrink-0 print:h-14 print:w-14">
            M
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-blue-950 sm:text-3xl print:text-2xl">
              MEDICARE PATHOLOGY LAB
            </h1>
            <p className="text-xs text-zinc-500 font-medium mt-0.5 print:text-[11px]">
              Kabir Nager, Behind Central Bank Of India, Phulambri, Aurangabad -
              431111. <br /> Ph: +91 9011768487 / 7558380826
            </p>
            <p className="text-xs text-zinc-500 font-medium print:text-[11px]">
              Email: medicarepathlogylab@gmail.com | Web: medicarelab.com
            </p>
          </div>
        </div>

        {/* Right Side: Accreditations & Dynamic QR Code */}
        <div className="flex items-start gap-4">
          <div className="text-right flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200 print:bg-transparent print:border-none print:p-0">
              <ShieldCheck className="h-4 w-4 text-emerald-600 print:h-3.5 print:w-3.5" />
              <span>NABL ACCREDITED</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">
              MC-99482 / ISO 9001:2018
            </span>
          </div>

          {/* Dynamic QR Code Box */}
          <div className="flex flex-col items-center gap-1 border border-zinc-200 p-1 rounded bg-white print:border-zinc-300">
            <div className="w-18 h-16 print:w-13.75 print:h-13.75">
              <ReactQRCode
                size={72}
                value={websiteUrl}
                finderPatternInnerSettings={{
                  style: "rounded-sm",
                }}
                finderPatternOuterSettings={{
                  style: "rounded-sm",
                }}
              />
            </div>
            <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider print:text-[7px]">
              Scan for Report
            </span>
          </div>
        </div>
      </div>

      {/* 2. Patient & Sample Demographics Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-50 p-4 rounded-lg border border-zinc-200 text-sm print:grid-cols-2 print:bg-transparent print:p-2 print:mt-2">
        {/* Column 1: Patient Information */}
        <div className="space-y-2 border-b border-zinc-200 pb-2 md:border-b-0 md:pb-0 md:border-r md:pr-4 print:border-b-0 print:pb-0 print:border-r print:pr-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-zinc-400 shrink-0" />
            <span className="text-zinc-500 font-medium min-w-22.5">
              Patient Name:
            </span>
            <span className="font-bold text-zinc-900">
              {pataient.designation} {pataient.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-zinc-400 shrink-0" />
            <span className="text-zinc-500 font-medium min-w-22.5">
              Age / Gender:
            </span>
            <span className="font-semibold">
              {`${pataient.age} ${pataient.ageType} / ${pataient.gender}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clipboard className="h-4 w-4 text-zinc-400 shrink-0" />
            <span className="text-zinc-500 font-medium min-w-22.5">
              Patient ID (UHID):
            </span>
            <span className="font-mono text-xs bg-zinc-200 px-1.5 py-0.5 rounded font-semibold print:bg-transparent print:p-0 uppercase">
              MED-{pataient.id.split("-")[0]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4"></span>
            <span className="text-zinc-500 font-medium min-w-22.5">
              Referred By:
            </span>
            <span className="font-semibold text-linear-to-r from-blue-800 to-blue-950  print:text-zinc-900">
              {doctor.name.toLowerCase() === "self"
                ? doctor.name
                : `Dr. ${doctor.name}`}
            </span>
          </div>
        </div>

        {/* Column 2: Sample & Report Metadata */}
        <div className="space-y-2 md:pl-2 print:pl-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-zinc-400 shrink-0" />
            <span className="text-zinc-500 font-medium min-w-30">
              Registered Date:
            </span>
            <span className="font-medium">{formatDateTime(pataient.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-zinc-400 shrink-0" />
            <span className="text-zinc-500 font-medium min-w-30">
              Report Generated:
            </span>
            <span className="font-medium">{formatDateTime(new Date())}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4"></span>
            <span className="text-zinc-500 font-medium min-w-30">
              Lab Accession No:
            </span>
            <span className="font-mono font-bold text-xs">{labId}</span>
          </div>
        </div>
      </div>

      {/* 3. Decorative Divider */}
      <div className="w-full h-px bg-zinc-200 mt-4 print:mt-3" />
    </div>
  );
}
