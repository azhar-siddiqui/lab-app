"use client";

import { AnimateInView } from "@/components/marketing/animate-in-view";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 6, suffix: "+", label: "Report templates" },
  { value: 100, suffix: "%", label: "Print-ready output" },
  { value: 24, suffix: "/7", label: "Secure access" },
  { value: 3, suffix: "x", label: "Faster case entry" },
];

function AnimatedNumber({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, value]);

  return (
    <span className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="border-y border-border/60 bg-primary/5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <AnimateInView key={stat.label} delay={i * 100} className="text-center">
              <AnimatedNumber
                value={stat.value}
                suffix={stat.suffix}
                active={active}
              />
              <p className="text-muted-foreground mt-2 text-sm font-medium">
                {stat.label}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}