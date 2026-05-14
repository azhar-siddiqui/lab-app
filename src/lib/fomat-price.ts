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
