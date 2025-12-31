import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getHomeData = unstable_cache(
  async () => {
    const issueData = await prisma.issue.findMany({
      take: 5,
      orderBy: { created_at: "desc" },
      include: {
        project: {
          select: { display_name: true, avatar_url: true },
        },
      },
    });

    return { issueData };
  },
  ["issue-ticker-cache"],
  { revalidate: 300, tags: ["issues"] }
);