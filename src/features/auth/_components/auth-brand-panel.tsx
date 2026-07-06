"use client";

import { Logo } from "@/components/marketing/logo";
import { cn } from "@/lib/utils";
import { Check, Quote } from "lucide-react";
import { InteractiveGridPattern } from "./interactive-grid";

const highlights = [
  "Patient & case management",
  "Print-ready pathology reports",
  "Test catalog with reference ranges",
  "Secure lab staff access",
];

export function AuthBrandPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-zinc-950 p-10 text-white lg:flex">
      <div className="from-primary/30 via-primary/10 to-transparent absolute inset-0 bg-linear-to-br" />
      <div className="bg-primary/20 absolute -top-24 -right-24 size-80 rounded-full blur-3xl" />
      <div className="bg-primary/10 absolute bottom-0 left-0 size-64 rounded-full blur-3xl" />

      <InteractiveGridPattern
        squares={[28, 20]}
        className={cn(
          "mask-[radial-gradient(500px_circle_at_center,white,transparent)] opacity-30",
          "inset-x-0 top-0 h-full skew-y-6",
        )}
        squaresClassName="stroke-white/10 hover:fill-primary/10"
      />

      <div className="relative z-10">
        <Logo className="text-white [&_span:last-child]:text-white [&_span:last-child_span]:text-primary-foreground" />
      </div>

      <div className="relative z-10 space-y-8">
        <div>
          <p className="text-primary-foreground/80 mb-3 text-sm font-medium tracking-wide uppercase">
            Laboratory management
          </p>
          <h2 className="font-heading max-w-md text-3xl leading-tight font-bold tracking-tight">
            Precision in every test, care in every result
          </h2>
          <p className="text-white/70 mt-4 max-w-md text-sm leading-relaxed">
            Manage patients, tests, billing, and branded reports from one secure
            portal built for diagnostic labs.
          </p>
        </div>

        <ul className="space-y-3">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm text-white/80"
            >
              <span className="bg-primary/20 text-primary-foreground flex size-6 shrink-0 items-center justify-center rounded-full">
                <Check className="size-3.5" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <blockquote className="relative z-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <Quote className="text-primary/60 mb-3 size-6" />
        <p className="text-sm leading-relaxed text-white/90">
          &ldquo;MedicareLab cut our report turnaround time in half. The print
          templates look professional and patients love the QR
          verification.&rdquo;
        </p>
        <footer className="mt-4 text-xs text-white/60">
          Dr. Sanjay Mehta — Referring Physician, Aurangabad
        </footer>
      </blockquote>
    </div>
  );
}
