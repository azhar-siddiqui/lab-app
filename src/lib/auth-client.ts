import { auth } from "@/lib/auth";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

// export const { signIn, signUp, useSession } = createAuthClient();

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), nextCookies()],
  baseURL: "http://localhost:3000",
});
