import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PDFParse } from "pdf-parse";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { agentId } = await params;

    const agent = await prisma.agent.findUnique({
      where: {
        id: agentId,
        user: { email: session.user.email }
      },
      include: {
        knowledge: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            fileName: true,
            type: true,
            content: true,
            createdAt: true
          }
        }
      }
    });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    return NextResponse.json(agent.knowledge);
  } catch (error) {
    console.error("[KNOWLEDGE_GET]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { agentId } = await params;

    // Verify ownership
    const agent = await prisma.agent.findUnique({
      where: {
        id: agentId,
        user: { email: session.user.email }
      }
    });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedContent = "";

    if (file.name.endsWith(".pdf")) {
      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();
      extractedContent = result.text;
      await parser.destroy();
    } else {
      extractedContent = buffer.toString("utf-8");
    }

    const doc = await prisma.agentKnowledgeDocument.create({
      data: {
        agentId,
        fileName: file.name,
        type: file.name.endsWith(".pdf") ? "pdf" : "text",
        content: extractedContent
      }
    });

    // Update agent lastProcessedAt
    await prisma.agent.update({
      where: { id: agentId },
      data: { lastProcessedAt: new Date() }
    });

    return NextResponse.json({
      id: doc.id,
      fileName: doc.fileName,
      type: doc.type,
      content: doc.content,
      createdAt: doc.createdAt
    });
  } catch (error) {
    console.error("[KNOWLEDGE_POST]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
