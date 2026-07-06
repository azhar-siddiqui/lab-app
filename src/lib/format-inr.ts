export function formatINR(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 100_000) {
      return `₹${(amount / 100_000).toFixed(1)}L`;
    }
    if (amount >= 1_000) {
      return `₹${(amount / 1_000).toFixed(1)}k`;
    }
  }

  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function formatAnimatedINR(amount: number, target: number) {
  const rounded = Math.round(amount);
  const useCompact = rounded >= target && target >= 1_000;
  return formatINR(rounded, useCompact);
}