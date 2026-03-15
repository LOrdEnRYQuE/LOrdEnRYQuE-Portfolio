import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { AgentConfig } from "@/components/ui/AIConcierge";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const { messages } = await req.json();
    const { agentId } = await params;

    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
      include: {
        knowledge: true
      }
    });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const config = (agent.config as unknown) as AgentConfig;
    const personality = agent.personality || config?.personality || "A helpful AI assistant.";
    
    // Combine knowledge from both config and documents
    const docKnowledge = agent.knowledge.map(doc => `--- DOCUMENT: ${doc.fileName} ---\n${doc.content}`).join("\n\n");
    const configKnowledge = config?.knowledgeBase?.join("\n") || "";
    const allKnowledge = [configKnowledge, docKnowledge].filter(Boolean).join("\n\n");
    
    const name = agent.name;

    const systemPrompt = `You are ${name}. 
Personality: ${personality}
Additional Knowledge / Context:
${allKnowledge}

Respond in the tone defined by your personality. Keep responses concise and useful.`;

    const result = await streamText({
      model: google("gemini-2.0-flash-001"),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[AGENT_CHAT]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
