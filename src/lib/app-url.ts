/**
 * Resolves the app base URL for server-side auth and redirects.
 * Priority: BETTER_AUTH_URL → VERCEL_URL → NEXT_PUBLIC_APP_URL → localhost.
 */
export function getAppUrl(): string {
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    const url = process.env.VERCEL_URL;
    return url.startsWith("http") ? url.replace(/\/$/, "") : `https://${url}`;
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}

/**
 * Origins allowed for better-auth callbacks and CORS checks.
 */
export function getTrustedOrigins(): string[] {
  const origins = new Set<string>([
    "http://localhost:3000",
    "https://*.vercel.app",
  ]);

  try {
    origins.add(new URL(getAppUrl()).origin);
  } catch {
    // ignore invalid URL
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    try {
      origins.add(new URL(process.env.NEXT_PUBLIC_APP_URL).origin);
    } catch {
      // ignore invalid URL
    }
  }

  return [...origins];
}