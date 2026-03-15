import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ agentId: string; documentId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { agentId, documentId } = await params;

    // Verify agent ownership
    const agent = await prisma.agent.findUnique({
      where: {
        id: agentId,
        user: { email: session.user.email }
      }
    });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    await prisma.agentKnowledgeDocument.delete({
      where: {
        id: documentId,
        agentId: agentId
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[KNOWLEDGE_DELETE]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
