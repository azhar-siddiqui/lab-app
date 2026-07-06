import type { InfobarContent } from "@/components/ui/infobar";
import React from "react";
import { Heading } from "../ui/heading";
import { ScrollArea } from "../ui/scroll-area";

function PageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="space-y-2">
        <div className="bg-muted h-8 w-48 animate-pulse rounded-md" />
        <div className="bg-muted h-4 w-96 max-w-full animate-pulse rounded-md" />
      </div>
      <div className="bg-muted h-40 w-full animate-pulse rounded-xl" />
      <div className="bg-muted h-40 w-full animate-pulse rounded-xl" />
    </div>
  );
}

type PageContainerProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  isLoading?: boolean;
  access?: boolean;
  accessFallback?: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  infoContent?: InfobarContent;
  pageHeaderAction?: React.ReactNode;
};

export default function PageContainer({
  children,
  scrollable = false,
  isLoading = false,
  access = true,
  accessFallback,
  pageTitle,
  pageDescription,
  infoContent,
  pageHeaderAction,
}: Readonly<PageContainerProps>) {
  if (!access) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 md:px-6">
        {accessFallback ?? (
          <div className="text-muted-foreground text-center text-lg">
            You do not have access to this page.
          </div>
        )}
      </div>
    );
  }

  const content = isLoading ? <PageSkeleton /> : children;

  const hasHeader = pageTitle || pageHeaderAction;

  const inner = (
    <div className="flex flex-1 flex-col p-4 md:px-6">
      {hasHeader && (
        <div className="bg-background sticky top-0 z-10 mb-4 flex items-start justify-between gap-4 pb-4">
          <Heading
            title={pageTitle ?? ""}
            description={pageDescription ?? ""}
            infoContent={infoContent}
          />
          {pageHeaderAction && (
            <div className="shrink-0">{pageHeaderAction}</div>
          )}
        </div>
      )}
      {content}
    </div>
  );

  if (scrollable) {
    return <ScrollArea className="h-[calc(100dvh-52px)]">{inner}</ScrollArea>;
  }

  return inner;
}
