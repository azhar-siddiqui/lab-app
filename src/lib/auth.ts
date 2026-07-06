import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getAppUrl, getTrustedOrigins } from "./app-url";
import prisma from "./prisma";
import { seedDefaultLabData } from "./seed-default-lab-data";
import { sendAuthVerificationEmail } from "./send-verification-email";

export const auth = betterAuth({
  baseURL: getAppUrl(),
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: false,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await sendAuthVerificationEmail({
          email: user.email,
          name: user.name,
          url,
        });
      } catch (error) {
        console.error(
          `[email] Failed to send verification email to ${user.email}:`,
          error,
        );
        throw error;
      }
    },
  },
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: false,
        input: false,
      },
      onboardingCompleted: {
        type: "boolean",
        required: false,
        input: false,
      },
    },
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