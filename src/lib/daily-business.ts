export type DailyBusinessCase = {
  id: string;
  patientId: string;
  patientName: string;
  contactNumber: string | null;
  doctorName: string;
  testGroups: string[];
  grossAmount: number;
  discountPercent: number;
  discountAmount: number;
  totalAmount: number;
  amountReceived: number;
  balance: number;
  reportDate: string;
};

export type DailyBusinessData = {
  dateKey: string;
  totalCases: number;
  grossBilling: number;
  totalDiscount: number;
  netBilling: number;
  totalReceived: number;
  totalDue: number;
  cases: DailyBusinessCase[];
};

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getDayBounds(dateKey: string) {
  const start = parseDateKey(dateKey);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

export function getDiscountAmount(netAmount: number, discountPercent: number) {
  if (discountPercent <= 0) return 0;
  const grossAmount = netAmount / (1 - discountPercent / 100);
  return grossAmount - netAmount;
}

export function getGrossAmount(netAmount: number, discountPercent: number) {
  if (discountPercent <= 0) return netAmount;
  return netAmount / (1 - discountPercent / 100);
}

export function formatDisplayDate(dateKey: string) {
  return parseDateKey(dateKey).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function shiftDateKey(dateKey: string, days: number) {
  const date = parseDateKey(dateKey);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}