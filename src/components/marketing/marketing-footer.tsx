import { Logo } from "@/components/marketing/logo";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Reports", href: "#reports" },
    { label: "Pricing", href: "#pricing" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "mailto:medicarepathlogylab@gmail.com" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo size="lg" />
            <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-relaxed">
              Precision in every test, care in every result. MedicareLab is the
              all-in-one portal for pathology labs to manage patients, tests,
              billing, and printable reports.
            </p>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="font-heading text-sm font-semibold">{group}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Medicare Pathology Lab. All rights
            reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Kabir Nagar, Phulambri, Aurangabad — 431111
          </p>
        </div>
      </div>
    </footer>
  );
}