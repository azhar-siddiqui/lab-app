import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Award,
  CheckCircle2,
  FileCheck2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  SquareAsterisk,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ReportFooterProps {
  reportId?: string;
  reportedAt?: string;
  verificationUrl?: string;
  phone?: string;
  email?: string;
  pathologistName?: string;
  pathologistReg?: string;
}

// ─── Tiny atoms ──────────────────────────────────────────────────────────────

function ColHeading({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <p className="mb-3 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
      <span className="inline-block h-2 w-0.5 rounded-full bg-slate-300" />
      {children}
    </p>
  );
}

function AccredBadge({
  label,
  sub,
  color,
}: Readonly<{
  label: string;
  sub: string;
  color: "emerald" | "blue" | "violet";
}>) {
  const palettes = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
    blue: "border-blue-200   bg-blue-50   text-blue-800",
    violet: "border-violet-200 bg-violet-50 text-violet-800",
  };
  const dotPalettes = {
    emerald: "bg-emerald-400",
    blue: "bg-blue-400",
    violet: "bg-violet-400",
  };
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${palettes[color]}`}
    >
      <div className={`h-1.5 w-1.5 rounded-full ${dotPalettes[color]}`} />
      <div>
        <p className="text-[11px] font-extrabold leading-none tracking-tight">
          {label}
        </p>
        <p className="mt-0.5 text-[9.5px] font-medium opacity-70">{sub}</p>
      </div>
    </div>
  );
}

function InfoLine({
  icon,
  children,
}: Readonly<{
  icon: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-start gap-2 text-[11px] text-slate-500">
      <span className="mt-px shrink-0 text-slate-400">{icon}</span>
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}

// ─── QR Placeholder ─────────────────────────────────────────────────────────

function QRPlaceholder() {
  // Realistic-looking QR grid pattern using inline SVG
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="QR Code for report verification"
      className="shrink-0"
    >
      {/* outer border */}
      <rect width="72" height="72" rx="4" fill="white" />
      <rect x="0.5" y="0.5" width="71" height="71" rx="3.5" stroke="#e2e8f0" />

      {/* top-left finder */}
      <rect x="6" y="6" width="20" height="20" rx="2" fill="#0f172a" />
      <rect x="9" y="9" width="14" height="14" rx="1" fill="white" />
      <rect x="12" y="12" width="8" height="8" rx="0.5" fill="#0f172a" />

      {/* top-right finder */}
      <rect x="46" y="6" width="20" height="20" rx="2" fill="#0f172a" />
      <rect x="49" y="9" width="14" height="14" rx="1" fill="white" />
      <rect x="52" y="12" width="8" height="8" rx="0.5" fill="#0f172a" />

      {/* bottom-left finder */}
      <rect x="6" y="46" width="20" height="20" rx="2" fill="#0f172a" />
      <rect x="9" y="49" width="14" height="14" rx="1" fill="white" />
      <rect x="12" y="52" width="8" height="8" rx="0.5" fill="#0f172a" />

      {/* data modules (randomised-looking pattern) */}
      {[
        [32, 6],
        [36, 6],
        [40, 6],
        [32, 10],
        [38, 10],
        [34, 14],
        [36, 14],
        [40, 14],
        [32, 18],
        [34, 18],
        [38, 18],
        [40, 18],
        [32, 22],
        [36, 22],
        [40, 22],
        [6, 32],
        [10, 32],
        [14, 32],
        [18, 32],
        [22, 32],
        [6, 36],
        [12, 36],
        [18, 36],
        [6, 40],
        [8, 40],
        [14, 40],
        [20, 40],
        [22, 40],
        [6, 44],
        [10, 44],
        [16, 44],
        [22, 44],
        [6, 48],
        [8, 48],
        [12, 48],
        [16, 48],
        [20, 48],
        [32, 32],
        [36, 32],
        [40, 32],
        [44, 32],
        [48, 32],
        [52, 32],
        [56, 32],
        [60, 32],
        [32, 36],
        [36, 36],
        [44, 36],
        [52, 36],
        [60, 36],
        [32, 40],
        [34, 40],
        [38, 40],
        [42, 40],
        [46, 40],
        [50, 40],
        [54, 40],
        [58, 40],
        [32, 44],
        [36, 44],
        [40, 44],
        [48, 44],
        [56, 44],
        [60, 44],
        [32, 48],
        [34, 48],
        [38, 48],
        [42, 48],
        [46, 48],
        [50, 48],
        [54, 48],
        [32, 52],
        [36, 52],
        [44, 52],
        [52, 52],
        [56, 52],
        [60, 52],
        [32, 56],
        [34, 56],
        [38, 56],
        [40, 56],
        [44, 56],
        [48, 56],
        [52, 56],
        [60, 56],
        [32, 60],
        [36, 60],
        [40, 60],
        [44, 60],
        [48, 60],
        [52, 60],
        [56, 60],
        [60, 60],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="3"
          height="3"
          rx="0.4"
          fill="#0f172a"
        />
      ))}
    </svg>
  );
}

// ─── Main Footer ─────────────────────────────────────────────────────────────

export default function ReportFooter({
  reportId = "RPT-CBC-2026-00421",
  reportedAt = "14 May 2026, 11:45 AM",
  verificationUrl = "verify.medicarelab.com/RPT-CBC-2026-00421",
  phone = "+91 90117 68487",
  email = "reports@medicarelab.com",
  pathologistName = "Dr. Kavitha Nair",
  pathologistReg = "MH-28471",
}: Readonly<ReportFooterProps>) {
  return (
    <footer
      className="w-full bg-white font-sans print:break-inside-avoid"
      aria-label="Report footer"
    >
      {/* ── Top rule ── */}
      <div className="h-0.5 w-full bg-linear-to-r from-slate-200 via-slate-300 to-slate-200" />

      {/* ── Three-column grid ── */}
      <div className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0 print:grid-cols-3 print:divide-x print:divide-y-0">
        {/* ════════════════════════════════
            COL 1 — Accreditation & Quality
        ════════════════════════════════ */}
        <div className="flex flex-col gap-3 px-5 py-4">
          <ColHeading>Accreditation &amp; Quality</ColHeading>

          <div className="space-y-2">
            <AccredBadge
              label="NABL Accredited"
              sub="Reg. MC-99482 · Since 2018"
              color="emerald"
            />
            <AccredBadge
              label="ISO 9001 : 2018"
              sub="Quality Management System"
              color="blue"
            />
            <AccredBadge
              label="CAP Certified"
              sub="College of American Pathologists"
              color="violet"
            />
          </div>

          {/* Quality assurance row */}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {["Double Verified", "Peer Reviewed", "EQA Participant"].map(
              (t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="gap-1 rounded-md border-slate-200 px-2 py-0.5 text-[9.5px] font-semibold text-slate-500"
                >
                  <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
                  {t}
                </Badge>
              ),
            )}
          </div>

          {/* Standards footnote */}
          <p className="mt-auto text-[9px] leading-relaxed text-slate-400">
            All tests performed under ISO 15189 : 2022 guidelines. Internal QC
            performed every shift. External QA through EQAS India.
          </p>
        </div>

        {/* ════════════════════════════════
            COL 2 — Digital Verification
        ════════════════════════════════ */}
        <div className="flex flex-col gap-3 px-5 py-4">
          <ColHeading>Digital Verification</ColHeading>

          <div className="flex items-start gap-4">
            {/* QR Code */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="rounded-lg border border-slate-200 p-1.5">
                <QRPlaceholder />
              </div>
              <p className="text-[8.5px] font-bold uppercase tracking-widest text-slate-400">
                Scan to Verify
              </p>
            </div>

            {/* Verification details */}
            <div className="min-w-0 flex-1 space-y-2.5">
              <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Report ID
                </p>
                <p className="mt-0.5 break-all font-mono text-[11px] font-bold text-slate-700">
                  {reportId}
                </p>
              </div>

              <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Verified URL
                </p>
                <p className="mt-0.5 break-all font-mono text-[10px] text-slate-600">
                  {verificationUrl}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[9.5px] text-slate-400">
                <Lock className="h-3 w-3 shrink-0 text-emerald-500" />
                <span>256-bit SSL · Tamper-proof hash</span>
              </div>
            </div>
          </div>

          {/* Reported timestamp */}
          <div className="mt-auto flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2">
            <FileCheck2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                Report Generated:{" "}
              </span>
              <span className="text-[10px] font-bold text-slate-600">
                {reportedAt}
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════
            COL 3 — Legal, Signature & Contact
        ════════════════════════════════ */}
        <div className="flex flex-col gap-3 px-5 py-4">
          <ColHeading>Legal &amp; Contact</ColHeading>

          {/* E-signature block */}
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-serif text-[15px] italic tracking-wide text-slate-700">
                  {pathologistName.split(" ").slice(1).join(" ")}
                </p>
                <p className="mt-0.5 text-[10.5px] font-semibold text-slate-700">
                  {pathologistName}
                </p>
                <p className="text-[10px] text-slate-400">
                  MD Pathology · MBBS
                </p>
                <p className="font-mono text-[9.5px] text-slate-400">
                  Reg. {pathologistReg}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                  <SquareAsterisk className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  e-Signed
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="space-y-1.5">
            <InfoLine icon={<ShieldCheck className="h-3 w-3" />}>
              <strong className="font-semibold text-slate-600">
                Confidential:{" "}
              </strong>{" "}
              This report is intended solely for the named patient and their
              authorised physician. Unauthorised disclosure is prohibited.
            </InfoLine>

            <InfoLine icon={<Award className="h-3 w-3" />}>
              Results should be interpreted in clinical context. This report
              does not constitute a diagnosis. Consult your physician for
              medical advice.
            </InfoLine>
          </div>

          {/* Contact */}
          <div className="mt-auto space-y-1.5 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
              Support
            </p>
            <InfoLine icon={<Phone className="h-3 w-3" />}>
              <a
                href={`tel:${phone}`}
                className="font-semibold text-slate-600 hover:text-slate-900"
              >
                {phone}
              </a>
            </InfoLine>
            <InfoLine icon={<Mail className="h-3 w-3" />}>
              <a
                href={`mailto:${email}`}
                className="font-semibold text-slate-600 hover:text-slate-900"
              >
                {email}
              </a>
            </InfoLine>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <Separator className="bg-slate-100" />
      <div className="flex flex-col items-center justify-between gap-1.5 bg-slate-50 px-6 py-2.5 text-center md:flex-row md:text-left print:flex-row print:text-left">
        <p className="text-[9.5px] text-slate-400">
          © {new Date().getFullYear()} Medicare Pathology Lab · All rights
          reserved · Accreditation valid until Dec 2027
        </p>
        <div className="flex items-center gap-1.5 text-[9.5px] font-semibold text-emerald-600">
          <CheckCircle2 className="h-3 w-3" />
          Verified &amp; Authenticated Report
        </div>
      </div>

      {/* ── Print-only thin rule at page bottom ── */}
      <div className="hidden h-px w-full bg-slate-200 print:block" />
    </footer>
  );
}

// <ReportFooter
//   reportId="RPT-CBC-2026-00421"
//   pathologistName="Dr. Kavitha Nair"
//   pathologistReg="MH-28471"
//   phone="+91 90117 68487"
//   email="reports@medicarelab.com"
//   verificationUrl="verify.medicarelab.com/RPT-CBC-2026-00421"
//   reportedAt="14 May 2026, 11:45 AM"
// />;
