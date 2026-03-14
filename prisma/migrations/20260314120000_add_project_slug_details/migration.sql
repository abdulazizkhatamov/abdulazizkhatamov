-- Clear existing project rows so we can add the NOT NULL slug column cleanly
DELETE FROM "Project";

-- Add slug column with a temporary default, then remove default
ALTER TABLE "Project" ADD COLUMN "slug" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Project" ALTER COLUMN "slug" DROP DEFAULT;

-- Add details column (nullable JSON)
ALTER TABLE "Project" ADD COLUMN "details" JSONB;

-- Add unique constraint on slug
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
