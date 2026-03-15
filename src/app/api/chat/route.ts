import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { message, agentId, config } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    let systemPrompt = "You are a professional AI Concierge for a premium portfolio. Your tone is sophisticated, helpful, and 'Dark Luxury'.";
    
    if (agentId) {
      const agent = await prisma.agent.findUnique({
        where: { id: agentId }
      });
      if (agent) {
        systemPrompt = `You are ${agent.name}. ${agent.personality || ''}. 
        Configuration: ${agent.config || ''}`;
      }
    } else if (config) {
      systemPrompt = `You are ${config.name}. ${config.personality || ''}. 
      Your purpose is: ${config.description || ''}`;
    }

    const { text } = await generateText({
      model: google("gemini-2.0-flash-001"),
      system: systemPrompt,
      prompt: message,
    });

    return NextResponse.json({ text });
  } catch (error) {
    console.error("[CHAT_API]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
