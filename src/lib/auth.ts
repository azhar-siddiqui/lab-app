import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getAppUrl, getTrustedOrigins } from "./app-url";
import prisma from "./prisma";

export const auth = betterAuth({
  baseURL: getAppUrl(),
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: getTrustedOrigins(),
});