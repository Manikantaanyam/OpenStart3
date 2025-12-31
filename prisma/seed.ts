import { fetchIssues } from "@/lib/github/issue";
import { fetchRepo } from "@/lib/github/repo";
import prisma from "@/lib/prisma";

async function main() {
  console.log("started fetching");
  const repoData = await fetchRepo("excalidraw", "excalidraw");
  const issueData = await fetchIssues(
    `is:open is:issue repo:excalidraw/excalidraw  label:"good first issue","feature",bug,documentation,"beginner friendly" sort:created-desc`
  );

  const project = await prisma.project.upsert({
    where: {
      full_name: repoData.nameWithOwner,
    },
    update: {
      stars: repoData.stargazerCount,

      last_activity_at: new Date(repoData.updatedAt),

      open_issues_count: issueData.filter((i) => i.state === "OPEN").length,
      last_repo_sync: new Date(),
    },
    create: {
      full_name: repoData.nameWithOwner,
      display_name: repoData.name,
      description: repoData.description,
      stars: repoData.stargazerCount,
      avatar_url: repoData.owner.avatarUrl,
      last_activity_at: new Date(repoData.updatedAt),
      tech_stack: repoData.languages.nodes.map((l) => l.name),
      open_issues_count: issueData.filter((i) => i.state === "OPEN").length,
      last_repo_sync: new Date(),
    },
  });

  await prisma.issue.createMany({
    data: issueData.map((issue) => ({
      github_id: issue.githubId,
      number: issue.number,
      title: issue.title,
      state: issue.state,
      labels: issue.labels,
      created_at: issue.createdAt,
      updated_at: issue.updatedAt,
      projectId: project.id,
    })),
    skipDuplicates: true,
  });

  await prisma.globalIssueStats.upsert({
    where: { id: 1 },
    update: {
      total_issues: issueData.length,
      open_issues: issueData.filter((i) => i.state === "OPEN").length,
    },
    create: {
      total_issues: issueData.length,
      open_issues: issueData.filter((i) => i.state === "OPEN").length,
    },
  });

  console.log(`✅ Seeded ${issueData.length} issues`);
}

main();
