import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getAppUrl, getTrustedOrigins } from "./app-url";
import prisma from "./prisma";
import { seedDefaultLabData } from "./seed-default-lab-data";

export const auth = betterAuth({
  baseURL: getAppUrl(),
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: getTrustedOrigins(),
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            await seedDefaultLabData(user.id);
          } catch (error) {
            console.error(
              `Failed to seed default lab data for user ${user.id}:`,
              error,
            );
          }
        },
      },
    },
  },
});