import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// PATCH /api/admin/projects/[id]/stages/[stageId]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string, stageId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { stageId } = await params;

  try {
    const body = await req.json();
    const stage = await prisma.stage.update({
      where: { id: stageId },
      data: body
    });

    return NextResponse.json(stage);
  } catch (error) {
    console.error("[STAGE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE /api/admin/projects/[id]/stages/[stageId]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string, stageId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { stageId } = await params;

  try {
    await prisma.stage.delete({
      where: { id: stageId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[STAGE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
