import { prisma } from "@/lib/db";

import { NextResponse } from "next/server";
import { getCurrentUserData } from "../../../../modules/auth/actions";

export type ActivityData = Record<string, { total: number; accepted: number }>;

export async function GET() {
  try {
    const user = await getCurrentUserData();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const submissions = await prisma.submission.findMany({
      where: { userId: user.id },
      select: { createdAt: true, status: true },
      orderBy: { createdAt: "asc" },
    });

    const activityMap: ActivityData = {};

    for (const s of submissions) {
      const d = new Date(s.createdAt);
      const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (!activityMap[dateKey]) {
        activityMap[dateKey] = { total: 0, accepted: 0 };
      }
      activityMap[dateKey].total++;
      if (s.status === "Accepted") {
        activityMap[dateKey].accepted++;
      }
    }

    return NextResponse.json(activityMap);
  } catch (error) {
    console.error("Activity fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch activity" }, { status: 500 });
  }
}
