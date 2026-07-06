import { AuthBrandPanel } from "./auth-brand-panel";
import { AuthPageHeader } from "./auth-page-header";

type AuthLayoutShellProps = {
  children: React.ReactNode;
  title: string;
  description: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthLayoutShell({
  children,
  title,
  description,
  footer,
}: AuthLayoutShellProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthBrandPanel />

      <div className="bg-background flex flex-col">
        <AuthPageHeader />

        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-100">
            <div className="mb-8 space-y-2 text-center lg:text-left">
              <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                {title}
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                {description}
              </p>
            </div>

            {children}

            {footer && (
              <p className="text-muted-foreground mt-8 text-center text-xs leading-relaxed">
                {footer}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
