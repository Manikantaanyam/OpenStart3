-- CreateEnum
CREATE TYPE "IssueState" AS ENUM ('OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "display_name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "techStack" TEXT[],
    "last_activity_at" TIMESTAMP(3) NOT NULL,
    "open_issues" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "github_id" TEXT NOT NULL,
    "issue_number" INTEGER NOT NULL,
    "issue_title" TEXT NOT NULL,
    "issue_time" TIMESTAMP(3) NOT NULL,
    "issue_state" "IssueState" NOT NULL DEFAULT 'OPEN',
    "project_full_name" TEXT NOT NULL,
    "issue_labels" TEXT[],

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalIssueStats" (
    "id" SERIAL NOT NULL,
    "total_issues" INTEGER NOT NULL DEFAULT 0,
    "open_issues" INTEGER NOT NULL DEFAULT 0,
    "last_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GlobalIssueStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_full_name_key" ON "Project"("full_name");

-- CreateIndex
CREATE UNIQUE INDEX "Issue_github_id_key" ON "Issue"("github_id");

-- CreateIndex
CREATE INDEX "Issue_project_full_name_idx" ON "Issue"("project_full_name");

-- CreateIndex
CREATE INDEX "Issue_project_full_name_issue_time_idx" ON "Issue"("project_full_name", "issue_time");

-- CreateIndex
CREATE INDEX "Issue_issue_labels_idx" ON "Issue" USING GIN ("issue_labels");

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_project_full_name_fkey" FOREIGN KEY ("project_full_name") REFERENCES "Project"("full_name") ON DELETE RESTRICT ON UPDATE CASCADE;
