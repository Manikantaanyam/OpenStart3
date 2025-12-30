/*
  Warnings:

  - You are about to drop the column `issue_labels` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `issue_number` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `issue_state` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `issue_time` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `issue_title` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `project_full_name` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `open_issues` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `techStack` on the `Project` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_project_full_name_fkey";

-- DropIndex
DROP INDEX "Issue_issue_labels_idx";

-- DropIndex
DROP INDEX "Issue_project_full_name_idx";

-- DropIndex
DROP INDEX "Issue_project_full_name_issue_time_idx";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "issue_labels",
DROP COLUMN "issue_number",
DROP COLUMN "issue_state",
DROP COLUMN "issue_time",
DROP COLUMN "issue_title",
DROP COLUMN "project_full_name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "labels" TEXT[],
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD COLUMN     "state" "IssueState" NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "open_issues",
DROP COLUMN "techStack",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_issue_sync" TIMESTAMP(3),
ADD COLUMN     "last_repo_sync" TIMESTAMP(3),
ADD COLUMN     "open_issues_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tech_stack" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "avatar_url" DROP NOT NULL,
ALTER COLUMN "stars" SET DEFAULT 0,
ALTER COLUMN "last_activity_at" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Issue_projectId_idx" ON "Issue"("projectId");

-- CreateIndex
CREATE INDEX "Issue_state_idx" ON "Issue"("state");

-- CreateIndex
CREATE INDEX "Issue_created_at_idx" ON "Issue"("created_at");

-- CreateIndex
CREATE INDEX "Issue_labels_idx" ON "Issue" USING GIN ("labels");

-- CreateIndex
CREATE INDEX "Project_stars_idx" ON "Project"("stars");

-- CreateIndex
CREATE INDEX "Project_last_activity_at_idx" ON "Project"("last_activity_at");

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
