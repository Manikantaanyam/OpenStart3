import { IssueState } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 2);

    const deleted = await prisma.issue.deleteMany({
      where: {
        state: IssueState.OPEN,
        created_at: {
          lt: threeMonthsAgo,
        },
      },
    });

    console.log(`Deleted ${deleted.count} old open issues.`);
    return NextResponse.json({ msg: "deleted issues" });
  } catch (e) {
    console.log("e", e);
    return NextResponse.json({ msg: "Error occured white deleting issues" });
  }
}
