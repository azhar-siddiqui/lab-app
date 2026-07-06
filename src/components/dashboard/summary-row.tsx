type SummaryRowProps = {
  label: string;
  value: string;
  emphasis?: boolean;
};

export function SummaryRow({ label, value, emphasis = false }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span
        className={
          emphasis
            ? "font-heading text-base font-semibold tabular-nums"
            : "text-sm font-medium tabular-nums"
        }
      >
        {value}
      </span>
    </div>
  );
}