import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const AgentConfigSchema = z.object({
  name: z.string().describe("The name of the AI Agent"),
  description: z.string().describe("A short description of the agent's purpose"),
  personality: z.string().describe("Detailed description of the agent's personality and tone"),
  greeting: z.string().describe("The initial greeting the agent should use"),
  branding: z.object({
    primaryColor: z.string().describe("The primary CSS color hex code for the agent's UI"),
    icon: z.string().describe("The name of the Lucide icon to use (e.g., 'bot', 'user', 'zap')"),
    theme: z.enum(["dark", "light", "glass"]).default("glass"),
  }),
  knowledgeBase: z.array(z.string()).describe("List of key facts or instructions the agent should know"),
  capabilities: z.array(z.string()).describe("List of specific features the agent should provide (e.g., 'support', 'lead_gen')"),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001"),
      schema: AgentConfigSchema,
      prompt: `Create a professional AI Agent configuration based on this description: "${prompt}"

Focus on premium design, clear personality, and useful capabilities. The branding should be modern and luxe.`,
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error("[GENERATE_AGENT]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
