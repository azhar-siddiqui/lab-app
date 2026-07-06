import { auth } from "@/lib/auth";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), nextCookies()],
  // Omit baseURL so the client uses same-origin /api/auth in production.
  // Set NEXT_PUBLIC_APP_URL only if the API is hosted on a different domain.
  ...(process.env.NEXT_PUBLIC_APP_URL
    ? { baseURL: process.env.NEXT_PUBLIC_APP_URL }
    : {}),
});