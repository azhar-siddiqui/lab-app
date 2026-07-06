const items = [
  "Patient Management",
  "Test Catalog",
  "Lab Reports",
  "Billing & Cases",
  "QR Codes",
  "Print Templates",
  "Reference Ranges",
  "Doctor Referrals",
  "Secure Auth",
  "Dashboard KPIs",
];

export function TrustedMarquee() {
  const doubled = [...items, ...items];

  return (
    <section className="border-y border-border/60 bg-muted/20 py-6">
      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-8">
          {doubled.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-medium"
            >
              <span className="bg-primary/60 size-1.5 rounded-full" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}