/**
 * Database connection strings per environment.
 *
 * Local development:
 *   - Put your dev database in `.env` or `.env.local`
 *
 * Production (Vercel):
 *   - Set `DATABASE_URL` under Project → Settings → Environment Variables
 *   - Scope it to "Production" only, with your production Postgres URL
 *
 * Neon tip: use the pooled URL for the app and `DIRECT_URL` for migrations.
 */

export function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL?.trim();

  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local for development or to Vercel Production environment variables.",
    );
  }

  return url;
}

/** Direct connection for Prisma migrations (non-pooled). Falls back to DATABASE_URL. */
export function getDirectDatabaseUrl(): string {
  return process.env.DIRECT_URL?.trim() || getDatabaseUrl();
}