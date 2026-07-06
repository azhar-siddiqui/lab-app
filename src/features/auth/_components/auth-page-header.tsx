"use client";

import { Logo } from "@/components/marketing/logo";
import { buttonVariants } from "@/components/ui/button";
import { ThemeModeToggle } from "@/theme/theme-mode-toggle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function AuthPageHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border/60 px-4 py-4 sm:px-8">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "text-muted-foreground gap-1.5 px-2",
          })}
        >
          <ArrowLeft className="size-4" />
          <span className="hidden sm:inline">Back to home</span>
        </Link>
        <div className="lg:hidden">
          <Logo size="sm" />
        </div>
      </div>
      <ThemeModeToggle />
    </header>
  );
}