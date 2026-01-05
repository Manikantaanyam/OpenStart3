import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repoName = searchParams.get("repoName");

  if (!repoName) {
    return NextResponse.json(
      { error: "repoName is required" },
      { status: 400 }
    );
  }

  const project = await prisma.project.findUnique({
    where: { full_name: repoName },
    include: {
      issues: { orderBy: { createdAt: "desc" } },
    },
  });

  console.log("prrrrrrr", project);

  return NextResponse.json({ project });
}
