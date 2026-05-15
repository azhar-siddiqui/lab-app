import { ReactQRCode } from "@lglab/react-qr-code";
import {
  Activity,
  Calendar,
  Clipboard,
  FlaskConical,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LabInfo {
  name: string;
  tagline?: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  accreditationCode: string;
  isoCode: string;
  logoInitials: string;
}

export interface PatientInfo {
  name: string;
  uhid: string;
  age: string;
  gender: string;
  referredBy: string;
}

export interface ReportMeta {
  labAccessionNo: string;
  registeredAt: Date | string;
  reportGeneratedAt: Date | string;
  sampleType?: string;
}

export interface PrintHeaderProps {
  lab: LabInfo;
  patient: PatientInfo;
  report: ReportMeta;
}

// ─── Default Data (for standalone preview) ───────────────────────────────────

const DEFAULT_LAB: LabInfo = {
  name: "Medicare Pathology Lab",
  tagline: "Precision Diagnostics · Trusted Results",
  address:
    "Kabir Nagar, Behind Central Bank Of India, Phulambri, Aurangabad – 431111",
  phone: "+91 90117 68487",
  email: "medicarepathlogylab@gmail.com",
  website: "medicarelab.com",
  accreditationCode: "MC-99482",
  isoCode: "ISO 9001:2018",
  logoInitials: "MP",
};

const DEFAULT_PATIENT: PatientInfo = {
  name: "Mr. John Doe",
  uhid: "MED-88432",
  age: "45 Years",
  gender: "Male",
  referredBy: "Dr. A. K. Roy, MD",
};

const DEFAULT_REPORT: ReportMeta = {
  labAccessionNo: "LAB-2026-98765",
  registeredAt: new Date("2026-05-14T09:30:00"),
  reportGeneratedAt: new Date(),
  sampleType: "Whole Blood (EDTA)",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDateTime(value: Date | string): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// ─── Small atoms ─────────────────────────────────────────────────────────────

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}

function InfoRow({ icon, label, value, mono = false }: Readonly<InfoRowProps>) {
  return (
    <div className="flex items-start gap-2.5 py-1.25">
      <span className="mt-px shrink-0 text-slate-400">{icon}</span>
      <span className="w-29 shrink-0 text-[12px] font-medium text-slate-500">
        {label}
      </span>
      <span
        className={[
          "text-[12.5px] font-semibold leading-snug text-slate-800",
          mono ? "font-mono" : "",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function PrintHeader({
  lab = DEFAULT_LAB,
  patient = DEFAULT_PATIENT,
  report = DEFAULT_REPORT,
}: Partial<PrintHeaderProps> = {}) {
  const reportUrl = `https://${lab.website}/report/${report.labAccessionNo}`;

  return (
    <>
      {/*
        ── Global print styles ──
        Injected once. In a real Next.js app put this in globals.css instead.
      */}
      <style>{`
        @media print {
          @page {
            margin: 14mm 12mm 10mm 12mm;
            size: A4;
          }
          .print-header-root {
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      <div
        className="print-header-root w-full max-w-4xl mx-auto bg-white font-sans text-slate-900"
        style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
      >
        {/* ════════════════════════════════════════════════════
            SECTION 1 — Lab Branding Bar
        ════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden bg-slate-900 px-6 py-4 print:rounded-none">
          {/* Subtle diagonal texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
              backgroundSize: "10px 10px",
            }}
          />
          {/* Blue left accent bar */}
          <div className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-sky-400 to-blue-600" />

          <div className="relative flex items-center justify-between gap-4">
            {/* Logo + Name */}
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white print:h-12 print:w-12"
                style={{
                  background: "linear-gradient(135deg,#1d4ed8 0%,#3b82f6 100%)",
                  boxShadow: "0 4px 16px rgba(59,130,246,0.4)",
                }}
                aria-hidden="true"
              >
                <FlaskConical className="h-7 w-7 print:h-6 print:w-6" />
              </div>

              <div>
                <h1 className="text-[22px] font-extrabold tracking-tight text-white print:text-xl">
                  {lab.name.toUpperCase()}
                </h1>
                {lab.tagline && (
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-300 print:text-[10px]">
                    {lab.tagline}
                  </p>
                )}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                  <span className="flex items-center gap-1 text-[11px] text-slate-400 print:text-[10px]">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {lab.address}
                  </span>
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-0.5">
                  <span className="flex items-center gap-1 text-[11px] text-slate-400 print:text-[10px]">
                    <Phone className="h-3 w-3 shrink-0" /> {lab.phone}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400 print:text-[10px]">
                    <Mail className="h-3 w-3 shrink-0" /> {lab.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Accreditation + QR */}
            <div className="flex shrink-0 items-start gap-4">
              {/* Accreditation block */}
              <div className="flex flex-col items-end gap-1.5 text-right">
                <div className="flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 print:border-emerald-700 print:bg-transparent">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 print:text-emerald-700" />
                  <span className="text-[10.5px] font-bold uppercase tracking-widest text-emerald-400 print:text-emerald-700">
                    NABL Accredited
                  </span>
                </div>
                <p className="font-mono text-[10px] text-slate-500">
                  {lab.accreditationCode}
                </p>
                <p className="font-mono text-[10px] text-slate-500">
                  {lab.isoCode}
                </p>
              </div>

              {/* QR Code */}
              <div
                className="flex flex-col items-center gap-1.5 rounded-lg border border-slate-700 bg-white p-1.5 print:border-slate-300"
                aria-label={`QR code linking to ${reportUrl}`}
              >
                <ReactQRCode value={reportUrl} size={68} level="M" />
                <span className="text-[8.5px] font-bold uppercase tracking-widest text-slate-500 print:text-[8px]">
                  Scan Report
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            SECTION 2 — Patient & Sample Demographics
        ════════════════════════════════════════════════════ */}
        <div className="border-x border-slate-200 bg-white print:border-0">
          {/* Section label strip */}
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-6 py-2 print:bg-transparent">
            <div
              className="h-3 w-1 rounded-full bg-blue-500"
              aria-hidden="true"
            />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
              Patient &amp; Report Information
            </span>
          </div>

          <div className="grid grid-cols-1 gap-0 px-6 py-3 sm:grid-cols-2 print:grid-cols-2 print:gap-0 print:py-2">
            {/* Column 1 — Patient */}
            <div className="divide-y divide-slate-50 border-b border-slate-100 pb-3 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6 print:border-b-0 print:border-r print:pb-0 print:pr-6">
              <InfoRow
                icon={<User className="h-3.5 w-3.5" />}
                label="Patient Name"
                value={
                  <span className="font-bold text-slate-900">
                    {patient.name}
                  </span>
                }
              />
              <InfoRow
                icon={<Activity className="h-3.5 w-3.5" />}
                label="Age / Gender"
                value={`${patient.age} / ${patient.gender}`}
              />
              <InfoRow
                icon={<Clipboard className="h-3.5 w-3.5" />}
                label="Patient ID (UHID)"
                value={
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11.5px] font-bold text-slate-700 print:bg-transparent print:px-0">
                    {patient.uhid}
                  </span>
                }
                mono
              />
              <InfoRow
                icon={<User className="h-3.5 w-3.5" />}
                label="Referred By"
                value={
                  <span className="font-semibold text-blue-700 print:text-slate-800">
                    {patient.referredBy}
                  </span>
                }
              />
            </div>

            {/* Column 2 — Report meta */}
            <div className="divide-y divide-slate-50 pt-3 sm:pl-6 sm:pt-0 print:pl-6 print:pt-0">
              <InfoRow
                icon={<Calendar className="h-3.5 w-3.5" />}
                label="Registered On"
                value={formatDateTime(report.registeredAt)}
              />
              <InfoRow
                icon={<Calendar className="h-3.5 w-3.5" />}
                label="Report Generated"
                value={formatDateTime(report.reportGeneratedAt)}
              />
              <InfoRow
                icon={<Clipboard className="h-3.5 w-3.5" />}
                label="Accession No."
                value={
                  <span className="font-mono text-[12px] font-bold text-slate-800">
                    {report.labAccessionNo}
                  </span>
                }
                mono
              />
              {report.sampleType && (
                <InfoRow
                  icon={<FlaskConical className="h-3.5 w-3.5" />}
                  label="Sample Type"
                  value={report.sampleType}
                />
              )}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            SECTION 3 — Report Start Divider
        ════════════════════════════════════════════════════ */}
        <div className="relative rounded-b-xl border border-t-0 border-slate-200 bg-slate-50 px-6 py-2.5 print:rounded-none print:border-slate-300 print:bg-transparent">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
              ── Investigation Report Follows ──
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              {lab.website}
            </span>
          </div>
          {/* Strong divider line for print */}
          <div className="mt-2 h-px w-full bg-slate-300 print:bg-slate-400" />
        </div>
      </div>
    </>
  );
}

// ─── Preview wrapper (remove in production) ──────────────────────────────────

export default function PrintHeaderPreviewSix() {
  return (
    <div className="min-h-screen bg-slate-200 px-4 py-10 print:bg-white print:p-0">
      {/* Toolbar — hidden in print */}
      <div className="no-print mx-auto mb-4 flex max-w-4xl items-center justify-between">
        <p className="text-sm font-semibold text-slate-600">
          PrintHeader — Preview
        </p>
        <button
          onClick={() => globalThis.print()}
          className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-[13px] font-semibold text-white hover:bg-slate-700"
        >
          🖨 Print Preview
        </button>
      </div>

      <PrintHeader
        lab={DEFAULT_LAB}
        patient={DEFAULT_PATIENT}
        report={DEFAULT_REPORT}
      />
    </div>
  );
}
