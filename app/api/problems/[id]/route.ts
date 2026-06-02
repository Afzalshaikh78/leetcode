import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { currentUserRole } from "@/modules/auth/actions";
import { UserRole } from "@/lib/generated/prisma/enums";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const role = await currentUserRole();

    if (role !== UserRole.ADMIN) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, error: "Problem id is required" }, { status: 400 });
    }

    await prisma.problem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting problem:", error);
    return NextResponse.json({ success: false, error: "Failed to delete problem" }, { status: 500 });
  }
}
