import { IssueState } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    const deleted = await prisma.issue.deleteMany({
      where: {
        state: IssueState.OPEN,
        created_at: {
          lt: fifteenDaysAgo,
        },
      },
    });

    const deleted1 = await prisma.issue.deleteMany({
      where: {
        state: "CLOSED",
      },
    });

    console.log(`Deleted ${deleted.count} old open issues.`);
    console.log(`Deleted ${deleted1.count} old open issues.`);
    return NextResponse.json({ msg: "deleted issues" });
  } catch (e) {
    console.log("e", e);
    return NextResponse.json({ msg: "Error occured white deleting issues" });
  }
}
