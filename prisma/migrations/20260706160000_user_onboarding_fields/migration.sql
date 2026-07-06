ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "phoneNumber" TEXT;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false;

-- Existing accounts were created before onboarding was required.
UPDATE "user" SET "onboardingCompleted" = true WHERE "onboardingCompleted" = false;