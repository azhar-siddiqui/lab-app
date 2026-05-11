import { IconLoader2 } from "@tabler/icons-react";

export default function Loading() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <IconLoader2 className="text-muted-foreground size-8 animate-spin" />
    </div>
  );
}
