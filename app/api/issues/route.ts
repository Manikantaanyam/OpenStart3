import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const myCursor = searchParams.get("cursor");
  const LIMIT = 30;

  const queryOptions: any = {
    take: LIMIT + 1,
    orderBy: {
      created_at: "desc",
    },
    include: {
      project: { select: { avatar_url: true, full_name: true } },
    },
  };

  if (myCursor) {
    (queryOptions.cursor = { id: Number(myCursor) }), (queryOptions.skip = 1);
  }

  const data = await prisma.issue.findMany(queryOptions);

  const issueCount = await prisma.issue.count();

  let nextCursor;
  if (data.length > LIMIT) {
    nextCursor = data[data.length - 1].id;
  }

  return NextResponse.json({
    result: data,
    cursor: nextCursor,
    issueCount,
  });
}
