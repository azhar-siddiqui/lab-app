"use client";

import { AnimateInView } from "@/components/marketing/animate-in-view";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, QrCode } from "lucide-react";
import { useState } from "react";

const templates = [
  { id: "classic", name: "Classic", accent: "border-sky-500" },
  { id: "modern", name: "Modern", accent: "border-violet-500" },
  { id: "minimal", name: "Minimal", accent: "border-emerald-500" },
];

const sampleResults = [
  { test: "Haemoglobin", value: "14.2", unit: "g/dL", range: "13.0 – 17.0", ok: true },
  { test: "WBC Count", value: "7,800", unit: "/µL", range: "4,000 – 11,000", ok: true },
  { test: "Platelet Count", value: "2.1", unit: "Lakh/µL", range: "1.5 – 4.5", ok: true },
  { test: "RBC Count", value: "4.8", unit: "million/µL", range: "4.5 – 5.5", ok: true },
];

export function ReportPreviewSection() {
  const [activeTemplate, setActiveTemplate] = useState(templates[0].id);
  const template = templates.find((t) => t.id === activeTemplate) ?? templates[0];

  return (
    <section id="reports" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimateInView>
            <Badge variant="outline" className="mb-4">
              Lab reports
            </Badge>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Professional reports your patients trust
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Choose from multiple branded header and footer layouts. Every
              report includes your lab identity, digital signature, QR code, and
              NABL-ready formatting.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Multiple header & footer templates",
                "Barcode and QR code integration",
                "Digital signature support",
                "One-click print preview",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span className="bg-primary/10 text-primary flex size-6 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTemplate(t.id)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                    activeTemplate === t.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-primary/30",
                  )}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </AnimateInView>

          <AnimateInView direction="left" delay={150}>
            <div
              className={cn(
                "ring-foreground/10 relative overflow-hidden rounded-2xl bg-white text-zinc-900 shadow-2xl ring-1 transition-all duration-500 dark:bg-zinc-50",
                "border-t-4",
                template.accent,
              )}
            >
              <div className="border-b border-zinc-200 px-6 py-5 text-center">
                <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-sky-600 text-xl font-bold text-white">
                  M
                </div>
                <h3 className="text-sm font-bold tracking-wide text-sky-800 uppercase">
                  Medicare Pathology Lab
                </h3>
                <p className="mt-1 text-[10px] text-zinc-500">
                  Kabir Nagar, Phulambri, Aurangabad — 431111
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-zinc-200 px-6 py-4 text-xs">
                <div>
                  <p className="text-zinc-500">Patient</p>
                  <p className="font-semibold">Rahul Sharma</p>
                </div>
                <div>
                  <p className="text-zinc-500">Report ID</p>
                  <p className="font-semibold">ML-2026-0847</p>
                </div>
                <div>
                  <p className="text-zinc-500">Age / Sex</p>
                  <p className="font-semibold">34 / Male</p>
                </div>
                <div>
                  <p className="text-zinc-500">Referred by</p>
                  <p className="font-semibold">Dr. Mehta</p>
                </div>
              </div>

              <div className="px-6 py-4">
                <p className="mb-3 text-xs font-bold tracking-wide text-sky-700 uppercase">
                  Complete Blood Count (CBC)
                </p>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-zinc-200 text-zinc-500">
                      <th className="pb-2 text-left font-medium">Test</th>
                      <th className="pb-2 text-right font-medium">Result</th>
                      <th className="pb-2 text-right font-medium">Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleResults.map((row) => (
                      <tr key={row.test} className="border-b border-zinc-100">
                        <td className="py-2">{row.test}</td>
                        <td className="py-2 text-right font-semibold">
                          {row.value}{" "}
                          <span className="font-normal text-zinc-500">
                            {row.unit}
                          </span>
                        </td>
                        <td className="py-2 text-right text-zinc-500">
                          {row.range}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-end justify-between border-t border-zinc-200 px-6 py-4">
                <div>
                  <p className="text-[10px] text-zinc-500">Authorized by</p>
                  <p className="text-xs font-semibold">Dr. Pathologist</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <QrCode className="size-10 text-zinc-400" />
                  <p className="text-[9px] text-zinc-400">Scan to verify</p>
                </div>
              </div>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  );
}