import { fetchIssues } from "@/lib/github/issue";
import prisma from "@/lib/prisma";

const BATCH_SIZE = 50;

export async function syncIssuesForProject(project: any) {
  const syncStartedAt = new Date();
  const since = project.last_issue_sync;
  let query = "";
  if (since) {
    query = `
    repo:${project.full_name}
    is:issue
    label:"good first issue"
    label:bug
    label:documentation
    label:"beginner friendly"
    updated:>${since.toISOString()}
  `;
  } else {
    query = `
    repo:${project.full_name}
    is:issue
    label:"good first issue"
    label:bug
    label:documentation
    label:"beginner friendly"`;
  }

  const issues = await fetchIssues(query);

  for (let i = 0; i < issues.length; i += BATCH_SIZE) {
    const batch = issues.slice(i, i + BATCH_SIZE);

    await prisma.$transaction(
      batch.map((issue) =>
        prisma.issue.upsert({
          where: {
            github_id: issue.githubId,
          },
          create: {
            github_id: issue.githubId,
            number: issue.number,
            title: issue.title,
            state: issue.state,
            labels: issue.labels,
            created_at: issue.createdAt,
            updated_at: issue.updatedAt,
            projectId: project.id,
          },
          update: {
            title: issue.title,
            state: issue.state,
            labels: issue.labels,
            updated_at: issue.updatedAt,
          },
        })
      )
    );
  }

  const openIssuesCount = await prisma.issue.count({
    where: {
      projectId: project.id,
      state: "OPEN",
    },
  });

  await prisma.project.update({
    where: { id: project.id },
    data: {
      last_issue_sync: syncStartedAt,
      open_issues_count: openIssuesCount,
    },
  });
}
