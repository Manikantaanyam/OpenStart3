import { fetchIssues } from "@/lib/github/issue";
import { fetchRepo } from "@/lib/github/repo";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { repoName } = body;

    if (!repoName || !repoName.includes("/")) {
      return NextResponse.json({ error: "Invalid format" }, { status: 400 });
    }

    const [owner, name] = repoName.split("/");

    const [repoData, issueData] = await Promise.all([
      fetchRepo(owner, name),
      fetchIssues(
        `is:open is:issue repo:${repoName} label:"good first issue","feature",bug,documentation,"beginner friendly" sort:created-desc`
      ),
    ]);

    if (!repoData) {
      return NextResponse.json({ error: "Repo not found" }, { status: 404 });
    }

    const techStack = repoData.languages.nodes
      .map((l: any) => l.name)
      .slice(0, 5);

    const issuesToInsert = issueData.map((issue) => ({
      github_id: issue.githubId,
      number: issue.number,
      title: issue.title,
      state: issue.state,
      labels: issue.labels,
      created_at: new Date(issue.createdAt),
      updated_at: new Date(issue.updatedAt),
    }));

    const project = await prisma.$transaction(
      async (tx) => {
        const updatedProject = await tx.project.upsert({
          where: { full_name: repoData.nameWithOwner },
          update: {
            stars: repoData.stargazerCount,
            last_activity_at: new Date(repoData.updatedAt),
            open_issues_count: issuesToInsert.length,
            last_repo_sync: new Date(),
          },
          create: {
            full_name: repoData.nameWithOwner,
            display_name: repoData.name,
            description: repoData.description,
            stars: repoData.stargazerCount,
            avatar_url: repoData.owner.avatarUrl,
            last_activity_at: new Date(repoData.updatedAt),
            tech_stack: techStack,
            open_issues_count: issuesToInsert.length,
            last_repo_sync: new Date(),
          },
        });

        await tx.issue.createMany({
          data: issuesToInsert.map((issue) => ({
            ...issue,
            projectId: updatedProject.id,
          })),
          skipDuplicates: true,
        });

        return updatedProject;
      },
      {
        maxWait: 5000,
        timeout: 15000,
      }
    );

    return NextResponse.json(
      {
        message: "Sync complete",
        id: project.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Sync Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
