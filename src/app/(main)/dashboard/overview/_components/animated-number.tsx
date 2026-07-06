"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  format?: (value: number) => string;
  duration?: number;
  delay?: number;
  className?: string;
};

export function AnimatedNumber({
  value,
  format = (n) => Math.round(n).toLocaleString("en-IN"),
  duration = 1000,
  delay = 0,
  className,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDisplay(0);

    const runAnimation = () => {
      const start = performance.now();
      const to = value;

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(to * eased);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          setDisplay(to);
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    };

    if (delay > 0) {
      timeoutRef.current = setTimeout(runAnimation, delay);
    } else {
      runAnimation();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [value, duration, delay]);

  return (
    <span className={cn("tabular-nums", className)}>{format(display)}</span>
  );
}