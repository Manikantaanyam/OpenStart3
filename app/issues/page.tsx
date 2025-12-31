import IssueClient from "@/components/issue-client";
import prisma from "@/lib/prisma";

export default async function Issues() {
  const data = await prisma.issue.findMany({
    include: {
      project: {
        select: {
          avatar_url: true,
          full_name: true,
        },
      },
    },
  });
  console.log("data", data);
  return (
    <div>
      <IssueClient issues={data} />
    </div>
  );
}
