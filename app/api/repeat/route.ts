import { fetchIssues } from "@/lib/github/issue";
import { getRepositories } from "@/lib/github/repo";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const labels = [
      "good first issue",
      "feature",
      "bug",
      "documentation",
      "beginner friendly",
    ];

    const data = await prisma.project.findMany({
      select: {
        full_name: true,
      },
    });

    console.log("data", data);

    const dataList = data.map((d) => `repo:${d.full_name}`).join(" ");
    console.log("datalist", dataList);

    const repoList = data.map((d) => d.full_name).join(" ");

    const searchQuery = `is:open is:issue ${dataList}  label:"good first issue","feature",bug,documentation,"beginner friendly" sort:created-desc`;
    console.log("sess", searchQuery);
    const [repoData, issueData] = await Promise.all([
      getRepositories(repoList),
      fetchIssues(searchQuery),
    ]);

    await Promise.all(
      repoData.map((repo: any) =>
        prisma.project.upsert({
          where: { full_name: repo.nameWithOwner },
          update: {
            stars: repo.stargazerCount,
            last_activity_at: new Date(repo.updatedAt),
            last_repo_sync: new Date(),
          },
          create: {
            full_name: repo.nameWithOwner,
            display_name: repo.name,
            description: repo.description,
            stars: repo.stargazerCount,
            avatar_url: repo.owner.avatarUrl,
            last_activity_at: new Date(repo.updatedAt),
            tech_stack: repo.languages.nodes
              .map((l: any) => l.name)
              .slice(0, 5),
            last_repo_sync: new Date(),
          },
        })
      )
    );

    for (const issue of issueData) {
      const labelNames =
        issue.labels?.map((l: any) => (typeof l === "string" ? l : l.name)) ||
        [];
      await prisma.issue.upsert({
        where: {
          github_id: issue.githubId.toString(),
        },
        update: {
          state: issue.state.toUpperCase() === "OPEN" ? "OPEN" : "CLOSED",
          updated_at: new Date(issue.updatedAt),
          title: issue.title,
          labels: labelNames,
        },
        create: {
          github_id: issue.githubId.toString(),
          title: issue.title,
          state: issue.state.toUpperCase() === "OPEN" ? "OPEN" : "CLOSED",
          created_at: new Date(issue.createdAt),
          updated_at: new Date(issue.updatedAt),
          number: issue.number,
          labels: labelNames,
          project: {
            connect: { full_name: issue.repository.nameWithOwner },
          },
        },
      });
    }

    for (const repo of data) {
      const openCount = await prisma.issue.count({
        where: {
          project: { full_name: repo.full_name },
          state: "OPEN",
        },
      });

      await prisma.project.update({
        where: { full_name: repo.full_name },
        data: {
          open_issues_count: openCount,
          last_issue_sync: new Date(),
        },
      });
    }

    if (!issueData) {
      return NextResponse.json({ msg: "Error occured" });
    }

    return NextResponse.json({
      issueData: issueData,
      repoData,
      issueLenght: issueData.length,
      repoLength: repoData.length,
    });
  } catch (e) {
    return NextResponse.json({ msg: e });
  }
}
