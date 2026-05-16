import {
  Award,
  FileText,
  Mail,
  Phone,
  QrCode,
  ShieldCheck,
} from "lucide-react";

export function FooterSix() {
  return (
    <footer className="w-full bg-background text-foreground font-sans mt-auto border-t border-border pt-6 pb-4 px-8 text-xs select-none">
      {/* Main Grid Container */}
      <div className="grid grid-cols-3 gap-8 items-start border-b border-muted pb-4">
        {/* Column 1: Accreditation & Quality Trust */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-primary font-semibold tracking-wide uppercase text-[10px]">
            <Award className="w-3.5 h-3.5 text-primary" />
            Accreditations & Quality
          </div>
          <p className="text-muted-foreground leading-relaxed">
            This laboratory is accredited by the **National Accreditation Board
            (NABL)** and complies with **ISO 15189:2022** quality management
            standards.
          </p>
          <div className="flex gap-2 pt-1">
            <span className="px-1.5 py-0.5 bg-muted text-muted-foreground rounded text-[10px] font-mono border border-border">
              NABL MC-1234
            </span>
            <span className="px-1.5 py-0.5 bg-muted text-muted-foreground rounded text-[10px] font-mono border border-border">
              ISO 15189
            </span>
          </div>
        </div>

        {/* Column 2: Digital Verification & Authenticity */}
        <div className="flex gap-4 items-start bg-secondary/40 p-2.5 rounded-lg border border-border/60">
          <div className="bg-background p-1.5 rounded border border-border shadow-sm shrink-0">
            {/* Placeholder for QR Code - Map your dynamic URL here */}
            <QrCode className="w-12 h-12 text-foreground" strokeWidth={1.5} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-primary font-semibold tracking-wide uppercase text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Verified Report
            </div>
            <p className="text-muted-foreground text-[11px] leading-tight">
              Scan the QR code to verify the authenticity of this digital record
              directly from our secure server.
            </p>
            <span className="block text-[10px] font-mono text-primary underline truncate cursor-pointer pt-0.5">
              report.pathlab.com/v/9823-x7
            </span>
          </div>
        </div>

        {/* Column 3: Signatures & Authority */}
        <div className="flex flex-col items-end justify-between h-full space-y-3 text-right">
          <div className="space-y-1">
            {/* Simulated Electronic Signature Placeholder */}
            <div className="h-8 flex items-end justify-end pr-2">
              <span className="font-serif italic text-base text-muted-foreground/70 tracking-wider">
                Dr. A. Person
              </span>
            </div>
            <div className="border-t border-muted pt-1 min-w-40">
              <p className="font-semibold text-foreground">
                Dr. Alex Person, MD
              </p>
              <p className="text-muted-foreground text-[11px]">
                Consultant Pathologist
              </p>
              <p className="text-muted-foreground text-[10px] font-mono">
                Reg No: 54321-A
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer & Core Contact Info */}
      <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1 max-w-2xl text-left">
          <FileText className="w-3 h-3 shrink-0 text-muted-foreground/70" />
          <p className="leading-normal">
            <span className="font-semibold text-foreground">
              Confidentiality Notice:
            </span>{" "}
            This medical report is strictly confidential and intended solely for
            the addressee. Clinical correlation is recommended for final
            diagnosis.
          </p>
        </div>

        {/* Lab Support Info */}
        <div className="flex items-center gap-4 font-medium shrink-0">
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-muted-foreground/70" /> +1 (555)
            019-2834
          </span>
          <span className="flex items-center gap-1">
            <Mail className="w-3 h-3 text-muted-foreground/70" />{" "}
            support@pathlab.com
          </span>
        </div>
      </div>

      {/* Page Ending Accent Line (Standard Shadcn look) */}
      <div className="w-full h-0.5 bg-linear-to-r from-primary/20 via-primary to-primary/20 mt-4 rounded-full opacity-50" />
    </footer>
  );
}
