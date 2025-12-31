"use server";

import prisma from "@/lib/prisma";

export default async function HomeData() {
  const projectData = await prisma.project.findMany({
    orderBy: {
      stars: "desc",
    },
    take: 3,
  });

  const issueData = await prisma.issue.findMany({
    take: 5,
    orderBy: {
      created_at: "desc",
    },
    include: {
      project: {
        select: {
          display_name: true,
          avatar_url: true,
        },
      },
    },
  });

  return { projectData, issueData };
}
