import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// POST /api/admin/projects/[id]/stages
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id: projectId } = await params;

  try {
    const body = await req.json();
    const { title, description, status, order } = body;

    const lastStage = await prisma.stage.findFirst({
      where: { projectId },
      orderBy: { order: "desc" }
    });

    const stage = await prisma.stage.create({
      data: {
        title: title || "New Stage",
        description: description || "Description of the new stage",
        status: status || "UPCOMING",
        order: order !== undefined ? order : (lastStage ? lastStage.order + 1 : 0),
        projectId
      }
    });

    return NextResponse.json(stage);
  } catch (error) {
    console.error("[STAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
