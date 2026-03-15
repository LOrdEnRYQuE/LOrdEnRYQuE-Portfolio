import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

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
    const { personality } = await req.json();

    if (!personality) {
      return NextResponse.json({ error: "Personality is required" }, { status: 400 });
    }

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

    const { text } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Refine and professionalize the following AI Agent personality. 
      Make it more detailed, structured, and premium-sounding, while keeping the original intent.
      Return ONLY the refined personality text without any additional commentary.
      
      Original Personality:
      "${personality}"`,
    });

    return NextResponse.json({ refined: text.trim() });
  } catch (error) {
    console.error("[REFINE_PERSONALITY]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
