-- Drop global unique constraints that blocked per-user seeding
DROP INDEX IF EXISTS "testCategory_name_key";
DROP INDEX IF EXISTS "testGroup_name_key";
DROP INDEX IF EXISTS "testGroup_shortName_key";

-- Add per-user unique constraints
CREATE UNIQUE INDEX "testCategory_userId_name_key" ON "testCategory"("userId", "name");
CREATE UNIQUE INDEX "testGroup_userId_name_key" ON "testGroup"("userId", "name");
CREATE UNIQUE INDEX "testGroup_userId_shortName_key" ON "testGroup"("userId", "shortName");
CREATE UNIQUE INDEX "testUnit_userId_name_key" ON "testUnit"("userId", "name");