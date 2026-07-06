import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;
  prismaSchemaVersion?: string;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// Bust the dev-time singleton when the schema changes so new columns are picked up
// without requiring a manual server restart after `prisma generate`.
const PRISMA_SCHEMA_VERSION = "20260706160000_user_onboarding_fields";

if (
  process.env.NODE_ENV !== "production" &&
  globalForPrisma.prisma &&
  globalForPrisma.prismaSchemaVersion !== PRISMA_SCHEMA_VERSION
) {
  void globalForPrisma.prisma.$disconnect();
  globalForPrisma.prisma = undefined;
}

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaSchemaVersion = PRISMA_SCHEMA_VERSION;
}

export default prisma;
