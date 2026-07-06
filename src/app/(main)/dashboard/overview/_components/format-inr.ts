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