import { cn } from "@/lib/utils";
import { FlaskConical } from "lucide-react";
import Link from "next/link";

type LogoProps = {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { icon: "size-7", text: "text-sm" },
  md: { icon: "size-8", text: "text-base" },
  lg: { icon: "size-9", text: "text-lg" },
};

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const s = sizeMap[size];

  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "bg-primary text-primary-foreground flex shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform group-hover:scale-105",
          s.icon,
        )}
      >
        <FlaskConical className="size-4" />
      </span>
      {showText && (
        <span className={cn("font-heading leading-tight font-semibold", s.text)}>
          Medicare<span className="text-primary">Lab</span>
        </span>
      )}
    </Link>
  );
}