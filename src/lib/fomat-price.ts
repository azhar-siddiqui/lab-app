// import { Prisma } from "@/generated/prisma/browser";

// export function serializeDecimal<T>(data: T): T {
//   return JSON.parse(
//     JSON.stringify(data, (_, value) => {
//       if (value instanceof Prisma.Decimal) {
//         return Number(value);
//       }

//       return value;
//     }),
//   );
// }

export function serializeDecimal<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "object" &&
      value !== null &&
      value.constructor?.name === "Decimal"
        ? Number(value)
        : value,
    ),
  );
}

/**
 * Formats a Date object into 'DD-MMM-YYYY hh:mm AM/PM'
 * Example Output: 14-May-2026 09:30 AM
 */
export function formatDateTime(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");

  // Get short month name (e.g., "May")
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date,
  );

  const year = date.getFullYear();

  // Get time in 12-hour format with AM/PM
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const timeString = new Intl.DateTimeFormat("en-US", timeOptions).format(date);

  return `${day}-${month}-${year} ${timeString}`;
}
